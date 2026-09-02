(function () {
  'use strict';

  var root = document.documentElement;
  var KEY = 'fa-theme';

  /* ---------- theme ---------- */
  function apply(t) {
    root.setAttribute('data-theme', t);
    var btn = document.getElementById('theme');
    if (btn) btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  var saved;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved !== 'light' && saved !== 'dark') {
    saved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  apply(saved);

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('#theme');
    if (!btn) return;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (err) {}
  });

  root.classList.add('js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- scroll reveal ---------- */
  var targets = document.querySelectorAll('[data-fx]');

  if (reduced || !('IntersectionObserver' in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        var sibs = el.parentElement.querySelectorAll(':scope > [data-fx]');
        var idx = Array.prototype.indexOf.call(sibs, el);
        el.style.setProperty('--d', Math.min(Math.max(idx, 0), 7) * 60 + 'ms');
        el.classList.add('in');
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
    for (var j = 0; j < targets.length; j++) io.observe(targets[j]);
  }

  /* ---------- the stack: pointer parallax ---------- */
  var scene = document.getElementById('scene');
  var stack = document.getElementById('stack3d');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var wide = window.matchMedia('(min-width: 981px)').matches;

  if (scene && stack && fine && wide && !reduced) {
    var baseY = -17, baseX = 7, frame = null;

    scene.addEventListener('pointermove', function (ev) {
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = null;
        var r = scene.getBoundingClientRect();
        var nx = (ev.clientX - r.left) / r.width - 0.5;   // -0.5 .. 0.5
        var ny = (ev.clientY - r.top) / r.height - 0.5;
        stack.style.setProperty('--ry', (baseY + nx * 16).toFixed(2) + 'deg');
        stack.style.setProperty('--rx', (baseX - ny * 12).toFixed(2) + 'deg');
      });
    });

    scene.addEventListener('pointerleave', function () {
      stack.style.setProperty('--ry', baseY + 'deg');
      stack.style.setProperty('--rx', baseX + 'deg');
    });
  }

  /* ---------- nav: mark the section you are in ---------- */
  var links = document.querySelectorAll('.nav a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) {
      var sec = document.querySelector(a.getAttribute('href'));
      if (sec) map[sec.id] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = map[entry.target.id];
        if (a) a.classList.toggle('here', entry.isIntersecting);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { spy.observe(document.getElementById(id)); });
  }
})();
