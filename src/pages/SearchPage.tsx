import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import { usePageTracking } from "../hooks/usePageTracking";
import { trackSearch } from "../lib/commerceEvents";

export default function SearchPage() {
  const [params] = useSearchParams();
  const term = params.get("q") ?? "";
  const results = useMemo(() => searchProducts(term), [term]);

  usePageTracking("Search Results", "search", { searchTerm: term });

  useEffect(() => {
    if (term) void trackSearch(term, results.length);
  }, [term, results.length]);

  return (
    <div className="page">
      <h1>Search results</h1>
      <p className="muted">
        {results.length} result(s) for "{term}"
      </p>
      <div className="product-grid">
        {results.map((p) => (
          <ProductCard key={p.id} product={p} listName={`search:${term}`} />
        ))}
      </div>
    </div>
  );
}
