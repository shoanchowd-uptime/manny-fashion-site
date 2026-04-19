import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#FAF7F2", bgAlt: "#F0EBE3", dark: "#1A1A1A", accent: "#8B2635",
  accentLight: "#A63446", gold: "#C4A265", muted: "#6B6560",
  white: "#FFFFFF", border: "#E0D8CC", cream: "#F5F0E8",
};
const F = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', 'Helvetica Neue', sans-serif",
};

function useInView(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } }, { threshold: t });
    obs.observe(el);
    return () => obs.disconnect();
  }, [t]);
  return [ref, v];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return (<div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`, ...style }}>{children}</div>);
}

function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => { const h = () => setS(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: s ? "rgba(250,247,242,0.95)" : "transparent", backdropFilter: s ? "blur(12px)" : "none", borderBottom: s ? `1px solid ${C.border}` : "1px solid transparent", transition: "all 0.4s", padding: "0 clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: s ? 60 : 76, transition: "height 0.4s" }}>
        <a href="#top" style={{ fontFamily: F.display, fontSize: 20, fontWeight: 700, color: C.dark, textDecoration: "none" }}>MANNY<span style={{ color: C.accent }}> FASHION</span></a>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Story", "Collections", "Connect"].map(t => (<a key={t} href={`#${t.toLowerCase()}`} style={{ fontFamily: F.body, fontSize: 12, fontWeight: 500, color: C.muted, textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t}</a>))}
          <a href="https://wa.me/13473358764" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 12, fontWeight: 600, color: C.white, background: C.accent, padding: "10px 22px", borderRadius: 4, textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}>WhatsApp</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px clamp(20px,5vw,64px) 60px", background: `linear-gradient(168deg, ${C.bg} 0%, ${C.bgAlt} 50%, #E8DFD1 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "8%", right: "6%", width: 300, height: 300, border: `1px solid ${C.gold}25`, borderRadius: "50%", animation: "spin 30s linear infinite" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 1 }}>
        <div>
          <div style={{ fontFamily: F.body, fontSize: 12, fontWeight: 600, color: C.gold, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20, opacity: 0, animation: "fadeUp 1s ease 0.3s forwards" }}>New York — Since 1989</div>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, color: C.dark, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 24px", opacity: 0, animation: "fadeUp 1s ease 0.5s forwards" }}>Fashion built on<br /><span style={{ color: C.accent, fontStyle: "italic" }}>relationships,</span><br />not algorithms.</h1>
          <p style={{ fontFamily: F.body, fontSize: 17, color: C.muted, lineHeight: 1.75, maxWidth: 480, marginBottom: 36, opacity: 0, animation: "fadeUp 1s ease 0.7s forwards" }}>I'm Manny Chowdhury. I came to Brooklyn from Bangladesh in 1989 with nothing but a work ethic and a love for fashion. Over three decades later, I bring that same personal touch to every client I work with.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", opacity: 0, animation: "fadeUp 1s ease 0.9s forwards" }}>
            <a href="https://wa.me/13473358764" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 14, fontWeight: 600, color: C.white, background: "#25D366", padding: "14px 32px", borderRadius: 4, textDecoration: "none", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 20px rgba(37,211,102,0.25)" }}>Text Me on WhatsApp</a>
            <a href="#story" style={{ fontFamily: F.body, fontSize: 14, fontWeight: 600, color: C.dark, padding: "14px 32px", borderRadius: 4, textDecoration: "none", border: `1.5px solid ${C.dark}` }}>My Story</a>
          </div>
        </div>
        <div style={{ opacity: 0, animation: "fadeUp 1s ease 0.6s forwards", position: "relative" }}>
          <div style={{ position: "absolute", top: -12, left: -12, right: 12, bottom: 12, border: `2px solid ${C.gold}30`, borderRadius: 12 }} />
          <div style={{ width: "100%", maxWidth: 420, borderRadius: 10, aspectRatio: "4/5", background: `linear-gradient(135deg, ${C.bgAlt}, ${C.border})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, boxShadow: "0 24px 60px rgba(0,0,0,0.15)", position: "relative", zIndex: 1 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${C.accent}, ${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.display, fontSize: 32, fontWeight: 700, color: C.white }}>M</div>
            <span style={{ fontFamily: F.body, fontSize: 13, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>Photo Coming Soon</span>
          </div>
          <div style={{ position: "absolute", bottom: -16, right: -16, zIndex: 2, background: C.accent, color: C.white, padding: "12px 20px", borderRadius: 8, fontFamily: F.body, fontSize: 13, fontWeight: 600, boxShadow: "0 8px 24px rgba(139,38,53,0.3)" }}>30+ Years in Fashion</div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:${C.bg};overflow-x:hidden}
        ::selection{background:${C.accent}25}
      `}</style>
    </section>
  );
}

