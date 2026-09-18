import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategory } from "../data/categories";
import { getProductsByCategory } from "../data/products";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";
import { usePageTracking } from "../hooks/usePageTracking";
import { trackInteraction, trackProductListView } from "../lib/commerceEvents";

type SortKey = "relevance" | "price-asc" | "price-desc" | "rating";

export default function CategoryPage() {
  const { categoryId = "" } = useParams();
  const category = getCategory(categoryId);
  const all = getProductsByCategory(categoryId);

  const [sort, setSort] = useState<SortKey>("relevance");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [brands, setBrands] = useState<string[]>([]);

  usePageTracking(category?.name ?? "Category", "category", { categoryId });

  const brandOptions = useMemo(() => Array.from(new Set(all.map((p) => p.brand))).sort(), [categoryId]);

  const filtered = useMemo(() => {
    let list = all.filter((p) => p.salePrice <= maxPrice);
    if (brands.length) list = list.filter((p) => brands.includes(p.brand));
    if (sort === "price-asc") list = [...list].sort((a, b) => a.salePrice - b.salePrice);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.salePrice - a.salePrice);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [categoryId, sort, maxPrice, brands.join("|")]);

  useEffect(() => {
    if (filtered.length) void trackProductListView(`category:${categoryId}`, filtered);
  }, [categoryId, filtered.length, sort, maxPrice, brands.join("|")]);

  function toggleBrand(brand: string) {
    setBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
    void trackInteraction("filter_brand", { brand, categoryId });
  }

  if (!category) return <div className="page"><h1>Category not found</h1></div>;

  return (
    <div className="page">
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: category.name }]} />
      <header className="plp-header">
        <div>
          <h1>{category.name}</h1>
          <p className="muted">{category.tagline} · {filtered.length} products</p>
        </div>
        <label className="sort-control">
          Sort
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortKey);
              void trackInteraction("sort_products", { sort: e.target.value, categoryId });
            }}
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Customer rating</option>
          </select>
        </label>
      </header>

      <div className="plp-layout">
        <aside className="filters">
          <h3>Filters</h3>
          <div className="filter-block">
            <label>Max price: {maxPrice.toLocaleString("en-IN")}</label>
            <input
              type="range"
              min={500}
              max={100000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
          <div className="filter-block">
            <label>Brand</label>
            {brandOptions.map((b) => (
              <label key={b} className="check-row">
                <input type="checkbox" checked={brands.includes(b)} onChange={() => toggleBrand(b)} />
                {b}
              </label>
            ))}
          </div>
        </aside>

        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} listName={`category:${categoryId}`} />
          ))}
          {filtered.length === 0 && <p className="muted">No products match the selected filters.</p>}
        </div>
      </div>
    </div>
  );
}
