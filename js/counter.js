/**
 * ImageFitly — Page view counter (frontend)
 * Reads window.COUNTER_CONFIG, calls the Worker, renders total + today views
 * into #site-counter. Gracefully hides itself if not configured or on error.
 */
(function () {
  var cfg = window.COUNTER_CONFIG || {};
  var workerUrl = cfg.workerUrl;
  var site = cfg.site || 'imagefitly';
  var el = document.getElementById('site-counter');
  if (!el) return;
  if (!workerUrl) { el.style.display = 'none'; return; }

  var data = null;

  function labels() {
    var lang = (window.I18N && window.I18N.lang) || 'en';
    return {
      total: lang === 'zh' ? '历史浏览' : 'total views',
      today: lang === 'zh' ? '今日浏览' : 'today',
    };
  }

  function render() {
    if (!data) return;
    var L = labels();
    el.innerHTML =
      '<span class="counter-item"><strong>' + (data.total || 0).toLocaleString() + '</strong> ' + L.total + '</span>' +
      '<span class="counter-sep">·</span>' +
      '<span class="counter-item"><strong>' + (data.today || 0).toLocaleString() + '</strong> ' + L.today + '</span>';
    el.style.display = 'flex';
  }

  fetch(workerUrl + '?site=' + encodeURIComponent(site), { method: 'GET', cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(function (d) { data = d; render(); })
    .catch(function () { el.style.display = 'none'; });

  // Re-render labels when language switches (no re-fetch → no double count)
  window.addEventListener('imagefitly:lang', render);
})();
