(function () {
  'use strict';

  var WA_PHONE = '77002152893';
  var WA_BASE = 'https://wa.me/' + WA_PHONE;

  function waUrl(text) {
    return WA_BASE + (text ? '?text=' + encodeURIComponent(text) : '');
  }

  // ---- WhatsApp deep links on .js-wa elements ----
  document.querySelectorAll('.js-wa').forEach(function (el) {
    var text = el.getAttribute('data-wa-text') || '';
    el.setAttribute('href', waUrl(text));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  // ---- Burger menu ----
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Quick form -> WhatsApp ----
  var qf = document.getElementById('quickForm');
  if (qf) {
    qf.addEventListener('submit', function (e) {
      e.preventDefault();
      var msgEl = document.getElementById('qfMsg');
      var msg = (msgEl && msgEl.value || '').trim();
      var text = 'Здравствуйте! ' + (msg || 'Хочу задать вопрос магазину DamuMarket.');
      window.open(waUrl(text), '_blank', 'noopener');
    });
  }

  // ---- Year ----
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
