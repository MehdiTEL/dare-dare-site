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
        v('message') ? 'Details: ' + v('message') : '',
        '', v('nom') + (v('societe') ? ' (' + v('societe') + ')' : ''), v('tel')
      ] : [
        'Bonjour Dare-Dare, voici mon projet :',
        'Événement : ' + v('type'), 'Date : ' + (v('date') || 'à définir'),
        'Invités : ' + v('invites'), 'Budget : ' + v('budget'), 'Ville : ' + v('ville'),
        v('message') ? 'Précisions : ' + v('message') : '',
        '', v('nom') + (v('societe') ? ' (' + v('societe') + ')' : ''), v('tel')
      ];
      var body = lines.filter(function (l, i) { return l !== '' || i === lines.length - 3; }).join('\n');
      (window.dataLayer = window.dataLayer || []).push({
        event: 'dd_devis', contact_channel: via, event_type: v('type'), budget: v('budget')
      });
      var url = via === 'email'
        ? 'mailto:' + MAIL + '?subject=' + encodeURIComponent((en ? 'Quote request · ' : 'Demande de devis · ') + v('type')) + '&body=' + encodeURIComponent(body)
        : 'https://wa.me/' + WA + '?text=' + encodeURIComponent(body);
      if (via === 'email') location.href = url; else window.open(url, '_blank', 'noopener');
      var ok = form.querySelector('.devis__ok');
      if (ok) ok.hidden = false;
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initForm);
  else initForm();
})();
