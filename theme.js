/* Washfree light / dark theme. Saved in the browser so every page uses the same theme. */
(function () {
  var KEY = 'wf-theme', root = document.documentElement;
  function apply(t) {
    if (t === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
  }
  try { apply(localStorage.getItem(KEY)); } catch (e) {}

  document.addEventListener('DOMContentLoaded', function () {
    /* landing page: the pill follows the section in view */
    var nav = document.querySelector('.nav-links[data-spy]');
    if (nav) {
      var links = [].slice.call(nav.querySelectorAll('a'));
      var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
      var spy = function () {
        var y = window.innerHeight * 0.35, cur = 0;
        targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top <= y) cur = i; });
        if (nav.getAttribute('data-i') !== String(cur)) {
          nav.setAttribute('data-i', cur);
          links.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
        }
      };
      window.addEventListener('scroll', spy, { passive: true });
      spy();
    }

    var box = document.getElementById('theme-toggle');
    if (!box) return;
    box.checked = root.getAttribute('data-theme') === 'dark';
    box.addEventListener('change', function () {
      var t = box.checked ? 'dark' : 'light';
      root.classList.add('theme-anim');
      apply(t);
      try { localStorage.setItem(KEY, t); } catch (e) {}
      setTimeout(function () { root.classList.remove('theme-anim'); }, 500);
    });
  });
})();