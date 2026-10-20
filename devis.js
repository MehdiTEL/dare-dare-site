/* DEVIS & SUIVI · Agence Dare-Dare
   1. Formulaire de devis (#devis-form) : compose un message prérempli,
      envoyé par WhatsApp ou par mail (aucune donnée stockée sur le site).
   2. Suivi des demandes : chaque clic WhatsApp, mail, téléphone ou envoi du formulaire
      pousse un événement dans le dataLayer de Google Tag Manager (dd_contact). */
(function () {
  var WA = '33681969362';
  var MAIL = 'contact@agence-dare-dare.fr';

  function track(channel, origin) {
    (window.dataLayer = window.dataLayer || []).push({
      event: 'dd_contact', contact_channel: channel, contact_origin: origin || location.pathname
    });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href');
    if (h.indexOf('wa.me') !== -1) track('whatsapp');
    else if (h.indexOf('mailto:') === 0) track('email');
    else if (h.indexOf('tel:') === 0) track('telephone');
    else if (h.indexOf('calendly.com') !== -1) track('calendly');
  });

  function initForm() {
    var form = document.getElementById('devis-form');
    if (!form) return;
    var en = document.documentElement.lang === 'en';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var via = (e.submitter && e.submitter.value) || 'whatsapp';
      var v = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ''; };
      var lines = en ? [
        'Hello Dare-Dare, here is my project:',
        'Event: ' + v('type'), 'Date: ' + (v('date') || 'to be defined'),
        'Guests: ' + v('invites'), 'Budget: ' + v('budget'), 'City: ' + v('ville'),
        v('message') ? 'Details: ' + v('message') : '', v('source') ? 'Found you via: ' + v('source') : '',
        '', v('nom') + (v('societe') ? ' (' + v('societe') + ')' : ''), v('tel')
      ] : [
        'Bonjour Dare-Dare, voici mon projet :',
        'Événement : ' + v('type'), 'Date : ' + (v('date') || 'à définir'),
        'Invités : ' + v('invites'), 'Budget : ' + v('budget'), 'Ville : ' + v('ville'),
        v('message') ? 'Précisions : ' + v('message') : '', v('source') ? 'Connu via : ' + v('source') : '',
        '', v('nom') + (v('societe') ? ' (' + v('societe') + ')' : ''), v('tel')
      ];
      var body = lines.filter(function (l, i) { return l !== '' || lines[i - 1] !== ''; }).join('\n');
      (window.dataLayer = window.dataLayer || []).push({
        event: 'dd_devis', contact_channel: via, event_type: v('type'), budget: v('budget'), source: v('source')
      });
      var url = via === 'email'
        ? 'mailto:' + MAIL + '?subject=' + encodeURIComponent((en ? 'Quote request · ' : 'Demande de devis · ') + v('type')) + '&body=' + encodeURIComponent(body)
        : 'https://wa.me/' + WA + '?text=' + encodeURIComponent(body);
      if (via === 'email') location.href = url; else window.open(url, '_blank', 'noopener');
      var ok = form.querySelector('.devis__ok');
      if (ok) ok.hidden = false;
    });
  }

  /* Bouton « Devis » toujours visible sur mobile (bas d'écran, à gauche du bouton WhatsApp) */
  function initSticky() {
    if (document.querySelector('.dd-sticky-devis')) return;
    var path = location.pathname, en = document.documentElement.lang === 'en';
    var href = document.getElementById('contact') ? '#contact'
      : (path.indexOf('/blog/en/') !== -1 ? '../../en/#contact' : (path.indexOf('/blog/') !== -1 ? '../#contact' : (en ? './#contact' : './#contact')));
    var a = document.createElement('a');
    a.className = 'dd-sticky-devis'; a.href = href;
    a.textContent = en ? 'Get a quote' : 'Demander un devis';
    var st = document.createElement('style');
    st.textContent = '.dd-sticky-devis{display:none}@media(max-width:768px){.dd-sticky-devis{display:flex;align-items:center;justify-content:center;position:fixed;left:16px;right:84px;bottom:calc(16px + env(safe-area-inset-bottom,0px));height:52px;z-index:900;background:#0A0A0A;color:#fff;border:1px solid #fff;font:700 12px/1 Inter,Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.25)}.dd-sticky-devis.dd-hide{opacity:0;pointer-events:none}}';
    document.head.appendChild(st); document.body.appendChild(a);
    var wa = document.querySelector('.whatsapp-float');
    function place() {
      if (!wa || innerWidth > 768) return;
      var r = wa.getBoundingClientRect();
      if (r.width) { a.style.right = (innerWidth - r.left + 12) + 'px'; a.style.bottom = (innerHeight - r.bottom) + 'px'; a.style.height = r.height + 'px'; }
    }
    place(); addEventListener('resize', place); setTimeout(place, 800);
    a.addEventListener('click', function () { track('sticky_devis'); });
    var c = document.getElementById('contact');
    if (c && 'IntersectionObserver' in window) new IntersectionObserver(function (e) { a.classList.toggle('dd-hide', e[0].isIntersecting); }).observe(c);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSticky);
  else initSticky();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initForm);
  else initForm();
})();
