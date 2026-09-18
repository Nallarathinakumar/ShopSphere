const HASH_ENABLED = String(import.meta.env.VITE_HASH_EMAIL ?? "true") === "true";

export async function sha256Lower(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase();
  if (!normalized || !globalThis.crypto?.subtle) return "";
  const bytes = new TextEncoder().encode(normalized);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Builds an XDM identityMap.
 * When VITE_HASH_EMAIL is true (default) the email is SHA-256 hashed in the
 * browser before it leaves the page. Keep it true unless your Adobe datastream
 * is explicitly configured to hash on the Edge.
 */
export async function buildIdentityMap(email?: string, phone?: string) {
  const map: Record<string, Array<{ id: string; primary: boolean; authenticatedState: string }>> = {};

  if (email) {
    const id = HASH_ENABLED ? await sha256Lower(email) : email.trim().toLowerCase();
    if (id) {
      map[HASH_ENABLED ? "Email_LC_SHA256" : "Email"] = [
        { id, primary: true, authenticatedState: "authenticated" }
      ];
    }
  }

  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (digits) {
      const id = HASH_ENABLED ? await sha256Lower(digits) : digits;
      map[HASH_ENABLED ? "Phone_SHA256" : "Phone"] = [
        { id, primary: false, authenticatedState: "authenticated" }
      ];
    }
  }

  return map;
}
