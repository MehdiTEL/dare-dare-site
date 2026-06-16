/* COOKIE CONSENT · Agence Dare-Dare
   Bandeau discret en bas de page, design maison. Cookies techniques uniquement,
   donc un simple acquittement suffit (RGPD). Choix mémorisé en localStorage. */
(function () {
  try {
    if (localStorage.getItem('dd-cookie-consent') === 'ok') return;
  } catch (e) { /* localStorage indisponible : on affiche quand même le bandeau */ }

  var inBlog = location.pathname.indexOf('/blog/') !== -1;
  var base = inBlog ? '../' : '';

  var css = ''
    + '.dd-cookie{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;'
    + 'max-width:660px;margin:0 auto;background:#0A0A0A;color:#fff;'
    + 'border-radius:6px;padding:16px 18px;display:flex;gap:18px;align-items:center;'
    + 'justify-content:space-between;flex-wrap:wrap;'
    + "font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;"
    + 'box-shadow:0 16px 48px rgba(0,0,0,.4);'
    + 'transform:translateY(160%);opacity:0;'
    + 'transition:transform .55s cubic-bezier(.16,1,.3,1),opacity .4s ease;}'
    + '.dd-cookie.dd-show{transform:translateY(0);opacity:1;}'
    + '.dd-cookie__txt{font-size:13px;line-height:1.55;flex:1 1 300px;color:#E6E6E6;margin:0;}'
    + '.dd-cookie__txt a{color:#fff;text-decoration:underline;text-underline-offset:2px;}'
    + '.dd-cookie__btn{flex:0 0 auto;background:#fff;color:#0A0A0A;border:none;'
    + 'font-family:inherit;font-weight:700;font-size:12px;letter-spacing:.08em;'
    + 'text-transform:uppercase;padding:12px 26px;border-radius:2px;cursor:pointer;'
    + 'transition:opacity .2s ease;}'
    + '.dd-cookie__btn:hover{opacity:.78;}'
    + '@media(max-width:520px){.dd-cookie{flex-direction:column;align-items:stretch;}'
    + '.dd-cookie__btn{width:100%;padding:13px;}}';

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.className = 'dd-cookie';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Consentement aux cookies');
    bar.innerHTML =
      '<p class="dd-cookie__txt">🍪 Quelques cookies, et uniquement techniques — jamais pour vous pister. '
      + 'On est bien meilleurs en événements qu\'en pâtisserie. '
      + '<a href="' + base + 'politique-confidentialite.html">En savoir plus</a></p>'
      + '<button class="dd-cookie__btn" type="button">J\'accepte</button>';
    document.body.appendChild(bar);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bar.classList.add('dd-show'); });
    });

    bar.querySelector('.dd-cookie__btn').addEventListener('click', function () {
      try { localStorage.setItem('dd-cookie-consent', 'ok'); } catch (e) {}
      bar.classList.remove('dd-show');
      setTimeout(function () { bar.remove(); }, 550);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
