import { Link } from "react-router-dom";

import { ADDRESS_LINES, EMAIL_ADDRESS, HOURS, INSTAGRAM_URL, PHONES } from "../data/contact";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0E0E10", borderTop: "1px solid #C9A22733" }}>
      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-3 gap-10 text-sm">
        <div>
          <p className="text-xl mb-3 tracking-[0.08em]" style={{ fontFamily: "var(--font-display)", color: "#F5F1E8" }}>
            FIFTH STITCH
          </p>
          <p style={{ color: "#F5F1E8A6" }}>
            {ADDRESS_LINES[0]}
            <br />
            {ADDRESS_LINES[1]}
          </p>
        </div>

        <div className="flex flex-col gap-2" style={{ color: "#F5F1E8A6" }}>
          <Link to="/collections" className="hover:text-[#C9A227]">Collections</Link>
          <Link to="/gallery" className="hover:text-[#C9A227]">Gallery</Link>
          <Link to="/contact" className="hover:text-[#C9A227]">Contact</Link>
        </div>

        <div className="sm:text-right grid gap-2" style={{ color: "#F5F1E8A6" }}>
          <p>{HOURS}</p>
          {PHONES.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-[#C9A227] underline underline-offset-4">{p.display}</a>
          ))}
          {EMAIL_ADDRESS && (
            <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-[#C9A227] underline underline-offset-4">{EMAIL_ADDRESS}</a>
          )}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C9A227] underline underline-offset-4"
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-8 text-xs" style={{ color: "#F5F1E866" }}>
        © {new Date().getFullYear()} Fifth Stitch
      </div>
    </footer>
  );
}
