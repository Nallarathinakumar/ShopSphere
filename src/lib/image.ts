import type { Product } from "../types";

// Generates a lightweight inline SVG so the project has zero external image
// dependencies and works offline and on any static host.
export function productImage(product: Product, size = 520): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 520 520">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${product.colorway}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="520" height="520" fill="url(#g)"/>
  <circle cx="260" cy="228" r="140" fill="#ffffff" opacity="0.55"/>
  <text x="260" y="286" font-size="150" text-anchor="middle">${product.emoji}</text>
  <text x="260" y="424" font-size="26" font-family="Segoe UI, Arial" font-weight="700" fill="#16203a" text-anchor="middle">${escapeXml(product.brand)}</text>
  <text x="260" y="458" font-size="19" font-family="Segoe UI, Arial" fill="#3d4a68" text-anchor="middle">${escapeXml(truncate(product.name, 34))}</text>
</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function truncate(value: string, max: number): string {
  return value.length <= max ? value : value.slice(0, max - 1) + "\u2026";
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
