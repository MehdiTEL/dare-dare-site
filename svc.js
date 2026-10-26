/* Pages services : barre de navigation, menu mobile, FAQ en accordéon. */
(function () {
  var nav = document.querySelector('.nav');
  function onScroll() {
    var s = window.scrollY > 60;
    nav.classList.toggle('nav--scrolled', s);
    nav.classList.toggle('nav--transparent', !s);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var burger = document.querySelector('.nav__hamburger'), menu = document.querySelector('.mobile-menu');
  if (menu) menu.inert = !menu.classList.contains('active'); // menu fermé : hors du parcours clavier
  if (burger && menu) burger.addEventListener('click', function () {
    var open = !menu.classList.contains('active');
    menu.classList.toggle('active', open); burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', open); menu.setAttribute('aria-hidden', !open); menu.inert = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.querySelectorAll('.faq-item').forEach(function (it) {
    var q = it.querySelector('.faq-item__question'), a = it.querySelector('.faq-item__answer');
    q.addEventListener('click', function () {
      var open = !it.classList.contains('open');
      it.classList.toggle('open', open); q.setAttribute('aria-expanded', open);
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
    });
  });
})();
