import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, availableCoupons, freeShippingThreshold } from "../context/CartContext";
import { formatMoney } from "../lib/format";
import OrderSummary from "../components/OrderSummary";
import QuantityPicker from "../components/QuantityPicker";
import { usePageTracking } from "../hooks/usePageTracking";
import { trackCartView, trackInteraction } from "../lib/commerceEvents";

export default function CartPage() {
  const { lines, totals, applyCoupon, removeCoupon, couponMessage, couponCode, updateQuantity, removeItem, clearCart, restoredFromStorage } =
    useCart();
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  usePageTracking("Cart", "cart", { itemCount: totals.itemCount });

  useEffect(() => {
    if (lines.length) void trackCartView(lines, totals);
  }, [lines.length]);

  if (lines.length === 0) {
    return (
      <div className="page">
        <h1>Your cart is empty</h1>
        <p className="muted">Items you add are saved in this browser, so you can return later and continue.</p>
        <Link className="btn-primary" to="/">Continue shopping</Link>
      </div>
    );
  }

  const awayFromFreeShipping = Math.max(0, freeShippingThreshold - (totals.subtotal - totals.couponDiscount));

  return (
    <div className="page">
      <h1>Shopping cart</h1>
      {restoredFromStorage && <p className="restore-note">Cart restored from your previous session on this browser.</p>}

      <div className="cart-layout">
        <div className="cart-lines">
          {lines.map((line) => (
            <article key={line.lineId} className="cart-line">
              <div className="line-thumb" style={{ background: line.colorway }}>
                <span aria-hidden="true">{line.emoji}</span>
              </div>
              <div className="line-info">
                <Link to={`/product/${line.productId}`}>
                  <strong>{line.name}</strong>
                </Link>
                <span className="muted">
                  {line.brand} · {line.categoryName}
                  {line.variantLabel ? ` · ${line.variantLabel}` : ""}
                </span>
                <span className="muted">SKU {line.sku}</span>
                <div className="line-controls">
                  <QuantityPicker value={line.quantity} onChange={(q) => updateQuantity(line.lineId, q)} />
                  <button className="link-danger" onClick={() => removeItem(line.lineId)}>Remove</button>
                </div>
              </div>
              <div className="line-price">
                <strong>{formatMoney(line.unitPrice * line.quantity)}</strong>
                <span className="muted">{formatMoney(line.unitPrice)} each</span>
              </div>
            </article>
          ))}

          <button className="link-danger" onClick={() => { clearCart(); void trackInteraction("cart_cleared"); }}>
            Clear cart
          </button>
        </div>

        <div className="cart-aside">
          {awayFromFreeShipping > 0 && (
            <p className="shipping-hint">Add {formatMoney(awayFromFreeShipping)} more for free delivery.</p>
          )}

          <div className="coupon-box">
            <label>Apply coupon</label>
            <div className="coupon-row">
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" />
              <button className="btn-outline" onClick={() => applyCoupon(code)}>Apply</button>
            </div>
            {couponCode && (
              <button className="link-danger" onClick={removeCoupon}>Remove {couponCode}</button>
            )}
            {couponMessage && <p className="muted">{couponMessage}</p>}
            <p className="muted small">Try: {Object.keys(availableCoupons).join(", ")}</p>
          </div>

          <OrderSummary totals={totals} />
          <button className="btn-primary lg block" onClick={() => navigate("/checkout")}>
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
