const PREFIX = "shopsphere:";

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable in private mode. The app stays functional.
  }
}

export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // ignore
  }
}

export const STORAGE_KEYS = {
  cart: "cart.v1",
  orders: "orders.v1",
  profile: "profile.v1",
  recentlyViewed: "recentlyViewed.v1",
  consent: "consent.v1"
};
