"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const CA = "3cumPBwrpjn27vYtVKwsvXoytiT9gWonXrxsKDy6pump";

const navLinks = [
  { href: "#home", icon: "🏠", text: "Home" },
  { href: "#about", icon: "📖", text: "About" },
  { href: "#gallery", icon: "🖼️", text: "Gallery" },
  { href: "#how-to-buy", icon: "🛒", text: "How to Buy" },
  { href: "#tokenomics", icon: "💰", text: "Tokenomics" },
  { href: "#roadmap", icon: "🗺️", text: "Roadmap" },
  { href: "#community", icon: "🌊", text: "Community" },
];

const socialLinks = [
  { href: "https://x.com/JBCAI_OS", label: "𝕏", target: "_blank" },
  { href: "https://t.me/+9wI0StA89dtmYmQ1", label: "✈️", target: "_blank" },
  { href: "https://discord.gg/g5UkhKqwPp", label: "💬", target: "_blank" },
];

const galleryImages = [
  { src: "/assets/img/joy_char.png", alt: "JoyBoyCat Main Character", caption: "⚔️ Main Character", featured: true },
  { src: "/assets/img/car.jpeg", alt: "JoyBoyCat Jet Pilot", caption: "✈️ Fighter Jet" },
  { src: "/assets/img/cook.jpeg", alt: "Dev Is Cooking", caption: "🍳 Dev Is Cooking!" },
  { src: "/assets/img/pres.jpg", alt: "JoyBoyCat President", caption: "🏛️ President" },
  { src: "/assets/img/fishjoy.jpeg", alt: "Fish Joy", caption: "🐟 Fish Joy" },
  { src: "/assets/img/guitar.jpeg", alt: "Guitar Joy", caption: "🎸 Guitar Hero" },
  { src: "/assets/img/horses.jpeg", alt: "Horses Joy", caption: "🐴 Fire Horses" },
  { src: "/assets/img/joyfly.jpeg", alt: "Joy Fly", caption: "🦋 Joy Fly" },
  { src: "/assets/img/joyking.jpeg", alt: "Joy King", caption: "👑 Joy King" },
  { src: "/assets/img/joyluf.jpeg", alt: "Joy Luf", caption: "💛 Joy Luf" },
  { src: "/assets/img/kingjoy.jpeg", alt: "King Joy", caption: "🏆 King Joy" },
  { src: "/assets/img/legend.jpeg", alt: "Legend", caption: "⭐ Legend" },
  { src: "/assets/img/mouse.jpeg", alt: "Mouse Joy", caption: "🖱️ Mouse" },
  { src: "/assets/img/talk.jpeg", alt: "Talk Joy", caption: "💬 Talk" },
  { src: "/assets/img/zombiecat.jpeg", alt: "Zombie Cat", caption: "🧟 Zombie Cat" },
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const mountedRef = useRef(false);

  // Hydration fix: mark as mounted
  useEffect(() => {
    mountedRef.current = true;
  }, []);

  /* ---- COPY CA ---- */
  const copyCA = useCallback(() => {
    const allBtns = document.querySelectorAll<HTMLButtonElement>(".ca-copy, .ca-big-copy");
    if (!navigator.clipboard?.writeText) {
      console.warn("Clipboard API tidak tersedia pada browser ini.");
      allBtns.forEach((btn) => {
        btn.textContent = "📋 Copy";
      });
      return;
    }

    navigator.clipboard.writeText(CA)
      .then(() => {
        allBtns.forEach((btn) => {
          const orig = btn.textContent;
          btn.textContent = "✅ Copied!";
          btn.style.background = "#00c853";
          setTimeout(() => {
            btn.textContent = orig;
            btn.style.background = "";
          }, 2500);
        });
      })
      .catch((err) => {
        console.error("Gagal menyalin ke clipboard:", err);
      });
  }, []);

  /* ---- PARTICLES ---- */
  useEffect(() => {
    if (!mountedRef.current) return;
    const canvasEl = canvasRef.current as HTMLCanvasElement;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvasEl.width = W;
    canvasEl.height = H;

    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; color: string }[] = [];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvasEl.width = W;
      canvasEl.height = H;
    };

    function createParticle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.6 ? "#f7df1e" : "#7c3aed",
      };
    }

    function init() {
      resize();
      particles.length = 0;
      for (let i = 0; i < 100; i++) particles.push(createParticle());
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---- TOKEN CHART ---- */
  useEffect(() => {
    if (!mountedRef.current) return;
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 16;
    const ir = r * 0.58;

    const segments = [
      { pct: 60, color: "#f7df1e" },
      { pct: 25, color: "#00ffc8" },
      { pct: 15, color: "#7c3aed" },
    ];

    let start = -Math.PI / 2;
    segments.forEach((seg) => {
      const angle = (seg.pct / 100) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      start += angle;
    });

    ctx.beginPath();
    ctx.arc(cx, cy, ir, 0, Math.PI * 2);
    ctx.fillStyle = "#0e0a1a";
    ctx.fill();

    const grd = ctx.createRadialGradient(cx, cy, ir, cx, cy, r + 8);
    grd.addColorStop(0, "rgba(247,223,30,0.08)");
    grd.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(cx, cy, r + 8, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }, []);

  /* ---- NAVBAR SCROLL ---- */
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");
    if (!navbar || !backToTop) return;

    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
      backToTop.classList.toggle("visible", window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- SCROLL REVEAL ---- */
  useEffect(() => {
    const els = document.querySelectorAll(".acard, .step-card, .road-card, .fair-card, .social-card, .token-row, .gallery-item");
    els.forEach((el) => el.classList.add("reveal"));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 70);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ---- SMOOTH SCROLL ---- */
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const navbar = document.getElementById("navbar");
    const target = document.querySelector<HTMLElement>(href);
    if (target && navbar) {
      const offset = navbar.offsetHeight;
      window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
    }
    setOverlayOpen(false);
  }, []);

  const handleOverlayTabClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleNavClick(e, href);
  }, [handleNavClick]);

  return (
    <>
      <canvas ref={canvasRef} suppressHydrationWarning style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* NAVBAR */}
      <nav id="navbar">
        <div className="nav-inner">
          <div className="nav-logo">
            <Image src="/assets/img/favicon.png" alt="JoyBoyCat Logo" width={36} height={36} className="logo-img" />
            <span className="logo-text">$JOYBOY<span className="logo-accent">CAT</span></span>
          </div>
          <a href="#how-to-buy" className="nav-cta" onClick={(e) => handleNavClick(e, "#how-to-buy")}>Buy Now 🚀</a>
          <button className="hamburger" onClick={() => setOverlayOpen(true)} aria-label="Open Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* NAV OVERLAY */}
      <div className={`nav-overlay${overlayOpen ? " open" : ""}`} onClick={() => setOverlayOpen(false)}>
        <div className="overlay-bg-deco" onClick={(e) => e.stopPropagation()} />
        <div className="overlay-inner" onClick={(e) => e.stopPropagation()}>
          <button className="overlay-close" onClick={() => setOverlayOpen(false)}>✕</button>
          <div className="overlay-logo">
            <Image src="/assets/img/favicon.png" alt="Logo" width={44} height={44} className="logo-img logo-img-overlay" />
            <span>$JOYBOYCAT</span>
          </div>
          <p className="overlay-label">— NAVIGATE —</p>
          <nav className="overlay-tabs">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="otab" onClick={(e) => handleOverlayTabClick(e, link.href)}>
                <span className="otab-icon">{link.icon}</span>
                <span className="otab-text">{link.text}</span>
              </a>
            ))}
          </nav>
          <div className="overlay-socials">
            {socialLinks.map((s) => (
              <a key={s.href} href={s.href} target={s.target} rel="noopener noreferrer" className="osocial">{s.label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-waves" />
        <div className="hero-content">
          <div className="hero-badge">🔥 Now Live on Pump.fun</div>
          <h1 className="hero-title">
            <span className="title-line1">JOYBOY</span>
            <span className="title-line2">CAT</span>
          </h1>
          <p className="hero-ticker">$JOYBOY</p>
          <p className="hero-desc">
            The first <strong>JOYBOYCAT</strong> on Pump.fun 🐱<br />
            Inspired by Joy Boy&apos;s ancient robot <em>Emet</em> — the Iron Giant.<br />
            ⛵ Climb aboard and set sail to the future!
          </p>
          <div className="ca-box">
            <span className="ca-label">CA:</span>
            <span className="ca-value">{CA}</span>
            <button className="ca-copy" onClick={copyCA}>📋 Copy</button>
          </div>
          <div className="hero-btns">
            <a href="https://pump.fun/3cumPBwrpjn27vYtVKwsvXoytiT9gWonXrxsKDy6pump" target="_blank" rel="noopener noreferrer" className="btn btn-primary">🚀 Buy on Pump.fun</a>
            <a href="https://t.me/+9wI0StA89dtmYmQ1" target="_blank" rel="noopener noreferrer" className="btn btn-telegram">✈️ Join Telegram</a>
            <a href="#about" className="btn btn-outline" onClick={(e) => handleNavClick(e, "#about")}>Learn More ↓</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">1B</span><span className="stat-label">Total Supply</span></div>
            <div className="stat-div" />
            <div className="stat"><span className="stat-num">50%</span><span className="stat-label">Agent AI</span></div>
            <div className="stat-div" />
            <div className="stat"><span className="stat-num">0%</span><span className="stat-label">Tax</span></div>
            <div className="stat-div" />
            <div className="stat"><span className="stat-num">🔥</span><span className="stat-label">LP Burned</span></div>
          </div>
        </div>
        <div className="hero-img-wrap">
          <div className="hero-ring ring3" />
          <video className="hero-img" autoPlay loop muted playsInline>
            <source src="/assets/img/gif_.mp4" type="video/mp4" />
            <Image src="/assets/img/joy_char.png" alt="JoyBoyCat" width={280} height={280} className="hero-img" />
          </video>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {["🐱 $JOYBOYCAT", "⛵ TO THE MOON", "🔥 LP BURNED", "💊 PUMFUN FRUIT", "🚀 0% TAX", "💎 COMMUNITY DRIVEN", "⚔️ SYMBOL OF FREEDOM", "🌕 100X INCOMING"].map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-tag">THE LEGEND</div>
          <h2 className="section-title">What is <span>$JOYBOYCAT</span>?</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                This meme is inspired by the name of <strong>Joy Boy&apos;s robot, Emet</strong>,
                also nicknamed <em>&quot;Iron Giant.&quot;</em> This ancient robot is Joy Boy&apos;s friend
                and plays an important role in the story — helping the Straw Hat Pirates in Egghead.
              </p>
              <p>
                And now there&apos;s <strong>Emet&apos;s regeneration, $JOYBOYCAT</strong>, who will
                help you travel to the future. Born from the <em>Pumfun Fruit 💊</em> —
                a power that transports you beyond the limits of ordinary finance.
              </p>
              <p>⛵ <strong>Climb aboard and set sail to fight the bitsama government!!!</strong></p>
              <div className="about-links-box">
                <p className="about-links-title">🔗 Official Links — @joyboycat00</p>
                <div className="about-links-row">
                  <a href="https://t.me/+9wI0StA89dtmYmQ1" target="_blank" rel="noopener noreferrer" className="alink telegram">✈️ Telegram</a>
                  <a href="https://x.com/JBCAI_OS" target="_blank" rel="noopener noreferrer" className="alink xtwit">𝕏 Twitter</a>
                  <a href="https://discord.gg/g5UkhKqwPp" target="_blank" rel="noopener noreferrer" className="alink discord">💬 Discord</a>
                  <a href="https://pump.fun/3cumPBwrpjn27vYtVKwsvXoytiT9gWonXrxsKDy6pump" target="_blank" rel="noopener noreferrer" className="alink pump">🔥 Pump.fun</a>
                </div>
              </div>
              <div className="about-pills">
                <span className="pill">🐱 Meme Coin</span>
                <span className="pill">⛵ Solana Network</span>
                <span className="pill">💊 Pump.fun</span>
                <span className="pill">🔥 Fair Launch</span>
              </div>
            </div>
            <div className="about-cards">
              {[
                { icon: "🛡️", title: "50% Agent AI Marketing", desc: "50% of total creator rewards go to Agent AI Marketing Company. Verified on-chain." },
                { icon: "🔥", title: "LP Burned", desc: "Liquidity locked forever. No rug possible. Safety guaranteed." },
                { icon: "🌍", title: "100% Community", desc: "You own this. No team wallets. Pure organic growth." },
                { icon: "⚡", title: "0% Tax", desc: "Buy and sell freely. No hidden fees. Zero slippage tax." },
              ].map((card) => (
                <div key={card.title} className="acard">
                  <div className="acard-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section gallery-section">
        <div className="container">
          <div className="section-tag">VISUALS</div>
          <h2 className="section-title">Gallery <span>🎨</span></h2>
          <p className="gallery-sub">Official artwork &amp; visuals from the JoyBoyCat universe</p>
          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`gallery-item${img.featured ? " featured" : ""}`}
                onClick={() => setLightbox({ src: img.src, caption: img.caption })}
              >
                <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 760px) 50vw, 25vw" />
                <div className="gallery-overlay"><span>{img.caption}</span></div>
              </div>
            ))}
            <div className="gallery-item gallery-cta-card">
              <div className="gallery-cta-inner">
                <span className="gcta-emoji">✈️</span>
                <h3>Join Our Telegram!</h3>
                <p>Alpha, updates &amp; community — all in one place.</p>
                <a href="https://t.me/+9wI0StA89dtmYmQ1" target="_blank" rel="noopener noreferrer" className="btn btn-telegram">Join Now →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox open">
          <div className="lightbox-bg" onClick={() => setLightbox(null)} />
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox.src} alt={lightbox.caption} style={{ position: "relative", zIndex: 2, maxWidth: "90vw", maxHeight: "80vh", borderRadius: 12 }} />
          <p style={{ position: "relative", zIndex: 2, fontSize: 14, color: "var(--muted)", fontWeight: 700 }}>{lightbox.caption}</p>
        </div>
      )}

      {/* HOW TO BUY */}
      <section id="how-to-buy" className="section buy-section">
        <div className="container">
          <div className="section-tag">GET STARTED</div>
          <h2 className="section-title">How to <span>Buy</span> 🚀</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">01</div>
              <div className="step-icon">👻</div>
              <h3>Get Phantom Wallet</h3>
              <p><strong>Mobile:</strong> Download the Phantom app from the App Store or Play Store.</p>
              <p><strong>Desktop:</strong> Install the Phantom Chrome extension.</p>
              <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="step-link">phantom.app →</a>
            </div>
            <div className="step-card">
              <div className="step-num">02</div>
              <div className="step-icon">◎</div>
              <h3>Fund with Solana</h3>
              <p>Buy Solana (SOL) from any exchange like Binance, Coinbase, or OKX and send it to your Phantom wallet.</p>
              <a href="https://phantom.app/learn/crypto-101/best-solana-wallet" target="_blank" rel="noopener noreferrer" className="step-link">Learn More →</a>
            </div>
            <div className="step-card">
              <div className="step-num">03</div>
              <div className="step-icon">💱</div>
              <h3>Swap for $JOYBOY</h3>
              <p>Go to Raydium or Jupiter, paste the contract address, and swap your SOL for <strong>$JOYBOY</strong>.</p>
              <div className="dex-links">
                <a href="https://raydium.io" target="_blank" rel="noopener noreferrer" className="dex-btn">Raydium</a>
                <a href="https://jup.ag" target="_blank" rel="noopener noreferrer" className="dex-btn">Jupiter</a>
                <a href="https://pump.fun/3cumPBwrpjn27vYtVKwsvXoytiT9gWonXrxsKDy6pump" target="_blank" rel="noopener noreferrer" className="dex-btn">Pump.fun</a>
              </div>
            </div>
          </div>
          <div className="ca-big-box">
            <p className="ca-big-label">Contract Address (CA)</p>
            <div className="ca-big-inner">
              <span id="caBig">{CA}</span>
              <button className="ca-big-copy" onClick={copyCA}>Copy Address</button>
            </div>
          </div>
        </div>
      </section>

      {/* TOKENOMICS */}
      <section id="tokenomics" className="section token-section">
        <div className="container">
          <div className="section-tag">ECONOMICS</div>
          <h2 className="section-title">Token<span>omics</span> 💰</h2>
          <div className="token-grid">
            <div className="token-chart-wrap">
              <canvas ref={chartRef} id="tokenChart" width={300} height={300} suppressHydrationWarning />
              <div className="chart-center">
                <span className="chart-big">100%</span>
                <span className="chart-small">Community</span>
              </div>
            </div>
            <div className="token-info">
              {[
                { color: "#f7df1e", title: "Total Supply", value: "1,000,000,000 $JOYBOY", pct: "100%" },
                { color: "#00ffc8", title: "Liquidity Pool", value: "Burned forever 🔥", pct: "100%" },
                { color: "#ff6b6b", title: "Agent AI Marketing", value: "50% Creator Rewards", pct: "50%" },
                { color: "#ff9f43", title: "Buy/Sell Tax", value: "Completely zero", pct: "0%" },
              ].map((row) => (
                <div key={row.title} className="token-row">
                  <div className="token-dot" style={{ background: row.color }} />
                  <div><h4>{row.title}</h4><p>{row.value}</p></div>
                  <span className="token-pct">{row.pct}</span>
                </div>
              ))}
              <div className="token-highlight">
                <p>🐱 <strong>SYMBOL OF FREEDOM</strong> — 50% Agent AI Marketing. 50% Community-Driven.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="section road-section">
        <div className="container">
          <div className="section-tag">THE JOURNEY</div>
          <h2 className="section-title">Road<span>map</span> 🗺️</h2>
          <div className="road-grid">
            {[
              {
                stage: "Stage 1", icon: "⚡", title: "Revival — The Origin", active: true,
                items: ["✅ $JOYBOY Launch on Pump.fun", "✅ One Piece Story Release", "✅ First Art: Joyboycat Concept Visual", "✅ Community on X & Telegram", "🔄 \"Rise of Joyboycat\" Campaign"],
              },
              {
                stage: "Stage 2", icon: "📈", title: "Growth — Expansion", active: false,
                items: ["🔜 Update to Dexscreener", "🔜 Running Paid Ads", "🔜 30× BOOST for Early Holders", "🔜 500× BOOST Final Target", "🔜 List on Dextools"],
              },
              {
                stage: "Stage 3", icon: "🌍", title: "Cultivate — Web3 Era", active: false,
                items: ["🔜 Solana Meme Partnerships", "🔜 NFT Collection & Merch", "🔜 YouTube/TikTok Viral Content", "🔜 CoinGecko & CMC Listing", "🔜 Target: $5M Market Cap"],
              },
              {
                stage: "Stage 4", icon: "🏦", title: "Infinity — Beyond", active: false,
                items: ["🔜 CEX Listing: MEXC, Bitget", "🔜 Global Community Expansion", "🔜 Chinese, Korean & EU Markets", "🔜 Target: $100M+ Market Cap", "🔜 To Infinity & Beyond 🚀"],
              },
            ].map((card) => (
              <div key={card.stage} className={`road-card${card.active ? " active" : ""}`}>
                <div className="road-badge">{card.stage}</div>
                <div className="road-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <ul>{card.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAIRLAUNCH */}
      <section className="section fair-section">
        <div className="container">
          <div className="section-tag">TRANSPARENCY</div>
          <h2 className="section-title">Fair<span>launch</span> 🤝</h2>
          <div className="fair-grid">
            {[
              { icon: "🚫", title: "No Pre-mining", desc: "We all start from scratch." },
              { icon: "🤝", title: "50% Agent AI Marketing", desc: "50% creator rewards allocated to Agent AI Marketing Company." },
              { icon: "🔥", title: "LP Burned Forever", desc: "Liquidity permanently locked." },
              { icon: "💎", title: "Community Driven", desc: "You&apos;re in control, not bots." },
            ].map((card) => (
              <div key={card.title} className="fair-card">
                <span className="fair-icon">{card.icon}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="fair-quote">
            <p>&quot;This isn&apos;t just a coin — <strong>it&apos;s a rebellion against an unfair system.</strong><br />
            Let&apos;s take $JOYBOYCAT to the moon together! 🌕&quot;</p>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="section community-section">
        <div className="container">
          <div className="section-tag">JOIN US</div>
          <h2 className="section-title">Join the <span>Community</span> 🌊</h2>
          <p className="community-sub">Be part of the movement. Thousands of believers are already aboard the ship.</p>
          <div className="social-grid">
            <a href="https://x.com/JBCAI_OS" target="_blank" rel="noopener noreferrer" className="social-card twitter">
              <div className="social-icon">𝕏</div>
              <h3>Twitter / X</h3>
              <p>Follow for the latest updates, memes &amp; announcements</p>
              <span className="social-arrow">→</span>
            </a>
            <a href="https://pump.fun/3cumPBwrpjn27vYtVKwsvXoytiT9gWonXrxsKDy6pump" target="_blank" rel="noopener noreferrer" className="social-card pump">
              <div className="social-icon">🔥</div>
              <h3>Pump.fun</h3>
              <p>Trade $JOYBOY directly on Pump.fun</p>
              <span className="social-arrow">→</span>
            </a>
            <a href="https://t.me/+9wI0StA89dtmYmQ1" target="_blank" rel="noopener noreferrer" className="social-card telegram">
              <div className="social-icon">✈️</div>
              <h3>Telegram</h3>
              <p>Join the crew! Alpha, updates &amp; community all in one place.</p>
              <span className="social-arrow">→</span>
            </a>
            <a href="https://discord.gg/g5UkhKqwPp" target="_blank" rel="noopener noreferrer" className="social-card discord">
              <div className="social-icon">💬</div>
              <h3>Discord</h3>
              <p>Join as a member! Connect with the community &amp; stay updated.</p>
              <span className="social-arrow">→</span>
            </a>
          </div>
          <div className="tg-banner">
            <div className="tg-banner-inner">
              <span className="tg-big-icon">✈️</span>
              <div className="tg-banner-text">
                <h3>Ready to Sail? Join our Telegram!</h3>
                <p>Get the latest alpha, announcements &amp; connect with thousands of holders.</p>
              </div>
              <a href="https://t.me/+9wI0StA89dtmYmQ1" target="_blank" rel="noopener noreferrer" className="btn btn-telegram">Join Telegram Now →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <Image src="/assets/img/favicon.png" alt="JoyBoyCat Logo" width={40} height={40} className="logo-img" />
              <span className="logo-text">$JOYBOY<span className="logo-accent">CAT</span></span>
            </div>
            <p className="footer-desc">
              $JOYBOYCAT is a meme coin on the Solana network.<br />
              <strong>Not financial advice.</strong> Always DYOR. Invest responsibly.
            </p>
            <div className="footer-links">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.text}</a>
              ))}
            </div>
            <div className="footer-socials">
              {socialLinks.map((s) => (
                <a key={s.href} href={s.href} target={s.target} rel="noopener noreferrer" title={s.label}>{s.label}</a>
              ))}
            </div>
            <p className="footer-copy">© 2026 JoyBoyCat. All Rights Reserved. ⛵</p>
          </div>
        </div>
      </footer>

      <button id="backToTop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
    </>
  );
}
