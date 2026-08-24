/**
 * generate-new-blog.js
 * Generates SEO blog posts for ImageFitly (tools.wezzik.com).
 * Each post: full <head> (canonical/OG/BlogPosting JSON-LD) + bilingual (data-zh) body.
 * Run: node generate-new-blog.js
 */
const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, 'blog');
const BASE = 'https://tools.wezzik.com';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function zhAttr(zh) { return zh ? ` data-zh="${esc(zh)}"` : ''; }

// section builders — return HTML strings
function h2(en, zh) { return `      <h2${zhAttr(zh)}>${esc(en)}</h2>`; }
function h3(en, zh) { return `      <h3${zhAttr(zh)}>${esc(en)}</h3>`; }
function p(en, zh) { return `      <p${zhAttr(zh)}>${esc(en)}</p>`; }
function pHTML(enHtml, zhHtml) { return `      <p data-zh-html="${esc(zhHtml)}">${enHtml}</p>`; }
function ul(items) {
  const lis = items.map(([en, zh]) => `        <li${zhAttr(zh)}>${esc(en)}</li>`).join('\n');
  return `      <ul>\n${lis}\n      </ul>`;
}
function table(headers, rows) {
  // headers: [[en,zh], [en,zh], ...]
  // rows: [[cell1_en, cell2_en, ...], ...]
  const th = headers.map(([en, zh]) => `<th${zhAttr(zh)}>${esc(en)}</th>`).join('');
  const trs = rows.map(row => {
    const tds = row.map(cell => `<td>${esc(cell)}</td>`).join('');
    return `        <tr>${tds}</tr>`;
  }).join('\n');
  return `      <table>\n        <tr>${th}</tr>\n${trs}\n      </table>`;
}

const FAVICON = `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%236366f1'/%3E%3Ctext x='16' y='22' font-size='18' text-anchor='middle' fill='white' font-family='Arial' font-weight='900'%3EIF%3C/text%3E%3C/svg%3E" />`;

const NAV = `  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="../index.html" class="logo"><span class="logo-icon">IF</span><span>ImageFitly</span></a>
        <button class="mobile-toggle" aria-label="Menu">☰</button>
        <ul class="nav-links">
          <li><a href="../index.html" data-zh="首页">Home</a></li>
          <li><a href="../index.html#tools" data-zh="全部工具">All Tools</a></li>
          <li><a href="index.html" data-zh="博客">Blog</a></li>
          <li><a href="../about.html" data-zh="关于">About</a></li>
          <li><a href="../index.html#start" class="nav-cta" data-zh="立即开始">Get Started</a></li>
        </ul>
        <div class="lang-switch" role="group" aria-label="Language">
          <button class="lang-btn" data-lang="en">EN</button>
          <button class="lang-btn" data-lang="zh">中文</button>
        </div>
      </nav>
    </div>
  </header>`;

const FOOTER = `  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <span data-zh="© 2026 ImageFitly. 版权所有。">© 2026 ImageFitly. All rights reserved.</span>
        <span><a href="../index.html" style="color: #94a3b8;" data-zh="首页">Home</a> · <a href="../privacy.html" style="color: #94a3b8;" data-zh="隐私政策">Privacy</a></span>
      </div>
    </div>
  </footer>`;

function buildArticle(a) {
  const url = `${BASE}/blog/${a.slug}.html`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.titleEn,
    description: a.descEn,
    url,
    datePublished: '2026-08-24',
    dateModified: '2026-08-24',
    publisher: { '@type': 'Organization', name: 'ImageFitly' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url }
  };
  const body = a.sections.join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title data-zh="${esc(a.titleZh)}">${esc(a.titleEn)}</title>
  <meta name="description" content="${esc(a.descEn)}" data-zh="${esc(a.descZh)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:title" content="${esc(a.titleEn)}" />
  <meta property="og:description" content="${esc(a.descEn)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${url}" />
  <meta name="twitter:card" content="summary" />
  <script type="application/ld+json">
  ${JSON.stringify(jsonLd, null, 2)}
  </script>
  <link rel="stylesheet" href="../css/style.css" />
  ${FAVICON}
</head>
<body>

${NAV}

<section class="tool-hero">
  <div class="container">
    <h1 style="font-size: clamp(24px, 4vw, 38px);" data-zh="${esc(a.h1Zh)}">${esc(a.h1En)}</h1>
  </div>
