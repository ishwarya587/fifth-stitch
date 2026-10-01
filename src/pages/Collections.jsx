import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import GarmentImage from "../components/GarmentImage";
import Reveal from "../components/Reveal";
import CollectionSlider from "../components/CollectionSlider";

const CATEGORY_ORDER = ["All", "Suits", "Blazers", "Tailored Separates", "Western Wear", "New Arrivals"];

export default function Collections() {
  const [searchParams, setSearchParams] = useSearchParams();
  const genderParam = searchParams.get("gender"); // "Men" | "Women" | null
  const categoryParam = searchParams.get("category");

  // Only offer category chips that actually exist for the selected gender
  // (e.g. Men has no "Western Wear"), so a chip never leads to an empty page.
  const categories = useMemo(() => {
    const pool = genderParam ? products.filter((p) => p.gender === genderParam) : products;
    const present = new Set(pool.map((p) => p.category));
    const hasNew = pool.some((p) => p.isNew);
    return CATEGORY_ORDER.filter((c) => c === "All" || (c === "New Arrivals" ? hasNew : present.has(c)));
  }, [genderParam]);
  const [active, setActive] = useState(categoryParam || "All");

  // A Men/Women click always starts at that gender's full collection.
  // This prevents a previously selected category from leaving a mostly empty page.
  useEffect(() => {
    setActive(categoryParam || "All");
  }, [genderParam, categoryParam]);

  const filtered = useMemo(() => {
    let list = products;
    if (genderParam) list = list.filter((p) => p.gender === genderParam);
    if (active === "New Arrivals") list = list.filter((p) => p.isNew);
    else if (active !== "All") list = list.filter((p) => p.category === active);
    return list;
  }, [active, genderParam]);

  const featuredPiece = (genderParam ? products.filter((p) => p.gender === genderParam) : products).find((p) => p.isPremium) || filtered[0] || products[0];

  return (
    <div style={{ backgroundColor: "#0E0E10", color: "#F5F1E8", minHeight: "100vh" }}>
      {/* EDITORIAL HERO */}
      <section className="relative overflow-hidden" style={{ borderBottom: "1px solid #C9A22722" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #1c1c1f 0%, #0e0e10 75%)", opacity: 0.6 }} />
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
            {genderParam ? genderParam : "Men & Women"}
          </p>
          <h1 className="text-5xl md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
            THE COLLECTION
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        {/* Compact filter rail — keeps Men/Women/Collections aligned and removes the oversized blank area. */}
        <div className="fs-collection-controls mb-10">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {["All", "Men", "Women"].map((g) => (
            <button
              key={g}
              onClick={() => setSearchParams(g === "All" ? {} : { gender: g })}
              className="px-5 py-2 text-xs tracking-[0.12em] uppercase border transition-colors"
              style={
                (g === "All" && !genderParam) || genderParam === g
                  ? { backgroundColor: "#F5F1E8", borderColor: "#F5F1E8", color: "#0E0E10" }
                  : { borderColor: "#F5F1E855", color: "#F5F1E8A6" }
              }
            >
              {g}
            </button>
          ))}
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 md:gap-3 pt-4 mt-4" style={{ borderTop: "1px solid #C9A22722" }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className="px-5 py-2 text-xs tracking-[0.12em] uppercase border transition-colors"
              style={
                active === c
                  ? { backgroundColor: "#C9A227", borderColor: "#C9A227", color: "#0E0E10" }
                  : { borderColor: "#C9A22755", color: "#F5F1E8A6" }
              }
            >
              {c}
            </button>
          ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm" style={{ color: "#F5F1E8A6" }}>No pieces match this filter yet.</p>
        ) : (
          <>
            <div className="fs-collection-heading">
              <div>
                <p className="fs-kicker">{genderParam ? `${genderParam} edit` : "The Fifth Stitch edit"}</p>
                <h2 className="fs-display">Selected pieces</h2>
              </div>
              <p className="fs-collection-count">{filtered.length.toString().padStart(2, "0")} pieces</p>
            </div>
            {filtered.length <= 3 ? (
              // Few pieces: a plain grid, so cards line up with the page edge instead of leaving a gap in a slider.
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {filtered.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.06}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <>
                <CollectionSlider>
                  {filtered.map((p, i) => (
                    <Reveal key={p.id} delay={(i % 6) * 0.06} className="fs-collection-slide snap-start">
                      <ProductCard product={p} />
                    </Reveal>
                  ))}
                </CollectionSlider>
                <p className="mt-3 text-[10px] tracking-[0.16em] uppercase" style={{ color: "#F5F1E855" }}>Swipe to explore more</p>
              </>
            )}
          </>
        )}
      </div>

      {/* FEATURED PIECE */}
      <section className="border-t" style={{ borderColor: "#C9A22722", backgroundColor: "#17171A" }}>
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden" style={{ border: "1px solid #C9A22733" }}>
              <GarmentImage
                src={featuredPiece.images[0]}
                alt={featuredPiece.name}
                category={featuredPiece.category}
                className="w-full h-full"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>Featured Piece</p>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {featuredPiece.name}
            </h2>
            <p className="text-sm mb-6" style={{ color: "#F5F1E8A6" }}>{featuredPiece.fabric}</p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#F5F1E8A6" }}>
              {featuredPiece.description}
            </p>
            <Link
              to={`/product/${featuredPiece.id}`}
              className="inline-block px-8 py-3.5 text-xs tracking-[0.15em] uppercase"
              style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}
            >
              Explore Piece
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
