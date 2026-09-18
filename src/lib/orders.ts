import type { CartLine, CartTotals, Order, PaymentDetails, ShippingDetails } from "../types";
import { STORAGE_KEYS, readJSON, writeJSON } from "./storage";

export function generateOrderId(): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const random = Math.random().toString(36).toUpperCase().slice(2, 8);
  return `ORD-${stamp}-${random}`;
}

export function createOrder(
  lines: CartLine[],
  totals: CartTotals,
  shipping: ShippingDetails,
  payment: PaymentDetails,
  deliveryDays = 4
): Order {
  const eta = new Date();
  eta.setDate(eta.getDate() + deliveryDays);
  return {
    orderId: generateOrderId(),
    placedAt: new Date().toISOString(),
    status: "Confirmed",
    lines,
    totals,
    shipping,
    payment,
    estimatedDeliveryDate: eta.toISOString()
  };
}

export function saveOrder(order: Order): void {
  const orders = loadOrders();
  writeJSON(STORAGE_KEYS.orders, [order, ...orders].slice(0, 50));
}

export function loadOrders(): Order[] {
  return readJSON<Order[]>(STORAGE_KEYS.orders, []);
}

export function findOrder(orderId: string): Order | undefined {
  return loadOrders().find((o) => o.orderId === orderId);
}
