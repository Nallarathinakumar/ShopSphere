import { Link } from "react-router-dom";
import { loadOrders } from "../lib/orders";
import { formatDateTime, formatMoney } from "../lib/format";
import { usePageTracking } from "../hooks/usePageTracking";

export default function OrdersPage() {
  const orders = loadOrders();
  usePageTracking("My Orders", "orders", { orderCount: orders.length });

  return (
    <div className="page">
      <h1>My orders</h1>
      <p className="muted">Orders are stored locally in this browser for your analysis.</p>

      {orders.length === 0 && (
        <p className="muted">
          No orders yet. <Link to="/">Start shopping</Link>.
        </p>
      )}

      <div className="order-list">
        {orders.map((o) => (
          <article key={o.orderId} className="order-row">
            <div>
              <strong>{o.orderId}</strong>
              <span className="muted"> · {formatDateTime(o.placedAt)}</span>
              <p className="muted">
                {o.lines.length} item(s) · {o.payment.methodLabel} · {o.status}
              </p>
            </div>
            <div className="order-row-right">
              <strong>{formatMoney(o.totals.grandTotal)}</strong>
              <Link className="btn-outline" to={`/order-confirmation/${o.orderId}`}>
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
