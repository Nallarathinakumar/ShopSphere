import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartLine, CartTotals, Product } from "../types";
import { STORAGE_KEYS, readJSON, writeJSON } from "../lib/storage";
import { round2 } from "../lib/format";
import { trackAddToCart, trackCoupon, trackRemoveFromCart } from "../lib/commerceEvents";

const COUPONS: Record<string, { type: "percent" | "flat"; value: number; minSubtotal: number; label: string }> = {
  SAVE10: { type: "percent", value: 10, minSubtotal: 1000, label: "10% off orders above 1,000" },
  FLAT500: { type: "flat", value: 500, minSubtotal: 3000, label: "Flat 500 off above 3,000" },
  WELCOME15: { type: "percent", value: 15, minSubtotal: 5000, label: "15% off above 5,000" }
};

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 79;
const TAX_RATE = 0.18;

interface CartState {
  lines: CartLine[];
  totals: CartTotals;
  couponCode: string | null;
  couponMessage: string;
  addItem: (product: Product, quantity: number, variantLabel: string, unitPrice: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  restoredFromStorage: boolean;
}

const CartContext = createContext<CartState | null>(null);

interface PersistShape {
  lines: CartLine[];
  couponCode: string | null;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const persisted = readJSON<PersistShape>(STORAGE_KEYS.cart, { lines: [], couponCode: null });
  const [lines, setLines] = useState<CartLine[]>(persisted.lines);
  const [couponCode, setCouponCode] = useState<string | null>(persisted.couponCode);
  const [couponMessage, setCouponMessage] = useState("");
  const [restoredFromStorage] = useState<boolean>(persisted.lines.length > 0);

  // Cart survives refreshes and return visits until the user clears storage.
  useEffect(() => {
    writeJSON(STORAGE_KEYS.cart, { lines, couponCode });
  }, [lines, couponCode]);

  const totals = useMemo<CartTotals>(() => {
    const subtotal = round2(lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0));
    const listTotal = round2(lines.reduce((sum, l) => sum + l.listPrice * l.quantity, 0));
    const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

    let couponDiscount = 0;
    if (couponCode && COUPONS[couponCode] && subtotal >= COUPONS[couponCode].minSubtotal) {
      const c = COUPONS[couponCode];
      couponDiscount = c.type === "percent" ? round2((subtotal * c.value) / 100) : c.value;
    }

    const afterDiscount = Math.max(subtotal - couponDiscount, 0);
    const shipping = itemCount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const tax = round2(afterDiscount * TAX_RATE);

    return {
      itemCount,
      subtotal,
      savings: round2(listTotal - subtotal),
      couponCode,
      couponDiscount,
      shipping,
      tax,
      grandTotal: round2(afterDiscount + shipping + tax)
    };
  }, [lines, couponCode]);

  const addItem = useCallback(
    (product: Product, quantity: number, variantLabel: string, unitPrice: number) => {
      const lineId = `${product.id}::${variantLabel || "default"}`;
      setLines((prev) => {
        const existing = prev.find((l) => l.lineId === lineId);
        if (existing) {
          return prev.map((l) => (l.lineId === lineId ? { ...l, quantity: l.quantity + quantity } : l));
        }
        const line: CartLine = {
          lineId,
          productId: product.id,
          sku: product.sku,
          name: product.name,
          brand: product.brand,
          categoryId: product.categoryId,
          categoryName: product.categoryName,
          variantLabel,
          unitPrice,
          listPrice: product.listPrice,
          quantity,
          emoji: product.emoji,
          colorway: product.colorway,
          addedAt: new Date().toISOString()
        };
        return [...prev, line];
      });
      void trackAddToCart(product, quantity, variantLabel);
    },
    []
  );

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.lineId === lineId ? { ...l, quantity: Math.max(0, quantity) } : l))
        .filter((l) => l.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setLines((prev) => {
      const target = prev.find((l) => l.lineId === lineId);
      if (target) void trackRemoveFromCart(target);
      return prev.filter((l) => l.lineId !== lineId);
    });
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
    setCouponCode(null);
    setCouponMessage("");
  }, []);

  const applyCoupon = useCallback(
    (code: string) => {
      const normalized = code.trim().toUpperCase();
      const coupon = COUPONS[normalized];
      if (!coupon) {
        setCouponMessage(`Coupon ${normalized} is not valid.`);
        void trackCoupon(normalized, false, 0);
        return;
      }
      const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
      if (subtotal < coupon.minSubtotal) {
        setCouponMessage(`${normalized} needs a minimum cart value of ${coupon.minSubtotal}.`);
        void trackCoupon(normalized, false, 0);
        return;
      }
      setCouponCode(normalized);
      setCouponMessage(`${normalized} applied: ${coupon.label}.`);
      const discount = coupon.type === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
      void trackCoupon(normalized, true, round2(discount));
    },
    [lines]
  );

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
    setCouponMessage("Coupon removed.");
  }, []);

  const value: CartState = {
    lines,
    totals,
    couponCode,
    couponMessage,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    restoredFromStorage
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const availableCoupons = COUPONS;
export const freeShippingThreshold = FREE_SHIPPING_THRESHOLD;
