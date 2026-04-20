import { useState, useEffect, useRef } from "react";
import { retailProducts, wholesaleProducts } from "./catalog.js";

const C = {
  bg: "#F5F0EB",
  bgAlt: "#EDE6DD",
  dark: "#2C2420",
  accent: "#A0765A",
  accentDeep: "#8B6347",
  warm: "#C4A882",
  warmLight: "#D4BE9C",
  muted: "#7D7269",
  mutedLight: "#A89E94",
  white: "#FDFBF8",
  border: "#DDD5CA",
  cream: "#F9F5F0",
  deep: "#3D3229",
  terra: "#B8846A",
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
          {["Story", "Collections", "Catalog", "Connect"].map(t => (
            <a key={t} href={`#${t.toLowerCase()}`} style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.muted, textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = C.dark}
              onMouseLeave={e => e.target.style.color = C.muted}
            >{t}</a>
          ))}
          <a href="https://wa.me/13473358764" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.white, padding: "9px 22px", textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", background: C.accent, transition: "all 0.3s" }}
            onMouseEnter={e => e.target.style.background = C.accentDeep}
            onMouseLeave={e => e.target.style.background = C.accent}
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
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ width: 40, height: 1, background: C.accent }} />
            <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>New York — Est. 1989</p>
          </div>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(40px,5.5vw,72px)", fontWeight: 400, color: C.dark, lineHeight: 1.08, letterSpacing: "-0.01em", margin: "0 0 28px" }}>Fashion built on<br /><em style={{ fontStyle: "italic", color: C.accentDeep }}>relationships,</em><br />not algorithms.</h1>
          <p style={{ fontFamily: F.body, fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.85, maxWidth: 440, marginBottom: 44 }}>I came to Brooklyn from Bangladesh in 1989 with a work ethic and a love for fashion. Three decades later, I bring that same personal touch to every client.</p>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <a href="https://wa.me/13473358764" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.white, background: C.dark, padding: "15px 40px", textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", transition: "background 0.3s" }}
              onMouseEnter={e => e.target.style.background = C.deep}
              onMouseLeave={e => e.target.style.background = C.dark}
            >Get in Touch</a>
            <a href="#story" style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.accent, textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", borderBottom: `1px solid ${C.accent}`, paddingBottom: 2, transition: "color 0.3s" }}
              onMouseEnter={e => { e.target.style.color = C.dark; e.target.style.borderColor = C.dark; }}
              onMouseLeave={e => { e.target.style.color = C.accent; e.target.style.borderColor = C.accent; }}
            >My Story</a>
          </div>
        </div>
        <div style={{ opacity: 0, animation: "fadeIn 1.2s ease 0.5s forwards", position: "relative" }}>
          <img src="/images/suit.jpg" alt="Manny Chowdhury" style={{ width: "100%", maxWidth: 480, aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent 40%, rgba(44,36,32,0.6))", padding: "40px 24px 20px" }}>
            <p style={{ fontFamily: F.body, fontSize: 11, color: "rgba(255,255,255,0.9)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Manny Chowdhury · Founder</p>
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:${C.bg};overflow-x:hidden}
        ::selection{background:${C.terra}30;color:${C.dark}}
      `}</style>
    </section>
  );
}

function TrustedBy() {
  const brands = ["Tally Taylor", "Ben Marc", "Donna Vinci", "Lisa Rene", "Nubiano", "Lily & Taylor", "Dorinda Clark Cole", "Elite Champagne", "GMI", "Terramina", "Chancele"];
  const doubled = [...brands, ...brands];
  return (
    <section style={{ padding: "32px 0", background: C.deep, overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <span style={{ fontFamily: F.body, fontSize: 10, fontWeight: 400, color: C.warmLight, letterSpacing: "0.22em", textTransform: "uppercase" }}>Working with Professionals at</span>
      </div>
      <div style={{ position: "relative", width: "100%", overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
        <div style={{ display: "flex", gap: 56, animation: "marquee 35s linear infinite", width: "max-content", alignItems: "center" }}>
          {doubled.map((brand, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 56, flexShrink: 0 }}>
              <span style={{ fontFamily: F.display, fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.55)", whiteSpace: "nowrap", letterSpacing: "0.06em" }}>{brand}</span>
              {i < doubled.length - 1 && <span style={{ color: C.terra, fontSize: 8 }}>◆</span>}
            </div>
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
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: C.accent }} />
            <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>The Journey</p>
            <div style={{ width: 40, height: 1, background: C.accent }} />
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 400, color: C.dark, lineHeight: 1.15, textAlign: "center", marginBottom: 16 }}>From Comilla to <em style={{ color: C.accentDeep }}>New York</em></h2>
          <p style={{ fontFamily: F.body, fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.85, maxWidth: 560, margin: "0 auto 64px", textAlign: "center" }}>A three-decade journey through New York's fashion industry, built one relationship at a time.</p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ padding: "36px 28px", height: "100%", borderLeft: i === 0 ? "none" : `1px solid ${C.border}`, position: "relative" }}>
                <div style={{ width: 24, height: 2, background: C.terra, marginBottom: 16 }} />
                <p style={{ fontFamily: F.display, fontSize: 28, fontWeight: 500, color: C.accent, marginBottom: 14 }}>{item.year}</p>
                <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 300, color: C.muted, lineHeight: 1.8 }}>{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ marginTop: 80, textAlign: "center", maxWidth: 640, margin: "80px auto 0", position: "relative" }}>
            <div style={{ fontSize: 64, fontFamily: F.display, color: C.warmLight, lineHeight: 0.5, marginBottom: 20, opacity: 0.4 }}>"</div>
            <p style={{ fontFamily: F.display, fontSize: 26, fontWeight: 400, fontStyle: "italic", color: C.dark, lineHeight: 1.55, marginBottom: 20 }}>I don't sell clothes. I build relationships. When you work with me, you're not a transaction — you're family.</p>
            <div style={{ width: 40, height: 2, background: C.terra, margin: "0 auto 16px" }} />
            <p style={{ fontFamily: F.body, fontSize: 12, color: C.accent, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 400 }}>Manny Chowdhury</p>
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
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: C.accent }} />
            <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>Collections</p>
            <div style={{ width: 40, height: 1, background: C.accent }} />
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 400, color: C.dark, textAlign: "center", marginBottom: 64 }}>Curated for <em style={{ color: C.accentDeep }}>every</em> occasion</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {cards.map((c, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ background: C.white, padding: "44px 32px", height: "100%", transition: "all 0.4s", border: `1px solid ${C.border}` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(44,36,32,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <p style={{ fontFamily: F.display, fontSize: 13, fontWeight: 500, color: C.terra, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>0{i + 1}</p>
                <h3 style={{ fontFamily: F.display, fontSize: 28, fontWeight: 400, color: C.dark, marginBottom: 16, lineHeight: 1.2 }}>{c.title}</h3>
                <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 300, color: C.muted, lineHeight: 1.8, marginBottom: 24 }}>{c.desc}</p>
                <div style={{ width: 24, height: 1, background: C.warm, marginBottom: 12 }} />
                <p style={{ fontFamily: F.body, fontSize: 11, color: C.mutedLight, letterSpacing: "0.06em" }}>{c.sub}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Catalog() {
  const [mode, setMode] = useState("retail");
  const items = mode === "retail" ? retailProducts : wholesaleProducts;
  const copy = {
    retail: "Personal shopping pieces are being curated. Drop a line and I'll send previews as they come in.",
    wholesale: "Bulk catalog and lookbooks are being assembled. Reach out for current availability and pricing.",
  };

  const RetailCard = ({ p }) => (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, transition: "all 0.4s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(44,36,32,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ aspectRatio: "3/4", background: C.bgAlt, overflow: "hidden" }}>
        {p.image && <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
      </div>
      <div style={{ padding: "24px 24px 28px" }}>
        <h3 style={{ fontFamily: F.display, fontSize: 20, fontWeight: 400, color: C.dark, marginBottom: 8, lineHeight: 1.25 }}>{p.name}</h3>
        {p.description && <p style={{ fontFamily: F.body, fontSize: 13, fontWeight: 300, color: C.muted, lineHeight: 1.7, marginBottom: 16 }}>{p.description}</p>}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
          <span style={{ fontFamily: F.display, fontSize: 18, fontWeight: 500, color: C.accent }}>{typeof p.price === "number" ? `$${p.price}` : p.price}</span>
          {p.sizes && <span style={{ fontFamily: F.body, fontSize: 11, color: C.mutedLight, letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.sizes.join(" · ")}</span>}
        </div>
      </div>
    </div>
  );

  const WholesaleCard = ({ p }) => (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, transition: "all 0.4s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(44,36,32,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ aspectRatio: "3/4", background: C.bgAlt, overflow: "hidden" }}>
        {p.image && <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
      </div>
      <div style={{ padding: "24px 24px 28px" }}>
        {p.brand && <p style={{ fontFamily: F.body, fontSize: 10, color: C.terra, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 8 }}>{p.brand}</p>}
        <h3 style={{ fontFamily: F.display, fontSize: 20, fontWeight: 400, color: C.dark, marginBottom: 8, lineHeight: 1.25 }}>{p.name}</h3>
        {p.description && <p style={{ fontFamily: F.body, fontSize: 13, fontWeight: 300, color: C.muted, lineHeight: 1.7, marginBottom: 16 }}>{p.description}</p>}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontFamily: F.body, fontSize: 11, color: C.mutedLight, letterSpacing: "0.08em", textTransform: "uppercase" }}>MOQ</span>
            <span style={{ fontFamily: F.body, fontSize: 13, color: C.dark }}>{p.moq}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: F.body, fontSize: 11, color: C.mutedLight, letterSpacing: "0.08em", textTransform: "uppercase" }}>Price</span>
            <span style={{ fontFamily: F.display, fontSize: 14, fontWeight: 500, color: C.accent }}>{p.priceRange}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="catalog" style={{ padding: "120px clamp(24px,6vw,80px)", background: C.white }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: C.accent }} />
            <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>Catalog</p>
            <div style={{ width: 40, height: 1, background: C.accent }} />
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 400, color: C.dark, textAlign: "center", marginBottom: 16 }}>Browse the <em style={{ color: C.accentDeep }}>collection</em></h2>
          <p style={{ fontFamily: F.body, fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.85, maxWidth: 560, margin: "0 auto 48px", textAlign: "center" }}>Wholesale orders for boutique owners, or direct retail for the discerning shopper. Previews by appointment.</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 56, borderBottom: `1px solid ${C.border}` }}>
            {["retail", "wholesale"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                fontFamily: F.body, fontSize: 11, fontWeight: 400, padding: "16px 32px",
                background: "transparent", border: "none", cursor: "pointer",
                color: mode === m ? C.dark : C.muted,
                letterSpacing: "0.16em", textTransform: "uppercase",
                borderBottom: mode === m ? `2px solid ${C.accent}` : "2px solid transparent",
                marginBottom: -1, transition: "all 0.3s"
              }}>{m}</button>
            ))}
          </div>
        </FadeIn>

        {items.length === 0 ? (
          <FadeIn delay={0.2}>
            <div style={{ textAlign: "center", padding: "72px 24px", background: C.bg, border: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: F.display, fontSize: 11, color: C.terra, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Coming Soon</p>
              <p style={{ fontFamily: F.display, fontSize: 30, fontWeight: 400, color: C.dark, marginBottom: 16, lineHeight: 1.2 }}>Catalog launching soon</p>
              <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 300, color: C.muted, lineHeight: 1.85, maxWidth: 440, margin: "0 auto 32px" }}>{copy[mode]}</p>
              <a href="#connect" style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.white, background: C.dark, padding: "14px 36px", textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", display: "inline-block", transition: "background 0.3s" }}
                onMouseEnter={e => e.target.style.background = C.deep}
                onMouseLeave={e => e.target.style.background = C.dark}>Request Early Access</a>
            </div>
          </FadeIn>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {items.map((p, i) => (
              <FadeIn key={p.id || i} delay={i * 0.06}>
                {mode === "retail" ? <RetailCard p={p} /> : <WholesaleCard p={p} />}
              </FadeIn>
            ))}
          </div>
        )}
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
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 40, height: 1, background: C.accent }} />
                <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>Connect</p>
              </div>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 400, color: C.dark, lineHeight: 1.12, marginBottom: 20 }}>Every message<br />answered <em style={{ color: C.accentDeep }}>personally</em></h2>
              <p style={{ fontFamily: F.body, fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.85, marginBottom: 48 }}>No chatbots. No automated replies. Whether you're stocking a boutique or looking for the perfect piece, you're talking directly to me.</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <a href="https://wa.me/13473358764" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 13, fontWeight: 400, color: C.dark, textDecoration: "none", display: "flex", alignItems: "center", gap: 14, transition: "color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.accent}
                  onMouseLeave={e => e.currentTarget.style.color = C.dark}>
                  <span style={{ width: 44, height: 44, borderRadius: "50%", background: C.bgAlt, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.display, fontSize: 16, fontWeight: 500, color: C.accent, flexShrink: 0 }}>W</span>
                  <div>
                    <span style={{ fontWeight: 400 }}>WhatsApp</span>
                    <span style={{ display: "block", fontSize: 12, color: C.mutedLight, marginTop: 2 }}>(347) 335-8764</span>
                  </div>
                </a>
                <a href="tel:+13473358764" style={{ fontFamily: F.body, fontSize: 13, fontWeight: 400, color: C.dark, textDecoration: "none", display: "flex", alignItems: "center", gap: 14, transition: "color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.accent}
                  onMouseLeave={e => e.currentTarget.style.color = C.dark}>
                  <span style={{ width: 44, height: 44, borderRadius: "50%", background: C.bgAlt, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.display, fontSize: 16, fontWeight: 500, color: C.accent, flexShrink: 0 }}>P</span>
                  <div>
                    <span style={{ fontWeight: 400 }}>Phone</span>
                    <span style={{ display: "block", fontSize: 12, color: C.mutedLight, marginTop: 2 }}>(347) 335-8764</span>
                  </div>
                </a>
                <a href="https://www.instagram.com/mannybytallytaylor/" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 13, fontWeight: 400, color: C.dark, textDecoration: "none", display: "flex", alignItems: "center", gap: 14, transition: "color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.accent}
                  onMouseLeave={e => e.currentTarget.style.color = C.dark}>
                  <span style={{ width: 44, height: 44, borderRadius: "50%", background: C.bgAlt, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.display, fontSize: 16, fontWeight: 500, color: C.accent, flexShrink: 0 }}>I</span>
                  <div>
                    <span style={{ fontWeight: 400 }}>Instagram</span>
                    <span style={{ display: "block", fontSize: 12, color: C.mutedLight, marginTop: 2 }}>@mannybytallytaylor</span>
                  </div>
                </a>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div style={{ borderTop: `3px solid ${C.terra}`, paddingTop: 32 }}>
              {sent ? (
                <div style={{ padding: "60px 0", textAlign: "center" }}>
                  <p style={{ fontFamily: F.display, fontSize: 28, fontWeight: 400, color: C.dark, marginBottom: 12 }}>Thank you</p>
                  <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 300, color: C.muted }}>I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <p style={{ fontFamily: F.display, fontSize: 24, fontWeight: 400, color: C.dark, marginBottom: 32 }}>Send an inquiry</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <input placeholder="Name" value={form.name} onChange={handle("name")} style={inp}
                      onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                    <input placeholder="Email" value={form.email} onChange={handle("email")} style={inp}
                      onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                    <input placeholder="Phone" value={form.phone} onChange={handle("phone")} style={inp}
                      onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                    <select value={form.type} onChange={handle("type")} style={{ ...inp, cursor: "pointer", appearance: "none", color: form.type ? C.dark : C.muted }}>
                      <option value="boutique">Boutique Owner</option>
                      <option value="personal">Personal Shopping</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="other">Other</option>
                    </select>
                    <textarea placeholder="Tell me what you're looking for" value={form.message} onChange={handle("message")} rows={3} style={{ ...inp, resize: "none", minHeight: 80 }}
                      onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                    <button onClick={submit} style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.white, background: C.accent, padding: "16px 0", border: "none", cursor: "pointer", letterSpacing: "0.14em", textTransform: "uppercase", transition: "background 0.3s", marginTop: 8 }}
                      onMouseEnter={e => e.target.style.background = C.accentDeep}
                      onMouseLeave={e => e.target.style.background = C.accent}
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
    <footer style={{ padding: "52px clamp(24px,6vw,80px) 40px", background: C.deep }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
          <div>
            <p style={{ fontFamily: F.display, fontSize: 22, fontWeight: 400, color: C.cream, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Manny Fashion</p>
            <p style={{ fontFamily: F.body, fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>Women's Fashion<br />Wholesale & Direct<br />New York</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: F.body, fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>(347) 335-8764</p>
            <div style={{ display: "flex", gap: 20, justifyContent: "flex-end" }}>
              <a href="https://wa.me/13473358764" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.terra, textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>WhatsApp</a>
              <a href="https://www.instagram.com/mannybytallytaylor/" target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.terra, textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>Instagram</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.2)" }}>© 2026 Manny Fashion</p>
          <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.2)" }}>mannyfashion.org</p>
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
      <Catalog />
      <Connect />
      <Footer />
    </div>
  );
}