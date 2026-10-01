import { useState } from "react";
import Reveal from "../components/Reveal";

const initial = { name: "", phone: "", email: "", date: "", time: "", interest: "Bespoke Suit", note: "" };

export default function BookAppointment() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Replace with the real Python backend endpoint, e.g.
      // const res = await fetch("/api/appointments", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Request failed");
      await new Promise((r) => setTimeout(r, 600)); // placeholder for the real request
      setStatus("sent");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    border: "1px solid #C9A22755",
    color: "#F5F1E8",
    backgroundColor: "transparent",
  };

  return (
    <div style={{ backgroundColor: "#0E0E10", color: "#F5F1E8", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT — visual */}
        <Reveal>
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "#C9A227" }}>
            Private Fitting
          </p>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Book an Appointment
          </h1>
          <p className="text-sm mb-10 max-w-sm" style={{ color: "#F5F1E8A6" }}>
            A private fitting, tailored entirely to you.
          </p>
          <div className="fs-appointment-visual">
            <div className="fs-appointment-main">
              <img src="/images/fifth-stitch-woman-01.jpg" alt="Fifth Stitch tailored look" />
              <span>PRIVATE FITTING</span>
            </div>
            <div className="fs-appointment-mini">
              <video src="/videos/fifth-stitch-reel.mp4" autoPlay muted loop playsInline poster="/videos/posters/atelier-reel.jpg" />
              <span>ATELIER IN MOTION</span>
            </div>
          </div>
        </Reveal>

        {/* RIGHT — form */}
        <Reveal delay={0.15}>
          {status === "sent" ? (
            <p className="text-sm" style={{ color: "#C9A227" }}>
              Appointment request sent — we'll confirm by phone shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input required value={form.name} onChange={update("name")} placeholder="Full name" className="px-4 py-3 text-sm" style={inputStyle} />
              <input required type="tel" value={form.phone} onChange={update("phone")} placeholder="Phone number" className="px-4 py-3 text-sm" style={inputStyle} />
              <input type="email" value={form.email} onChange={update("email")} placeholder="Email address" className="px-4 py-3 text-sm" style={inputStyle} />
              <div className="grid grid-cols-2 gap-4">
                <input required type="date" value={form.date} onChange={update("date")} className="px-4 py-3 text-sm" style={inputStyle} />
                <input required type="time" value={form.time} onChange={update("time")} className="px-4 py-3 text-sm" style={inputStyle} />
              </div>
              <select value={form.interest} onChange={update("interest")} className="px-4 py-3 text-sm" style={inputStyle}>
                <option>Bespoke Suit</option>
                <option>Blazer</option>
                <option>Custom Outfit</option>
                <option>Other</option>
              </select>
              <textarea value={form.note} onChange={update("note")} placeholder="Additional notes (optional)" rows={4} className="px-4 py-3 text-sm" style={inputStyle} />
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-6 py-3.5 text-xs tracking-[0.15em] uppercase disabled:opacity-60"
                style={{ backgroundColor: "#C9A227", color: "#0E0E10" }}
              >
                {status === "sending" ? "Sending…" : "Request Private Fitting"}
              </button>
              {status === "error" && (
                <p className="text-sm text-red-400">Something went wrong — please try again.</p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}
