import { Link, useParams } from "react-router-dom";
import { findOrder } from "../lib/orders";
import { formatDate, formatDateTime, formatMoney } from "../lib/format";
import { usePageTracking } from "../hooks/usePageTracking";

export default function OrderConfirmation() {
  const { orderId = "" } = useParams();
  const order = findOrder(orderId);

  usePageTracking("Order Confirmation", "order-confirmation", { orderId });

  if (!order) {
    return (
      <div className="page">
        <h1>Order not found</h1>
        <p className="muted">This order is not available in this browser's local history.</p>
        <Link className="btn-primary" to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="success-card">
        <div className="tick" aria-hidden="true">{"\u2713"}</div>
        <h1>Order placed successfully</h1>
        <p>
          Thank you {order.shipping.fullName.split(" ")[0]}. A confirmation would normally be sent to{" "}
          {order.shipping.email}.
        </p>
        <div className="order-meta">
          <div>
            <span className="muted">Order ID</span>
            <strong>{order.orderId}</strong>
          </div>
          <div>
            <span className="muted">Placed on</span>
            <strong>{formatDateTime(order.placedAt)}</strong>
          </div>
          <div>
            <span className="muted">Amount paid</span>
            <strong>{formatMoney(order.totals.grandTotal)}</strong>
          </div>
          <div>
            <span className="muted">Estimated delivery</span>
            <strong>{formatDate(order.estimatedDeliveryDate)}</strong>
          </div>
        </div>
      </section>

      <div className="confirm-grid">
        <section className="panel">
          <h2>Items in this order</h2>
          <ul className="review-items">
            {order.lines.map((l) => (
              <li key={l.lineId}>
                <span>
                  {l.emoji} {l.name}
                  {l.variantLabel ? ` (${l.variantLabel})` : ""} × {l.quantity}
                </span>
                <strong>{formatMoney(l.unitPrice * l.quantity)}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h2>Delivery and payment</h2>
          <p>
            {order.shipping.addressLine1}
            {order.shipping.addressLine2 ? `, ${order.shipping.addressLine2}` : ""}
            <br />
            {order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}
            <br />
            {order.shipping.country} · {order.shipping.mobile}
          </p>
          <p className="muted">
            {order.payment.methodLabel} · {order.payment.maskedInstrument}
          </p>
          <p className="muted small">Simulated payment. No real transaction was processed.</p>
        </section>
      </div>

      <div className="row-gap">
        <Link className="btn-primary lg" to="/">Continue shopping</Link>
        <Link className="btn-outline lg" to="/orders">View all orders</Link>
      </div>
    </div>
  );
}
