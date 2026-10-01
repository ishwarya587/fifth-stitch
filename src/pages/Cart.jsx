import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import GarmentImage from "../components/GarmentImage";
import { products } from "../data/products";

export default function Cart() {
  const { items, updateQty, removeItem, total } = useCart();
  const [checkoutMsg, setCheckoutMsg] = useState(false);

  const findProduct = (id) => products.find((p) => p.id === id);

  return (
    <div style={{ backgroundColor: "#0E0E10", color: "#F5F1E8", minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "#C9A227" }}>Your Selections</p>
        <h1 className="text-4xl mb-14" style={{ fontFamily: "var(--font-display)" }}>Shopping Cart</h1>

        {items.length === 0 ? (
          <div>
            <p className="text-sm mb-6" style={{ color: "#F5F1E8A6" }}>Your cart is empty.</p>
            <Link to="/collections" className="text-xs tracking-[0.15em] uppercase underline underline-offset-4" style={{ color: "#C9A227" }}>
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-8 mb-14">
              {items.map((item) => {
                const product = findProduct(item.id);
                return (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6 pb-8" style={{ borderBottom: "1px solid #C9A22722" }}>
                    <div className="w-24 h-32 shrink-0 overflow-hidden" style={{ border: "1px solid #C9A22733" }}>
                      <GarmentImage src={item.image} alt={item.name} category={item.category} className="w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`} className="text-base mb-1 block hover:underline">{item.name}</Link>
                      <p className="text-xs mb-3" style={{ color: "#F5F1E8A6" }}>Size: {item.size}</p>
                      <div className="flex items-center gap-3 mb-3">
                        <button
                          onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                          className="w-7 h-7 text-sm"
                          style={{ border: "1px solid #C9A22755", color: "#F5F1E8" }}
                        >
                          −
                        </button>
                        <span className="text-sm w-6 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                          className="w-7 h-7 text-sm"
                          style={{ border: "1px solid #C9A22755", color: "#F5F1E8" }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-xs underline underline-offset-4"
                        style={{ color: "#F5F1E866" }}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-sm" style={{ color: "#C9A227" }}>
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between mb-8 text-lg">
              <span style={{ fontFamily: "var(--font-display)" }}>Total</span>
              <span style={{ color: "#C9A227" }}>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={() => setCheckoutMsg(true)}
                className="px-8 py-3.5 text-xs tracking-[0.15em] uppercase"
                style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}
              >
                Checkout
              </button>
              <Link
                to="/collections"
                className="px-8 py-3.5 text-xs tracking-[0.15em] uppercase text-center"
                style={{ border: "1px solid #C9A22755", color: "#F5F1E8" }}
              >
                Continue Shopping
              </Link>
            </div>

            {checkoutMsg && (
              <p className="text-xs" style={{ color: "#F5F1E866" }}>
                Checkout and payment aren't connected yet — this needs the backend and a payment gateway to go live.
                For now, please book an appointment or send an enquiry to complete your order.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
