import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

const STEPS = [
  { label: "Measure", desc: "A private fitting captures every measurement by hand." },
  { label: "Cut", desc: "Fabric is cut to pattern, panel by panel, for your form alone." },
  { label: "Stitch", desc: "Each seam, lapel and button is finished with care." },
  { label: "Finish", desc: "A final press and inspection before it reaches you." },
];

export default function About() {
  return (
    <div className="fs-about" style={{ backgroundColor: "#0E0E10", color: "#F5F1E8", minHeight: "100vh" }}>
      <section className="fs-about-hero"><div className="max-w-7xl mx-auto px-6"><p className="fs-kicker">Our Story</p><h1>Tailoring for those<br /><em>who dress with intent.</em></h1></div></section>

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <p className="fs-lead">Fifth Stitch is a bespoke tailoring house crafting western wear for men and women — suits, blazers, western wear and tailored separates, each piece cut and finished with intention.</p>
          <p className="mt-6 text-base leading-relaxed" style={{ color: "#F5F1E8A6" }}>Every commission begins with a private fitting. Premium fabrics, considered proportions and hand-finished details come together to create a piece that feels personal rather than mass-produced.</p>
        </Reveal>
        <Reveal delay={.15}>
          <div className="fs-about-image"><img src="/images/fifth-stitch-woman-02.jpg" alt="Fifth Stitch western tailoring" /></div>
        </Reveal>
      </section>

      <section className="border-t" style={{ borderColor: "#C9A22722" }}><div className="max-w-7xl mx-auto px-6 py-24"><Reveal><p className="fs-kicker text-center">Our Process</p><h2 className="fs-display text-center mb-16">Crafted one step at a time.</h2></Reveal><div className="grid sm:grid-cols-4 gap-10">{STEPS.map((s, i) => <Reveal key={s.label} delay={i * .1}><div className="text-center"><p className="text-5xl mb-4" style={{ fontFamily: "var(--font-display)", color: "#C9A22755" }}>{String(i+1).padStart(2,"0")}</p><h3 className="text-xl mb-3 uppercase tracking-wider" style={{ fontFamily: "var(--font-display)" }}>{s.label}</h3><p className="text-sm leading-relaxed" style={{ color: "#F5F1E8A6" }}>{s.desc}</p></div></Reveal>)}</div></div></section>

      <section className="fs-about-closing">
        <div className="fs-about-closing-image"><video autoPlay muted loop playsInline poster="/images/fifth-stitch-man-03.png"><source src="/videos/fifth-stitch-reel.mp4" type="video/mp4" /></video></div>
        <div className="fs-about-closing-copy"><p className="fs-kicker">The Fifth Stitch difference</p><h2>Quiet luxury.<br /><em>Personal by design.</em></h2><Link to="/book-appointment" className="fs-gold-btn">Book a Private Fitting</Link></div>
      </section>
    </div>
  );
}
