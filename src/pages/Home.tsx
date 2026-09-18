import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import PersonalizedBanner from "../components/PersonalizedBanner";
import { usePageTracking } from "../hooks/usePageTracking";
import { useEffect } from "react";
import { trackProductListView } from "../lib/commerceEvents";

export default function Home() {
  usePageTracking("Home", "home");

  const trending = products.filter((p) => p.tags.includes("bestseller") || p.tags.includes("trending")).slice(0, 4);
  const newArrivals = products.filter((p) => p.tags.includes("new-arrival")).slice(0, 4);

  useEffect(() => {
    void trackProductListView("home-trending", trending);
  }, []);

  return (
    <div className="page">
      <PersonalizedBanner
        scope="home-hero"
        fallback={{
          title: "Everything you need, delivered fast",
          body: "Explore electronics, fashion, home essentials, beauty and fitness with free delivery above 999.",
          ctaLabel: "Start shopping"
        }}
      />

      <section>
        <h2 className="section-title">Shop by category</h2>
        <div className="category-grid">
          {categories.map((c) => (
            <Link key={c.id} to={`/category/${c.id}`} className="category-tile">
              <span className="tile-emoji" aria-hidden="true">{c.emoji}</span>
              <strong>{c.name}</strong>
              <span className="muted">{c.tagline}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">Trending now</h2>
        <div className="product-grid">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} listName="home-trending" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">New arrivals</h2>
        <div className="product-grid">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} listName="home-new-arrivals" />
          ))}
        </div>
      </section>
    </div>
  );
}
