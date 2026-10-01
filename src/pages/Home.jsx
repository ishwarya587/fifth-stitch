import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import CollectionSlider from "../components/CollectionSlider";
import WatchAndShop from "../components/WatchAndShop";
import Newsletter from "../components/Newsletter";

const MEDIA = [
  { src: "/images/user-women/women-burgundy-set.png", label: "Burgundy Power Set", type: "image", size: "large" },
  { src: "/images/user-women/women-black-tailoring.png", label: "Vera Tailored Separates", type: "image", size: "small" },
  { src: "/images/user-women/women-sage-blazer.png", label: "Celeste Sage Tailored Set", type: "image", size: "small" },
  { src: "/images/user-women/women-brown-suit.png", label: "Marais Tailored Suit", type: "image", size: "large" },
  { src: "/images/fifth-stitch-woman-01.jpg", label: "Ivory Signature Blazer", type: "image", size: "small" },
  { src: "/images/fifth-stitch-woman-02.jpg", label: "Modern Western Set", type: "image", size: "small" },
  { src: "/videos/women-fashion-reel.mp4", label: "Women / Motion Edit", type: "video", size: "large" },
];

const CATEGORIES = [
  ["Suits", "/collections?category=Suits"],
  ["Blazers", "/collections?category=Blazers"],
  ["Tailored Separates", "/collections?category=Tailored%20Separates"],
  ["Western Wear", "/collections?category=Western%20Wear"],
];

const HERO_SLIDES = [
  { media: "/images/user-women/women-burgundy-set.png", type: "image", eyebrow: "WOMEN / SIGNATURE EDIT", title: "Tailored\nwith confidence.", note: "Made-to-measure womenswear / crafted in Chennai" },
  { media: "/images/brand-men-look.png", type: "image", eyebrow: "MEN / BESPOKE EDIT", title: "Sharp\nby design.", note: "Custom suiting / fit, fabric and finish in one place" },
  { media: "/videos/women-fashion-reel.mp4", type: "video", eyebrow: "WOMEN / MOTION EDIT", title: "See it.\nWear it.", note: "A moving lookbook from the Fifth Stitch boutique" },
];


