import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "../data/products";
import GarmentImage from "../components/GarmentImage";
import Reveal from "../components/Reveal";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// Keyed by product id so size / enquiry / lightbox state resets when you move between products.
export default function ProductDetail() {
  const { id } = useParams();
  return <ProductView key={id} id={id} />;
}

function ProductView({ id }) {
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { isSaved, toggle } = useWishlist();

  const [size, setSize] = useState(product?.sizes.find((s) => s.available)?.label || null);
  const [added, setAdded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [enquiry, setEnquiry] = useState({ name: "", phone: "" });
  const [enquirySent, setEnquirySent] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => e.key === "Escape" && setLightboxOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  if (!product) {
    return (
      <div style={{ backgroundColor: "#0E0E10", color: "#F5F1E8", minHeight: "100vh" }}>
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p className="text-lg mb-4">This piece could not be found.</p>
          <Link to="/collections" className="underline underline-offset-8 text-sm" style={{ color: "#C9A227" }}>
            Back to collections
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isSaved(product.id);

  const handleAddToCart = () => {
    if (!size) return;
    addItem(product, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div style={{ backgroundColor: "#0E0E10", color: "#F5F1E8", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        <Reveal>
          <div className="grid gap-4">
            <button
              onClick={() => setLightboxOpen(true)}
              className="aspect-[4/5] overflow-hidden text-left"
              style={{ border: "1px solid #C9A22733" }}
              aria-label="View large image"
            >
              <GarmentImage src={product.images[0]} alt={product.name} category={product.category} className="w-full h-full" />
            </button>
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.slice(1).map((img) => (
                  <div key={img} className="aspect-square overflow-hidden" style={{ border: "1px solid #C9A22733" }}>
                    <GarmentImage src={img} alt={product.name} category={product.category} className="w-full h-full" />
                  </div>
                ))}
              </div>
            )}
            <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "#F5F1E866" }}>
              Tap image for large view
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#C9A227" }}>
            {product.gender} · {product.category} {product.isPremium && "· Premium"}
          </p>
          <h1 className="text-4xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {product.name}
          </h1>
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <p className="text-2xl" style={{ color: "#C9A227" }}>₹{product.price.toLocaleString("en-IN")}</p>
            {product.originalPrice && <p className="text-sm line-through" style={{ color: "#F5F1E855" }}>₹{product.originalPrice.toLocaleString("en-IN")}</p>}
            {product.offer && <span className="fs-offer-pill">{product.offer}</span>}
          </div>
          <div className="flex items-center gap-2 mb-5 text-sm" style={{ color: "#F5F1E8A6" }}>
            <span style={{ color: "#C9A227" }}>★ {product.rating}</span><span>·</span><span>{product.reviewCount} reviews</span>
          </div>
          <p className="text-sm mb-2" style={{ color: "#F5F1E8A6" }}>{product.fabric}</p>
          <p className="text-base mb-8 leading-relaxed" style={{ color: "#F5F1E8A6" }}>
            {product.description}
          </p>

          <div className="flex items-end justify-between gap-4 mb-3">
            <p className="text-xs tracking-[0.15em] uppercase" style={{ color: "#F5F1E8A6" }}>Select Size</p>
            {size && <p className="text-[10px] tracking-[0.14em] uppercase" style={{ color: "#C9A227" }}>Selected: {size}</p>}
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {product.sizes.map((s) => (
              <button
                key={s.label}
                disabled={!s.available}
                onClick={() => setSize(s.label)}
                className="text-xs w-10 h-10 flex items-center justify-center border transition-colors"
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
          <p className="text-[10px] mb-8" style={{ color: "#F5F1E855" }}>Available sizes are outlined; unavailable sizes are muted.</p>

          <div className="flex items-center gap-4 mb-10">
            <button
              onClick={handleAddToCart}
              disabled={!size}
              className="px-8 py-3.5 text-xs tracking-[0.15em] uppercase disabled:opacity-40"
              style={{ backgroundColor: added ? "#F5F1E8" : "#C9A227", color: "#0E0E10" }}
            >
              {added ? "Added to Cart" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggle(product.id)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="w-12 h-12 flex items-center justify-center transition-transform active:scale-90"
              style={{ border: "1px solid #C9A22755" }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill={wishlisted ? "#C9A227" : "none"} stroke="#C9A227" strokeWidth="1.4">
                <path d="M12 20s-7.2-4.4-9.6-8.8C.7 7.6 2.6 4 6.3 4c2 0 3.6 1.1 4.5 2.7C11.7 5.1 13.3 4 15.3 4c3.7 0 5.6 3.6 3.9 7.2C19.2 15.6 12 20 12 20z" />
              </svg>
            </button>
          </div>

          {enquirySent ? (
            <p className="text-sm max-w-sm" style={{ color: "#C9A227" }}>
              Thank you{enquiry.name ? `, ${enquiry.name}` : ""} — we'll call you shortly about the {product.name}.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: POST { ...enquiry, productId: product.id } to the Python backend, e.g. fetch("/api/enquiries", {...})
                setEnquirySent(true);
              }}
              className="grid gap-3 max-w-sm"
            >
              <p className="text-xs tracking-[0.15em] uppercase mb-1" style={{ color: "#F5F1E8A6" }}>
                Or enquire about this piece
              </p>
              <input required value={enquiry.name} onChange={(e) => setEnquiry((f) => ({ ...f, name: e.target.value }))} placeholder="Your name" className="px-4 py-3 text-sm bg-transparent" style={{ border: "1px solid #C9A22755", color: "#F5F1E8" }} />
              <input required type="tel" value={enquiry.phone} onChange={(e) => setEnquiry((f) => ({ ...f, phone: e.target.value }))} placeholder="Phone number" className="px-4 py-3 text-sm bg-transparent" style={{ border: "1px solid #C9A22755", color: "#F5F1E8" }} />
              <button type="submit" className="px-6 py-3 text-xs tracking-[0.15em] uppercase" style={{ border: "1px solid #C9A227", color: "#C9A227" }}>
                Send Enquiry
              </button>
            </form>
          )}
        </Reveal>
      </div>

      <section className="border-t" style={{ borderColor: "#C9A22722", backgroundColor: "#17171A" }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="fs-kicker">Customer feedback</p>
          <h2 className="fs-display mb-10">Reviews for {product.name}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="fs-review-card"><div className="fs-review-stars">★ {product.rating}/5</div><strong>{product.reviewCount} customer reviews</strong><p>Average customer rating for this piece.</p></div>
            {(product.reviews || []).map((review) => (
              <article className="fs-review-card" key={review.name + review.text}>
                <div className="fs-review-stars">{"★".repeat(Math.floor(review.rating))} <span>{review.rating}</span></div>
                <strong>{review.name}</strong>
                <p>{review.text}</p>
                <small>Verified boutique review</small>
              </article>
            ))}
            <div className="fs-review-card"><strong>Need a custom fit?</strong><p>Book a private fitting for measurements, alterations and styling.</p><Link to="/book-appointment" className="fs-text-link inline-block mt-4">Book appointment ↗</Link></div>
          </div>
        </div>
      </section>

      {/* LARGE IMAGE VIEW (lightbox) */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: "#0E0E10F0" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              className="max-w-3xl w-full aspect-[4/5]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <GarmentImage src={product.images[0]} alt={product.name} category={product.category} className="w-full h-full" />
            </motion.div>
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close large view"
              className="absolute top-6 right-6 text-3xl leading-none"
              style={{ color: "#F5F1E8" }}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