</section>

<section>
  <div class="container">
    <article class="prose">
${body}
    </article>
  </div>
</section>

${FOOTER}

<script src="../js/main.js"></script>
<script src="../js/i18n.js"></script>
</body>
</html>
`;
}

/* ============================ ARTICLES ============================ */

const articles = [
  /* 1. Shopify */
  {
    slug: 'shopify-image-compression',
    titleEn: 'Shopify Image Too Large? Compress Without Losing Quality (2026)',
    titleZh: 'Shopify 图片太大？2026 年无损压缩指南',
    descEn: 'Learn how to compress Shopify product images without losing quality. Faster load times, better SEO, and higher conversions for your store.',
    descZh: '学习如何在不损失画质的前提下压缩 Shopify 产品图。让店铺加载更快、SEO 更好、转化更高。',
    h1En: 'Shopify Image Too Large? Compress Without Losing Quality (2026)',
    h1Zh: 'Shopify 图片太大？2026 年无损压缩指南',
    sections: [
      h2('Why image size matters on Shopify', '为什么图片大小对 Shopify 很重要'),
      p('Page speed is a ranking factor for Google and a conversion factor for customers. A store with heavy product images loads slowly, pushes bounce rates up, and quietly kills sales. Shopify recommends keeping product images under 100 KB when possible — but most sellers upload 1–5 MB camera files straight from their phone.',
        '页面速度是 Google 的排名因素，也是客户的转化因素。图片沉重的店铺加载缓慢，会推高跳出率，悄悄毁掉销量。Shopify 建议产品图尽量控制在 100 KB 以内——但多数卖家直接把手机里 1–5 MB 的原图传了上去。'),
      h2('Target file sizes', '目标文件大小'),
      table([['Element', '要素'], ['Recommended size', '推荐大小']],
        [
          ['Product grid thumbnail', '20–40 KB'],
          ['Product detail image', '60–120 KB'],
          ['Zoom / high-res image', '150–300 KB'],
          ['Lifestyle / banner', '100–200 KB']
        ]),
      p('Smaller files mean faster first paint and a smoother browsing experience on mobile, where most Shopify traffic now comes from.',
        '更小的文件意味着更快的首屏渲染，以及在移动端更顺滑的浏览体验——如今 Shopify 的大部分流量都来自手机。'),
      h2('How to compress without losing quality', '如何压缩而不损失画质'),
      ul([
        ['Use lossy compression at 70–80% quality — visually identical, 3–5x smaller.', '使用 70–80% 质量的有损压缩——肉眼几乎无差别，体积却小 3–5 倍。'],
        ['Convert JPG and PNG to WEBP for 25–35% extra savings.', '把 JPG、PNG 转为 WEBP，可再省 25–35%。'],
        ['Keep the original aspect ratio — never stretch product shots.', '保持原始宽高比——切勿拉伸产品图。'],
        ['Batch-process your whole catalog in one go.', '一次性批量处理整个商品目录。']
      ]),
      h2('Common mistakes', '常见错误'),
      ul([
        ['Uploading unedited 4000×6000 px photos straight from a DSLR.', '直接上传未处理的 4000×6000 像素单反原图。'],
        ['Saving as PNG "to be safe" — PNG is larger and rarely needed for photos.', '为了"保险"存成 PNG——PNG 体积更大，照片几乎用不上。'],
        ['Forgetting mobile: a 3 MB hero image costs seconds on 4G.', '忽略移动端：3 MB 的头部大图在 4G 下要多等好几秒。']
      ]),
      h2('Compress your Shopify images now', '立即压缩你的 Shopify 图片'),
      pHTML('Use our <a href="../tools/shopify-image-optimizer.html">free Shopify image optimizer</a> to shrink product photos in your browser — no upload, no quality loss you can see.',
        '使用我们的<a href="../tools/shopify-image-optimizer.html">免费 Shopify 图片优化工具</a>，在浏览器里直接压缩产品图——无需上传、肉眼无画质损失。')
    ]
  },

  /* 2. Etsy */
  {
    slug: 'etsy-photo-requirements',
    titleEn: 'Etsy Photo Requirements: Size, Dimensions & Best Practices (2026)',
    titleZh: 'Etsy 图片要求：尺寸、规格与最佳实践（2026）',
    descEn: 'The complete Etsy photo requirements for 2026 — dimensions, file size, aspect ratio, and tips to make your listings stand out.',
    descZh: '2026 年完整的 Etsy 图片要求——尺寸、文件大小、宽高比，以及让你的商品脱颖而出的最佳实践。',
    h1En: 'Etsy Photo Requirements: Size, Dimensions & Best Practices (2026)',
    h1Zh: 'Etsy 图片要求：尺寸、规格与最佳实践（2026）',
    sections: [
      h2('Etsy image specs at a glance', 'Etsy 图片规格一览'),
      table([['Requirement', '要求'], ['Value', '推荐值']],
        [
          ['Minimum size', '1000 × 1000 px (recommended for zoom)'],
          ['Maximum file size', '10 MB per image'],
          ['Accepted formats', 'JPG, PNG, GIF, WEBP'],
          ['Recommended aspect ratio', '1:1 (square)'],
          ['Number of photos', 'Up to 10 per listing']
        ]),
      h2('Why 1000×1000 is the magic number', '为什么 1000×1000 是黄金尺寸'),
      p('Etsy enables a zoom view when your image is at least 1000 px on the longest side. Square 1:1 images display cleanly in the grid without awkward cropping, and they look consistent across the marketplace.',
        '当图片最长边达到 1000 像素时，Etsy 会启用放大查看。1:1 方形图在网格中不会被奇怪地裁切，在整个平台上也显得整齐一致。'),
      h2('Best practices for Etsy listings', 'Etsy 商品图最佳实践'),
      ul([
        ['Lead with your hero shot on a clean, white or neutral background.', '首图用干净的白底或中性背景作为主图。'],
        ['Show the product in use in photos 2–4 to build trust.', '在第 2–4 张展示产品使用场景，建立信任。'],
        ['Keep file sizes under 1 MB for fast loading on mobile.', '文件控制在 1 MB 以内，确保移动端快速加载。'],
        ['Use all 10 slots — more photos correlate with more sales.', '用满 10 张图——图片越多，销量往往越高。']
      ]),
      h2('Resize and compress for Etsy', '为 Etsy 调整尺寸并压缩'),
      pHTML('Resize any product photo to a perfect 1000×1000 square with our <a href="../tools/etsy-photo-resize.html">free Etsy photo resizer</a> — right in your browser, no software needed.',
        '用我们的<a href="../tools/etsy-photo-resize.html">免费 Etsy 图片尺寸调整工具</a>，在浏览器里就能把任意产品图调整为完美的 1000×1000 方形——无需安装软件。')
    ]
  },

  /* 3. eBay */
  {
    slug: 'ebay-image-requirements',
    titleEn: 'eBay Image Requirements 2026: Size, Guidelines & Tips',
    titleZh: 'eBay 图片要求 2026：尺寸、规范与技巧',
    descEn: 'Everything sellers need to know about eBay image requirements in 2026 — dimensions, file size, format, and how to optimize listings.',
    descZh: '2026 年卖家需要了解的 eBay 图片要求全攻略——尺寸、文件大小、格式，以及如何优化商品列表。',
    h1En: 'eBay Image Requirements 2026: Size, Guidelines & Tips',
    h1Zh: 'eBay 图片要求 2026：尺寸、规范与技巧',
    sections: [
      h2('eBay image guidelines', 'eBay 图片规范'),
      table([['Guideline', '规范'], ['Recommendation', '推荐']],
        [
          ['Longest side', '1600 px (for zoom)'],
          ['Minimum', '500 px'],
          ['Maximum file size', '12 MB (JPG up to 7 MB historically)'],
          ['Formats', 'JPG, PNG, GIF, BMP, TIFF, WEBP'],
          ['Free photos', 'Up to 24 per listing']
        ]),
      h2('The 1600 px rule', '1600 像素法则'),
      p('eBay activates its picture zoom when the longest side is 1600 px or more. Zoom lets buyers inspect detail, which builds confidence and reduces returns. Square or 4:3 images both work well in search thumbnails.',
        '当最长边达到 1600 像素或以上时，eBay 会启用图片放大功能。放大让买家查看细节，既建立信任又减少退货。方形或 4:3 的图片在搜索缩略图里都表现良好。'),
      h2('What to avoid', '需要避免的'),
      ul([
        ['Watermarks or text overlays — eBay discourages them.', '水印或文字叠加——eBay 不鼓励这样做。'],
        ['Tiny sub-500 px images that look low-quality in search.', '小于 500 像素、在搜索里显得低质的图片。'],
        ['Oversized 12 MB files that slow the listing page.', '超过 12 MB、拖慢列表页面的巨型文件。']
      ]),
      h2('Optimize your eBay photos', '优化你的 eBay 图片'),
      pHTML('Compress and resize eBay photos in one click with our <a href="../tools/ebay-image-compressor.html">free eBay image compressor</a>. Keep quality high and files small.',
        '用我们的<a href="../tools/ebay-image-compressor.html">免费 eBay 图片压缩工具</a>，一键压缩并调整 eBay 图片尺寸。画质保持高清，文件保持小巧。')
    ]
  },

  /* 4. Remove background */
  {
    slug: 'remove-background-product-photos',
    titleEn: 'How to Remove Background from Product Photos (Free, No Upload)',
    titleZh: '如何去除产品图背景（免费、无需上传）',
    descEn: 'A step-by-step guide to removing backgrounds from product photos for free — right in your browser, with no upload and full privacy.',
    descZh: '一步步教你如何免费去除产品图背景——全程在浏览器内完成，无需上传、完全保护隐私。',
    h1En: 'How to Remove Background from Product Photos (Free, No Upload)',
    h1Zh: '如何去除产品图背景（免费、无需上传）',
    sections: [
      h2('Why clean backgrounds sell more', '为什么干净的背景更好卖'),
      p('Marketplaces like Amazon and white-background catalogs reward consistent, distraction-free product shots. A clean cutout makes your item the hero and lifts perceived professionalism.',
        '亚马逊等平台和白底商品目录都偏爱一致、无干扰的产品图。干净的抠图让商品成为主角，并提升专业感。'),
      h2('The fast way — in your browser', '最快的方式——在浏览器里'),
      ul([
        ['Open the background remover tool.', '打开背景去除工具。'],
        ['Drop in your product photo — it never leaves your device.', '拖入产品图——图片永远不会离开你的设备。'],
        ['Download the transparent PNG in seconds.', '几秒钟即可下载透明 PNG。'],
        ['Place it on a white, branded, or contextual background.', '把它放到白底、品牌色或场景背景上。']
      ]),
      h2('Tips for the best cutout', '获得最佳抠图的小技巧'),
      ul([
        ['Shoot on a contrasting background (e.g. white product on dark surface).', '在对比鲜明的背景上拍摄（如深色背景上的白色产品）。'],
        ['Use even lighting to avoid harsh shadows.', '使用均匀光线，避免生硬阴影。'],
        ['Keep the subject sharp and in focus.', '让主体清晰、对焦准确。']
      ]),
      h2('Remove a background now', '立即去除背景'),
      pHTML('Try our <a href="../tools/product-photo-background-remover.html">free product photo background remover</a> — 100% in-browser, no upload, no watermarks.',
        '试试我们的<a href="../tools/product-photo-background-remover.html">免费产品图背景去除工具</a>——100% 浏览器内运行，不上传、无水印。')
    ]
  },

  /* 5. YouTube thumbnail */
  {
    slug: 'youtube-thumbnail-size',
    titleEn: 'YouTube Thumbnail Size 2026: Make Click-Worthy Thumbnails',
    titleZh: 'YouTube 缩略图尺寸 2026：制作高点击率的缩略图',
    descEn: 'The correct YouTube thumbnail size for 2026, plus design tips to maximize clicks and grow your channel.',
    descZh: '2026 年正确的 YouTube 缩略图尺寸，以及最大化点击率、助力频道增长的设计技巧。',
    h1En: 'YouTube Thumbnail Size 2026: Make Click-Worthy Thumbnails',
    h1Zh: 'YouTube 缩略图尺寸 2026：制作高点击率的缩略图',
    sections: [
      h2('The correct thumbnail size', '正确的缩略图尺寸'),
      table([['Spec', '规格'], ['Value', '数值']],
        [
          ['Recommended', '1280 × 720 px'],
          ['Aspect ratio', '16:9'],
          ['Minimum width', '640 px'],
          ['Max file size', '2 MB'],
          ['Formats', 'JPG, PNG, GIF, WEBP']
        ]),
      h2('Why 1280×720 matters', '为什么 1280×720 很重要'),
      p('1280×720 at 16:9 is YouTube’s native thumbnail ratio. It displays crisply on every device — phone, tablet, and TV — and never gets awkwardly stretched in suggested-video rails.',
        '16:9 的 1280×720 是 YouTube 的原生缩略图比例。它在手机、平板、电视上都能清晰显示，也绝不会在推荐栏里被奇怪地拉伸。'),
      h2('Design tips for more clicks', '提高点击率的设计技巧'),
      ul([
        ['Use one bold, high-contrast focal point — the face or the product.', '用一个醒目、高对比的焦点——人脸或产品。'],
        ['Add short text (3–5 words) only if it adds value.', '仅在有帮助时加简短文字（3–5 个词）。'],
        ['Keep important elements away from the 12 px safe-margin edges.', '把重要元素远离 12 像素的安全边距。'],
        ['Test two thumbnails and keep the one with the higher CTR.', '做两个缩略图 A/B 测试，保留点击率更高的那个。']
      ]),
      h2('Size your thumbnail perfectly', '把缩略图尺寸调整到完美'),
      pHTML('Resize any image to the exact 1280×720 YouTube thumbnail with our <a href="../tools/youtube-thumbnail-size.html">free YouTube thumbnail resizer</a>.',
        '用我们的<a href="../tools/youtube-thumbnail-size.html">免费 YouTube 缩略图尺寸工具</a>，把任意图片精确调整为 1280×720。')
    ]
  },

  /* 6. General image compression guide */
  {
    slug: 'image-compression-guide',
    titleEn: 'The Ultimate Image Compression Guide for Faster Websites (2026)',
    titleZh: '网站提速终极图片压缩指南（2026）',
    descEn: 'A practical image compression guide: formats, quality settings, and workflows to make any website load faster in 2026.',
    descZh: '一份实用的图片压缩指南：格式选择、质量设置与工作流程，让你的网站在 2026 年加载更快。',
    h1En: 'The Ultimate Image Compression Guide for Faster Websites (2026)',
    h1Zh: '网站提速终极图片压缩指南（2026）',
    sections: [
      h2('Images are usually the heaviest part of a page', '图片通常是页面中最重的部分'),
      p('On the average website, images account for more than half of total page weight. Compressing them is the single highest-impact change you can make for speed — ahead of minifying CSS or deferring scripts.',
        '在普通网站上，图片占页面总重量的多半。压缩图片是你为提速能做的影响力最大的一步——比压缩 CSS 或延迟加载脚本更管用。'),
      h2('Pick the right format first', '先选对格式'),
      ul([
        ['Photographs → WEBP (or JPG as fallback).', '照片 → WEBP（或退而求其次用 JPG）。'],
        ['Logos, icons, graphics → PNG or SVG.', 'Logo、图标、图形 → PNG 或 SVG。'],
        ['Simple animations → WEBP or GIF.', '简单动画 → WEBP 或 GIF。']
      ]),
      h2('Quality settings that look identical', '肉眼无差别的质量设置'),
      table([['Format', '格式'], ['Suggested quality', '建议质量']],
        [
          ['JPG', '70–85%'],
          ['WEBP (lossy)', '75–90%'],
          ['PNG', 'lossless, but prefer WEBP if no transparency needed']
        ]),
      h2('A simple workflow', '一套简单的工作流'),
      ul([
        ['Resize to the largest display size you actually need.', '调整到实际所需的最大显示尺寸。'],
        ['Export as WEBP at 80% quality.', '以 80% 质量导出为 WEBP。'],
        ['If WEBP is unsupported, fall back to JPG at 80%.', '若不支持 WEBP，退回到 80% 的 JPG。'],
        ['Lazy-load images below the fold.', '对首屏以下的图片使用懒加载。']
      ]),
      h2('Compress images for free', '免费压缩图片'),
      pHTML('Process every image with our <a href="../index.html">free online image tools</a> — resize, compress, convert, and remove backgrounds, all in your browser.',
        '用我们的<a href="../index.html">免费在线图片工具</a>处理每一张图片——调整尺寸、压缩、转换、去背景，全部在浏览器内完成。')
    ]
  }
];

/* ============================ WRITE ============================ */
if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
articles.forEach(a => {
  const html = buildArticle(a);
  fs.writeFileSync(path.join(BLOG_DIR, `${a.slug}.html`), html, 'utf8');
  console.log('wrote', a.slug + '.html', '(' + html.length + ' bytes)');
});
console.log('\nDone. ' + articles.length + ' articles generated.');
