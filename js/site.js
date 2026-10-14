// Comportamentos compartilhados por todas as páginas: menu mobile, entrada de seções e tilt dos cards

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  // Com o menu aberto, só o botão de fechar e os links do menu ficam focáveis:
  // o resto da página (e a marca, coberta pelo overlay) recebe `inert`.
  const header = toggle.closest('.site-header');
  const background = () => [
    ...[...document.body.children].filter((el) => el !== header && el.tagName !== 'SCRIPT'),
    ...header.querySelectorAll('.site-header__brand'),
  ];

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    background().forEach((el) => { el.inert = open; });
    if (open) {
      const firstLink = nav.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  }

  // Em telas largas o menu não é overlay: se a janela crescer com ele aberto, fecha
  window.matchMedia('(min-width: 821px)').addEventListener('change', (event) => {
    if (event.matches && nav.classList.contains('is-open')) setOpen(false);
  });

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (items.length === 0) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  items.forEach((el) => observer.observe(el));
}

// Tilt sutil (≤6°) — versão vanilla do TiltedCard do site. Só com mouse, desligado com reduced-motion.
const MAX_TILT = 6;

function attachTilt(card) {
  if (!canHover || prefersReducedMotion) return;

  let frame = null;

  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      card.classList.add('is-tilting');
      card.style.setProperty('--tilt-x', `${(-y * MAX_TILT).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * MAX_TILT).toFixed(2)}deg`);
    });
  });

  card.addEventListener('pointerleave', () => {
    if (frame) cancelAnimationFrame(frame);
    card.classList.remove('is-tilting');
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  });
}

window.LamitSite = { attachTilt };

initNavToggle();
initReveal();
