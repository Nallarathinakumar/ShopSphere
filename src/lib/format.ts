const CURRENCY = import.meta.env.VITE_CURRENCY || "INR";

export const currencyCode = CURRENCY;

export function formatMoney(value: number, currency: string = CURRENCY): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(value);
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function discountPercent(listPrice: number, salePrice: number): number {
  if (listPrice <= 0 || salePrice >= listPrice) return 0;
  return Math.round(((listPrice - salePrice) / listPrice) * 100);
}
