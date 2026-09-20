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

const PHONE_DISPLAY = "(347) 335-8764";
const PHONE_TEL = "tel:+13473358764";
const WA = "https://wa.me/13473358764";
const EMAIL = "mostakfashion@gmail.com";
const IG = "https://www.instagram.com/mannybytallytaylor/";

/** Fires to Meta Pixel + Google Ads if installed. Never throws. */
function track(event, params = {}) {
  try {
    if (typeof window.fbq === "function") window.fbq("track", event, params);
    if (typeof window.gtag === "function") window.gtag("event", event, params);
  } catch (e) { /* tracking must never break the page */ }
}

function useBreakpoint() {
  const get = () => (typeof window === "undefined" ? 1200 : window.innerWidth);
  const [w, setW] = useState(get);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { w, isMobile: w < 768, isTablet: w < 1024 };
}

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
  const { isMobile } = useBreakpoint();
  useEffect(() => { const h = () => setS(window.scrollY > 60); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: s ? "rgba(245,240,235,0.92)" : "transparent", backdropFilter: s ? "blur(16px)" : "none", borderBottom: s ? `1px solid ${C.border}` : "none", transition: "all 0.5s ease", padding: "0 clamp(18px,6vw,80px)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: s ? 56 : 72, transition: "height 0.5s ease" }}>
        <a href="#top" style={{ fontFamily: F.display, fontSize: isMobile ? 18 : 24, fontWeight: 500, color: C.dark, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>Manny Fashion</a>
        <div style={{ display: "flex", gap: isMobile ? 12 : 32, alignItems: "center" }}>
          {!isTabletHidden(isMobile) && ["Story", "Collections", "Catalog", "Connect"].map(t => (
            <a key={t} href={`#${t.toLowerCase()}`} style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.muted, textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = C.dark}
              onMouseLeave={e => e.target.style.color = C.muted}
            >{t}</a>
          ))}
          {!isMobile && (
            <a href={PHONE_TEL} onClick={() => track("Contact", { method: "phone", placement: "nav" })}
              style={{ fontFamily: F.body, fontSize: 12, fontWeight: 400, color: C.dark, textDecoration: "none", letterSpacing: "0.06em" }}>
              {PHONE_DISPLAY}
            </a>
          )}
          <a href={WA} target="_blank" rel="noopener" onClick={() => track("Contact", { method: "whatsapp", placement: "nav" })}
            style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.white, padding: isMobile ? "9px 16px" : "9px 22px", textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", background: C.accent, transition: "all 0.3s", whiteSpace: "nowrap" }}
            onMouseEnter={e => e.target.style.background = C.accentDeep}
            onMouseLeave={e => e.target.style.background = C.accent}
          >Inquire</a>
        </div>
      </div>
    </nav>
  );
}
function isTabletHidden(isMobile) { return isMobile; }

/** Sticky call + WhatsApp bar. Mobile only. This is where ad traffic converts. */
function CallBar() {
  const { isMobile } = useBreakpoint();
  if (!isMobile) return null;
  const btn = {
    display: "flex", alignItems: "center", justifyContent: "center",
    minHeight: 56, fontFamily: F.body, fontSize: 12, fontWeight: 400,
    letterSpacing: "0.14em", textTransform: "uppercase",
    textDecoration: "none", color: C.white,
  };
  return (
    <>
      <div style={{ height: 56 }} aria-hidden="true" />
      <div style={{
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 200,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1,
        background: "rgba(44,36,32,0.2)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        boxShadow: "0 -2px 18px rgba(44,36,32,0.18)",
      }}>
        <a href={PHONE_TEL} style={{ ...btn, background: C.dark }}
          onClick={() => track("Contact", { method: "phone", placement: "sticky_bar" })}>Call Now</a>
        <a href={WA} target="_blank" rel="noopener" style={{ ...btn, background: C.accent }}
          onClick={() => track("Contact", { method: "whatsapp", placement: "sticky_bar" })}>WhatsApp</a>
      </div>
    </>
  );
}

function Hero() {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <section id="top" style={{ minHeight: isMobile ? "auto" : "100vh", display: "flex", alignItems: "center", padding: isMobile ? "100px 20px 56px" : "80px clamp(24px,6vw,80px)", background: C.bg, position: "relative" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
        <div style={{ opacity: 0, animation: "fadeIn 1.2s ease 0.2s forwards" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: C.accent }} />
            <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>New York — Est. 1989</p>
          </div>
          <h1 style={{ fontFamily: F.display, fontSize: isMobile ? "38px" : "clamp(40px,5.5vw,72px)", fontWeight: 400, color: C.dark, lineHeight: 1.08, letterSpacing: "-0.01em", margin: "0 0 22px" }}>
            Church suits, hats, and<br /><em style={{ fontStyle: "italic", color: C.accentDeep }}>occasion wear</em><br />for every woman.
          </h1>
          <p style={{ fontFamily: F.body, fontSize: isMobile ? 15 : 16, fontWeight: 300, color: C.muted, lineHeight: 1.8, maxWidth: 460, marginBottom: 16 }}>
            Wholesale for boutique owners, and direct to you. Tally Taylor, Ben Marc, Donna Vinci, Lily &amp; Taylor and more — misses through plus sizes.
          </p>
          <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 300, color: C.mutedLight, lineHeight: 1.8, maxWidth: 460, marginBottom: 36 }}>
            Thirty years in New York fashion. Call and you talk to Manny, not a call center.
          </p>
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <a href={PHONE_TEL} onClick={() => track("Contact", { method: "phone", placement: "hero" })}
              style={{ fontFamily: F.body, fontSize: 12, fontWeight: 400, color: C.white, background: C.dark, padding: isMobile ? "16px 28px" : "16px 38px", textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", transition: "background 0.3s" }}
              onMouseEnter={e => e.target.style.background = C.deep}
              onMouseLeave={e => e.target.style.background = C.dark}
            >Call {PHONE_DISPLAY}</a>
            <a href={WA} target="_blank" rel="noopener" onClick={() => track("Contact", { method: "whatsapp", placement: "hero" })}
              style={{ fontFamily: F.body, fontSize: 12, fontWeight: 400, color: C.accent, background: "transparent", padding: "16px 28px", textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", border: `1px solid ${C.accent}`, transition: "all 0.3s" }}
              onMouseEnter={e => { e.target.style.background = C.accent; e.target.style.color = C.white; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.accent; }}
            >WhatsApp</a>
          </div>
        </div>
        <div style={{ opacity: 0, animation: "fadeIn 1.2s ease 0.5s forwards", position: "relative", width: "100%", maxWidth: isTablet ? 340 : 480, margin: isTablet ? "0 auto" : 0, overflow: "hidden" }}>
          <img src="/images/suit.jpg" alt="Manny Chowdhury, women's fashion wholesaler in New York" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center 25%", display: "block" }} />
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
        a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid ${C.accent};outline-offset:2px}
        @media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}
      `}</style>
    </section>
  );
}

function TrustedBy() {
  const brands = ["Tally Taylor", "Ben Marc", "Donna Vinci", "Lisa Rene", "Nubiano", "Lily & Taylor", "Dorinda Clark Cole", "Elite Champagne", "GMI", "Terramina", "Chancele"];
  const doubled = [...brands, ...brands];
  return (
    <section style={{ padding: "32px 0", background: C.deep, overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: 16, padding: "0 20px" }}>
        <span style={{ fontFamily: F.body, fontSize: 10, fontWeight: 400, color: C.warmLight, letterSpacing: "0.22em", textTransform: "uppercase" }}>Brands we carry</span>
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

function Collections() {
  const { isMobile, isTablet } = useBreakpoint();
  const cards = [
    { title: "Church & Occasion", desc: "Suits, hats, and full ensembles for Sunday service, anniversaries, and every celebration in between.", sub: "Suits · Hats · Ensembles · Plus Size" },
    { title: "Everyday Elegance", desc: "Dresses and separates for work and weekends, in the fits and fabrics women actually come back for.", sub: "Dresses · Separates · Workwear · Casual" },
    { title: "Wholesale", desc: "Curated multi-brand orders for boutique owners. Competitive pricing, consistent quality, and a partner who picks up the phone.", sub: "Bulk Orders · Multi-Brand · Lookbooks" },
  ];
  return (
    <section id="collections" style={{ padding: isMobile ? "72px 20px" : "120px clamp(24px,6vw,80px)", background: C.bg }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: C.accent }} />
            <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>Collections</p>
            <div style={{ width: 40, height: 1, background: C.accent }} />
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: isMobile ? 32 : "clamp(32px,4.5vw,52px)", fontWeight: 400, color: C.dark, textAlign: "center", marginBottom: isMobile ? 40 : 64, lineHeight: 1.15 }}>What we <em style={{ color: C.accentDeep }}>carry</em></h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 20 }}>
          {cards.map((c, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ background: C.white, padding: isMobile ? "32px 24px" : "44px 32px", height: "100%", transition: "all 0.4s", border: `1px solid ${C.border}` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(44,36,32,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <h3 style={{ fontFamily: F.display, fontSize: 26, fontWeight: 400, color: C.dark, marginBottom: 16, lineHeight: 1.2 }}>{c.title}</h3>
                <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 300, color: C.muted, lineHeight: 1.8, marginBottom: 22 }}>{c.desc}</p>
                <div style={{ width: 24, height: 1, background: C.warm, marginBottom: 12 }} />
                <p style={{ fontFamily: F.body, fontSize: 11, color: C.mutedLight, letterSpacing: "0.06em" }}>{c.sub}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href={WA} target="_blank" rel="noopener" onClick={() => track("Lead", { placement: "collections" })}
              style={{ fontFamily: F.body, fontSize: 12, fontWeight: 400, color: C.white, background: C.accent, padding: "15px 36px", textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", display: "inline-block" }}
            >Ask what's in stock</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Story() {
  const { isMobile, isTablet } = useBreakpoint();
  const items = [
    { year: "1989", text: "Immigrated to Brooklyn from Bangladesh with nothing but determination and a love for fashion." },
    { year: "1990s", text: "Started at Oriental Fabrics in NYC. Learned the trade from the ground up — fabrics, fit, and what women actually want to wear." },
    { year: "2000s", text: "Built a network of boutique owners and loyal customers. In this business, reputation is everything." },
    { year: "Now", text: "Account Executive at Tally Taylor. Now bringing three decades of expertise directly to you." },
  ];
  return (
    <section id="story" style={{ padding: isMobile ? "72px 20px" : "120px clamp(24px,6vw,80px)", background: C.white }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: C.accent }} />
            <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>The Journey</p>
            <div style={{ width: 40, height: 1, background: C.accent }} />
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: isMobile ? 32 : "clamp(32px,4.5vw,52px)", fontWeight: 400, color: C.dark, lineHeight: 1.15, textAlign: "center", marginBottom: 16 }}>From Comilla to <em style={{ color: C.accentDeep }}>New York</em></h2>
          <p style={{ fontFamily: F.body, fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.85, maxWidth: 560, margin: isMobile ? "0 auto 40px" : "0 auto 64px", textAlign: "center" }}>A three-decade journey through New York's fashion industry, built one relationship at a time.</p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4, 1fr)", gap: 0 }}>
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                padding: isMobile ? "28px 0" : "36px 28px", height: "100%",
                borderLeft: isMobile ? "none" : (i === 0 || (isTablet && i === 2)) ? "none" : `1px solid ${C.border}`,
                borderTop: isMobile && i !== 0 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{ width: 24, height: 2, background: C.terra, marginBottom: 16 }} />
                <p style={{ fontFamily: F.display, fontSize: 28, fontWeight: 500, color: C.accent, marginBottom: 14 }}>{item.year}</p>
                <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 300, color: C.muted, lineHeight: 1.8 }}>{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: isMobile ? "48px auto 0" : "80px auto 0", position: "relative" }}>
            <div style={{ fontSize: 64, fontFamily: F.display, color: C.warmLight, lineHeight: 0.5, marginBottom: 20, opacity: 0.4 }}>"</div>
            <p style={{ fontFamily: F.display, fontSize: isMobile ? 22 : 26, fontWeight: 400, fontStyle: "italic", color: C.dark, lineHeight: 1.55, marginBottom: 20 }}>I don't sell clothes. I build relationships. When you work with me, you're not a transaction — you're family.</p>
            <div style={{ width: 40, height: 2, background: C.terra, margin: "0 auto 16px" }} />
            <p style={{ fontFamily: F.body, fontSize: 12, color: C.accent, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 400 }}>Manny Chowdhury</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Catalog() {
  const [mode, setMode] = useState("retail");
  const { isMobile } = useBreakpoint();
  const items = mode === "retail" ? retailProducts : wholesaleProducts;
  const copy = {
    retail: "New pieces come in every week and move fast. Message us with your size and the occasion, and we'll send photos of what's available right now.",
    wholesale: "Lookbooks and current pricing go out by WhatsApp. Tell us what you stock and we'll send the sheet that fits your store.",
  };

  const RetailCard = ({ p }) => (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, transition: "all 0.4s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(44,36,32,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ position: "relative", aspectRatio: "3/4", background: C.bgAlt, overflow: "hidden" }}>
        {p.image ? (
          <img src={p.image} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ fontFamily: F.display, fontSize: 34, fontWeight: 400, color: C.warmLight }}>{p.style || ""}</span>
            <span style={{ fontFamily: F.body, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.mutedLight }}>Photo coming</span>
          </div>
        )}
        {p.tag && (
          <span style={{ position: "absolute", top: 14, left: 14, background: C.dark, color: C.white, fontFamily: F.body, fontSize: 9, fontWeight: 400, letterSpacing: "0.16em", textTransform: "uppercase", padding: "6px 12px" }}>{p.tag}</span>
        )}
      </div>
      <div style={{ padding: "20px 22px 26px" }}>
        <h3 style={{ fontFamily: F.display, fontSize: 19, fontWeight: 400, color: C.dark, marginBottom: 8, lineHeight: 1.3 }}>{p.name}{p.style ? ` — ${p.style}` : ""}</h3>
        <p style={{ fontFamily: F.body, fontSize: 15, fontWeight: 400, color: C.accent, marginBottom: 10 }}>{typeof p.price === "number" ? `$${p.price.toFixed(2)}` : p.price}</p>
        {p.color && <p style={{ fontFamily: F.body, fontSize: 10, color: C.mutedLight, letterSpacing: "0.12em", textTransform: "uppercase" }}>{p.color}</p>}
        {p.sizes && <p style={{ fontFamily: F.body, fontSize: 10, color: C.mutedLight, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 6 }}>{p.sizes.join(" · ")}</p>}
        <a href={WA} target="_blank" rel="noopener" onClick={() => track("Lead", { placement: "product", product: p.name })}
          style={{ display: "block", textAlign: "center", marginTop: 16, fontFamily: F.body, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: C.accent, textDecoration: "none", border: `1px solid ${C.border}`, padding: "10px 0" }}>Check availability</a>
      </div>
    </div>
  );

  const WholesaleCard = ({ p }) => (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, transition: "all 0.4s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(44,36,32,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ aspectRatio: "3/4", background: C.bgAlt, overflow: "hidden" }}>
        {p.image && <img src={p.image} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
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
        <a href={WA} target="_blank" rel="noopener" onClick={() => track("Lead", { placement: "wholesale_product", product: p.name })}
          style={{ display: "block", textAlign: "center", marginTop: 16, fontFamily: F.body, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: C.white, background: C.accent, textDecoration: "none", padding: "11px 0" }}>Request line sheet</a>
      </div>
    </div>
  );

  return (
    <section id="catalog" style={{ padding: isMobile ? "72px 20px" : "120px clamp(24px,6vw,80px)", background: C.white }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: C.accent }} />
            <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>Catalog</p>
            <div style={{ width: 40, height: 1, background: C.accent }} />
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: isMobile ? 32 : "clamp(32px,4.5vw,52px)", fontWeight: 400, color: C.dark, textAlign: "center", marginBottom: 16, lineHeight: 1.15 }}>Browse the <em style={{ color: C.accentDeep }}>collection</em></h2>
          <p style={{ fontFamily: F.body, fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.85, maxWidth: 560, margin: isMobile ? "0 auto 32px" : "0 auto 48px", textAlign: "center" }}>Wholesale orders for boutique owners, or direct retail for the discerning shopper.</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: isMobile ? 36 : 56, borderBottom: `1px solid ${C.border}` }}>
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
            <div style={{ textAlign: "center", padding: isMobile ? "48px 24px" : "72px 24px", background: C.bg, border: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: F.display, fontSize: isMobile ? 24 : 30, fontWeight: 400, color: C.dark, marginBottom: 16, lineHeight: 1.25 }}>Stock moves faster than the website</p>
              <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 300, color: C.muted, lineHeight: 1.85, maxWidth: 440, margin: "0 auto 28px" }}>{copy[mode]}</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href={WA} target="_blank" rel="noopener" onClick={() => track("Lead", { placement: "catalog_empty", mode })}
                  style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.white, background: C.accent, padding: "14px 32px", textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", display: "inline-block" }}>Message on WhatsApp</a>
                <a href={PHONE_TEL} onClick={() => track("Contact", { method: "phone", placement: "catalog_empty" })}
                  style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.dark, background: "transparent", border: `1px solid ${C.dark}`, padding: "14px 32px", textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase", display: "inline-block" }}>Call instead</a>
              </div>
            </div>
          </FadeIn>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(210px, 1fr))", gap: isMobile ? 12 : 24 }}>
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
  const { isMobile, isTablet } = useBreakpoint();
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "boutique", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const handle = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const submit = async () => {
    if (!form.name.trim()) { setErr("Add your name so we know who we're calling back."); return; }
    if (!form.phone.trim() && !form.email.trim()) { setErr("Add a phone number or an email so we can reach you."); return; }
    setErr("");
    setSending(true);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "50dddef6-0ac7-47bc-a468-d2a80d91f765",
          subject: "New Manny Fashion Inquiry",
          from_name: form.name,
          name: form.name,
          email: form.email || EMAIL,
          phone: form.phone || "Not provided",
          customer_type: form.type,
          message: form.message || "No message",
        }),
      });
      track("Lead", { method: "form", buyer_type: form.type });
      setSent(true);
    } catch (e) {
      setErr("That didn't send. Call or message on WhatsApp instead — the number is on the left.");
    }
    setSending(false);
  };

  const inp = { width: "100%", padding: "14px 0", fontFamily: F.body, fontSize: 16, fontWeight: 300, border: "none", borderBottom: `1px solid ${C.border}`, background: "transparent", color: C.dark, outline: "none", transition: "border-color 0.3s", borderRadius: 0 };

  const ContactRow = ({ letter, label, value, href, ext, onClick }) => (
    <a href={href} onClick={onClick} {...(ext ? { target: "_blank", rel: "noopener" } : {})}
      style={{ fontFamily: F.body, fontSize: 13, fontWeight: 400, color: C.dark, textDecoration: "none", display: "flex", alignItems: "center", gap: 14, transition: "color 0.3s" }}
      onMouseEnter={e => e.currentTarget.style.color = C.accent}
      onMouseLeave={e => e.currentTarget.style.color = C.dark}>
      <span style={{ width: 44, height: 44, borderRadius: "50%", background: C.bgAlt, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.display, fontSize: 16, fontWeight: 500, color: C.accent, flexShrink: 0 }}>{letter}</span>
      <div style={{ minWidth: 0 }}>
        <span style={{ fontWeight: 400 }}>{label}</span>
        <span style={{ display: "block", fontSize: 12, color: C.mutedLight, marginTop: 2, overflowWrap: "anywhere" }}>{value}</span>
      </div>
    </a>
  );

  return (
    <section id="connect" style={{ padding: isMobile ? "72px 20px" : "120px clamp(24px,6vw,80px)", background: C.white }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 100, alignItems: "start" }}>
          <div>
            <FadeIn>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 40, height: 1, background: C.accent }} />
                <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>Connect</p>
              </div>
              <h2 style={{ fontFamily: F.display, fontSize: isMobile ? 32 : "clamp(32px,4.5vw,52px)", fontWeight: 400, color: C.dark, lineHeight: 1.12, marginBottom: 20 }}>Every message<br />answered <em style={{ color: C.accentDeep }}>personally</em></h2>
              <p style={{ fontFamily: F.body, fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.85, marginBottom: 40 }}>No chatbots. No automated replies. Whether you're stocking a boutique or looking for the perfect piece, you're talking directly to Manny.</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <ContactRow letter="W" label="WhatsApp" value={PHONE_DISPLAY} href={WA} ext
                  onClick={() => track("Contact", { method: "whatsapp", placement: "connect" })} />
                <ContactRow letter="P" label="Phone" value={PHONE_DISPLAY} href={PHONE_TEL}
                  onClick={() => track("Contact", { method: "phone", placement: "connect" })} />
                <ContactRow letter="E" label="Email" value={EMAIL} href={`mailto:${EMAIL}`}
                  onClick={() => track("Contact", { method: "email", placement: "connect" })} />
                <ContactRow letter="I" label="Instagram" value="@mannybytallytaylor" href={IG} ext
                  onClick={() => track("Contact", { method: "instagram", placement: "connect" })} />
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div style={{ borderTop: `3px solid ${C.terra}`, paddingTop: 32 }}>
              {sent ? (
                <div style={{ padding: "60px 0", textAlign: "center" }}>
                  <p style={{ fontFamily: F.display, fontSize: 28, fontWeight: 400, color: C.dark, marginBottom: 12 }}>Thank you</p>
                  <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 300, color: C.muted }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <p style={{ fontFamily: F.display, fontSize: 24, fontWeight: 400, color: C.dark, marginBottom: 28 }}>Send an inquiry</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                    <input placeholder="Name" autoComplete="name" value={form.name} onChange={handle("name")} style={inp}
                      onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                    <input placeholder="Phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={handle("phone")} style={inp}
                      onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                    <input placeholder="Email" type="email" autoComplete="email" value={form.email} onChange={handle("email")} style={inp}
                      onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                    <select value={form.type} onChange={handle("type")} style={{ ...inp, cursor: "pointer", appearance: "none" }}>
                      <option value="boutique">Boutique Owner</option>
                      <option value="personal">Personal Shopping</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="other">Other</option>
                    </select>
                    <textarea placeholder="Tell us what you're looking for" value={form.message} onChange={handle("message")} rows={3} style={{ ...inp, resize: "none", minHeight: 80 }}
                      onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                    {err && <p role="alert" style={{ fontFamily: F.body, fontSize: 13, fontWeight: 300, color: "#A3352B", lineHeight: 1.6 }}>{err}</p>}
                    <button onClick={submit} disabled={sending} style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.white, background: sending ? C.mutedLight : C.accent, padding: "16px 0", border: "none", cursor: sending ? "default" : "pointer", letterSpacing: "0.14em", textTransform: "uppercase", transition: "background 0.3s", marginTop: 8 }}
                      onMouseEnter={e => { if (!sending) e.target.style.background = C.accentDeep; }}
                      onMouseLeave={e => { if (!sending) e.target.style.background = C.accent; }}
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
  const { isMobile } = useBreakpoint();
  return (
    <footer style={{ padding: isMobile ? "44px 20px 32px" : "52px clamp(24px,6vw,80px) 40px", background: C.deep }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 36 }}>
          <div>
            <p style={{ fontFamily: F.display, fontSize: 22, fontWeight: 400, color: C.cream, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Manny Fashion</p>
            <p style={{ fontFamily: F.body, fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>Women's church suits, hats<br />&amp; occasion wear<br />Wholesale &amp; direct · New York</p>
          </div>
          <div style={{ textAlign: isMobile ? "left" : "right" }}>
            <a href={PHONE_TEL} onClick={() => track("Contact", { method: "phone", placement: "footer" })}
              style={{ display: "block", fontFamily: F.body, fontSize: 15, fontWeight: 300, color: C.cream, marginBottom: 6, textDecoration: "none" }}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`} style={{ display: "block", fontFamily: F.body, fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.45)", marginBottom: 12, textDecoration: "none" }}>{EMAIL}</a>
            <div style={{ display: "flex", gap: 20, justifyContent: isMobile ? "flex-start" : "flex-end" }}>
              <a href={WA} target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.terra, textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>WhatsApp</a>
              <a href={IG} target="_blank" rel="noopener" style={{ fontFamily: F.body, fontSize: 11, fontWeight: 400, color: C.terra, textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>Instagram</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
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
      <Collections />
      <Story />
      <Catalog />
      <Connect />
      <Footer />
      <CallBar />
    </div>
  );
}
