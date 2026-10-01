import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import CollectionSlider from "./CollectionSlider";
import Reveal from "./Reveal";

// Real boutique clips, supplied by the client and placed in
// public/videos/ with matching poster frames in public/videos/posters/.
// productId is null for clips not tied to a single product (e.g. the
// atelier reel) — those link to /gallery instead of a product page.
const VIDEO_ITEMS = [
  { productId: "midnight-suit", video: "/videos/midnight-suit.mp4", poster: "/videos/posters/midnight-suit.jpg" },
  { productId: "windsor-blazer", video: "/videos/windsor-blazer.mp4", poster: "/videos/posters/windsor-blazer.jpg" },
  { productId: "vera-power-suit", video: "/videos/vera-separates.mp4", poster: "/videos/posters/vera-separates.jpg" },
  { productId: null, label: "Atelier — Behind the Scenes", video: "/videos/atelier-reel.mp4", poster: "/videos/posters/atelier-reel.jpg" },
];

function VideoSlide({ item }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const product = item.productId ? products.find((p) => p.id === item.productId) : null;
  const title = product ? product.name : item.label;
  const linkTo = product ? `/product/${product.id}` : "/gallery";
  const linkLabel = product ? "View Product" : "See More";

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <div className="min-w-[240px] sm:min-w-[280px] snap-start">
      <div
        className="relative aspect-[9/16] mb-4 overflow-hidden"
        style={{ backgroundColor: "#0E0E10", border: "1px solid #C9A22733" }}
      >
        <video
          ref={videoRef}
          src={item.video}
          poster={item.poster}
          className="w-full h-full object-cover"
          controls={playing}
          playsInline
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button
            onClick={handlePlay}
            aria-label={`Play video: ${title}`}
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "#0E0E1044" }}
          >
            <span
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#C9A22733", border: "1px solid #C9A227" }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#C9A227">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <p className="text-sm mb-1" style={{ color: "#F5F1E8" }}>{title}</p>
      <Link
        to={linkTo}
        className="text-xs tracking-[0.15em] uppercase underline underline-offset-4"
        style={{ color: "#C9A227" }}
      >
        {linkLabel}
      </Link>
    </div>
  );
}

export default function WatchAndShop() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t" style={{ borderColor: "#C9A22722" }}>
      <Reveal>
        <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "#C9A227" }}>
          In Motion
        </p>
        <h2 className="text-3xl md:text-4xl mb-12" style={{ fontFamily: "var(--font-display)" }}>
          Watch &amp; Shop
        </h2>
      </Reveal>

      <CollectionSlider>
        {VIDEO_ITEMS.map((item) => (
          <VideoSlide key={item.video} item={item} />
        ))}
      </CollectionSlider>
    </section>
  );
}
