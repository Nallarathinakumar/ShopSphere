import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import OrderSummary from "../components/OrderSummary";
import { usePageTracking } from "../hooks/usePageTracking";
import { trackCheckoutStep, trackPaymentSelected, trackPurchase } from "../lib/commerceEvents";
import { createOrder, saveOrder } from "../lib/orders";
import { STORAGE_KEYS, readJSON, writeJSON } from "../lib/storage";
import type { PaymentDetails, PaymentMethodId, ShippingDetails } from "../types";
import { formatMoney } from "../lib/format";

const EMPTY_SHIPPING: ShippingDetails = {
  fullName: "",
  email: "",
  mobile: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India"
};

const PAYMENT_METHODS: Array<{ id: PaymentMethodId; label: string; helper: string }> = [
  { id: "card", label: "Credit / Debit card", helper: "Demo only. Do not enter a real card number." },
  { id: "upi", label: "UPI", helper: "Enter any demo VPA such as demo@upi." },
  { id: "netbanking", label: "Net banking", helper: "Choose any demo bank." },
  { id: "wallet", label: "Wallet", helper: "Simulated wallet balance." },
  { id: "cod", label: "Cash on delivery", helper: "Pay on delivery. No online step." }
];

export default function CheckoutPage() {
  const { lines, totals, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState<ShippingDetails>(() => readJSON<ShippingDetails>(STORAGE_KEYS.profile, EMPTY_SHIPPING));
  const [method, setMethod] = useState<PaymentMethodId>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("Demo National Bank");
  const [errors, setErrors] = useState<string[]>([]);
  const [placing, setPlacing] = useState(false);

  usePageTracking("Checkout", "checkout", { step });

  useEffect(() => {
    if (lines.length) void trackCheckoutStep(step, ["", "shipping", "payment", "review"][step] || "unknown", lines, totals);
  }, [step]);

  if (lines.length === 0 && !placing) {
    return (
      <div className="page">
        <h1>Checkout</h1>
        <p className="muted">Your cart is empty.</p>
        <Link className="btn-primary" to="/">Continue shopping</Link>
      </div>
    );
  }

  function validateShipping(): boolean {
    const issues: string[] = [];
    if (shipping.fullName.trim().length < 3) issues.push("Enter the full name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(shipping.email)) issues.push("Enter a valid email address.");
    if (!/^\d{10}$/.test(shipping.mobile.replace(/\D/g, ""))) issues.push("Enter a 10-digit mobile number.");
    if (shipping.addressLine1.trim().length < 5) issues.push("Enter the address.");
    if (!shipping.city.trim()) issues.push("Enter the city.");
    if (!shipping.state.trim()) issues.push("Enter the state.");
    if (!/^\d{6}$/.test(shipping.postalCode)) issues.push("Enter a 6-digit PIN code.");
    setErrors(issues);
    return issues.length === 0;
  }

  function validatePayment(): boolean {
    const issues: string[] = [];
    if (method === "card") {
      if (cardNumber.replace(/\s/g, "").length < 12) issues.push("Enter a demo card number of at least 12 digits.");
      if (!cardName.trim()) issues.push("Enter the name on the card.");
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) issues.push("Enter expiry as MM/YY.");
    }
    if (method === "upi" && !/^[\w.\-]{2,}@[\w]{2,}$/.test(upiId)) issues.push("Enter a demo UPI ID such as demo@upi.");
    setErrors(issues);
    return issues.length === 0;
  }

  function maskedInstrument(): string {
    if (method === "card") return `**** **** **** ${cardNumber.replace(/\D/g, "").slice(-4) || "0000"}`;
    if (method === "upi") return upiId;
    if (method === "netbanking") return bank;
    if (method === "wallet") return "Demo wallet";
    return "Cash on delivery";
  }

  async function placeOrder() {
    setPlacing(true);
    const payment: PaymentDetails = {
      method,
      methodLabel: PAYMENT_METHODS.find((m) => m.id === method)?.label ?? method,
      maskedInstrument: maskedInstrument()
    };

    // Simulated authorization. No gateway, no OTP, no PIN.
    await new Promise((resolve) => window.setTimeout(resolve, 900));

    const order = createOrder(lines, totals, shipping, payment);
    saveOrder(order);
    writeJSON(STORAGE_KEYS.profile, shipping);
    await trackPurchase(order);
    clearCart();
    navigate(`/order-confirmation/${order.orderId}`, { replace: true });
  }

  return (
    <div className="page">
      <h1>Checkout</h1>
      <ol className="stepper">
        {["Shipping", "Payment", "Review"].map((label, i) => (
          <li key={label} className={step === i + 1 ? "active" : step > i + 1 ? "done" : ""}>
            <span>{i + 1}</span> {label}
          </li>
        ))}
      </ol>

      <div className="checkout-layout">
        <div className="checkout-main">
          {errors.length > 0 && (
            <div className="error-box">
              {errors.map((e) => (
                <p key={e}>{e}</p>
              ))}
            </div>
          )}

          {step === 1 && (
            <section className="panel">
              <h2>Delivery address</h2>
              <p className="muted small">Demo environment. Please use sample data, not real personal details.</p>
              <div className="form-grid">
                <label>Full name<input value={shipping.fullName} onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })} /></label>
                <label>Email<input type="email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} /></label>
                <label>Mobile<input inputMode="numeric" value={shipping.mobile} onChange={(e) => setShipping({ ...shipping, mobile: e.target.value })} /></label>
                <label>PIN code<input inputMode="numeric" value={shipping.postalCode} onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })} /></label>
                <label className="full">Address line 1<input value={shipping.addressLine1} onChange={(e) => setShipping({ ...shipping, addressLine1: e.target.value })} /></label>
                <label className="full">Address line 2 (optional)<input value={shipping.addressLine2} onChange={(e) => setShipping({ ...shipping, addressLine2: e.target.value })} /></label>
                <label>City<input value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} /></label>
                <label>State<input value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} /></label>
                <label>Country<input value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} /></label>
              </div>
              <button className="btn-primary lg" onClick={() => { if (validateShipping()) setStep(2); }}>
                Continue to payment
              </button>
            </section>
          )}

          {step === 2 && (
            <section className="panel">
              <h2>Payment method</h2>
              <p className="muted small">Payments are simulated. No gateway, PIN or OTP is involved.</p>
              <div className="method-list">
                {PAYMENT_METHODS.map((m) => (
                  <label key={m.id} className={method === m.id ? "method active" : "method"}>
                    <input
                      type="radio"
                      name="payment"
                      checked={method === m.id}
                      onChange={() => {
                        setMethod(m.id);
                        void trackPaymentSelected(m.id, totals);
                      }}
                    />
                    <div>
                      <strong>{m.label}</strong>
                      <span className="muted small">{m.helper}</span>
                    </div>
                  </label>
                ))}
              </div>

              {method === "card" && (
                <div className="form-grid">
                  <label className="full">Card number<input inputMode="numeric" placeholder="4111 1111 1111 1111" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} /></label>
                  <label>Name on card<input value={cardName} onChange={(e) => setCardName(e.target.value)} /></label>
                  <label>Expiry (MM/YY)<input placeholder="12/29" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} /></label>
                </div>
              )}
              {method === "upi" && (
                <div className="form-grid">
                  <label className="full">UPI ID<input placeholder="demo@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} /></label>
                </div>
              )}
              {method === "netbanking" && (
                <div className="form-grid">
                  <label className="full">
                    Bank
                    <select value={bank} onChange={(e) => setBank(e.target.value)}>
                      <option>Demo National Bank</option>
                      <option>Sample Union Bank</option>
                      <option>Test Federal Bank</option>
                    </select>
                  </label>
                </div>
              )}

              <div className="row-gap">
                <button className="btn-outline lg" onClick={() => setStep(1)}>Back</button>
                <button className="btn-primary lg" onClick={() => { if (validatePayment()) setStep(3); }}>
                  Review order
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="panel">
              <h2>Review and place order</h2>
              <div className="review-grid">
                <div>
                  <h3>Deliver to</h3>
                  <p>
                    {shipping.fullName}<br />
                    {shipping.addressLine1}{shipping.addressLine2 ? `, ${shipping.addressLine2}` : ""}<br />
                    {shipping.city}, {shipping.state} {shipping.postalCode}<br />
                    {shipping.country}<br />
                    {shipping.email} · {shipping.mobile}
                  </p>
                </div>
                <div>
                  <h3>Paying with</h3>
                  <p>
                    {PAYMENT_METHODS.find((m) => m.id === method)?.label}<br />
                    {maskedInstrument()}
                  </p>
                </div>
              </div>

              <h3>Items</h3>
              <ul className="review-items">
                {lines.map((l) => (
                  <li key={l.lineId}>
                    <span>{l.emoji} {l.name}{l.variantLabel ? ` (${l.variantLabel})` : ""} × {l.quantity}</span>
                    <strong>{formatMoney(l.unitPrice * l.quantity)}</strong>
                  </li>
                ))}
              </ul>

              <div className="row-gap">
                <button className="btn-outline lg" onClick={() => setStep(2)} disabled={placing}>Back</button>
                <button className="btn-primary lg" onClick={placeOrder} disabled={placing}>
                  {placing ? "Placing order..." : `Place order · ${formatMoney(totals.grandTotal)}`}
                </button>
              </div>
            </section>
          )}
        </div>

        <OrderSummary totals={totals} />
      </div>
    </div>
  );
}
