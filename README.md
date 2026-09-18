# ShopSphere - E-commerce Single Page Application

A complete, realistic storefront built as a **true SPA** (React + Vite + TypeScript + React Router) for analytics, data layer and Adobe Target exploration.

It behaves like a normal shopping site: category pages, filters, sort, search, product detail with variants and specifications, cart persisted in `localStorage`, a three-step checkout, simulated payment with a generated order ID, an order confirmation page, and an order history page.

Every meaningful interaction pushes a structured event to `window.adobeDataLayer` and, when Adobe Web SDK is present, sends an XDM event to the Adobe Experience Platform Edge Network.

---

## 1. What is included

| Area | Detail |
|---|---|
| Routing | Client-side routes: home, category, search, product, cart, checkout, confirmation, orders, debug |
| Catalog | 20 products across 5 categories with SKU, variants, specs, stock, ratings, seller, warranty |
| Cart | `localStorage` persistence, quantity control, coupons, GST, shipping rules |
| Checkout | Shipping > Payment > Review, field validation, five payment methods |
| Payment | Simulated. No gateway, no PIN, no OTP. Order is confirmed directly |
| Orders | Order ID generation, order history stored in the browser |
| Analytics | Data layer pushes plus Adobe Web SDK `sendEvent` for all commerce events |
| Personalization | Adobe Target decision scope hook with default content fallback |
| Debugging | Floating event dock and a full `/debug` inspector page |

---

## 2. Prerequisites

Install:

- Node.js 18 or later (LTS recommended)
- Git
- Visual Studio Code

Verify:

```bash
node --version
npm --version
git --version
```

---

## 3. Run it locally

1. Extract the ZIP.
2. Open the `shopsphere` folder in VS Code.
3. Open **Terminal > New Terminal**.
4. Install dependencies:

```bash
npm install
```

5. Create your local environment file.

macOS / Linux / Git Bash:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

6. Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173`. Edits you save in VS Code hot-reload instantly.

---

## 4. First functional walkthrough

1. Browse a category, apply a brand filter and change the sort order.
2. Open a product, switch the variant, read the specification tab.
3. Add two different products to the cart.
4. Open the cart and apply the coupon `SAVE10`.
5. **Close the browser tab completely, then reopen the site.** The cart is restored from `localStorage` and the cart page shows a restore note.
6. Go to checkout, fill the shipping form, choose any payment method with sample credentials, and review.
7. Select **Place order**. An order ID like `ORD-20260918-K4J2QX` is generated and you land on the confirmation page.
8. Open **Orders** to see the stored order history.
9. Open **Debug** (or the floating **Events** button) to inspect every event that fired.

---

## 5. The data layer

Every event is pushed to `window.adobeDataLayer` in this shape:

```json
{
  "event": "add_to_cart",
  "timestamp": "2026-09-18T12:30:00.000Z",
  "product": {
    "SKU": "ELC-1001-BLK-256",
    "name": "Nimbus X5 5G Smartphone",
    "quantity": 1,
    "priceTotal": 38999,
    "currencyCode": "INR",
    "_shopsphere": {
      "productId": "ELC-1001",
      "brand": "Nimbus",
      "categoryId": "electronics",
      "category": "Electronics",
      "subCategory": "Smartphones",
      "variant": "256GB",
      "unitPrice": 38999,
      "listPrice": 42999
    }
  },
  "quantity": 1
}
```

Events emitted:

| Event | Fired when |
|---|---|
| `page_view` | Every SPA view change |
| `product_list_view` | Home rails, category listing, filter/sort change |
| `product_view` | Product detail opens |
| `variant_selected`, `pdp_tab_view` | PDP interactions |
| `add_to_cart` / `remove_from_cart` | Cart mutations |
| `cart_view` | Cart page opens |
| `coupon_applied` | Coupon accepted or rejected |
| `checkout_step` | Each of the three checkout steps |
| `payment_method_selected` | Payment option chosen |
| `purchase` | Order placed, with order ID and revenue |
| `search` | Search results returned |

Verify in the browser console at any time:

```js
window.adobeDataLayer
```

---

## 6. Connect your Adobe sandbox (Web SDK)

You confirmed you have Adobe sandbox access, so wire it up directly.

### Step 1 - Prepare in Adobe

In Adobe Experience Platform Data Collection (your sandbox):

1. Create or reuse an **XDM schema** with the **Commerce Details** and **Consumer Experience Event** field groups.
2. Create a **datastream** pointing to that sandbox, and enable **Adobe Target** (and Analytics, if you want A4T) on it.
3. Create a **Tags property**, add the **Adobe Experience Platform Web SDK** extension, and configure it with your **org ID** and **datastream ID**.
4. **Important:** do *not* enable "Send a page view event on library load" style automatic behaviour; this SPA sends its own view events.
5. Build the property to the **development** environment and copy the development embed code.

### Step 2 - Add the embed code

Open `index.html`. There is a clearly marked slot in `<head>`:

```html
<script src="https://assets.adobedtm.com/.../launch-XXXXXXXX-development.min.js" async></script>
```

Paste your development embed code there.

### Step 3 - Enable it in the app

Edit `.env.local`:

```env
VITE_ALLOY_ENABLED=true
VITE_ALLOY_INSTANCE=alloy
VITE_PERSONALIZATION_ENABLED=false
```

Restart the dev server (environment variables are read at startup):

```bash
npm run dev
```

### Step 4 - Validate

1. Open `/debug` in the app. The pill should read **window.alloy: found**.
2. Browse and add to cart, then filter the debug list by **Web SDK** channel to see request and response payloads.
3. Cross-check in the Adobe Experience Platform Debugger extension and in your sandbox's Edge/Assurance view.

If `alloy` is not found, the app logs `alloy:skipped` and keeps working. Nothing breaks.

---

## 7. Turn on Adobe Target personalization

Once Web SDK is validated:

```env
VITE_PERSONALIZATION_ENABLED=true
```

The home page requests the decision scope **`home-hero`**.

In Adobe Target, create a **form-based activity** targeting that scope with a JSON offer like:

```json
{
  "title": "Welcome back, monsoon picks are live",
  "body": "Handpicked electronics and home essentials with free delivery.",
  "ctaLabel": "Shop the edit"
}
```

The app then:

1. Calls `sendEvent` with `decisionScopes: ["home-hero"]`.
2. Reads `response.propositions`.
3. Parses the JSON offer and swaps it into React state.
4. Sends a `decisioning.propositionDisplay` notification so Target records the impression.

The banner renders `data-content-source="target"` when a decision was applied, and `"default"` otherwise. Adobe's guidance is that propositions requested through custom scopes are returned but not auto-rendered, so the component must place the content itself — which is exactly what `usePersonalization` does.

To add a new personalized slot anywhere:

```tsx
<PersonalizedBanner
  scope="cart-upsell"
  fallback={{ title: "...", body: "...", ctaLabel: "..." }}
/>
```

For VEC-based SPA activities later, Adobe's SPA model uses **views** rather than URLs, which maps directly to the `viewName` this app already sends on every route change.

---

## 8. Identity and PII handling

Checkout collects name, email, mobile and address so you can study an end-to-end journey.

- Email and mobile are **not** placed in the event body.
- They go into the XDM `identityMap`, and by default are **SHA-256 hashed in the browser** before the request leaves the page (`VITE_HASH_EMAIL=true`).
- Only city, state, PIN and country are sent as non-identifying context.

Because this site is public on GitHub, use **sample data only**. Do not enter real personal details, real card numbers, or anyone else's information. If your sandbox is configured to hash on the Edge, set `VITE_HASH_EMAIL=false` and align with your Adobe schema.

---

## 9. Build and deploy free on GitHub Pages

### Push to GitHub

```bash
git init
git add .
git commit -m "ShopSphere commerce SPA"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

`.env.local` is git-ignored and will not be pushed.

