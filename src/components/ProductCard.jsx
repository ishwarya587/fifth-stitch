import { useState } from "react";
import { Link } from "react-router-dom";
import GarmentImage from "./GarmentImage";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { isSaved, toggle } = useWishlist();
  const { addItem } = useCart();
  const firstAvailable = product.sizes.find((s) => s.available)?.label || null;
  const [size, setSize] = useState(firstAvailable);
  const [added, setAdded] = useState(false);
  const wishlisted = isSaved(product.id);

  const handleAddToCart = () => {
    if (!size) return;
    addItem(product, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group" style={{ perspective: "1000px" }}>
      <Link to={`/product/${product.id}`} className="block">
        <div
          className="relative aspect-[3/4] mb-4 overflow-hidden transition-transform duration-500 ease-out group-hover:[transform:rotateX(2deg)_rotateY(-2deg)_translateY(-4px)]"
          style={{ border: "1px solid #C9A22733", transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <GarmentImage
              src={product.images[0]}
              alt={product.name}
              category={product.category}
              className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            />
          </div>

          <div className="absolute top-3 left-3 flex gap-2">
            {product.isNew && (
              <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-1" style={{ backgroundColor: "#0E0E10", color: "#F5F1E8" }}>
                New
              </span>
            )}
            {product.isPremium && (
              <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-1" style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}>
                Premium
              </span>
            )}
          </div>

          <div
            className="absolute inset-x-0 bottom-0 py-2.5 text-center text-[10px] tracking-[0.2em] uppercase opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
            style={{ backgroundColor: "#0E0E10CC", color: "#F5F1E8" }}
          >
            View Details
          </div>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-3 mb-2">
        <Link to={`/product/${product.id}`}>
          <p className="text-[10px] tracking-[0.15em] uppercase mb-1" style={{ color: "#F5F1E866" }}>{product.category}</p>
          <h3 className="text-base mb-1" style={{ color: "#F5F1E8" }}>{product.name}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm" style={{ color: "#C9A227" }}>₹{product.price.toLocaleString("en-IN")}</p>
            {product.originalPrice && <p className="text-xs line-through" style={{ color: "#F5F1E855" }}>₹{product.originalPrice.toLocaleString("en-IN")}</p>}
            {product.offer && <span className="fs-offer-pill">{product.offer}</span>}
          </div>
          <div className="flex items-center gap-2 mt-2 text-[11px]" style={{ color: "#F5F1E8A6" }}>
            <span style={{ color: "#C9A227" }}>★ {product.rating}</span>
            <span>({product.reviewCount} reviews)</span>
          </div>
        </Link>
        <button
          onClick={() => toggle(product.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="shrink-0 mt-0.5 transition-transform duration-200 active:scale-90"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill={wishlisted ? "#C9A227" : "none"} stroke="#C9A227" strokeWidth="1.4">
            <path d="M12 20s-7.2-4.4-9.6-8.8C.7 7.6 2.6 4 6.3 4c2 0 3.6 1.1 4.5 2.7C11.7 5.1 13.3 4 15.3 4c3.7 0 5.6 3.6 3.9 7.2C19.2 15.6 12 20 12 20z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[9px] tracking-[0.14em] uppercase" style={{ color: "#F5F1E855" }}>Size</span>
        {size && <span className="text-[9px] tracking-[0.12em] uppercase" style={{ color: "#C9A227" }}>Selected: {size}</span>}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {product.sizes.map((s) => (
          <button
            key={s.label}
            disabled={!s.available}
            onClick={() => setSize(s.label)}
            className="text-[10px] w-7 h-7 flex items-center justify-center border transition-colors"
            style={
              !s.available
                ? { borderColor: "#F5F1E822", color: "#F5F1E833", cursor: "not-allowed" }
                : size === s.label
                ? { borderColor: "#C9A227", backgroundColor: "#C9A227", color: "#0E0E10" }
                : { borderColor: "#C9A22755", color: "#F5F1E8A6" }
            }
          >
            {s.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!size}
        className="w-full py-2.5 text-[10px] tracking-[0.15em] uppercase disabled:opacity-40"
        style={{ border: "1px solid #C9A227", color: added ? "#0E0E10" : "#C9A227", backgroundColor: added ? "#C9A227" : "transparent" }}
      >
        {added ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
}
