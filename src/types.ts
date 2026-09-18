export interface ProductVariant {
  sku: string;
  optionName: string;
  optionValue: string;
  priceDelta: number;
  stock: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  subCategory: string;
  listPrice: number;
  salePrice: number;
  currency: string;
  rating: number;
  reviewCount: number;
  stock: number;
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  variants: ProductVariant[];
  tags: string[];
  colorway: string;
  emoji: string;
  returnWindowDays: number;
  warrantyMonths: number;
  seller: string;
  deliveryEstimateDays: number;
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
}

export interface CartLine {
  lineId: string;
  productId: string;
  sku: string;
  name: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  variantLabel: string;
  unitPrice: number;
  listPrice: number;
  quantity: number;
  emoji: string;
  colorway: string;
  addedAt: string;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  savings: number;
  couponCode: string | null;
  couponDiscount: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  mobile: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type PaymentMethodId = "card" | "upi" | "netbanking" | "wallet" | "cod";

export interface PaymentDetails {
  method: PaymentMethodId;
  methodLabel: string;
  maskedInstrument: string;
}

export interface Order {
  orderId: string;
  placedAt: string;
  status: string;
  lines: CartLine[];
  totals: CartTotals;
  shipping: ShippingDetails;
  payment: PaymentDetails;
  estimatedDeliveryDate: string;
}

export interface DebugEvent {
  id: string;
  time: string;
  name: string;
  channel: "dataLayer" | "alloy" | "app";
  payload: unknown;
}