function Story() {
  const items = [
    { year: "1989", title: "The Beginning", text: "I immigrated to Brooklyn from Bangladesh with a dream and a determination to build something for my family. New York was overwhelming, exciting, and full of opportunity. I knew fashion was where I belonged." },
    { year: "1990s", title: "Learning the Trade", text: "I started my career at Oriental Fabrics in New York City, learning the business from the ground up — fabrics, patterns, customers, and most importantly, how to listen to what women actually want to wear." },
    { year: "2000s", title: "Building Relationships", text: "Over the years I built a network of boutique owners, retailers, and loyal customers who trusted my eye for quality and style. In this business, your reputation is everything." },
    { year: "Today", title: "Manny Fashion", text: "Currently an Account Executive at Tally Taylor, I work alongside wonderful people in the industry. Now I'm bringing that same personal touch directly to you — whether you're a boutique or a woman who wants to feel extraordinary. I wouldn't be here without my family. They're my reason for everything." },
  ];
  return (
    <section id="story" style={{ padding: "100px clamp(20px,5vw,64px)", background: C.white }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: F.body, fontSize: 12, fontWeight: 600, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>My Story</div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(30px,4vw,46px)", fontWeight: 700, color: C.dark, lineHeight: 1.18, marginBottom: 48, textAlign: "center" }}>From Dhaka to <span style={{ color: C.accent, fontStyle: "italic" }}>Brooklyn</span> — a fashion journey</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0 48px" }}>
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1} style={{ display: "contents" }}>
              <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 700, color: C.accent, paddingTop: 4, borderRight: `2px solid ${C.border}`, paddingRight: 24, textAlign: "right", paddingBottom: i < 3 ? 48 : 0, position: "relative" }}>
                {item.year}
                <div style={{ position: "absolute", right: -6, top: 8, width: 10, height: 10, borderRadius: "50%", background: C.accent }} />
              </div>
              <div style={{ paddingBottom: i < 3 ? 48 : 0, paddingLeft: 24 }}>
                <h3 style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontFamily: F.body, fontSize: 15, color: C.muted, lineHeight: 1.8 }}>{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div style={{ marginTop: 64, padding: "36px 40px", background: C.cream, borderRadius: 12, borderLeft: `4px solid ${C.gold}` }}>
            <p style={{ fontFamily: F.display, fontSize: 22, fontStyle: "italic", color: C.dark, lineHeight: 1.6, marginBottom: 12 }}>"I don't just sell clothes. I build relationships. When you work with me, you're not a transaction — you're family."</p>
            <p style={{ fontFamily: F.body, fontSize: 14, color: C.muted, fontWeight: 600 }}>— Manny Chowdhury</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Collections() {
  const cards = [
    { title: "Church & Occasion Wear", desc: "Elegant suits, hats, and ensembles for Sunday services, celebrations, and life's special moments. Pieces that make you feel as good as you look.", tags: ["Suits", "Hats", "Ensembles", "Plus Size"], icon: "\u2728" },
    { title: "Everyday Fashion", desc: "Versatile, confident pieces for the modern woman. From workwear to weekends — style shouldn't stop when the occasion does.", tags: ["Dresses", "Separates", "Workwear", "Casual"], icon: "\uD83D\uDC5C" },
    { title: "Wholesale & Boutique", desc: "Curated multi-brand collections for boutique owners and retailers. Competitive pricing, consistent quality, and a partner who picks up the phone.", tags: ["Bulk Orders", "Multi-Brand", "Lookbooks", "Reorders"], icon: "\uD83C\uDFEA" },
  ];
  return (
    <section id="collections" style={{ padding: "100px clamp(20px,5vw,64px)", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: F.body, fontSize: 12, fontWeight: 600, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>What I Carry</div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(30px,4vw,46px)", fontWeight: 700, color: C.dark }}>Curated for <span style={{ color: C.accent, fontStyle: "italic" }}>every</span> woman, every occasion</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {cards.map((c, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ background: C.white, borderRadius: 12, padding: 32, border: `1px solid ${C.border}`, height: "100%", transition: "transform 0.4s, box-shadow 0.4s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 44px rgba(0,0,0,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 36, marginBottom: 20 }}>{c.icon}</div>
                <h3 style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 12 }}>{c.title}</h3>
                <p style={{ fontFamily: F.body, fontSize: 14, color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>{c.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {c.tags.map(t => (<span key={t} style={{ fontFamily: F.body, fontSize: 11, fontWeight: 600, color: C.accent, background: `${C.accent}0D`, padding: "5px 12px", borderRadius: 20 }}>{t}</span>))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Connect() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "boutique", message: "" });
  const [sent, setSent] = useState(false);
  const handle = f => e => setForm(p => ({ ...p, [f]: e.target.value }));
  const submit = () => { if (form.name && form.email) setSent(true); };
  const inp = { width: "100%", padding: "13px 16px", fontFamily: F.body, fontSize: 14, border: `1.5px solid ${C.border}`, borderRadius: 6, background: C.white, color: C.dark, outline: "none", transition: "border-color 0.3s" };
  return (
    <section id="connect" style={{ padding: "100px clamp(20px,5vw,64px)", background: C.white }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <div>
            <FadeIn>
              <div style={{ fontFamily: F.body, fontSize: 12, fontWeight: 600, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Let's Talk</div>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(30px,4vw,46px)", fontWeight: 700, color: C.dark, lineHeight: 1.15, marginBottom: 20 }}>I answer <span style={{ color: C.accent, fontStyle: "italic" }}>every</span><br />message personally</h2>
              <p style={{ fontFamily: F.body, fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 36 }}>No chatbots, no automated replies. When you reach out to Manny Fashion, you're talking to me. Whether you're stocking a boutique or looking for the perfect outfit, let's connect.</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <a href="https://wa.me/13473358764" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 22px", borderRadius: 8, background: "#25D366", color: C.white, fontFamily: F.body, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>WhatsApp: (347) 335-8764</a>
                <a href="tel:+13473358764" style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 22px", borderRadius: 8, background: C.dark, color: C.white, fontFamily: F.body, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Call: (347) 335-8764</a>
                <a href="https://instagram.com/mannyfashion" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 22px", borderRadius: 8, background: "linear-gradient(135deg,#833AB4,#FD1D1D,#F77737)", color: C.white, fontFamily: F.body, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Follow on Instagram</a>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.25}>
            <div style={{ background: C.bg, borderRadius: 12, padding: 32, border: `1px solid ${C.border}` }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "36px 0" }}>
                  <div style={{ fontSize: 44, marginBottom: 14 }}>&#10003;</div>
                  <h3 style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 10 }}>Message Received</h3>
                  <p style={{ fontFamily: F.body, fontSize: 14, color: C.muted }}>Manny will get back to you personally within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 6 }}>Send an Inquiry</h3>
                  <p style={{ fontFamily: F.body, fontSize: 13, color: C.muted, marginBottom: 24 }}>Fill this out and I'll reach out to you directly.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <input placeholder="Your Name *" value={form.name} onChange={handle("name")} style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                    <input placeholder="Email Address *" value={form.email} onChange={handle("email")} style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                    <input placeholder="Phone Number" value={form.phone} onChange={handle("phone")} style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                    <select value={form.type} onChange={handle("type")} style={{ ...inp, cursor: "pointer" }}>
                      <option value="boutique">I'm a Boutique Owner</option>
                      <option value="personal">Shopping for Myself</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                    <textarea placeholder="Tell me what you're looking for..." value={form.message} onChange={handle("message")} rows={4} style={{ ...inp, resize: "vertical", minHeight: 90 }} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                    <button onClick={submit} style={{ width: "100%", padding: "15px", fontFamily: F.body, fontSize: 14, fontWeight: 700, color: C.white, background: C.accent, border: "none", borderRadius: 6, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" }}>Send Inquiry</button>
                  </div>
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "44px clamp(20px,5vw,64px)", background: C.dark }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 700, color: C.white }}>MANNY<span style={{ color: C.gold }}> FASHION</span></div>
          <div style={{ fontFamily: F.body, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>New York · Women's Fashion · Wholesale & Direct</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <a href="https://wa.me/13473358764" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 13, color: C.gold, textDecoration: "none" }}>WhatsApp: (347) 335-8764</a>
          <div style={{ fontFamily: F.body, fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>&copy; 2026 Manny Fashion. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default function MannyFashion() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Story />
      <Collections />
      <Connect />
      <Footer />
    </div>
  );
}