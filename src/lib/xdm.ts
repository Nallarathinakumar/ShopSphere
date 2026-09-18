import type { CartLine, Order, Product, ShippingDetails } from "../types";
import { currencyCode, round2 } from "./format";

export interface ProductListItem {
  SKU: string;
  name: string;
  productName: string;
  quantity: number;
  priceTotal: number;
  currencyCode: string;
  _shopsphere: {
    productId: string;
    brand: string;
    categoryId: string;
    category: string;
    subCategory: string;
    variant: string;
    unitPrice: number;
    listPrice: number;
  };
}

export function lineToListItem(line: CartLine): ProductListItem {
  return {
    SKU: line.sku,
    name: line.name,
    productName: line.name,
    quantity: line.quantity,
    priceTotal: round2(line.unitPrice * line.quantity),
    currencyCode: currencyCode,
    _shopsphere: {
      productId: line.productId,
      brand: line.brand,
      categoryId: line.categoryId,
      category: line.categoryName,
      subCategory: "",
      variant: line.variantLabel,
      unitPrice: line.unitPrice,
      listPrice: line.listPrice
    }
  };
}

export function productToListItem(product: Product, quantity = 1, variantLabel = ""): ProductListItem {
  return {
    SKU: product.sku,
    name: product.name,
    productName: product.name,
    quantity,
    priceTotal: round2(product.salePrice * quantity),
    currencyCode: product.currency,
    _shopsphere: {
      productId: product.id,
      brand: product.brand,
      categoryId: product.categoryId,
      category: product.categoryName,
      subCategory: product.subCategory,
      variant: variantLabel,
      unitPrice: product.salePrice,
      listPrice: product.listPrice
    }
  };
}

export function purchaseXdm(order: Order) {
  return {
    eventType: "commerce.purchases",
    commerce: {
      purchases: { value: 1 },
      order: {
        purchaseID: order.orderId,
        purchaseOrderNumber: order.orderId,
        currencyCode: currencyCode,
        priceTotal: order.totals.grandTotal,
        payments: [
          {
            paymentAmount: order.totals.grandTotal,
            paymentType: order.payment.method,
            currencyCode: currencyCode,
            transactionID: `TXN-${order.orderId}`
          }
        ]
      }
    },
    productListItems: order.lines.map(lineToListItem)
  };
}

// Only non-identifying shipping context is placed in the event payload.
// Direct identifiers (email, mobile) are handled through identityMap.
export function shippingContext(shipping: ShippingDetails) {
  return {
    city: shipping.city,
    stateProvince: shipping.state,
    postalCode: shipping.postalCode,
    country: shipping.country
  };
}
