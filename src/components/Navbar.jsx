import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchOverlay from "./SearchOverlay";
import NotificationsDropdown from "./NotificationsDropdown";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const pageLinks = [
  { to: "/collections", label: "Collections" },
  { to: "/new-collections", label: "New Arrivals" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/book-appointment", label: "Book Appointment" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const gender = new URLSearchParams(location.search).get("gender");
  const isCollections = location.pathname === "/collections";
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();
  const { ids } = useWishlist();

  return (
    <header className="sticky top-0 z-30 backdrop-blur" style={{ backgroundColor: "#0E0E10EE", borderBottom: "1px solid #C9A22733" }}>
      {/* TOP BAR — brand on the left, utilities on the right */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
        <Link to="/" className="fs-brand-lockup" aria-label="Fifth Stitch home">
          <img src="/images/fifth-stitch-logo.png" alt="" className="fs-brand-logo" />
          <span>FIFTH STITCH</span>
        </Link>

        <div className="flex items-center justify-end gap-4">
          <button onClick={() => setSearchOpen(true)} aria-label="Search" style={{ color: "#F5F1E8" }}>
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </button>
          <Link to="/account" aria-label="Account" style={{ color: "#F5F1E8" }}><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" /></svg></Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative" style={{ color: "#F5F1E8" }}>
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20s-7.2-4.4-9.6-8.8C.7 7.6 2.6 4 6.3 4c2 0 3.6 1.1 4.5 2.7C11.7 5.1 13.3 4 15.3 4c3.7 0 5.6 3.6 3.9 7.2C19.2 15.6 12 20 12 20z" /></svg>
            {ids.length > 0 && <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center" style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}>{ids.length}</span>}
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative" style={{ color: "#F5F1E8" }}>
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6" /><circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></svg>
            {count > 0 && <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center" style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}>{count}</span>}
          </Link>
          <div className="hidden sm:block"><NotificationsDropdown /></div>
          <button className="lg:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu" aria-expanded={menuOpen} style={{ color: "#F5F1E8" }}>
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
      </div>

      {/* SECONDARY NAV ROW */}
      <div className="fs-navbar-links hidden lg:flex justify-center gap-8 pb-3.5 text-xs tracking-[0.12em] uppercase" style={{ color: "#F5F1E8A6" }}>
        <NavLink
          to="/collections?gender=Men"
          className={() => `fs-nav-link ${gender === "Men" ? "fs-nav-link-active" : ""}`}
        >
          Men
        </NavLink>
        <NavLink
          to="/collections?gender=Women"
          className={() => `fs-nav-link ${gender === "Women" ? "fs-nav-link-active" : ""}`}
        >
          Women
        </NavLink>
        {pageLinks.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={() => `fs-nav-link ${l.to === "/collections" ? (isCollections && !gender ? "fs-nav-link-active" : "") : location.pathname === l.to ? "fs-nav-link-active" : ""}`}
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-6 flex flex-col gap-4 text-sm uppercase tracking-wide" style={{ color: "#F5F1E8" }}>
          <Link to="/collections?gender=Men" onClick={() => setMenuOpen(false)}>Men</Link>
          <Link to="/collections?gender=Women" onClick={() => setMenuOpen(false)}>Women</Link>
          {pageLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
          <div className="pt-2 sm:hidden">
            <NotificationsDropdown />
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
