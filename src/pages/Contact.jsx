import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

import { ADDRESS_LINES, EMAIL_ADDRESS, HOURS, INSTAGRAM_URL, PHONES } from "../data/contact";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST to the Python backend, e.g. fetch("/api/enquiries", {...})
    setSent(true);
  };

  const inputStyle = {
    border: "1px solid #C9A22755",
    color: "#F5F1E8",
    backgroundColor: "transparent",
  };

  return (
    <div style={{ backgroundColor: "#0E0E10", color: "#F5F1E8", minHeight: "100vh" }}>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ borderBottom: "1px solid #C9A22722" }}>
        <svg
          className="absolute right-10 top-10 w-24 h-24 opacity-20 hidden md:block"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1.2"
          style={{ animation: "fsFloat 6s ease-in-out infinite" }}
        >
          <line x1="20" y1="80" x2="75" y2="25" />
          <circle cx="78" cy="22" r="4" />
          <path d="M20 80 Q35 70, 30 55 T45 45" strokeDasharray="3 3" />
        </svg>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>Get In Touch</p>
          <h1 className="text-4xl md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
            VISIT THE ATELIER
          </h1>
        </div>
        <style>{`
          @keyframes fsFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(3deg); }
          }
        `}</style>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        <Reveal>
          <div className="grid gap-8 mb-10 text-sm" style={{ color: "#F5F1E8A6" }}>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#C9A227" }}>Address</p>
              {ADDRESS_LINES.map((l) => <p key={l}>{l}</p>)}
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#C9A227" }}>Phone</p>
              <div className="grid gap-2">
                {PHONES.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="underline underline-offset-4 hover:text-[#C9A227]">{p.display}</a>
                ))}
              </div>
            </div>
            {EMAIL_ADDRESS && (
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#C9A227" }}>Email</p>
                <a href={`mailto:${EMAIL_ADDRESS}`} className="underline underline-offset-4 hover:text-[#C9A227]">{EMAIL_ADDRESS}</a>
              </div>
            )}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#C9A227" }}>Hours</p>
              <p>{HOURS}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#C9A227" }}>Follow</p>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#C9A227]">
                Instagram
              </a>
            </div>
          </div>

          <Link
            to="/book-appointment"
            className="inline-block px-8 py-3.5 text-xs tracking-[0.15em] uppercase mb-10"
            style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}
          >
            Book a Private Fitting
          </Link>

          {/* Atelier visual + location action */}
          <div className="fs-contact-visual">
            <video src="/videos/atelier-reel.mp4" autoPlay muted loop playsInline poster="/videos/posters/atelier-reel.jpg" />
            <div className="fs-contact-visual-copy">
              <span>FIFTH STITCH · VELACHERY</span>
              <strong>Come in. See the craft up close.</strong>
            </div>
          </div>
          <div className="fs-contact-actions">
            <a
              href="https://www.google.com/maps/search/?api=1&query=F2%2C%20Plot%20No%2015%2F16%2C%20Jawaharlal%20Nehru%20Salai%2C%20Kubera%20Nagar%2C%20Srinivasa%20Nagar%2C%20Velachery%2C%20Chennai%2C%20Tamil%20Nadu%20600042"
              target="_blank"
              rel="noopener noreferrer"
              className="fs-contact-action"
            >
              <span>01</span><strong>Open in Google Maps</strong><b>↗</b>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="fs-contact-action">
              <span>02</span><strong>See the latest on Instagram</strong><b>↗</b>
            </a>
            <Link to="/book-appointment" className="fs-contact-action">
              <span>03</span><strong>Request a private fitting</strong><b>↗</b>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          {sent ? (
            <p className="text-sm" style={{ color: "#C9A227" }}>
              Thank you for reaching out — we'll reply shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input required placeholder="Your name" className="px-4 py-3 text-sm" style={inputStyle} />
              <input required type="email" placeholder="Email" className="px-4 py-3 text-sm" style={inputStyle} />
              <input type="tel" placeholder="Phone" className="px-4 py-3 text-sm" style={inputStyle} />
              <textarea required rows={5} placeholder="Your message" className="px-4 py-3 text-sm" style={inputStyle} />
              <button
                type="submit"
                className="px-6 py-3 text-xs tracking-[0.15em] uppercase"
                style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}
              >
                Send message
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}
