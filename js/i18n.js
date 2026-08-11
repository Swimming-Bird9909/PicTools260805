/* ============================================
   ImageFitly i18n - EN / ZH language switcher
   - Reads saved language from localStorage (persists across pages)
   - Switches every element carrying data-zh (and data-zh-html) attributes
   - Updates <html lang>, <title>, and meta description
   - Dispatches a `imagefitly:lang` event for JS-driven UI (tool pages)
   - I18N.t(key, enFallback, vars) for strings set by JavaScript
   ============================================ */
(function () {
  'use strict';

  var STORE_KEY = 'imagefitly_lang';
  var lang = 'en';

  // Chinese for strings that are set by JavaScript (not in the initial DOM)
  var zhDynamic = {
    'tool.dropTitle': '将图片拖拽到此处',
    'tool.dropHint': '或点击选择文件 — 支持 JPG、PNG、WEBP，最大 20MB',
    'tool.presetsTitle': '快速预设',
    'tool.dimsTitle': '自定义尺寸',
    'tool.fitLabel': '填充模式',
    'tool.fit.contain': 'Contain（添加留白）',
    'tool.fit.cover': 'Cover（裁剪填满）',
    'tool.fit.fill': 'Fill（拉伸填满）',
    'tool.bgLabel': '背景颜色',
    'tool.outputTitle': '输出设置',
    'tool.formatLabel': '格式',
    'tool.qualityLabel': '质量',
    'tool.apply': '应用修改',
    'tool.download': '下载',
    'tool.bgRemove': 'AI 智能去背景',
    'tool.uploadNew': '重新上传',
    'tool.previewPlaceholder': '上传图片以预览',
    'tool.processing': '处理中…',
    'tool.origLabel': '原始',
    'tool.outputLabel': '输出',
    'tool.bgRemovedLabel': '已去除背景',
    'tool.loadingModel': '正在加载 AI 模型…',
    // toasts / alerts
    'tool.fileTooLarge': '文件过大，最大 {max}MB。',
    'tool.processed': '处理完成！点击下载保存。',
    'tool.downloaded': '已下载！',
    'tool.bgDone': '背景已去除！可继续调整尺寸或下载。',
    'tool.bgFailed': '去背景失败，请尝试更小的图片。',
    'tool.uploadFirst': '请先上传图片。',
    'tool.processFailed': '处理失败：',
    'tool.invalidImage': '请选择有效的图片文件。',
    'tool.loadFailed': '图片加载失败。',
    'tool.readFailed': '文件读取失败。',
    'tool.bgLibFailed': '背景移除库加载失败。'
  };

  function t(key, enFallback, vars) {
    var str = (lang === 'zh' && zhDynamic[key]) ? zhDynamic[key] : enFallback;
    if (vars && typeof str === 'string') {
      Object.keys(vars).forEach(function (k) {
        str = str.replace('{' + k + '}', vars[k]);
      });
    }
    return str;
  }

  function cacheOriginal(el) {
    var isHtml = el.hasAttribute('data-zh-html');
    el._enVal = isHtml ? el.innerHTML : el.textContent;
  }

  function applyTo(el) {
    var isHtml = el.hasAttribute('data-zh-html');
    var zh = el.getAttribute('data-zh');

    if (el.tagName === 'META') {
      if (lang === 'zh' && zh != null) el.setAttribute('content', zh);
      else if (el._enVal != null) el.setAttribute('content', el._enVal);
      return;
    }
    if (el.tagName === 'TITLE') {
      if (lang === 'zh' && zh != null) document.title = zh;
      else if (el._enVal != null) document.title = el._enVal;
      return;
    }

    if (lang === 'zh' && zh != null) {
      if (isHtml) el.innerHTML = zh;
      else el.textContent = zh;
    } else if (el._enVal != null) {
      if (isHtml) el.innerHTML = el._enVal;
      else el.textContent = el._enVal;
    }
  }

  function apply() {
    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll('[data-zh], [data-zh-html]');
    for (var i = 0; i < nodes.length; i++) applyTo(nodes[i]);

    // highlight active toggle button
    var btns = document.querySelectorAll('.lang-btn');
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.toggle('active', btns[j].getAttribute('data-lang') === lang);
    }

    // notify JS-driven controllers (tool page UI)
    try {
      window.dispatchEvent(new CustomEvent('imagefitly:lang', { detail: { lang: lang } }));
    } catch (e) {
      // CustomEvent may be unavailable in very old browsers; ignore
    }
  }

  function setLang(l) {
    if (l !== 'en' && l !== 'zh') return;
    lang = l;
    try { localStorage.setItem(STORE_KEY, l); } catch (e) {}
    apply();
  }

  function init() {
    try { lang = localStorage.getItem(STORE_KEY) || 'en'; } catch (e) { lang = 'en'; }

    var nodes = document.querySelectorAll('[data-zh], [data-zh-html]');
    for (var i = 0; i < nodes.length; i++) cacheOriginal(nodes[i]);

    var btns = document.querySelectorAll('.lang-btn');
    for (var j = 0; j < btns.length; j++) {
      (function (b) {
        b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
      })(btns[j]);
    }

    apply();
  }

  // Expose API
  window.I18N = {
    init: init,
    setLang: setLang,
    apply: apply,
    t: t,
    get lang() { return lang; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
