import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Sample/placeholder notifications — wire this up to the Python backend
// (or a simple notifications table) once real events exist to report.
const SAMPLE_NOTIFICATIONS = [
  { id: 1, text: "New arrivals have landed — explore the latest pieces.", to: "/new-collections" },
  { id: 2, text: "The Premium Collection has new additions.", to: "/collections" },
  { id: 3, text: "Items on your wishlist are still available.", to: "/wishlist" },
];

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="relative"
        style={{ color: "#F5F1E8" }}
      >
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
        {SAMPLE_NOTIFICATIONS.length > 0 && (
          <span
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center"
            style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}
          >
            {SAMPLE_NOTIFICATIONS.length}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-4 w-72 z-40 p-5"
          style={{ backgroundColor: "#17171A", border: "1px solid #C9A22733" }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: "#C9A227" }}>
            Notifications
          </p>
          <div className="grid gap-4">
            {SAMPLE_NOTIFICATIONS.map((n) => (
              <Link
                key={n.id}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block text-sm leading-snug transition-colors hover:text-[#C9A227]"
                style={{ color: "#F5F1E8CC" }}
              >
                {n.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
