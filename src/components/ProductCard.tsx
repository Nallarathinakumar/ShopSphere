import { Link } from "react-router-dom";
import type { Product } from "../types";
import { formatMoney, discountPercent } from "../lib/format";
import { productImage } from "../lib/image";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, listName }: { product: Product; listName: string }) {
  const { addItem } = useCart();
  const off = discountPercent(product.listPrice, product.salePrice);

  return (
    <article className="product-card" data-product-id={product.id} data-list-name={listName}>
      <Link to={`/product/${product.id}`} className="card-media">
        <img src={productImage(product)} alt={product.name} loading="lazy" />
        {off > 0 && <span className="badge-off">{off}% off</span>}
      </Link>
      <div className="card-body">
        <span className="card-brand">{product.brand}</span>
        <Link to={`/product/${product.id}`} className="card-title">
          {product.name}
        </Link>
        <div className="card-rating">
          <span className="stars">{"\u2605".repeat(Math.round(product.rating))}</span>
          <span className="muted">
            {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString("en-IN")})
          </span>
        </div>
        <div className="card-price">
          <strong>{formatMoney(product.salePrice)}</strong>
          {off > 0 && <s>{formatMoney(product.listPrice)}</s>}
        </div>
        <p className="card-desc">{product.shortDescription}</p>
        <button
          className="btn-primary"
          onClick={() => addItem(product, 1, product.variants[0]?.optionValue ?? "", product.salePrice)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
