import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import GarmentImage from "../components/GarmentImage";
import Reveal from "../components/Reveal";

export default function NewCollections() {
  const newArrivals = products.filter((p) => p.isNew);
  const [latest, ...rest] = newArrivals;

  return (
    <div style={{ backgroundColor: "#0E0E10", color: "#F5F1E8", minHeight: "100vh" }}>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C9A227" }}>Just In</p>
        <h1 className="text-5xl md:text-6xl mb-5" style={{ fontFamily: "var(--font-display)" }}>
          NEW ARRIVALS
        </h1>
        <p className="text-base max-w-lg mx-auto" style={{ color: "#F5F1E8A6" }}>
          The latest pieces, tailored with intention.
        </p>
      </section>

      {/* LARGE FEATURED NEW GARMENT */}
      {latest && (
        <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden" style={{ border: "1px solid #C9A22733" }}>
              <GarmentImage
                src={latest.images[0]}
                alt={latest.name}
                category={latest.category}
                className="w-full h-full"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="inline-block text-[10px] tracking-[0.15em] uppercase px-2 py-1 mb-5" style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}>
              New
            </span>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {latest.name}
            </h2>
            <p className="text-sm mb-4" style={{ color: "#F5F1E8A6" }}>{latest.fabric}</p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#F5F1E8A6" }}>
              {latest.description}
            </p>
            <p className="text-xl mb-8" style={{ color: "#C9A227" }}>
              ₹{latest.price.toLocaleString("en-IN")}
            </p>
            <Link
              to={`/product/${latest.id}`}
              className="inline-block px-8 py-3.5 text-xs tracking-[0.15em] uppercase"
              style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}
            >
              Explore Piece
            </Link>
          </Reveal>
        </section>
      )}

      {/* TRENDING ATELIER MOTION — replaces the old 360° garment */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="fs-new-motion-grid">
            <div className="fs-new-motion-video">
              <video src="/videos/fifth-stitch-reel.mp4" autoPlay muted loop playsInline poster="/videos/posters/atelier-reel.jpg" />
              <div className="fs-new-motion-overlay">
                <span>ATELIER MOTION</span>
                <strong>Made to move. Designed to be remembered.</strong>
              </div>
            </div>
            <div className="fs-new-motion-copy">
              <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: "#C9A227" }}>Trending Now</span>
              <h3 className="text-3xl md:text-4xl mt-3 mb-4" style={{ fontFamily: "var(--font-display)" }}>The look, in motion.</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#F5F1E8A6" }}>
                Instead of a static 360° preview, explore the collection through movement, fabric, light and real atelier footage.
              </p>
              <div className="fs-motion-line"><span></span><span></span><span></span></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* REMAINING NEW ARRIVALS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24 border-t" style={{ borderColor: "#C9A22722" }}>
        <Reveal>
          <h2 className="text-2xl md:text-3xl mt-16 mb-12" style={{ fontFamily: "var(--font-display)" }}>
            More New Arrivals
          </h2>
        </Reveal>
        {rest.length === 0 ? (
          <p className="text-sm" style={{ color: "#F5F1E8A6" }}>Check back soon for more.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
