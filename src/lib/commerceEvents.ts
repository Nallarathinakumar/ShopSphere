import type { CartLine, CartTotals, Order, Product } from "../types";
import { baseWebXdm, pushDataLayer, sendEvent } from "./analytics";
import { lineToListItem, productToListItem, purchaseXdm, shippingContext } from "./xdm";
import { buildIdentityMap } from "./identity";
import { currencyCode } from "./format";

export async function trackPageView(pageName: string, viewName: string, extra: Record<string, unknown> = {}) {
  pushDataLayer("page_view", { page: { name: pageName, viewName, url: window.location.href }, ...extra });
  await sendEvent({
    xdm: { eventType: "web.webpagedetails.pageViews", ...baseWebXdm(pageName, viewName) },
    data: { __shopsphere: { pageName, viewName, ...extra } }
  });
}

export async function trackProductListView(listName: string, items: Product[]) {
  const productListItems = items.map((p) => productToListItem(p));
  pushDataLayer("product_list_view", { listName, itemCount: items.length, productListItems });
  await sendEvent({
    xdm: {
      eventType: "commerce.productListViews",
      commerce: { productListViews: { value: 1 } },
      productListItems,
      ...baseWebXdm(listName, "product-list")
    },
    data: { __shopsphere: { listName } }
  });
}

export async function trackProductView(product: Product, variantLabel: string) {
  const item = productToListItem(product, 1, variantLabel);
  pushDataLayer("product_view", { product: item });
  await sendEvent({
    xdm: {
      eventType: "commerce.productViews",
      commerce: { productViews: { value: 1 } },
      productListItems: [item],
      ...baseWebXdm(product.name, "product-detail")
    }
  });
}

export async function trackAddToCart(product: Product, quantity: number, variantLabel: string) {
  const item = productToListItem(product, quantity, variantLabel);
  pushDataLayer("add_to_cart", { product: item, quantity });
  await sendEvent({
    xdm: {
      eventType: "commerce.productListAdds",
      commerce: { productListAdds: { value: 1 } },
      productListItems: [item],
      ...baseWebXdm(product.name, "product-detail")
    }
  });
}

export async function trackRemoveFromCart(line: CartLine) {
  const item = lineToListItem(line);
  pushDataLayer("remove_from_cart", { product: item });
  await sendEvent({
    xdm: {
      eventType: "commerce.productListRemovals",
      commerce: { productListRemovals: { value: 1 } },
      productListItems: [item],
      ...baseWebXdm("Cart", "cart")
    }
  });
}

export async function trackCartView(lines: CartLine[], totals: CartTotals) {
  const productListItems = lines.map(lineToListItem);
  pushDataLayer("cart_view", { totals, productListItems });
  await sendEvent({
    xdm: {
      eventType: "commerce.productListOpens",
      commerce: { productListOpens: { value: 1 }, cart: { cartID: "local-cart" } },
      productListItems,
      ...baseWebXdm("Cart", "cart")
    },
    data: { __shopsphere: { totals } }
  });
}

export async function trackCheckoutStep(step: number, stepName: string, lines: CartLine[], totals: CartTotals) {
  const productListItems = lines.map(lineToListItem);
  pushDataLayer("checkout_step", { step, stepName, totals, productListItems });
  await sendEvent({
    xdm: {
      eventType: "commerce.checkouts",
      commerce: { checkouts: { value: 1 } },
      productListItems,
      ...baseWebXdm(`Checkout Step ${step}`, "checkout")
    },
    data: { __shopsphere: { checkoutStep: step, checkoutStepName: stepName, totals } }
  });
}

export async function trackPaymentSelected(method: string, totals: CartTotals) {
  pushDataLayer("payment_method_selected", { paymentMethod: method, totals });
  await sendEvent({
    xdm: {
      eventType: "commerce.paymentEntry",
      commerce: {
        order: {
          currencyCode,
          priceTotal: totals.grandTotal,
          payments: [{ paymentType: method, paymentAmount: totals.grandTotal, currencyCode }]
        }
      },
      ...baseWebXdm("Checkout Payment", "checkout")
    }
  });
}

export async function trackPurchase(order: Order) {
  pushDataLayer("purchase", {
    orderId: order.orderId,
    revenue: order.totals.grandTotal,
    totals: order.totals,
    payment: order.payment,
    shipping: shippingContext(order.shipping),
    productListItems: order.lines.map(lineToListItem)
  });

  const identityMap = await buildIdentityMap(order.shipping.email, order.shipping.mobile);

  await sendEvent({
    xdm: {
      ...purchaseXdm(order),
      identityMap,
      ...baseWebXdm("Order Confirmation", "order-confirmation")
    },
    data: {
      __shopsphere: {
        orderId: order.orderId,
        paymentMethod: order.payment.method,
        shipping: shippingContext(order.shipping)
      }
    }
  });
}

export async function trackSearch(term: string, resultCount: number) {
  pushDataLayer("search", { searchTerm: term, resultCount });
  await sendEvent({
    xdm: {
      eventType: "commerce.searchResults",
      _experience: { search: { keywords: term, numberOfResults: resultCount } },
      ...baseWebXdm("Search Results", "search")
    },
    data: { __shopsphere: { searchTerm: term, resultCount } }
  });
}

export async function trackCoupon(code: string, applied: boolean, discount: number) {
  pushDataLayer("coupon_applied", { couponCode: code, applied, discount });
  await sendEvent({
    xdm: {
      eventType: "commerce.promotions",
      commerce: { promotionID: code },
      ...baseWebXdm("Cart", "cart")
    },
    data: { __shopsphere: { couponCode: code, applied, discount } }
  });
}

export async function trackInteraction(name: string, detail: Record<string, unknown> = {}) {
  pushDataLayer(name, detail);
  await sendEvent({
    xdm: {
      eventType: "web.webinteraction.linkClicks",
      web: {
        webInteraction: { name, type: "other", linkClicks: { value: 1 } }
      }
    },
    data: { __shopsphere: { interaction: name, ...detail } }
  });
}
