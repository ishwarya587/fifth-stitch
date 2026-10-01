import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";
import GarmentImage from "./GarmentImage";

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) { setQuery(""); return; }
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: "#0E0E10F5" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="max-w-3xl w-full mx-auto px-6 pt-20">
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "#C9A227" }}>
                Search Fifth Stitch
              </p>
              <button onClick={onClose} aria-label="Close search" style={{ color: "#F5F1E8" }} className="text-2xl leading-none">
                ×
              </button>
            </div>

            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search suits, blazers, tailoring…"
              className="w-full bg-transparent text-2xl md:text-3xl pb-4 outline-none"
              style={{
                fontFamily: "var(--font-display)",
                color: "#F5F1E8",
                borderBottom: "1px solid #C9A22755",
              }}
            />

            <div className="mt-10 grid sm:grid-cols-2 gap-6 max-h-[55vh] overflow-y-auto pb-10">
              {query.trim() && results.length === 0 && (
                <p className="text-sm" style={{ color: "#F5F1E8A6" }}>
                  No pieces matched "{query}".
                </p>
              )}
              {results.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  onClick={onClose}
                  className="flex gap-4 items-center group"
                >
                  <div className="w-20 h-24 overflow-hidden shrink-0" style={{ border: "1px solid #C9A22733" }}>
                    <GarmentImage src={p.images[0]} alt={p.name} category={p.category} className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-sm mb-1 group-hover:underline" style={{ color: "#F5F1E8" }}>{p.name}</p>
                    <p className="text-xs mb-1" style={{ color: "#F5F1E8A6" }}>{p.gender} · {p.category}</p>
                    <p className="text-xs" style={{ color: "#C9A227" }}>₹{p.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
