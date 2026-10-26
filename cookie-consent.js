/* COOKIE CONSENT · Agence Dare-Dare
   Rien de tiers n'est chargé avant le choix du visiteur : Google Tag Manager, Google Ads (gtag.js) et le lecteur
   Pinterest ne s'ajoutent à la page qu'après accord, finalité par finalité (mesure d'audience, publicité, Pinterest).
   « Refuser » est aussi simple qu'« Accepter ». Le choix est gardé 13 mois s'il contient un accord, 6 mois s'il est
   un refus (recommandations CNIL), puis le bandeau revient. « Gérer les cookies » (pied de page) rouvre le choix.
   Stockage : localStorage 'dd-cookie-consent' = {"v":2,"t":horodatage,"a":audience,"ads":publicité,"pin":Pinterest}. */
(function () {
  var KEY = 'dd-cookie-consent';
  var GTM = 'GTM-T9L5BNM4', AW = 'AW-18516847281';
  var DAY = 864e5, KEEP_YES = 395 * DAY, KEEP_NO = 182 * DAY;

  var en = document.documentElement.lang === 'en';
  var policy = en ? '/en/cookie-policy.html' : '/politique-cookies.html';
  var t = en ? {
    txt: 'A cookie? We dare to ask. With your yes, we measure our audience and our Google ads, and show Pinterest images. Nothing is loaded without your choice.',
    more: 'Cookie policy', yes: 'Accept', no: 'Refuse', custom: 'Customise', save: 'Save my choices', label: 'Cookie consent',
    a: 'Audience measurement (Google Analytics, via Google Tag Manager)',
    ads: 'Advertising measurement and remarketing (Google Ads)',
    pin: 'Pinterest images (Pinterest player, may set Pinterest cookies)',
    manage: 'Manage cookies', pinPh: 'Image hosted on Pinterest', pinBtn: 'Show Pinterest images'
  } : {
    txt: 'Un cookie ? On ose demander. Avec votre accord, nous mesurons notre audience et nos publicités Google, et affichons les images Pinterest. Rien n\'est chargé sans votre choix.',
    more: 'Politique cookies', yes: 'Accepter', no: 'Refuser', custom: 'Personnaliser', save: 'Enregistrer mes choix', label: 'Consentement aux cookies',
    a: 'Mesure d\'audience (Google Analytics, via Google Tag Manager)',
    ads: 'Mesure des publicités et remarketing (Google Ads)',
    pin: 'Images Pinterest (lecteur Pinterest, peut déposer des cookies Pinterest)',
    manage: 'Gérer les cookies', pinPh: 'Image hébergée sur Pinterest', pinBtn: 'Afficher les images Pinterest'
  };

  function read() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { return null; }
    if (!raw) return null;
    // Anciens choix (avant le 27/10/2026) : convertis une fois, avec la date du jour
    if (raw === 'all') return write({ a: true, ads: true, pin: true });
    if (raw === 'refused') return write({ a: false, ads: false, pin: false });
    var c;
    try { c = JSON.parse(raw); } catch (e) { return null; }
    if (!c || c.v !== 2 || typeof c.t !== 'number') return null;
    var keep = (c.a || c.ads || c.pin) ? KEEP_YES : KEEP_NO;
    if (Date.now() - c.t > keep) return null;
    return c;
  }

  function write(c) {
    c = { v: 2, t: Date.now(), a: !!c.a, ads: !!c.ads, pin: !!c.pin };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    return c;
  }

  function addScript(src) {
    var s = document.createElement('script');
    s.async = true; s.src = src;
    document.head.appendChild(s);
  }

  var loaded = {};
  function apply(c) {
    if (!c) return;
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: c.a ? 'granted' : 'denied',
        ad_storage: c.ads ? 'granted' : 'denied',
        ad_user_data: c.ads ? 'granted' : 'denied',
        ad_personalization: c.ads ? 'granted' : 'denied'
      });
    }
    if ((c.a || c.ads) && !loaded.gtm) {
      loaded.gtm = true;
      (window.dataLayer = window.dataLayer || []).push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      addScript('https://www.googletagmanager.com/gtm.js?id=' + GTM);
      window.dataLayer.push({ event: 'dd_consent_granted' });
    }
    if (c.ads && !loaded.aw) {
      loaded.aw = true;
      addScript('https://www.googletagmanager.com/gtag/js?id=' + AW);
    }
    if (c.pin) loadPinterest();
  }

  function loadPinterest() {
    if (loaded.pin) return;
    loaded.pin = true;
    var ph = document.querySelectorAll('.dd-pin-ph');
    for (var i = 0; i < ph.length; i++) ph[i].parentNode.removeChild(ph[i]);
    if (document.querySelector('a[data-pin-do]')) addScript('https://assets.pinterest.com/js/pinit.js');
  }

  var css = ''
    + '.dd-cookie{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:720px;margin:0 auto;'
    + 'background:#0A0A0A;color:#fff;padding:16px 18px;display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap;'
    + "font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;"
    + 'transform:translateY(160%);opacity:0;transition:transform .55s cubic-bezier(.16,1,.3,1),opacity .4s ease;}'
    + '.dd-cookie.dd-show{transform:translateY(0);opacity:1;}'
    + '.dd-cookie__txt{font-size:13px;line-height:1.55;flex:1 1 300px;color:#E6E6E6;margin:0;}'
    + '.dd-cookie__txt a{color:#fff;text-decoration:underline;text-underline-offset:2px;}'
    + '.dd-cookie__btns{display:flex;gap:8px;flex:0 0 auto;flex-wrap:wrap;}'
    + '.dd-cookie__btn{background:#fff;color:#0A0A0A;border:1px solid #fff;font-family:inherit;font-weight:700;font-size:12px;'
    + 'letter-spacing:.08em;text-transform:uppercase;padding:12px 18px;border-radius:0;cursor:pointer;}'
    + '.dd-cookie__btn--link{background:transparent;color:#fff;}'
    + '.dd-cookie__btn:focus-visible,.dd-cookie input:focus-visible{outline:2px solid #fff;outline-offset:3px;}'
    + '.dd-cookie__opts{flex:1 1 100%;display:none;margin:0;padding:0;border:0;}'
    + '.dd-cookie.dd-custom .dd-cookie__opts{display:block;}'
    + '.dd-cookie__opts label{display:flex;gap:10px;align-items:flex-start;font-size:13px;line-height:1.5;color:#E6E6E6;padding:6px 0;cursor:pointer;}'
    + '.dd-cookie__opts input{margin-top:3px;width:16px;height:16px;accent-color:#fff;flex:0 0 auto;}'
    + '@media(max-width:520px){.dd-cookie{flex-direction:column;align-items:stretch;padding:14px 16px;gap:10px;}'
    + '.dd-cookie__txt{flex:0 0 auto;font-size:12.5px;}.dd-cookie__btns{width:100%;}.dd-cookie__btn{flex:1 1 30%;padding:11px 8px;}}'
    + '.dd-pin-ph{display:block;border:1px solid currentColor;padding:14px 16px;margin:8px 0;font-size:13px;line-height:1.5;}'
    + '.dd-pin-ph button{margin-top:8px;background:#0A0A0A;color:#fff;border:1px solid #0A0A0A;font:inherit;font-weight:700;'
    + 'font-size:12px;letter-spacing:.06em;text-transform:uppercase;padding:10px 14px;cursor:pointer;}'
    + '.dd-pin-ph button:focus-visible{outline:2px solid #0A0A0A;outline-offset:3px;}'
    + '.dd-cookie-manage{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline;cursor:pointer;}';

  var bar = null;
  function open() {
    if (bar) return;
    var c = read() || { a: false, ads: false, pin: false };
    bar = document.createElement('div');
    bar.className = 'dd-cookie';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', t.label);
    bar.innerHTML =
      '<p class="dd-cookie__txt">' + t.txt + ' <a href="' + policy + '">' + t.more + '</a></p>'
      + '<fieldset class="dd-cookie__opts"><legend class="dd-cookie__txt" style="padding:0 0 4px">' + t.custom + '</legend>'
      + '<label><input type="checkbox" name="a"' + (c.a ? ' checked' : '') + '> ' + t.a + '</label>'
      + '<label><input type="checkbox" name="ads"' + (c.ads ? ' checked' : '') + '> ' + t.ads + '</label>'
      + '<label><input type="checkbox" name="pin"' + (c.pin ? ' checked' : '') + '> ' + t.pin + '</label></fieldset>'
      + '<div class="dd-cookie__btns">'
      + '<button class="dd-cookie__btn" type="button" data-choice="refused">' + t.no + '</button>'
      + '<button class="dd-cookie__btn dd-cookie__btn--link" type="button" data-choice="custom" aria-expanded="false">' + t.custom + '</button>'
      + '<button class="dd-cookie__btn" type="button" data-choice="all">' + t.yes + '</button>'
      + '</div>';
    document.body.appendChild(bar);
    // Double rAF pour l'animation, et un minuteur de secours si l'onglet ne dessine pas encore
    var b0 = bar, show = function () { b0.classList.add('dd-show'); };
    requestAnimationFrame(function () { requestAnimationFrame(show); });
    setTimeout(show, 120);

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-choice]');
      if (!btn) return;
      var k = btn.getAttribute('data-choice');
      if (k === 'custom') {
        bar.classList.add('dd-custom');
        btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('data-choice', 'save');
        btn.textContent = t.save;
        var first = bar.querySelector('.dd-cookie__opts input');
        if (first) first.focus();
        return;
      }
      var box = function (n) { return bar.querySelector('input[name="' + n + '"]').checked; };
      var choice = k === 'all' ? { a: true, ads: true, pin: true }
        : k === 'refused' ? { a: false, ads: false, pin: false }
        : { a: box('a'), ads: box('ads'), pin: box('pin') };
      var before = read();
      var saved = write(choice);
      close();
      // Un accord retiré ne se défait pas sur la page déjà chargée : on recharge pour repartir sans les scripts
      if (before && ((before.a && !saved.a) || (before.ads && !saved.ads) || (before.pin && !saved.pin))) {
        location.reload();
        return;
      }
      apply(saved);
    });
  }

  function close() {
    if (!bar) return;
    var b = bar; bar = null;
    b.classList.remove('dd-show');
    setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 550);
  }

  function pinPlaceholders() {
    var pins = document.querySelectorAll('a[data-pin-do]');
    for (var i = 0; i < pins.length; i++) {
      var p = pins[i];
      var ph = document.createElement('span');
      ph.className = 'dd-pin-ph';
      // Le lien de l'épingle (avec sa description) reste visible ; on ajoute dessous le choix d'afficher l'image
      ph.innerHTML = t.pinPh + '.<br><button type="button">' + t.pinBtn + '</button>';
      p.parentNode.insertBefore(ph, p.nextSibling);
    }
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.dd-pin-ph button')) return;
      var c = read() || { a: false, ads: false, pin: false };
      c.pin = true;
      apply(write(c));
    });
  }

  function manageLink() {
    // Pied de page des pages services, puis du blog, puis des pages légales
    var host = document.querySelector('.footer__legal span:last-child');
    if (!host) { var copy = document.querySelectorAll('.blog-footer__copy'); host = copy[copy.length - 1]; }
    if (!host) host = document.querySelector('footer p:nth-of-type(2)') || document.querySelector('footer');
    if (!host) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'dd-cookie-manage'; b.textContent = t.manage;
    b.addEventListener('click', open);
    if (host.tagName !== 'FOOTER') host.appendChild(document.createTextNode(' · '));
    host.appendChild(b);
  }

  window.ddCookies = { open: open };

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    var c = read();
    if (!c || !c.pin) pinPlaceholders();
    manageLink();
    if (c) apply(c); else open();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
