import { createContext, useContext, useEffect, useState } from "react";

// Browser-only wishlist (localStorage). Once accounts are backed by the
// Python API, swap this for real per-user storage but keep useWishlist()
// the same so components don't need to change.
const WishlistContext = createContext(null);
const STORAGE_KEY = "fifthstitch_wishlist";

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // storage unavailable — wishlist just won't persist this session
    }
  }, [ids]);

  const toggle = (id) =>
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const isSaved = (id) => ids.includes(id);

  return (
    <WishlistContext.Provider value={{ ids, toggle, isSaved }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