### Configure Pages

1. In the repository, open **Settings > Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open **Settings > Secrets and variables > Actions > Variables** and add:

| Variable | Value |
|---|---|
| `VITE_BASE_PATH` | `/YOUR_REPO/` (include both slashes) |
| `VITE_ROUTER` | `hash` |
| `VITE_ALLOY_ENABLED` | `true` once your embed code is committed |
| `VITE_PERSONALIZATION_ENABLED` | `true` when your Target activity is live |

4. Push to `main`. The included workflow at `.github/workflows/deploy.yml` builds and publishes automatically.

Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`.

**Why hash routing:** GitHub Pages has no server-side rewrite, so a deep link such as `/product/ELC-1001` would 404. Hash mode (`/#/product/ELC-1001`) avoids this entirely. The workflow also writes a `404.html` fallback if you later switch to `browser` mode.

### Deploying to Vercel or Netlify instead

Set `VITE_ROUTER=browser` and `VITE_BASE_PATH=/`. `vercel.json` already contains the SPA rewrite rule.

---

## 10. Everyday development workflow

```bash
npm run dev       # local development with hot reload
npm run build     # type-check and produce dist/
npm run preview   # serve the production build locally
```

To ship a change:

```bash
git add .
git commit -m "Describe the change"
git push
```

GitHub Actions rebuilds and redeploys.

---

## 11. Where to make common changes

| I want to... | Edit |
|---|---|
| Add or edit products | `src/data/products.ts` |
| Add a category | `src/data/categories.ts` |
| Change the data layer shape | `src/lib/xdm.ts` |
| Add or modify a tracked event | `src/lib/commerceEvents.ts` |
| Change Web SDK behaviour | `src/lib/analytics.ts` |
| Change identity/hashing | `src/lib/identity.ts` |
| Change cart rules, coupons, tax, shipping | `src/context/CartContext.tsx` |
| Change order ID format | `src/lib/orders.ts` |
| Change checkout fields, payment methods | `src/pages/CheckoutPage.tsx` |
| Add a personalization slot | `src/components/PersonalizedBanner.tsx` |
| Restyle anything | `src/styles.css` |

Pricing, tax and shipping constants live at the top of `CartContext.tsx`:

```ts
const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 79;
const TAX_RATE = 0.18;
```

---

## 12. Troubleshooting

**`npm` not recognised** - install Node.js LTS, then close and reopen VS Code.

**Blank page after deploying to Pages** - `VITE_BASE_PATH` must be `/YOUR_REPO/` with both slashes, and `VITE_ROUTER` should be `hash`.

**`window.alloy` not found** - the embed code is missing from `index.html`, blocked by an ad blocker, or your Tags library uses a custom instance name. Set `VITE_ALLOY_INSTANCE` to match.

**Events fire twice in development** - React StrictMode intentionally double-invokes effects in dev. Production builds fire once. Confirm with `npm run preview`.

**Cart did not restore** - the browser was in private mode or site data was cleared.

**Target returns a proposition but nothing changes** - open `/debug`, inspect the `alloy` response, and confirm your offer JSON uses the keys `title`, `body`, `ctaLabel`. Adjust the parser in `src/hooks/usePersonalization.ts` if your activity uses a different contract.

---

## 13. Deliberate scope boundaries

- Payments are simulated end to end. There is no gateway, tokenization, PIN or OTP, and no money moves.
- There is no backend, no server-side validation and no real inventory.
- Login is not included yet; the checkout remembers your details in `localStorage` for prefill.
- Do not accept real orders or real customer data with this build. If you later turn this into a live business, you will need a backend, a real payment gateway, server-side order management, and a privacy/consent layer before going live.

---

## 14. Suggested next steps

1. Add a consent banner and gate Web SDK events behind consent state.
2. Add login and an authenticated identity in `identityMap`.
3. Add a second Target scope on the PDP or cart for upsell testing.
4. Add A4T by enabling Analytics on the same datastream.
5. Move order handling to a small backend when you want real persistence.
