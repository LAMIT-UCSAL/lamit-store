// Intro de primeira visita: um círculo revela o escudo da LAMIT e depois se abre sobre a página (~2,5 s).
// Carregado sem defer, logo no começo do <body>, para cobrir a tela antes da primeira pintura.
// O mesmo arquivo serve a loja (js/intro.js) e o site (public/intro.js); o CSS vem embutido porque
// no site o CSS da página só carrega depois, junto com o React.
// Ficam de fora: quem já viu a intro, quem pede movimento reduzido, quem navega sem JS e robôs.
// Clique, toque ou qualquer tecla pulam a intro.
(function () {
  var KEY = 'lamit-intro-seen';
  var script = document.currentScript;

  if (navigator.webdriver) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    if (localStorage.getItem(KEY)) return;
    localStorage.setItem(KEY, '1');
  } catch (e) {
    return; // sem armazenamento não dá para lembrar a visita: melhor não repetir a intro sempre
  }

  var logo = script.getAttribute('data-logo');
  var label = script.getAttribute('data-label');

  var css =
    '@property --lamit-intro-hole{syntax:"<percentage>";inherits:false;initial-value:0%}' +
    '.lamit-intro{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;background:#081536;color:#fff;' +
      '--lamit-intro-hole:0%;' +
      '-webkit-mask-image:radial-gradient(circle at 50% 50%,transparent var(--lamit-intro-hole),#000 calc(var(--lamit-intro-hole) + .5%));' +
      'mask-image:radial-gradient(circle at 50% 50%,transparent var(--lamit-intro-hole),#000 calc(var(--lamit-intro-hole) + .5%))}' +
    '.lamit-intro__mark{display:flex;flex-direction:column;align-items:center;gap:18px;clip-path:circle(0% at 50% 50%)}' +
    '.lamit-intro__mark img{display:block;width:clamp(96px,16vw,148px);height:auto}' +
    '.lamit-intro__name{font:800 clamp(26px,4.4vw,40px)/1 Montserrat,-apple-system,"Segoe UI",sans-serif;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap}' +
    '.lamit-intro__name span{font-weight:500}' +
    /* 1) o círculo revela o escudo e o nome; 2) a marca cresce e some; 3) um buraco abre a tela a partir do centro */
    '.lamit-intro.is-ready .lamit-intro__mark{animation:lamit-intro-reveal .8s cubic-bezier(.2,.7,.2,1) .1s forwards,lamit-intro-out .45s cubic-bezier(.7,0,.84,0) 1.6s forwards}' +
    '.lamit-intro.is-ready .lamit-intro__mark img{animation:lamit-intro-settle 1.5s cubic-bezier(.2,.7,.2,1) both}' +
    '.lamit-intro.is-ready{animation:lamit-intro-open .75s cubic-bezier(.65,0,.35,1) 1.75s forwards}' +
    '.lamit-intro.is-skipped{animation:lamit-intro-fade .3s ease forwards!important}' +
    '@keyframes lamit-intro-reveal{to{clip-path:circle(75% at 50% 50%)}}' +
    '@keyframes lamit-intro-settle{from{transform:scale(1.14)}}' +
    '@keyframes lamit-intro-out{to{transform:scale(1.12);opacity:0}}' +
    '@keyframes lamit-intro-open{to{--lamit-intro-hole:101%}}' +
    '@keyframes lamit-intro-fade{to{opacity:0}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.className = 'lamit-intro';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<div class="lamit-intro__mark">' +
      '<img src="' + logo + '" alt="" width="158" height="192">' +
      '<p class="lamit-intro__name">LAMIT' + (label ? ' <span>' + label + '</span>' : '') + '</p>' +
    '</div>';
  document.body.insertBefore(overlay, document.body.firstChild);

  var root = document.documentElement;
  var previousOverflow = root.style.overflow;
  root.style.overflow = 'hidden';

  var finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    root.style.overflow = previousOverflow;
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    style.parentNode.removeChild(style);
    ['pointerdown', 'keydown'].forEach(function (type) { window.removeEventListener(type, skip, true); });
  }

  function skip() {
    if (finished || overlay.classList.contains('is-skipped')) return;
    overlay.classList.add('is-skipped');
    setTimeout(finish, 320);
  }

  ['pointerdown', 'keydown'].forEach(function (type) { window.addEventListener(type, skip, true); });

  // A animação só começa com o escudo carregado (ou após 600 ms, para nunca segurar a página)
  var started = false;
  function start() {
    if (started) return;
    started = true;
    overlay.classList.add('is-ready');
    setTimeout(finish, 2600);
  }
  var img = overlay.querySelector('img');
  if (img.complete) start();
  else {
    img.addEventListener('load', start);
    img.addEventListener('error', start);
    setTimeout(start, 600);
  }
})();
