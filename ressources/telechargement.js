/* Formulaire de téléchargement des outils gratuits du blog.
   Le PDF s'ouvre tout de suite ; les coordonnées partent par e-mail à l'agence (FormSubmit). */
(function () {
  var DEST = 'https://formsubmit.co/ajax/contact@agence-dare-dare.fr';
  var T = {
    fr: { req: 'Merci de remplir votre nom et votre e-mail.', mail: 'Cet e-mail ne semble pas valide.', sujet: 'Téléchargement outil' },
    en: { req: 'Please fill in your name and email.', mail: 'This email does not look valid.', sujet: 'Tool download' }
  };
  document.querySelectorAll('.dl-form').forEach(function (f) {
    var L = T[f.dataset.lang] || T.fr, err = f.querySelector('.err'), ok = f.querySelector('.ok');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(f);
      if (d.get('_honey')) return;
      var nom = (d.get('nom') || '').trim(), email = (d.get('email') || '').trim(), soc = (d.get('societe') || '').trim();
      if (!nom || !email) { err.textContent = L.req; return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = L.mail; return; }
      err.textContent = '';
      var pdf = f.dataset.pdf;
      if (pdf && pdf !== '#') window.open(pdf, '_blank', 'noopener');
      var extra = (f.classList.contains('co2-form') && window.ddExtra) ? window.ddExtra() : null;
      ok.style.display = 'block';
      f.querySelectorAll('label,button').forEach(function (x) { x.style.display = 'none'; });
      try { window.dataLayer = window.dataLayer || []; dataLayer.push({ event: 'dd_outil', outil: f.dataset.outil }); } catch (x) {}
      fetch(DEST, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ _subject: L.sujet + ' : ' + f.dataset.outil, outil: f.dataset.outil, nom: nom, email: email, societe: soc,
          fonction: (d.get('fonction') || '').trim(), page: location.href, recontact: d.get('rgpd') ? 'oui' : 'non', _template: 'table', _captcha: 'false',
          estimation: extra ? JSON.stringify(extra) : undefined,
          _autoresponse: extra ? (f.dataset.lang === 'en'
            ? 'Your event carbon estimate (indicative, non-certified): ' + extra.total_kg + ' kg CO2e in total, ' + extra.par_participant_kg + ' kg per participant. Travel ' + extra.trajets_kg + ' kg, accommodation ' + extra.hebergement_kg + ' kg, meals and drinks ' + extra.repas_boissons_kg + ' kg, venue ' + extra.lieu_kg + ' kg, decor and goodies ' + extra.decor_goodies_kg + ' kg. Agence Dare-Dare, agence-dare-dare.fr'
            : 'Votre estimation carbone (indicative, non certifiée) : ' + extra.total_kg + ' kg CO2e au total, ' + extra.par_participant_kg + ' kg par participant. Trajets ' + extra.trajets_kg + ' kg, hébergement ' + extra.hebergement_kg + ' kg, repas et boissons ' + extra.repas_boissons_kg + ' kg, lieu ' + extra.lieu_kg + ' kg, décor et goodies ' + extra.decor_goodies_kg + ' kg. Agence Dare-Dare, agence-dare-dare.fr') : undefined })
      }).catch(function () {});
    });
  });
})();
