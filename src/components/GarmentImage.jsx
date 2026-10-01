import { useState } from "react";

// Image slot for product/editorial photos. Point `src` at a real file in
// public/images/ (e.g. "/images/new-product.jpg") once the client
// supplies photography — the real photo will appear automatically. Until
// that file exists (or no src is given), it shows a designed placeholder
// panel instead of a broken image or an unrelated stock photo.
export default function GarmentImage({ src, alt = "", category = "Fifth Stitch", className = "" }) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  if (showPlaceholder) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${className}`}
        style={{ background: "linear-gradient(160deg, #1c1c1f 0%, #0e0e10 75%)" }}
      >
        <svg viewBox="0 0 100 140" className="w-1/3 h-1/3" fill="none" stroke="#C9A227" strokeWidth="1.1" style={{ opacity: 0.35 }}>
          <path d="M35 18 L20 33 L26 53 L34 48 L34 122 L66 122 L66 48 L74 53 L80 33 L65 18 L58 24 Q50 30 42 24 Z" />
        </svg>
        <span
          className="absolute bottom-4 px-3 text-center text-[9px] tracking-[0.2em] uppercase"
          style={{ color: "#F5F1E866" }}
        >
          {category} — photo coming soon
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
