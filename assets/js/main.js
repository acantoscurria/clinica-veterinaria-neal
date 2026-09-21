/**
 * Clínica Veterinaria NEAL — landing page behaviour.
 * No dependencies, no build step: this file ships as-is.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú');
      nav.classList.toggle('is-open', !open);
    });

    // Close after picking a destination, or when focus/pointer leaves the menu.
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav();
    });
  }

  /* ---------------------------------------------------------------------
     Sticky header shadow + floating WhatsApp button
     --------------------------------------------------------------------- */
  var header = document.querySelector('.header');
  var fab = document.getElementById('fab-whatsapp');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (fab) fab.classList.toggle('is-visible', y > 520);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(onScroll);
  }, { passive: true });

  onScroll();

  /* ---------------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Hero background carousel

     Vanilla port of the reference hero slider (React + embla there). Slides
     cross-fade via CSS; this only decides which one carries `.is-active`.
     --------------------------------------------------------------------- */
  (function heroCarousel() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var slides = hero.querySelectorAll('.hero__slide');
    var dots = hero.querySelectorAll('.hero__dot');
    if (slides.length < 2) return;

    var DELAY = 6000;
    var actual = 0;
    var timer = null;
    var pausado = false;

    function mostrar(indice) {
      actual = (indice + slides.length) % slides.length;
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.toggle('is-active', i === actual);
        if (dots[i]) {
          if (i === actual) dots[i].setAttribute('aria-current', 'true');
          else dots[i].removeAttribute('aria-current');
        }
      }
    }

    function arrancar() {
      if (reduceMotion || timer) return;
      timer = window.setInterval(function () {
        if (!pausado && !document.hidden) mostrar(actual + 1);
      }, DELAY);
    }

    function detener() {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    }

    for (var i = 0; i < dots.length; i++) {
      (function (indice) {
        dots[indice].addEventListener('click', function () {
          mostrar(indice);
          // Restart the clock so a manual pick gets its full time on screen.
          detener();
          arrancar();
        });
      })(i);
    }

    // Pause while the visitor is reading or tabbing through the hero.
    ['mouseenter', 'focusin'].forEach(function (evento) {
      hero.addEventListener(evento, function () { pausado = true; });
    });
    ['mouseleave', 'focusout'].forEach(function (evento) {
      hero.addEventListener(evento, function () { pausado = false; });
    });

    arrancar();
  })();

  /* ---------------------------------------------------------------------
     Footer year
     --------------------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
