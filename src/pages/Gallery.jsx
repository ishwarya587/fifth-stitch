import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../components/Reveal";

const GALLERY_ITEMS = [
  { src: "/images/fifth-stitch-woman-01.jpg", label: "Signature Tailoring", span: "" },
  { src: "/images/fifth-stitch-woman-02.jpg", label: "Modern Western", span: "" },
  { src: "/images/fifth-stitch-man-01.png", label: "Evening Suiting", span: "" },
  { src: "/images/fifth-stitch-man-02.png", label: "Black Label", span: "" },
  { src: "/images/fifth-stitch-man-03.png", label: "Statement Layers", span: "" },
  { src: "/images/customer-gallery/look-01.png", label: "Ivory Embroidered Suit", span: "" },
  { src: "/images/customer-gallery/look-02.png", label: "Signature Brown Suit", span: "" },
  { src: "/images/customer-gallery/look-03.png", label: "Mint Silk & White", span: "" },
  { src: "/images/customer-gallery/look-04.png", label: "Blue Velvet Occasionwear", span: "" },
  { src: "/images/customer-gallery/look-05.png", label: "Burgundy Power Set", span: "" },
  { src: "/images/customer-gallery/look-06.png", label: "Vera Tailored Separates", span: "" },
  { src: "/images/customer-gallery/look-07.png", label: "Celeste Sage Tailored Set", span: "" },
];

const VIDEO_ITEMS = [
  { src: "/videos/fifth-stitch-reel.mp4", poster: "/images/fifth-stitch-woman-01.jpg", label: "Inside Fifth Stitch" },
  { src: "/videos/midnight-suit.mp4", poster: "/videos/posters/midnight-suit.jpg", label: "Midnight Suit" },
  { src: "/videos/windsor-blazer.mp4", poster: "/videos/posters/windsor-blazer.jpg", label: "Windsor Blazer" },
  { src: "/videos/vera-separates.mp4", poster: "/videos/posters/vera-separates.jpg", label: "Vera Separates" },
  { src: "/videos/atelier-reel.mp4", poster: "/videos/posters/atelier-reel.jpg", label: "Atelier — Behind the Scenes" },
  { src: "/videos/women-fashion-reel.mp4", poster: "/images/user-women/women-burgundy-set.png", label: "Women / Motion Edit" },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);
  return (
    <div style={{ backgroundColor: "#0E0E10", color: "#F5F1E8", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "#C9A227" }}>Fifth Stitch</p>
        <h1 className="text-4xl md:text-5xl mb-14" style={{ fontFamily: "var(--font-display)" }}>Gallery</h1>

        <Reveal>
          <button type="button" onClick={() => setSelected({ src: "/videos/fifth-stitch-reel.mp4", label: "Inside Fifth Stitch", type: "video" })} className="w-full aspect-[21/9] overflow-hidden mb-6 text-left relative" style={{ border: "1px solid #C9A22733" }}>
            <video autoPlay muted loop playsInline poster="/images/fifth-stitch-woman-01.jpg" src="/videos/fifth-stitch-reel.mp4" className="w-full h-full object-cover" />
            <span className="absolute bottom-5 left-5 px-3 py-2 text-[9px] tracking-[.2em] uppercase" style={{ backgroundColor: "#0E0E10CC", color: "#F5F1E8" }}>Open video ↗</span>
          </button>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" style={{ perspective: "1200px" }}>
          {GALLERY_ITEMS.map((item, i) => (
            <Reveal key={item.src} delay={(i % 8) * 0.05} className={item.span}>
              <button type="button" onClick={() => setSelected({ ...item, type: "image" })} className="group relative w-full aspect-[4/5] overflow-hidden text-left transition-transform duration-500 ease-out hover:scale-[1.02]" style={{ border: "1px solid #C9A22733" }}>
                <img src={item.src} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]" />
                <span className="absolute inset-x-0 bottom-0 px-4 py-8 text-xs" style={{ background: "linear-gradient(transparent,#0E0E10DD)", fontFamily: "var(--font-display)" }}>{item.label}</span>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "#C9A227" }}>Motion / Fifth Stitch</p>
          <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: "var(--font-display)" }}>Watch the looks in motion.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {VIDEO_ITEMS.map((item, i) => (
              <Reveal key={item.src} delay={(i % 6) * 0.05}>
                <button type="button" onClick={() => setSelected({ ...item, type: "video" })} className="group relative w-full aspect-[9/16] overflow-hidden text-left" style={{ border: "1px solid #C9A22733" }}>
                  <video src={item.src} poster={item.poster} muted playsInline preload="metadata" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[9px] tracking-[.18em] uppercase" style={{ backgroundColor: "#0E0E10CC", color: "#F5F1E8" }}>▶ Video</span>
                  <span className="absolute inset-x-0 bottom-0 px-4 py-8 text-sm" style={{ background: "linear-gradient(transparent,#0E0E10EE)", fontFamily: "var(--font-display)" }}>{item.label}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="fs-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <button type="button" className="fs-lightbox-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <motion.div className="fs-lightbox-frame" initial={{ scale: .92 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}>
              {selected.type === "video" ? <video src={selected.src} controls autoPlay muted loop playsInline /> : <img src={selected.src} alt={selected.label} />}
              <div className="fs-lightbox-caption"><span>FIFTH STITCH</span><strong>{selected.label}</strong></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
