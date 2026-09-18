import { useState } from "react";
import type { FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import { useCart } from "../context/CartContext";
import { trackInteraction } from "../lib/commerceEvents";

export default function Header() {
  const { totals } = useCart();
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="site-header">
      <div className="header-top">
        <Link to="/" className="logo" onClick={() => void trackInteraction("logo_click")}>
          <span className="logo-mark">S</span>
          <span>ShopSphere</span>
        </Link>

        <form className="search-bar" onSubmit={submitSearch} role="search">
          <input
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for products, brands and more"
            aria-label="Search products"
          />
          <button type="submit">Search</button>
        </form>

        <nav className="header-actions">
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/debug">Debug</NavLink>
          <NavLink to="/cart" className="cart-link">
            Cart
            {totals.itemCount > 0 && <span className="cart-badge">{totals.itemCount}</span>}
          </NavLink>
        </nav>
      </div>

      <div className="header-nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        {categories.map((c) => (
          <NavLink key={c.id} to={`/category/${c.id}`}>
            <span aria-hidden="true">{c.emoji}</span> {c.name}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
