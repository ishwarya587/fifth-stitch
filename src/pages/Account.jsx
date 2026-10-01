import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

// NOTE: this is a frontend-only prototype. There is no real authentication
// yet — "signing in" just switches this screen to a dashboard view. Real
// accounts need the Python backend (user table, sessions/auth) to exist.
export default function Account() {
  const [mode, setMode] = useState("login"); // login | signup
  const [session, setSession] = useState(null); // { name, email } once "signed in"
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const { ids } = useWishlist();
  const { items, count } = useCart();
  const savedProducts = products.filter((p) => ids.includes(p.id));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSession({ name: form.name || "Guest", email: form.email });
  };

  const inputStyle = { border: "1px solid #C9A22755", color: "#F5F1E8", backgroundColor: "transparent" };

  if (session) {
    return (
      <div style={{ backgroundColor: "#0E0E10", color: "#F5F1E8", minHeight: "100vh" }}>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "#C9A227" }}>My Account</p>
          <h1 className="text-4xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Welcome, {session.name}
          </h1>
          <p className="text-sm mb-14" style={{ color: "#F5F1E8A6" }}>{session.email}</p>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-lg tracking-[0.1em] uppercase mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Saved Pieces ({savedProducts.length})
              </h2>
              {savedProducts.length === 0 ? (
                <p className="text-sm" style={{ color: "#F5F1E8A6" }}>Nothing saved yet.</p>
              ) : (
                <div className="grid gap-4">
                  {savedProducts.map((p) => (
                    <Link key={p.id} to={`/product/${p.id}`} className="flex justify-between text-sm py-2" style={{ borderBottom: "1px solid #C9A22722" }}>
                      <span>{p.name}</span>
                      <span style={{ color: "#C9A227" }}>₹{p.price.toLocaleString("en-IN")}</span>
                    </Link>
                  ))}
                </div>
              )}
              <Link to="/wishlist" className="inline-block mt-6 text-xs tracking-[0.15em] uppercase underline underline-offset-4" style={{ color: "#C9A227" }}>
                View full wishlist
              </Link>
            </div>

            <div>
              <h2 className="text-lg tracking-[0.1em] uppercase mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Cart &amp; Orders
              </h2>
              <p className="text-sm mb-4" style={{ color: "#F5F1E8A6" }}>
                {count} item{count !== 1 && "s"} currently in your cart.
              </p>
              <Link to="/cart" className="inline-block text-xs tracking-[0.15em] uppercase underline underline-offset-4 mb-8" style={{ color: "#C9A227" }}>
                View cart
              </Link>
              <p className="text-sm" style={{ color: "#F5F1E866" }}>
                Order history will appear here once Fifth Stitch's backend and payment system are connected.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSession(null)}
            className="mt-16 text-xs tracking-[0.15em] uppercase underline underline-offset-4"
            style={{ color: "#F5F1E8A6" }}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0E0E10", color: "#F5F1E8", minHeight: "100vh" }}>
      <div className="max-w-md mx-auto px-6 py-24">
        <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "#C9A227" }}>My Account</p>
        <h1 className="text-4xl mb-10" style={{ fontFamily: "var(--font-display)" }}>
          {mode === "login" ? "Sign In" : "Create Account"}
        </h1>

        <div className="flex gap-6 mb-10 text-xs tracking-[0.15em] uppercase">
          <button
            onClick={() => setMode("login")}
            style={{ color: mode === "login" ? "#C9A227" : "#F5F1E8A6", borderBottom: mode === "login" ? "1px solid #C9A227" : "none" }}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            style={{ color: mode === "signup" ? "#C9A227" : "#F5F1E8A6", borderBottom: mode === "signup" ? "1px solid #C9A227" : "none" }}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {mode === "signup" && (
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="px-4 py-3 text-sm"
              style={inputStyle}
            />
          )}
          <input
            required
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="px-4 py-3 text-sm"
            style={inputStyle}
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="px-4 py-3 text-sm"
            style={inputStyle}
          />
          <button type="submit" className="px-6 py-3 text-xs tracking-[0.15em] uppercase" style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}>
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-xs mt-8" style={{ color: "#F5F1E866" }}>
          This is a preview screen — real sign-in will connect once the backend is ready.
        </p>
      </div>
    </div>
  );
}
