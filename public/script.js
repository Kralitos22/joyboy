/* ===========================
   JOYBOYCAT — script.js v2
   =========================== */

/* ---- PARTICLES ---- */
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  function Particle() {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.r     = Math.random() * 1.5 + 0.3;
    this.vx    = (Math.random() - 0.5) * 0.3;
    this.vy    = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.6 ? '#f7df1e' : '#7c3aed';
  }

  function init() { resize(); particles = Array.from({ length: 100 }, () => new Particle()); }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  init(); animate();
  window.addEventListener('resize', resize);
})();


/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});


/* ---- OVERLAY NAV (REVISI: Tab terpisah) ---- */
const hamburger   = document.getElementById('hamburger');
const navOverlay  = document.getElementById('navOverlay');
const overlayClose = document.getElementById('overlayClose');

function openOverlay() {
  navOverlay.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  navOverlay.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  navOverlay.classList.contains('open') ? closeOverlay() : openOverlay();
});

overlayClose.addEventListener('click', closeOverlay);

// Tutup saat klik link tab
document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', (e) => {
    const href = el.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      closeOverlay();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          const offset = navbar.offsetHeight;
          window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
      }, 300); // tunggu overlay close animation
    }
  });
});

// Tutup saat klik background overlay
navOverlay.addEventListener('click', (e) => {
  if (e.target === navOverlay) closeOverlay();
});

// Tutup dengan tombol Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeOverlay();
});


/* ---- COPY CA ---- */
function copyCA() {
  const caVal = document.getElementById('caValue').textContent.trim();
  const allCopyBtns = document.querySelectorAll('.ca-copy, .ca-big-copy');

  if (caVal && caVal !== 'Coming Soon...') {
    navigator.clipboard.writeText(caVal).then(() => {
      allCopyBtns.forEach(btn => {
        const orig = btn.textContent;
        btn.textContent = '✅ Copied!';
        btn.style.background = '#00c853';
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 2500);
      });
    }).catch(() => {
      alert('CA: ' + caVal);
    });
  } else {
    allCopyBtns.forEach(btn => {
      const orig = btn.textContent;
      btn.textContent = '⏳ Coming soon!';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    });
  }
}
window.copyCA = copyCA;


/* ---- TOKENOMICS CHART ---- */
(function drawTokenChart() {
  const canvas = document.getElementById('tokenChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - 16;
  const ir = r * 0.58;

  const segments = [
    { pct: 60, color: '#f7df1e' },
    { pct: 25, color: '#00ffc8' },
    { pct: 15, color: '#7c3aed' },
  ];

  let start = -Math.PI / 2;
  segments.forEach(seg => {
    const angle = (seg.pct / 100) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    start += angle;
  });

  // Donut hole
  ctx.beginPath();
  ctx.arc(cx, cy, ir, 0, Math.PI * 2);
  ctx.fillStyle = '#0e0a1a';
  ctx.fill();

  // Subtle glow ring
  const grd = ctx.createRadialGradient(cx, cy, ir, cx, cy, r + 8);
  grd.addColorStop(0, 'rgba(247,223,30,0.08)');
  grd.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.arc(cx, cy, r + 8, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();
})();


/* ---- GALLERY LIGHTBOX ---- */
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCaption');
const lightboxBg  = document.getElementById('lightboxBg');
const lbClose     = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item:not(.gallery-cta-card)').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const cap = item.dataset.caption || '';
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxCap.textContent = cap;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

lbClose.addEventListener('click', closeLightbox);
lightboxBg.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });


/* ---- SCROLL REVEAL ---- */
document.querySelectorAll('.acard, .step-card, .road-card, .fair-card, .social-card, .token-row, .gallery-item')
  .forEach(el => el.classList.add('reveal'));

new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
    }
  });
}, { threshold: 0.08 }).observe
  ? (() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 70);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  })()
  : document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));


/* ---- SMOOTH SCROLL (anchor links) ---- */
document.querySelectorAll('a[href^="#"]:not([data-close])').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
