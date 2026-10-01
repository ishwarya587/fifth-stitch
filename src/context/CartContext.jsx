import { createContext, useContext, useEffect, useState } from "react";

// Browser-only cart (localStorage). NOTE: this does not talk to a server —
// once the Python backend + payment gateway exist, replace addItem/removeItem
// with real API calls and keep this same interface (useCart()).
const CartContext = createContext(null);
const STORAGE_KEY = "fifthstitch_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — cart just won't persist this session
    }
  }, [items]);

  const addItem = (product, size, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id && i.size === size);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          category: product.category,
          size,
          qty,
        },
      ];
    });
  };

  const updateQty = (id, size, qty) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i))
    );
  };

  const removeItem = (id, size) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