function MediaCard({ item, index, onOpen }) {
  return (
    <motion.button
      type="button"
      aria-label={`View ${item.label}`}
      className={`fs-media-card ${item.size === "large" ? "fs-media-large" : "fs-media-small"}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: .8, delay: index * .08 }}
      whileHover={{ y: -8, scale: 1.012 }}
      onClick={() => onOpen(item)}
    >
      {item.type === "video" ? (
        <video autoPlay muted loop playsInline preload="metadata" src={item.src} />
      ) : (
        <img src={item.src} alt={item.label} />
      )}
      <div className="fs-media-overlay">
        <span>{item.type === "video" ? "MOTION / FIFTH STITCH" : "FIFTH STITCH"}</span>
        <strong>{item.label}</strong>
        <small>Tap to view</small>
      </div>
    </motion.button>
  );
}

function MediaLightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);
  if (!item) return null;
  return (
    <motion.div
      className="fs-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      onClick={onClose}
    >
      <button className="fs-lightbox-close" type="button" onClick={onClose} aria-label="Close">×</button>
      <motion.div
        className="fs-lightbox-frame"
        initial={{ scale: .92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: .35 }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <video src={item.src} controls autoPlay muted loop playsInline />
        ) : (
          <img src={item.src} alt={item.label} />
        )}
        <div className="fs-lightbox-caption">
          <span>FIFTH STITCH</span>
          <strong>{item.label}</strong>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const handleHeroPointer = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  const [heroSlide, setHeroSlide] = useState(0);
  const featured = products.filter((p) => !p.isNew).slice(0, 4);

  // Reliable auto-advance: one timeout per slide avoids stale interval state and keeps the hero moving on localhost too.
  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setHeroSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [heroSlide]);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 3);

  return (
    <div className="fs-home" style={{ backgroundColor: "#0E0E10", color: "#F5F1E8" }}>
      <section ref={heroRef} onMouseMove={handleHeroPointer} className="fs-hero relative overflow-hidden">
        <motion.div className="fs-hero-glow" style={{ y: heroY, scale: heroScale }} />
        <div className="fs-hero-noise" />
        <div className="fs-hero-cursor-glow" aria-hidden="true" />
        <div className="fs-floating-stickers" aria-hidden="true">
          <motion.span className="fs-sticker fs-sticker-one" animate={{ y: [0, -12, 0], rotate: [-5, 2, -5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>✨ MADE TO MEASURE</motion.span>
          <motion.span className="fs-sticker fs-sticker-two" animate={{ y: [0, 10, 0], rotate: [4, -3, 4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: .4 }}>🪡 HAND FINISHED</motion.span>
          <motion.span className="fs-sticker fs-sticker-three" animate={{ y: [0, -8, 0], rotate: [3, -2, 3] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: .8 }}>✂️ CUT WITH INTENTION</motion.span>
        </div>

        <div className="fs-hero-stage" aria-live="polite">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={HERO_SLIDES[heroSlide].media}
              className="fs-hero-slide"
              initial={{ opacity: 0, scale: 1.045, x: 28 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.02, x: -24 }}
              transition={{ duration: .85, ease: [0.22, 1, 0.36, 1] }}
            >
              {HERO_SLIDES[heroSlide].type === "video" ? (
                <video autoPlay muted loop playsInline preload="auto" src={HERO_SLIDES[heroSlide].media} />
              ) : (
                <img src={HERO_SLIDES[heroSlide].media} alt={`Fifth Stitch ${HERO_SLIDES[heroSlide].eyebrow}`} />
              )}
              <div className="fs-hero-slide-wash" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="fs-hero-grain" aria-hidden="true" />
        <div className="fs-hero-slide-copy">
          <motion.div key={HERO_SLIDES[heroSlide].media} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
            <p className="fs-kicker">{HERO_SLIDES[heroSlide].eyebrow}</p>
            <h1>{HERO_SLIDES[heroSlide].title.split("\n").map((line, i) => <span key={i} className={i === 1 ? "outline-word" : ""}>{line}</span>)}</h1>
            <p className="fs-hero-sub">{HERO_SLIDES[heroSlide].note}</p>
            <div className="flex items-center gap-6 flex-wrap">
              <Link to="/collections" className="fs-gold-btn">Explore Collection</Link>
              <Link to="/book-appointment" className="fs-line-btn">Private Fitting ↗</Link>
            </div>
          </motion.div>
        </div>

        <div className="fs-hero-slide-nav" aria-label="Hero slides">
          <div className="fs-hero-slide-count"><strong>{String(heroSlide + 1).padStart(2, "0")}</strong><span>/ {String(HERO_SLIDES.length).padStart(2, "0")}</span></div>
          <div className="fs-hero-progress">{HERO_SLIDES.map((_, i) => <button key={i} type="button" aria-label={`Show slide ${i + 1}`} className={i === heroSlide ? "active" : ""} onClick={() => setHeroSlide(i)}><span /></button>)}</div>
          <div className="fs-hero-arrows">
            <button type="button" aria-label="Previous slide" onClick={() => setHeroSlide((heroSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}>←</button>
            <button type="button" aria-label="Next slide" onClick={() => setHeroSlide((heroSlide + 1) % HERO_SLIDES.length)}>→</button>
          </div>
        </div>

        <div className="fs-hero-side-note">
          <span>FIFTH STITCH</span><b>✦</b><small>11 AM — 9 PM</small>
        </div>
        <div className="fs-scroll-cue"><span /> Scroll to discover</div>
      </section>

      <div className="fs-marquee"><div>BESPOKE · MADE TO MEASURE · PREMIUM FABRICS · HAND FINISHED · MEN & WOMEN · WESTERN WEAR · BESPOKE · MADE TO MEASURE · PREMIUM FABRICS · HAND FINISHED · MEN & WOMEN · WESTERN WEAR ·</div></div>

      <section className="fs-innovation-band">
        <div className="fs-innovation-track">
          <span>WEAR YOUR EDGE</span><b>✦</b><span>MAKE IT YOURS</span><b>🪡</b><span>MOVE DIFFERENT</span><b>✂️</b><span>FIFTH STITCH</span><b>✨</b>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-12 lg:gap-20 items-end">
          <Reveal><p className="fs-kicker">The Fifth Stitch World</p><h2 className="fs-display">Not just clothing.<br /><em>A point of view.</em></h2></Reveal>
          <Reveal delay={.12}><p className="fs-lead">From first sketch to final press, every piece is shaped around the person wearing it. Explore the atelier through real Fifth Stitch photography, motion and tailored silhouettes.</p></Reveal>
        </div>

        <div className="fs-media-grid fs-media-grid-masonry mt-20">
          {MEDIA.map((item, i) => <MediaCard key={item.src} item={item} index={i} onOpen={setSelectedMedia} />)}
        </div>
      </section>

      <section className="fs-style-lab max-w-7xl mx-auto px-6 py-24">
        <div className="fs-style-lab-head">
          <div><p className="fs-kicker">Style / in motion</p><h2 className="fs-display">A little <em>unexpected.</em></h2></div>
          <p className="fs-lead">Move your cursor across the looks. Tap on mobile. Fashion should feel alive, not like a catalogue.</p>
        </div>
        <div className="fs-style-lab-grid">
          <motion.div className="fs-style-card fs-style-card-a" whileHover={{ y: -12, rotate: -1.5 }}>
            <img src="/images/fitting-kids-look.jpg" alt="Fifth Stitch fitting look" />
            <span>01 / FITTING EDIT</span><strong>Fit first.</strong>
          </motion.div>
          <motion.div className="fs-style-card fs-style-card-b" whileHover={{ y: -12, rotate: 1.5 }}>
            <img src="/images/fitting-floral-look.jpg" alt="Fifth Stitch boutique fitting look" />
            <span>02 / BOUTIQUE EDIT</span><strong>Made for you.</strong>
          </motion.div>
          <motion.div className="fs-style-note" animate={{ rotate: [3, -3, 3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <span>✦</span><b>NO<br/>ORDINARY<br/>LOOKS.</b><small>FIFTH STITCH / FITTING</small>
          </motion.div>
        </div>
      </section>

      <section className="fs-category-section">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <Reveal><p className="fs-kicker">Explore the wardrobe</p><h2 className="fs-display">Choose your silhouette.</h2></Reveal>
          <div className="fs-category-list">
            {CATEGORIES.map(([label, to], i) => <Link to={to} key={label} className="fs-category-row"><span>0{i + 1}</span><strong>{label}</strong><span className="fs-arrow">↗</span></Link>)}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <Reveal><div className="flex items-end justify-between mb-12"><div><p className="fs-kicker">Curated edit</p><h2 className="fs-display">Featured Collection</h2></div><Link to="/collections" className="fs-text-link hidden sm:block">View all ↗</Link></div></Reveal>
        <CollectionSlider>{featured.map((p, i) => <Reveal key={p.id} delay={i * .08} className="min-w-[260px] sm:min-w-[280px] snap-start"><ProductCard product={p} /></Reveal>)}</CollectionSlider>
      </section>

      <section className="fs-full-bleed-video">
        <video autoPlay muted loop playsInline poster="/videos/posters/atelier-reel.jpg"><source src="/videos/fifth-stitch-reel.mp4" type="video/mp4" /></video>
        <div><p className="fs-kicker">Inside the atelier</p><h2 className="fs-display">See the stitch.<br /><em>Feel the craft.</em></h2><Link to="/gallery" className="fs-line-btn">Enter Gallery ↗</Link></div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <Reveal><div className="flex items-end justify-between mb-12"><div><p className="fs-kicker">Just in</p><h2 className="fs-display">New Arrivals</h2></div><Link to="/new-collections" className="fs-text-link hidden sm:block">See all ↗</Link></div></Reveal>
        <div className="grid sm:grid-cols-3 gap-x-8 gap-y-12">{newArrivals.map((p, i) => <Reveal key={p.id} delay={i * .08}><ProductCard product={p} /></Reveal>)}</div>
      </section>

      <WatchAndShop />

      <section className="fs-process"><div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center"><Reveal><p className="fs-kicker">The process</p><h2 className="fs-display">Measured.<br />Cut.<br /><em>Made yours.</em></h2></Reveal><Reveal delay={.15}>{["Measure", "Cut", "Stitch", "Finish"].map((s, i) => <div className="fs-process-row" key={s}><span>0{i+1}</span><strong>{s}</strong><small>Hand-finished with intention.</small></div>)}</Reveal></div></section>

      <section className="fs-stitching-video">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-[.85fr_1.15fr] gap-12 items-end mb-12">
            <Reveal><p className="fs-kicker">Inside the boutique</p><h2 className="fs-display">Stitched<br /><em>for you.</em></h2></Reveal>
            <Reveal delay={0.12}><p className="fs-lead">See the real boutique experience — fabric selection, fittings and the making process — instead of a static catalogue.</p></Reveal>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="fs-stitching-frame">
              <video src="/videos/boutique-fitting-reel.mp4" poster="/images/user-women/women-black-tailoring.png" controls muted playsInline preload="metadata" />
              <div className="fs-video-label"><span>01</span><strong>Boutique fitting & styling</strong></div>
            </div>
            <div className="fs-stitching-frame">
              <video src="/videos/stitching-process.mp4" poster="/images/fitting-yellow-look.jpg" controls muted playsInline preload="metadata" />
              <div className="fs-video-label"><span>02</span><strong>From fabric to final stitch</strong></div>
            </div>
          </div>
          <div className="text-center mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/book-appointment" className="fs-gold-btn">Book a fitting ↗</Link>
            <Link to="/collections" className="fs-line-btn">Design Your Suit ↗</Link>
          </div>
        </div>
      </section>

      <section className="fs-home-reviews">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <Reveal><p className="fs-kicker">Customer feedback</p><h2 className="fs-display">Loved by our clients.</h2></Reveal>
          <CollectionSlider>
            {[
              ["Ananya R.", 5, "The fitting was precise and the blazer sits beautifully. The team understood exactly what I wanted."],
              ["Karthik S.", 5, "Excellent fabric options and a very clean finish. The suit felt made for me from the first fitting."],
              ["Priya M.", 4.9, "Beautiful tailoring and a smooth boutique experience. The final fit was better than expected."],
              ["Rahul V.", 4.8, "The team helped with fabric, fit and small finishing details. Very happy with the final piece."],
            ].map(([name, rating, text], i) => (
              <article className="fs-review-card fs-home-review-slide" key={name}>
                <div className="fs-review-stars">{"★".repeat(Math.floor(rating))}<span> {rating}</span></div>
                <strong>{name}</strong>
                <p>{text}</p>
                <small>Verified boutique review</small>
              </article>
            ))}
          </CollectionSlider>
        </div>
      </section>

      <Newsletter />
      <section className="fs-final-cta"><div><p className="fs-kicker">Your next piece</p><h2>Made for your story.</h2><Link to="/book-appointment" className="fs-dark-btn">Book a Private Fitting ↗</Link></div></section>

      <MediaLightbox item={selectedMedia} onClose={() => setSelectedMedia(null)} />
    </div>
  );
}
