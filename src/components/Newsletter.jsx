import { useState } from "react";

// TODO: wire this up to a real mailing list / the Python backend once one
// exists — right now it just confirms locally and doesn't store anything.
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <section style={{ backgroundColor: "#17171A", borderTop: "1px solid #C9A22722" }}>
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
          Stay In The Loop
        </p>
        <h2 className="text-2xl md:text-3xl mb-8" style={{ fontFamily: "var(--font-display)" }}>
          New collections, before anyone else.
        </h2>

        {subscribed ? (
          <p className="text-sm" style={{ color: "#C9A227" }}>Thank you — you're on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-3 text-sm flex-1 max-w-xs bg-transparent"
              style={{ border: "1px solid #C9A22755", color: "#F5F1E8" }}
            />
            <button
              type="submit"
              className="px-6 py-3 text-xs tracking-[0.15em] uppercase"
              style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
