import { useCallback, useEffect, useRef, useState } from "react";

// Horizontal scroll-snap carousel with arrow controls (native touch swipe on
// mobile via overflow-x scroll). Auto-advances and loops back to the start;
// pauses on hover/focus and when the user prefers reduced motion.
export default function CollectionSlider({ children }) {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [canScroll, setCanScroll] = useState(true);

  const step = (track) => {
    const first = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first ? first.getBoundingClientRect().width + gap : 340;
  };

  const scrollByAmount = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 4) return;
    if (dir > 0 && track.scrollLeft >= max - 4) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir < 0 && track.scrollLeft <= 4) {
      track.scrollTo({ left: max, behavior: "smooth" });
    } else {
      track.scrollBy({ left: dir * step(track), behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => setCanScroll(track.scrollWidth - track.clientWidth > 4);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => ro.disconnect();
  }, [children]);

  useEffect(() => {
    if (paused || !canScroll) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => scrollByAmount(1), 4200);
    return () => window.clearInterval(timer);
  }, [paused, canScroll, scrollByAmount]);

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div
        ref={trackRef}
        className="fs-collection-track flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>

      {canScroll && (
        <>
          <button
            onClick={() => scrollByAmount(-1)}
            aria-label="Previous"
            className="hidden md:flex items-center justify-center absolute -left-3 lg:-left-5 top-[38%] w-10 h-10 rounded-full z-10"
            style={{ backgroundColor: "#0E0E10", border: "1px solid #C9A22755", color: "#C9A227" }}
          >
            ‹
          </button>
          <button
            onClick={() => scrollByAmount(1)}
            aria-label="Next"
            className="hidden md:flex items-center justify-center absolute -right-3 lg:-right-5 top-[38%] w-10 h-10 rounded-full z-10"
            style={{ backgroundColor: "#0E0E10", border: "1px solid #C9A22755", color: "#C9A227" }}
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
