import type { CartTotals } from "../types";
import { formatMoney } from "../lib/format";

export default function OrderSummary({ totals, title = "Order summary" }: { totals: CartTotals; title?: string }) {
  return (
    <aside className="summary-card">
      <h3>{title}</h3>
      <dl>
        <div>
          <dt>Items ({totals.itemCount})</dt>
          <dd>{formatMoney(totals.subtotal)}</dd>
        </div>
        {totals.savings > 0 && (
          <div className="green">
            <dt>Catalogue savings</dt>
            <dd>-{formatMoney(totals.savings)}</dd>
          </div>
        )}
        {totals.couponDiscount > 0 && (
          <div className="green">
            <dt>Coupon {totals.couponCode}</dt>
            <dd>-{formatMoney(totals.couponDiscount)}</dd>
          </div>
        )}
        <div>
          <dt>Delivery</dt>
          <dd>{totals.shipping === 0 ? "Free" : formatMoney(totals.shipping)}</dd>
        </div>
        <div>
          <dt>GST (18%)</dt>
          <dd>{formatMoney(totals.tax)}</dd>
        </div>
      </dl>
      <div className="summary-total">
        <span>Total payable</span>
        <strong>{formatMoney(totals.grandTotal)}</strong>
      </div>
    </aside>
  );
}
