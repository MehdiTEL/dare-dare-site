/* Formulaire de téléchargement des outils gratuits du blog.
   Le PDF s'ouvre tout de suite ; les coordonnées partent par e-mail à l'agence (FormSubmit). */
(function () {
  var DEST = 'https://formsubmit.co/ajax/contact@agence-dare-dare.fr';
  var T = {
    fr: { req: 'Merci de remplir votre nom, votre e-mail, votre société et de cocher la case.', mail: 'Cet e-mail ne semble pas valide.', sujet: 'Téléchargement outil' },
    en: { req: 'Please fill in your name, email and company, and tick the box.', mail: 'This email does not look valid.', sujet: 'Tool download' }
  };
  document.querySelectorAll('.dl-form').forEach(function (f) {
    var L = T[f.dataset.lang] || T.fr, err = f.querySelector('.err'), ok = f.querySelector('.ok');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(f);
      if (d.get('_honey')) return;
      var nom = (d.get('nom') || '').trim(), email = (d.get('email') || '').trim(), soc = (d.get('societe') || '').trim();
      if (!nom || !email || !soc || !d.get('rgpd')) { err.textContent = L.req; return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = L.mail; return; }
      err.textContent = '';
      var pdf = f.dataset.pdf;
      window.open(pdf, '_blank', 'noopener');
      ok.style.display = 'block';
      f.querySelectorAll('label,button').forEach(function (x) { x.style.display = 'none'; });
      try { window.dataLayer = window.dataLayer || []; dataLayer.push({ event: 'dd_outil', outil: f.dataset.outil }); } catch (x) {}
      fetch(DEST, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ _subject: L.sujet + ' : ' + f.dataset.outil, outil: f.dataset.outil, nom: nom, email: email, societe: soc,
          fonction: (d.get('fonction') || '').trim(), page: location.href, consentement: 'oui', _template: 'table', _captcha: 'false' })
      }).catch(function () {});
    });
  });
})();
