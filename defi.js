/* LE DÉFI SUR LA PAGE · Agence Dare-Dare
   Bloc « Je vous mets au défi de… » (classe .dd-defi) présent sur chaque page service FR/EN et en fin des articles « Si nous étions… ».
   - Page avec formulaire (#devis-form) : le défi remplit le message et le type d'événement, puis la page défile jusqu'au formulaire.
   - Article du Journal (pas de formulaire) : le défi ouvre la page service indiquée (data-target) avec ?defi=… ; cette page préremplit son formulaire.
   Aucune donnée n'est envoyée ici : tout part avec le formulaire de devis (devis.js). */
(function () {
  var en = document.documentElement.lang === 'en';
  var PREFIX = en ? 'I dare you to ' : 'Je vous mets au défi de ';

  function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, "'").trim(); }
  function push(o) { try { (window.dataLayer = window.dataLayer || []).push(o); } catch (e) {} }
  function store(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

  function setType(type) {
    var sel = document.getElementById('devis-type');
    if (!sel || !type) return;
    var t = norm(type);
    for (var i = 0; i < sel.options.length; i++) {
      if (norm(sel.options[i].text) === t) { sel.selectedIndex = i; return; }
    }
  }

  /* Remplit le formulaire de la page et y mène. Renvoie false s'il n'y a pas de formulaire. */
  function fill(q, type, scroll) {
    var msg = document.getElementById('devis-message');
    var c = document.getElementById('contact');
    if (!msg || !c) return false;
    msg.value = PREFIX + q;
    setType(type);
    store('dd_defi', q);
    if (scroll) {
      var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      c.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      setTimeout(function () { var n = document.getElementById('devis-nom'); if (n) n.focus({ preventScroll: true }); }, reduce ? 0 : 700);
    }
    return true;
  }

  function launch(box, q, type) {
    q = (q || '').replace(/\s+/g, ' ').trim().slice(0, 160);
    var input = box.querySelector('.dd-defi__in');
    if (!q) { if (input) input.focus(); return; }
    push({ event: 'dd_defi', defi_type: type || 'aucun', defi_page: location.pathname, defi_origin: location.pathname, defi_target: box.getAttribute('data-target') || location.pathname, defi_lang: en ? 'en' : 'fr' });
    if (fill(q, type, true)) return;
    var target = box.getAttribute('data-target');
    if (target) {
      store('dd_defi', q);
      location.href = target + (target.indexOf('?') === -1 ? '?' : '&') + 'defi=' + encodeURIComponent(q) + (type ? '&type=' + encodeURIComponent(type) : '') + '#contact';
    }
  }

  function initBlock(box) {
    var input = box.querySelector('.dd-defi__in');
    var form = box.querySelector('.dd-defi__row');
    var defType = box.getAttribute('data-type') || '';
    if (form) form.addEventListener('submit', function (e) { e.preventDefault(); launch(box, input.value, defType); });
    box.querySelectorAll('.dd-defi__sugg button').forEach(function (b) {
      b.addEventListener('click', function () {
        if (input) input.value = b.textContent.trim();
        launch(box, b.textContent, b.getAttribute('data-type') || defType);
      });
    });
  }

  /* Arrivée depuis un article : ?defi=…&type=… */
  function fromUrl() {
    var p;
    try { p = new URLSearchParams(location.search); } catch (e) { return; }
    var q = (p.get('defi') || '').replace(/\s+/g, ' ').trim().slice(0, 160);
    if (!q) return;
    if (fill(q, (p.get('type') || '').slice(0, 60), false)) {
      var c = document.getElementById('contact');
      if (c) {
        var go = function () { window.scrollTo({ top: c.getBoundingClientRect().top + window.pageYOffset, behavior: 'instant' }); };
        go(); setTimeout(go, 400);
        if (document.readyState !== 'complete') window.addEventListener('load', function () { setTimeout(go, 100); });
      }
      try { history.replaceState(null, '', location.pathname + '#contact'); } catch (e) {}
    }
  }

  function init() {
    document.querySelectorAll('.dd-defi').forEach(initBlock);
    fromUrl();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
