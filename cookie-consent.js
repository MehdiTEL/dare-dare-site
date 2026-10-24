/* COOKIE CONSENT · Agence Dare-Dare
   Bandeau discret en bas de page, design maison. Mesure d'audience et publicités Google (Tag Manager, Ads)
   désactivées par défaut (Consent Mode) : elles ne s'activent qu'après « Oui, j'ose ».
   Choix mémorisé en localStorage : 'all' (accepté) ou 'refused' (refusé). */
(function () {
  var KEY = 'dd-cookie-consent';
  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) { /* localStorage indisponible : on affiche le bandeau */ }
  if (choice === 'all' || choice === 'refused') return;

  var path = location.pathname;
  var inEn = path.indexOf('/blog/en/') !== -1;
  var base = inEn ? '../../' : (path.indexOf('/blog/') !== -1 ? '../' : '');
  var en = inEn || document.documentElement.lang === 'en';

  var t = en ? {
    txt: 'A cookie? We dare to ask. It measures our audience and our Google ads. Nothing is tracked without your yes.',
    more: 'Learn more', yes: 'Yes, I dare', no: 'No thanks', label: 'Cookie consent'
  } : {
    txt: 'Un cookie ? On ose demander. Il sert à mesurer notre audience et nos publicités Google. Rien n\'est suivi sans votre oui.',
    more: 'En savoir plus', yes: 'Oui, j\'ose', no: 'Non merci', label: 'Consentement aux cookies'
  };

  var css = ''
    + '.dd-cookie{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;'
    + 'max-width:680px;margin:0 auto;background:#0A0A0A;color:#fff;'
    + 'border-radius:0;padding:16px 18px;display:flex;gap:14px;align-items:center;'
    + 'justify-content:space-between;flex-wrap:wrap;'
    + "font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;"
    + 'box-shadow:none;'
    + 'transform:translateY(160%);opacity:0;'
    + 'transition:transform .55s cubic-bezier(.16,1,.3,1),opacity .4s ease;}'
    + '.dd-cookie.dd-show{transform:translateY(0);opacity:1;}'
    + '.dd-cookie__txt{font-size:13px;line-height:1.55;flex:1 1 300px;color:#E6E6E6;margin:0;}'
    + '.dd-cookie__txt a{color:#fff;text-decoration:underline;text-underline-offset:2px;}'
    + '.dd-cookie__btns{display:flex;gap:8px;flex:0 0 auto;}'
    + '.dd-cookie__btn{background:#fff;color:#0A0A0A;border:1px solid #fff;'
    + 'font-family:inherit;font-weight:700;font-size:12px;letter-spacing:.08em;'
    + 'text-transform:uppercase;padding:12px 20px;border-radius:0;cursor:pointer;'
    + 'transition:opacity .2s ease;}'
    + '.dd-cookie__btn--ghost{background:transparent;color:#fff;}'
    + '.dd-cookie__btn:hover{opacity:.78;}'
    + '@media(max-width:520px){.dd-cookie{flex-direction:column;align-items:stretch;}'
    + '.dd-cookie__txt{flex:0 0 auto;font-size:12.5px;}.dd-cookie{padding:14px 16px;gap:10px;}'
    + '.dd-cookie__btns{width:100%;}.dd-cookie__btn{flex:1;padding:11px;}}';

  function save(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    if (value === 'all' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted', ad_user_data: 'granted',
        ad_personalization: 'granted', analytics_storage: 'granted'
      });
      (window.dataLayer = window.dataLayer || []).push({ event: 'dd_consent_granted' });
    }
  }

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.className = 'dd-cookie';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', t.label);
    bar.innerHTML =
      '<p class="dd-cookie__txt">' + t.txt + ' '
      + '<a href="' + (en ? '/en/privacy-policy.html' : '/politique-confidentialite.html') + '">' + t.more + '</a></p>'
      + '<div class="dd-cookie__btns">'
      + '<button class="dd-cookie__btn dd-cookie__btn--ghost" type="button" data-choice="refused">' + t.no + '</button>'
      + '<button class="dd-cookie__btn" type="button" data-choice="all">' + t.yes + '</button>'
      + '</div>';
    document.body.appendChild(bar);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bar.classList.add('dd-show'); });
    });

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-choice]');
      if (!btn) return;
      save(btn.getAttribute('data-choice'));
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
