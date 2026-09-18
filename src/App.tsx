import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DebugPanel from "./components/DebugPanel";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrdersPage from "./pages/OrdersPage";
import DebugPage from "./pages/DebugPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/debug" element={<DebugPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <DebugPanel />
    </div>
  );
}
