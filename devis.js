/* DEVIS & SUIVI · Agence Dare-Dare
   1. Formulaire de devis (#devis-form) : enregistre la demande (FormSubmit, mail à l'agence + accusé de réception),
      puis redirige vers la page Merci. Si l'envoi échoue : repli WhatsApp / mail avec le message prérempli.
      Origine de la demande (page, porte, Défi, gclid, utm_*) gardée en sessionStorage et envoyée en champs cachés.
   2. Suivi des demandes : chaque clic WhatsApp, mail, téléphone ou envoi du formulaire
      pousse un événement dans le dataLayer de Google Tag Manager (dd_contact). */
(function () {
  var WA = '33681969362';
  var MAIL = 'contact@agence-dare-dare.fr';
  var DEST = 'https://formsubmit.co/ajax/' + MAIL;

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

  /* ---------- Origine de la demande (gardée le temps de la visite) ---------- */
  var KEYS = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term'];
  function sget(k) { try { return sessionStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function sdel(k) { try { sessionStorage.removeItem(k); } catch (e) {} }

  function porteDe(path) {
    if (/lancement-produit|product-launch|influence|voyage-de-presse|press-trip/.test(path)) return 'marques';
    if (/soiree-entreprise|corporate-party|seminaire|corporate-retreat/.test(path)) return 'equipes';
    return '';
  }

  function capture() {
    try {
      var p = new URLSearchParams(location.search);
      KEYS.forEach(function (k) { var v = (p.get(k) || '').slice(0, 200); if (v) sset('dd_' + k, v); });
    } catch (e) {}
    if (!sget('dd_arrivee')) {
      sset('dd_arrivee', location.pathname);
      try { sset('dd_referrer', document.referrer ? new URL(document.referrer).hostname : ''); } catch (e) {}
    }
    var po = porteDe(location.pathname);
    if (po) sset('dd_porte', po);
  }
  capture();

  /* Champs cachés + e-mail + anti-spam, ajoutés au formulaire (aucune modif de HTML nécessaire) */
  function prepare(form, en) {
    if (form.getAttribute('data-dd-ready')) return;
    form.setAttribute('data-dd-ready', '1');
    function hidden(name, value) {
      var i = document.createElement('input');
      i.type = 'hidden'; i.name = name; i.value = value || ''; i.setAttribute('data-dd-hidden', '1');
      form.appendChild(i);
    }
    hidden('page_origine', location.origin + location.pathname);
    hidden('page_arrivee', sget('dd_arrivee'));
    hidden('referrer', sget('dd_referrer'));
    hidden('porte', porteDe(location.pathname) || sget('dd_porte'));
    hidden('defi', sget('dd_defi'));
    KEYS.forEach(function (k) { hidden(k, sget('dd_' + k)); });
    hidden('langue', en ? 'en' : 'fr');

    var hp = document.createElement('input');
    hp.type = 'text'; hp.name = '_honey'; hp.tabIndex = -1; hp.autocomplete = 'off'; hp.setAttribute('aria-hidden', 'true');
    hp.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0';
    form.appendChild(hp);

    /* E-mail (nécessaire à l'accusé de réception) ; le téléphone devient facultatif */
    if (!form.elements.email) {
      var tel = form.elements.tel, telLabel = tel && tel.closest('label');
      var lab = document.createElement('label');
      lab.className = 'devis__field';
      lab.innerHTML = '<span></span><input name="email" id="devis-email" type="email" autocomplete="email" inputmode="email" required>';
      lab.firstChild.textContent = en ? 'Email' : 'E-mail';
      if (telLabel) {
        telLabel.parentNode.insertBefore(lab, telLabel);
        tel.required = false;
        var sp = telLabel.querySelector('span');
        if (sp) { sp.removeAttribute('data-i18n'); sp.textContent = en ? 'Phone (optional)' : 'Téléphone (facultatif)'; }
      } else {
        var g = form.querySelector('.devis__grid'); if (g) g.appendChild(lab);
      }
    }

    var err = document.createElement('p');
    err.className = 'devis__err'; err.setAttribute('role', 'alert'); err.hidden = true;
    var actions = form.querySelector('.devis__actions');
    if (actions && actions.parentNode) actions.parentNode.insertBefore(err, actions.nextSibling); else form.appendChild(err);
  }

  /* ---------- Envoi à FormSubmit (AJAX) ---------- */
  function send(payload) {
    var ctl = ('AbortController' in window) ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 15000);
    return fetch(DEST, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) {
      clearTimeout(timer);
      return r.json().then(function (j) {
        if (!r.ok || !(j && (j.success === true || j.success === 'true'))) throw new Error('formsubmit');
        return j;
      });
    }, function (e) { clearTimeout(timer); throw e; });
  }

  function initForm() {
    var form = document.getElementById('devis-form');
    if (!form) return;
    var en = document.documentElement.lang === 'en';
    prepare(form, en);
    var busy = false;
    var T = en ? {
      subj: 'Quote request', ok: 'Request received, redirecting…',
      auto: 'We have received your request. Reply within 24 hours, with a first idea and not a quote. Agence Dare-Dare',
      fail: 'We could not save your request on our site (connection). It is not lost: ',
      wa: 'send it on WhatsApp', or: ' or ', mail: 'send it by email', end: '.'
    } : {
      subj: 'Demande de devis', ok: 'Demande bien reçue, nous vous redirigeons…',
      auto: 'Nous avons bien reçu votre demande. Réponse sous 24 h, avec une première idée et pas un devis. Agence Dare-Dare',
      fail: 'Nous n’avons pas pu enregistrer votre demande sur notre site (connexion). Elle n’est pas perdue : ',
      wa: 'envoyez-la par WhatsApp', or: ' ou ', mail: 'envoyez-la par mail', end: '.'
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      var hp = form.elements._honey;
      if (hp && hp.value) return;
      if (!form.reportValidity()) return;
      var via = (e.submitter && e.submitter.value) || 'whatsapp';
      var v = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ''; };
      var lines = en ? [
        'Hello Dare-Dare, here is my project:',
        'Event: ' + v('type'), 'Date: ' + (v('date') || 'to be defined'),
        'Guests: ' + v('invites'), 'Budget: ' + v('budget'), 'City: ' + v('ville'),
        v('message') ? 'Details: ' + v('message') : '', v('source') ? 'Found you via: ' + v('source') : '',
        '', v('nom') + (v('societe') ? ' (' + v('societe') + ')' : ''), v('email'), v('tel')
      ] : [
        'Bonjour Dare-Dare, voici mon projet :',
        'Événement : ' + v('type'), 'Date : ' + (v('date') || 'à définir'),
        'Invités : ' + v('invites'), 'Budget : ' + v('budget'), 'Ville : ' + v('ville'),
        v('message') ? 'Précisions : ' + v('message') : '', v('source') ? 'Connu via : ' + v('source') : '',
        '', v('nom') + (v('societe') ? ' (' + v('societe') + ')' : ''), v('email'), v('tel')
      ];
      var body = lines.filter(function (l, i) { return l !== '' || lines[i - 1] !== ''; }).join('\n');
      var mailUrl = 'mailto:' + MAIL + '?subject=' + encodeURIComponent((en ? 'Quote request · ' : 'Demande de devis · ') + v('type')) + '&body=' + encodeURIComponent(body);
      var waUrl = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(body);

      /* Phrase du Défi : début du message si elle vient du bloc « Je vous mets au défi de… » */
      var m = v('message'), dm = m.match(/^(?:Je vous mets au défi de|I dare you to)\s+([^\n]+)/i);
      if (dm && form.elements.defi) form.elements.defi.value = dm[1].trim();
      else if (form.elements.defi) form.elements.defi.value = '';

      var payload = {
        _subject: T.subj + ' · ' + v('type') + ' · ' + v('nom') + (v('societe') ? ' (' + v('societe') + ')' : ''),
        _template: 'table', _captcha: 'false', _autoresponse: T.auto,
        type: v('type'), date: v('date'), invites: v('invites'), budget: v('budget'), ville: v('ville'),
        nom: v('nom'), societe: v('societe'), email: v('email'), tel: v('tel'), message: m, source: v('source'),
        canal_choisi: via
      };
      form.querySelectorAll('input[data-dd-hidden]').forEach(function (h) { if (h.value) payload[h.name] = h.value; });

      /* WhatsApp s'ouvre tout de suite (comportement d'origine, sinon le navigateur bloque la fenêtre) */
      if (via !== 'email') window.open(waUrl, '_blank', 'noopener');

      var err = form.querySelector('.devis__err'), ok = form.querySelector('.devis__ok');
      if (err) err.hidden = true;
      busy = true; form.setAttribute('aria-busy', 'true');
      form.querySelectorAll('button[type=submit]').forEach(function (b) { b.disabled = true; });

      send(payload).then(function () {
        (window.dataLayer = window.dataLayer || []).push({
          event: 'dd_devis', contact_channel: via, event_type: v('type'), budget: v('budget'), source: v('source'),
          porte: payload.porte || '', defi: payload.defi ? 'oui' : 'non'
        });
        sset('dd_merci', '1');
        if (ok) { ok.textContent = T.ok; ok.hidden = false; }
        var base = en ? '/en/thank-you.html' : '/merci.html';
        setTimeout(function () { location.href = base + '?from=' + encodeURIComponent(location.pathname); }, 300);
      }).catch(function () {
        (window.dataLayer = window.dataLayer || []).push({ event: 'dd_devis_erreur', contact_channel: via });
        busy = false; form.removeAttribute('aria-busy');
        form.querySelectorAll('button[type=submit]').forEach(function (b) { b.disabled = false; });
        if (err) {
          err.textContent = T.fail;
          var a1 = document.createElement('a'), a2 = document.createElement('a');
          a1.href = waUrl; a1.target = '_blank'; a1.rel = 'noopener'; a1.textContent = T.wa;
          a2.href = mailUrl; a2.textContent = T.mail;
          err.appendChild(a1); err.appendChild(document.createTextNode(T.or)); err.appendChild(a2); err.appendChild(document.createTextNode(T.end));
          err.hidden = false;
        }
        if (via === 'email') location.href = mailUrl;
      });
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
