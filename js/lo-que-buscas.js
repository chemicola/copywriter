(function () {
  'use strict';

  const header = document.getElementById('header');
  const burger = document.querySelector('.burger');
  const menu   = document.getElementById('mobileMenu');

  /* Nav shadow & hide/show on scroll */
  let lastScrollY = 0;
  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;
    header.classList.toggle('scrolled', window.scrollY > 6);
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  /* Burger */
  function open()  {
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    menu.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', function () {
    burger.classList.contains('open') ? close() : open();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', close);
  });

  /* Animaciones de entrada */
  var elems = document.querySelectorAll('.anim');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elems.forEach(function (el) { io.observe(el); });
  } else {
    elems.forEach(function (el) { el.classList.add('in'); });
  }

  /* Formulario AJAX */
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var btn  = form.querySelector('button');
      var orig = btn.textContent;
      btn.textContent = 'Enviando…';
      btn.disabled = true;
      try {
        var res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error();
        btn.textContent = '¡Enviado!';
        btn.style.background = '#1a7a1a';
        form.reset();
      } catch (_) {
        btn.textContent = 'Error — inténtalo de nuevo';
        btn.style.background = '#b81a1a';
      } finally {
        setTimeout(function () {
          btn.textContent = orig;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      }
    });
  }

})();