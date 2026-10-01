import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { ids } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <div style={{ backgroundColor: "#0E0E10", color: "#F5F1E8", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "#C9A227" }}>Saved</p>
        <h1 className="text-4xl mb-14" style={{ fontFamily: "var(--font-display)" }}>Wishlist</h1>

        {saved.length === 0 ? (
          <div>
            <p className="text-sm mb-6" style={{ color: "#F5F1E8A6" }}>
              You haven't saved any pieces yet.
            </p>
            <Link to="/collections" className="text-xs tracking-[0.15em] uppercase underline underline-offset-4" style={{ color: "#C9A227" }}>
              Browse the collection
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {saved.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
