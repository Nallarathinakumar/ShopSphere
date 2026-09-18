export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>ShopSphere</strong>
        <p>
          A demonstration storefront built for analytics, data layer and personalization exploration.
          Orders, payments and inventory are simulated. No real transaction is processed.
        </p>
      </div>
      <div>
        <strong>Shop</strong>
        <p>Electronics, Fashion, Home & Kitchen, Beauty, Sports</p>
      </div>
      <div>
        <strong>Help</strong>
        <p>Returns, Shipping, Track order, Contact</p>
      </div>
      <div className="footer-note">
        Do not enter real personal or payment information on this demo site.
      </div>
    </footer>
  );
}
