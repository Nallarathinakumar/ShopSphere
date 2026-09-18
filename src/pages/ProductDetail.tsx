import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById, relatedProducts } from "../data/products";
import { formatMoney, discountPercent } from "../lib/format";
import { productImage } from "../lib/image";
import Breadcrumbs from "../components/Breadcrumbs";
import QuantityPicker from "../components/QuantityPicker";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { usePageTracking } from "../hooks/usePageTracking";
import { trackInteraction, trackProductView } from "../lib/commerceEvents";
import { STORAGE_KEYS, readJSON, writeJSON } from "../lib/storage";

export default function ProductDetail() {
  const { productId = "" } = useParams();
  const product = getProductById(productId);
  const { addItem } = useCart();
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<"overview" | "specs" | "delivery">("overview");
  const [added, setAdded] = useState(false);

  const variant = product?.variants[variantIndex];
  const unitPrice = product ? product.salePrice + (variant?.priceDelta ?? 0) : 0;

  usePageTracking(product?.name ?? "Product", "product-detail", {
    productId,
    categoryId: product?.categoryId
  });

  useEffect(() => {
    if (!product) return;
    setVariantIndex(0);
    setQuantity(1);
    void trackProductView(product, product.variants[0]?.optionValue ?? "");
    const recent = readJSON<string[]>(STORAGE_KEYS.recentlyViewed, []);
    writeJSON(STORAGE_KEYS.recentlyViewed, [product.id, ...recent.filter((id) => id !== product.id)].slice(0, 10));
  }, [productId]);

  const related = useMemo(() => (product ? relatedProducts(product) : []), [productId]);

  if (!product) {
    return (
      <div className="page">
        <h1>Product not found</h1>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  const off = discountPercent(product.listPrice, unitPrice);

  function handleAdd() {
    addItem(product!, quantity, variant?.optionValue ?? "", unitPrice);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="page">
      <Breadcrumbs
        trail={[
          { label: "Home", to: "/" },
          { label: product.categoryName, to: `/category/${product.categoryId}` },
          { label: product.subCategory },
          { label: product.name }
        ]}
      />

      <div className="pdp">
        <div className="pdp-media">
          <img src={productImage(product, 640)} alt={product.name} />
          <div className="thumb-row">
            {product.variants.map((v, i) => (
              <button
                key={v.sku}
                className={i === variantIndex ? "thumb active" : "thumb"}
                onClick={() => {
                  setVariantIndex(i);
                  void trackInteraction("variant_selected", { productId: product.id, sku: v.sku, option: v.optionValue });
                }}
              >
                {v.optionValue}
              </button>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <span className="card-brand">{product.brand}</span>
          <h1>{product.name}</h1>
          <div className="card-rating">
            <span className="stars">{"\u2605".repeat(Math.round(product.rating))}</span>
            <span className="muted">
              {product.rating.toFixed(1)} · {product.reviewCount.toLocaleString("en-IN")} ratings
            </span>
          </div>

          <div className="pdp-price">
            <strong>{formatMoney(unitPrice)}</strong>
            {off > 0 && (
              <>
                <s>{formatMoney(product.listPrice)}</s>
                <span className="badge-off inline">{off}% off</span>
              </>
            )}
          </div>
          <p className="muted">Inclusive of all taxes · Sold by {product.seller}</p>

          <div className="variant-select">
            <label>{product.variants[0]?.optionName ?? "Option"}</label>
            <div className="chip-row">
              {product.variants.map((v, i) => (
                <button
                  key={v.sku}
                  className={i === variantIndex ? "chip active" : "chip"}
                  onClick={() => setVariantIndex(i)}
                  disabled={v.stock === 0}
                >
                  {v.optionValue}
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-actions">
            <QuantityPicker value={quantity} onChange={setQuantity} max={Math.min(10, variant?.stock ?? 10)} />
            <button className="btn-primary lg" onClick={handleAdd} disabled={(variant?.stock ?? 0) === 0}>
              {(variant?.stock ?? 0) === 0 ? "Out of stock" : "Add to cart"}
            </button>
            <Link className="btn-outline lg" to="/cart" onClick={handleAdd}>
              Buy now
            </Link>
          </div>
          {added && <p className="added-flash">Added to cart. It stays saved on this browser.</p>}

          <ul className="pdp-assurance">
            <li>Delivery in {product.deliveryEstimateDays} days</li>
            <li>{product.returnWindowDays}-day return window</li>
            <li>{product.warrantyMonths > 0 ? `${product.warrantyMonths}-month warranty` : "No warranty"}</li>
            <li>SKU {variant?.sku ?? product.sku}</li>
          </ul>

          <div className="tabs">
            <div className="tab-row">
              {(["overview", "specs", "delivery"] as const).map((t) => (
                <button
                  key={t}
                  className={tab === t ? "tab active" : "tab"}
                  onClick={() => {
                    setTab(t);
                    void trackInteraction("pdp_tab_view", { tab: t, productId: product.id });
                  }}
                >
                  {t === "overview" ? "Overview" : t === "specs" ? "Specifications" : "Delivery & returns"}
                </button>
              ))}
            </div>

            {tab === "overview" && (
              <div className="tab-body">
                <p>{product.description}</p>
                <ul className="bullet">
                  {product.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "specs" && (
              <div className="tab-body">
                <table className="spec-table">
                  <tbody>
                    {Object.entries(product.specs).map(([k, v]) => (
                      <tr key={k}>
                        <th>{k}</th>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "delivery" && (
              <div className="tab-body">
                <p>
                  Estimated delivery in {product.deliveryEstimateDays} business days. Returns accepted within{" "}
                  {product.returnWindowDays} days of delivery in original packaging.
                </p>
                <p className="muted">Stock available: {variant?.stock ?? product.stock} units for the selected option.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="section-title">Similar products</h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} listName={`pdp-related:${product.id}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
