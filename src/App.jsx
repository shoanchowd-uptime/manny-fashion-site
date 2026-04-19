import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#F5F0EB",
  bgAlt: "#EDE6DD",
  dark: "#2C2420",
  accent: "#8B7355",
  accentHover: "#7A6448",
  warm: "#C4A882",
  muted: "#9B8E82",
  white: "#FDFBF8",
  border: "#DDD5CA",
  cream: "#F9F5F0",
  deep: "#3D3229",
};
const F = {
  display: "'Cormorant Garamond', 'Garamond', serif",
  body: "'Jost', 'Helvetica Neue', sans-serif",
};

function useInView(t = 0.1) {
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
  return (<div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`, ...style }}>{children}</div>);
}

function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => { const h = () => setS(window.scrollY > 60); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: s ? "rgba(245,240,235,0.92)" : "transparent", backdropFilter: s ? "blur(16px)" : "none", borderBottom: s ? `1px solid ${C.border}` : "none", transition: "all 0.5s ease", padding: "0 clamp(24px,6vw,80px)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: s ? 56 : 72, transition: "height 0.5s ease" }}>
        <a href="#top" style={{ fontFamily: F.display, fontSize: 24, fontWeight: 500, color: C.dark, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>Manny Fashion</a>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Story", "Collections", "Connect"].map(t => (
            <a key={t} href={`#${t.toLowerCase()}`} style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.muted, textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = C.dark}
              onMouseLeave={e => e.target.style.color = C.muted}
            >{t}</a>
          ))}
          <a href="https://wa.me/13473358764" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.dark, padding: "8px 20px", borderRadius: 0, textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", border: `1px solid ${C.dark}`, transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.background = C.dark; e.target.style.color = C.white; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.dark; }}
          >Inquire</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px clamp(24px,6vw,80px)", background: C.bg, position: "relative" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div style={{ opacity: 0, animation: "fadeIn 1.2s ease 0.2s forwards" }}>
          <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 32 }}>New York — Est. 1989</p>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(40px,5.5vw,72px)", fontWeight: 400, color: C.dark, lineHeight: 1.08, letterSpacing: "-0.01em", margin: "0 0 28px" }}>Fashion built on<br /><em style={{ fontStyle: "italic" }}>relationships,</em><br />not algorithms.</h1>
          <p style={{ fontFamily: F.body, fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.8, maxWidth: 440, marginBottom: 44 }}>I came to Brooklyn from Bangladesh in 1989 with a work ethic and a love for fashion. Three decades later, I bring that same personal touch to every client.</p>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="https://wa.me/13473358764" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.white, background: C.dark, padding: "14px 36px", textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", transition: "background 0.3s" }}
              onMouseEnter={e => e.target.style.background = C.deep}
              onMouseLeave={e => e.target.style.background = C.dark}
            >Get in Touch</a>
            <a href="#story" style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.accent, textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", borderBottom: `1px solid ${C.accent}`, paddingBottom: 2, transition: "color 0.3s" }}
              onMouseEnter={e => { e.target.style.color = C.dark; e.target.style.borderColor = C.dark; }}
              onMouseLeave={e => { e.target.style.color = C.accent; e.target.style.borderColor = C.accent; }}
            >My Story</a>
          </div>
        </div>
        <div style={{ opacity: 0, animation: "fadeIn 1.2s ease 0.5s forwards" }}>
          <img src="/images/suit.jpg" alt="Manny Chowdhury" style={{ width: "100%", maxWidth: 480, aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
          <p style={{ fontFamily: F.body, fontSize: 11, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 12 }}>Manny Chowdhury — Founder</p>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:${C.bg};overflow-x:hidden}
        ::selection{background:${C.warm}30;color:${C.dark}}
      `}</style>
    </section>
  );
}

function TrustedBy() {
  const brands = ["Tally Taylor", "Ben Marc", "Donna Vinci", "Lisa Rene", "Nubiano", "Lily & Taylor", "Dorinda Clark Cole", "Elite Champagne", "GMI", "Terramina", "Chancele"];
  const doubled = [...brands, ...brands];
  return (
    <section style={{ padding: "28px 0", background: C.bgAlt, overflow: "hidden", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ position: "relative", width: "100%", overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
        <div style={{ display: "flex", gap: 48, animation: "marquee 35s linear infinite", width: "max-content", alignItems: "center" }}>
          {doubled.map((brand, i) => (
            <span key={i} style={{ fontFamily: F.display, fontSize: 15, fontWeight: 400, color: C.muted, whiteSpace: "nowrap", letterSpacing: "0.06em" }}>{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  const items = [
    { year: "1989", text: "Immigrated to Brooklyn from Bangladesh with nothing but determination and a love for fashion." },
    { year: "1990s", text: "Started at Oriental Fabrics in NYC. Learned the trade from the ground up — fabrics, fit, and what women actually want to wear." },
    { year: "2000s", text: "Built a network of boutique owners and loyal customers. In this business, reputation is everything." },
    { year: "Now", text: "Account Executive at Tally Taylor. Now bringing three decades of expertise directly to you." },
  ];
  return (
    <section id="story" style={{ padding: "120px clamp(24px,6vw,80px)", background: C.white }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, textAlign: "center" }}>The Journey</p>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 400, color: C.dark, lineHeight: 1.15, textAlign: "center", marginBottom: 16 }}>From Dhaka to <em>Brooklyn</em></h2>
          <p style={{ fontFamily: F.body, fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.8, maxWidth: 560, margin: "0 auto 64px", textAlign: "center" }}>A three-decade journey through New York's fashion industry, built one relationship at a time.</p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: C.border }}>
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: C.white, padding: "36px 28px", height: "100%" }}>
                <p style={{ fontFamily: F.display, fontSize: 32, fontWeight: 300, color: C.warm, marginBottom: 16 }}>{item.year}</p>
                <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 300, color: C.muted, lineHeight: 1.75 }}>{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ marginTop: 80, textAlign: "center", maxWidth: 640, margin: "80px auto 0" }}>
            <p style={{ fontFamily: F.display, fontSize: 26, fontWeight: 400, fontStyle: "italic", color: C.dark, lineHeight: 1.55, marginBottom: 16 }}>"I don't sell clothes. I build relationships. When you work with me, you're not a transaction — you're family."</p>
            <p style={{ fontFamily: F.body, fontSize: 12, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>Manny Chowdhury</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Collections() {
  const cards = [
    { title: "Church & Occasion", desc: "Elegant suits, hats, and ensembles for Sunday services, celebrations, and every moment that matters.", sub: "Suits · Hats · Ensembles · Plus Size" },
    { title: "Everyday Elegance", desc: "Versatile pieces for the modern woman. Workwear to weekends — because style has no off-switch.", sub: "Dresses · Separates · Workwear · Casual" },
    { title: "Wholesale", desc: "Curated collections for boutique owners. Competitive pricing, consistent quality, and a partner who picks up the phone.", sub: "Bulk Orders · Multi-Brand · Lookbooks" },
  ];
  return (
    <section id="collections" style={{ padding: "120px clamp(24px,6vw,80px)", background: C.bg }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, textAlign: "center" }}>Collections</p>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 400, color: C.dark, textAlign: "center", marginBottom: 64 }}>Curated for <em>every</em> occasion</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: C.border }}>
          {cards.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: C.white, padding: "48px 32px", height: "100%", transition: "background 0.4s" }}
                onMouseEnter={e => e.currentTarget.style.background = C.cream}
                onMouseLeave={e => e.currentTarget.style.background = C.white}>
                <p style={{ fontFamily: F.display, fontSize: 13, fontWeight: 400, color: C.warm, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>0{i + 1}</p>
                <h3 style={{ fontFamily: F.display, fontSize: 28, fontWeight: 400, color: C.dark, marginBottom: 16, lineHeight: 1.2 }}>{c.title}</h3>
                <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 300, color: C.muted, lineHeight: 1.75, marginBottom: 24 }}>{c.desc}</p>
                <p style={{ fontFamily: F.body, fontSize: 11, color: C.accent, letterSpacing: "0.06em" }}>{c.sub}</p>
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
  const [sending, setSending] = useState(false);
  const handle = f => e => setForm(p => ({ ...p, [f]: e.target.value }));
  const submit = async () => {
    if (!form.name || !form.email) return;
    setSending(true);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "50dddef6-0ac7-47bc-a468-d2a80d91f765",
          subject: "New Manny Fashion Inquiry",
          from_name: form.name,
          name: form.name, email: form.email,
          phone: form.phone || "Not provided",
          customer_type: form.type,
          message: form.message || "No message",
        }),
      });
      setSent(true);
    } catch (e) { alert("Something went wrong. Please try WhatsApp instead."); }
    setSending(false);
  };
  const inp = { width: "100%", padding: "14px 0", fontFamily: F.body, fontSize: 14, fontWeight: 300, border: "none", borderBottom: `1px solid ${C.border}`, background: "transparent", color: C.dark, outline: "none", transition: "border-color 0.3s", borderRadius: 0 };

  return (
    <section id="connect" style={{ padding: "120px clamp(24px,6vw,80px)", background: C.white }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
          <div>
            <FadeIn>
              <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Connect</p>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 400, color: C.dark, lineHeight: 1.12, marginBottom: 20 }}>Every message<br />answered <em>personally</em></h2>
              <p style={{ fontFamily: F.body, fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.8, marginBottom: 48 }}>No chatbots. No automated replies. Whether you're stocking a boutique or looking for the perfect piece, you're talking directly to me.</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <a href="https://wa.me/13473358764" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 13, fontWeight: 400, color: C.dark, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 40, height: 40, borderRadius: "50%", background: C.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>W</span>
                  <span>WhatsApp · (347) 335-8764</span>
                </a>
                <a href="tel:+13473358764" style={{ fontFamily: F.body, fontSize: 13, fontWeight: 400, color: C.dark, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 40, height: 40, borderRadius: "50%", background: C.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>P</span>
                  <span>Phone · (347) 335-8764</span>
                </a>
                <a href="https://instagram.com/mannyfashion" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 13, fontWeight: 400, color: C.dark, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 40, height: 40, borderRadius: "50%", background: C.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>I</span>
                  <span>Instagram · @mannyfashion</span>
                </a>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div>
              {sent ? (
                <div style={{ padding: "60px 0", textAlign: "center" }}>
                  <p style={{ fontFamily: F.display, fontSize: 28, fontWeight: 400, color: C.dark, marginBottom: 12 }}>Thank you</p>
                  <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 300, color: C.muted }}>I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <p style={{ fontFamily: F.display, fontSize: 22, fontWeight: 400, color: C.dark, marginBottom: 32 }}>Send an inquiry</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <input placeholder="Name" value={form.name} onChange={handle("name")} style={inp}
                      onFocus={e => e.target.style.borderColor = C.dark} onBlur={e => e.target.style.borderColor = C.border} />
                    <input placeholder="Email" value={form.email} onChange={handle("email")} style={inp}
                      onFocus={e => e.target.style.borderColor = C.dark} onBlur={e => e.target.style.borderColor = C.border} />
                    <input placeholder="Phone" value={form.phone} onChange={handle("phone")} style={inp}
                      onFocus={e => e.target.style.borderColor = C.dark} onBlur={e => e.target.style.borderColor = C.border} />
                    <select value={form.type} onChange={handle("type")} style={{ ...inp, cursor: "pointer", appearance: "none", color: form.type ? C.dark : C.muted }}>
                      <option value="boutique">Boutique Owner</option>
                      <option value="personal">Personal Shopping</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="other">Other</option>
                    </select>
                    <textarea placeholder="Tell me what you're looking for" value={form.message} onChange={handle("message")} rows={3} style={{ ...inp, resize: "none", minHeight: 80 }}
                      onFocus={e => e.target.style.borderColor = C.dark} onBlur={e => e.target.style.borderColor = C.border} />
                    <button onClick={submit} style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.white, background: C.dark, padding: "16px 0", border: "none", cursor: "pointer", letterSpacing: "0.14em", textTransform: "uppercase", transition: "background 0.3s", marginTop: 8 }}
                      onMouseEnter={e => e.target.style.background = C.deep}
                      onMouseLeave={e => e.target.style.background = C.dark}
                    >{sending ? "Sending..." : "Submit Inquiry"}</button>
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
    <footer style={{ padding: "48px clamp(24px,6vw,80px)", background: C.dark }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
        <div>
          <p style={{ fontFamily: F.display, fontSize: 20, fontWeight: 400, color: C.cream, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Manny Fashion</p>
          <p style={{ fontFamily: F.body, fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>New York · Women's Fashion · Wholesale & Direct</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: F.body, fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>(347) 335-8764</p>
          <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.25)" }}>© 2026 Manny Fashion</p>
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
      <TrustedBy />
      <Story />
      <Collections />
      <Connect />
      <Footer />
    </div>
  );
}