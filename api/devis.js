/* Formulaire de devis · Agence Dare-Dare
   Reçoit la demande du site (devis.js) et l'envoie par la boîte IONOS de l'agence :
   un mail à contact@ (réponse directe au client) + un accusé de réception au client.
   Variables Vercel : SMTP_USER (contact@agence-dare-dare.fr), SMTP_PASS (mot de passe de la boîte). */
const nodemailer = require('nodemailer');

const MAIL = 'contact@agence-dare-dare.fr';
const LABELS = {
  type: 'Événement', date: 'Date', invites: 'Invités', budget: 'Budget', ville: 'Ville',
  nom: 'Nom', societe: 'Société', email: 'E-mail', tel: 'Téléphone', message: 'Précisions',
  source: 'Connu via', canal_choisi: 'Canal', consentement_rgpd: 'Consentement RGPD',
  porte: 'Porte d\'entrée', defi: 'Défi', page: 'Page', gclid: 'gclid',
  utm_source: 'utm_source', utm_medium: 'utm_medium', utm_campaign: 'utm_campaign', utm_term: 'utm_term'
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clean = s => String(s == null ? '' : s).slice(0, 3000).trim();

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ success: false });
  let d = req.body || {};
  if (typeof d === 'string') { try { d = JSON.parse(d); } catch (e) { d = {}; } }
  if (d._honey) return res.status(200).json({ success: true });

  const email = clean(d.email);
  if (!clean(d.nom) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false });
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return res.status(503).json({ success: false });

  const rows = Object.keys(LABELS).filter(k => clean(d[k])).map(k => [LABELS[k], clean(d[k])]);
  const text = rows.map(([k, v]) => k + ' : ' + v).join('\n');
  const html = '<table cellpadding="6" style="border-collapse:collapse;font:14px/1.5 Arial,sans-serif">' +
    rows.map(([k, v]) => '<tr><td style="color:#8C8580;vertical-align:top">' + esc(k) + '</td><td>' + esc(v).replace(/\n/g, '<br>') + '</td></tr>').join('') +
    '</table>';

  const smtp = nodemailer.createTransport({
    host: 'smtp.ionos.fr', port: 465, secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  const from = '"Agence Dare-Dare" <' + process.env.SMTP_USER + '>';

  try {
    await smtp.sendMail({
      from, to: MAIL, replyTo: email,
      subject: clean(d._subject) || 'Demande de devis · ' + clean(d.nom),
      text, html
    });
  } catch (e) {
    console.error('devis: envoi agence', e.message);
    return res.status(502).json({ success: false });
  }
  /* L'accusé de réception ne bloque jamais la demande */
  if (clean(d._autoresponse)) {
    await smtp.sendMail({ from, to: email, subject: 'Agence Dare-Dare', text: clean(d._autoresponse) })
      .catch(e => console.error('devis: accusé', e.message));
  }
  return res.status(200).json({ success: true });
};
