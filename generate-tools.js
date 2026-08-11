// Tool page generator: creates 10 SEO-optimized tool pages
const fs = require('fs');
const path = require('path');

// Shared "More tools" block (translated via data-zh)
const RELATED = [
  { slug: 'amazon-image-size-converter', icon: '🛒', title: 'Amazon Resizer', titleZh: '亚马逊调整器', desc: '2000×2000 px main images.', descZh: '2000×2000 像素主图。' },
  { slug: 'shopify-image-optimizer', icon: '🛍️', title: 'Shopify Optimizer', titleZh: 'Shopify 优化器', desc: 'Faster store loading.', descZh: '加快店铺加载速度。' },
  { slug: 'instagram-post-size', icon: '📸', title: 'Instagram Size', titleZh: 'Instagram 尺寸', desc: 'Square, portrait, story.', descZh: '方形、竖图、故事。' },
  { slug: 'youtube-thumbnail-size', icon: '▶️', title: 'YouTube Thumbnail', titleZh: 'YouTube 缩略图', desc: '1280×720 px thumbnails.', descZh: '1280×720 像素缩略图。' },
];

const TOOLS = [
  {
    slug: 'amazon-image-size-converter',
    title: 'Amazon Image Size Converter — Free Online | ImageFitly',
    h1: 'Amazon Image Size Converter',
    h1Zh: '亚马逊图片尺寸转换器',
    sub: 'Resize product photos to Amazon\'s recommended 2000×2000px instantly. Meet Amazon\'s 85% zoom requirement and boost your listing conversion.',
    subZh: '一键将产品图调整为亚马逊推荐的 2000×2000 像素，满足 85% 放大要求，提升商品转化率。',
    keywords: 'amazon image size converter, amazon product photo size, amazon main image dimensions, amazon listing image',
    desc: 'Free online Amazon image size converter. Resize product photos to 2000×2000px, meet Amazon\'s image requirements, and optimize for higher conversion.',
    presets: [
      { label: 'Amazon Main', labelZh: '亚马逊主图', w: 2000, h: 2000, fit: 'contain' },
      { label: 'Amazon Gallery', labelZh: '亚马逊画廊图', w: 1500, h: 1500, fit: 'contain' },
      { label: 'Amazon Thumbnail', labelZh: '亚马逊缩略图', w: 500, h: 500, fit: 'contain' },
      { label: 'Custom Size', labelZh: '自定义尺寸', w: 1000, h: 1000, fit: 'contain' },
    ],
    defaultFormat: 'image/jpeg',
    defaultQuality: 0.9,
    showBg: false,
    specTable: [
      ['Image Type', 'Recommended Size', 'Format', 'Max File Size'],
      ['Main Image', '2000 × 2000 px (1:1)', 'JPG/PNG', '10 MB'],
      ['Gallery Image', '1500 × 1500 px', 'JPG/PNG', '10 MB'],
      ['Thumbnail', '500 × 500 px', 'JPG/PNG', '10 MB'],
      ['Zoom Requirement', '85% of frame filled', '—', '—'],
    ],
    zh: {
      spec: [
        ['图片类型', '推荐尺寸', '格式', '最大文件大小'],
        ['主图', '2000 × 2000 像素 (1:1)', 'JPG/PNG', '10 MB'],
        ['画廊图', '1500 × 1500 像素', 'JPG/PNG', '10 MB'],
        ['缩略图', '500 × 500 像素', 'JPG/PNG', '10 MB'],
        ['放大要求', '填充画幅的 85%', '—', '—'],
      ],
      intro: '亚马逊对产品图片有严格要求。主图至少需 1000×1000 像素才能启用放大功能，但 2000×2000 像素是获得最佳效果的建议尺寸。图片必须在纯白背景（RGB 255,255,255）上展示真实产品。我们的亚马逊图片尺寸转换器可一键自动满足所有这些要求。',
      faqs: [
        ['亚马逊产品图的最佳尺寸是多少？', '亚马逊主图建议为 2000×2000 像素。该尺寸可启用放大功能，并在所有设备上清晰展示产品。'],
        ['亚马逊要求白底背景吗？', '是的。主产品图必须为纯白背景（RGB 255,255,255）。画廊图可以使用场景背景。'],
        ['亚马逊的 85% 放大要求是什么？', '亚马逊要求产品至少填满画幅的 85%。我们的工具会自动添加白色留白以满足该要求。'],
        ['可以上传 PNG 到亚马逊吗？', '可以，但 JPG 因文件更小更受推荐。亚马逊同时支持两者，我们的工具可让你选择偏好格式。'],
        ['亚马逊图片的最大文件大小是多少？', '每张图片 10 MB。使用我们的质量滑块可将图片压缩到该限制以内。'],
      ],
    },
    intro: 'Amazon has strict product image requirements. Main images must be at least 1000×1000px to enable the zoom feature, but 2000×2000px is the recommended size for best results. Images must show the actual product on a pure white background (RGB 255,255,255). Our Amazon Image Size Converter automatically meets all these requirements in one click.',
    faqs: [
      ['What is the best Amazon product image size?', 'Amazon recommends 2000×2000 pixels for main product images. This size enables the zoom feature and displays the product clearly on all devices.'],
      ['Does Amazon require a white background?', 'Yes. The main product image must have a pure white background (RGB 255,255,255). Gallery images can have lifestyle backgrounds.'],
      ['What is the 85% zoom requirement on Amazon?', 'Amazon requires the product to fill at least 85% of the image frame. Our tool automatically adds white padding to meet this requirement.'],
      ['Can I upload PNG to Amazon?', 'Yes, but JPG is preferred for smaller file size. Amazon supports both, and our tool lets you choose your preferred format.'],
      ['What is the maximum file size for Amazon images?', '10 MB per image. Use our quality slider to compress your images below this limit.'],
    ],
  },
  {
    slug: 'shopify-image-optimizer',
    title: 'Shopify Image Optimizer — Compress & Resize | ImageFitly',
    h1: 'Shopify Image Optimizer',
    h1Zh: 'Shopify 图片优化器',
    sub: 'Compress and resize product images for faster Shopify stores. Boost page speed, improve SEO, and increase sales.',
    subZh: '压缩并调整产品图尺寸，让 Shopify 店铺加载更快。提升页面速度、改善 SEO、增加销量。',
    keywords: 'shopify image optimizer, shopify product image size, shopify image compression, shopify photo resizer',
    desc: 'Free Shopify image optimizer. Compress and resize product images to speed up your Shopify store and improve SEO rankings.',
    presets: [
      { label: 'Shopify Product', labelZh: 'Shopify 产品图', w: 2048, h: 2048, fit: 'contain' },
      { label: 'Shopify Square', labelZh: 'Shopify 方形图', w: 800, h: 800, fit: 'contain' },
      { label: 'Shopify Web', labelZh: 'Shopify 网页图', w: 1920, h: 1080, fit: 'contain' },
      { label: 'Custom Size', labelZh: '自定义尺寸', w: 1000, h: 1000, fit: 'contain' },
    ],
    defaultFormat: 'image/webp',
    defaultQuality: 0.85,
    showBg: false,
    specTable: [
      ['Image Type', 'Recommended Size', 'Format', 'Notes'],
      ['Product Image', '2048 × 2048 px', 'JPG/WEBP', 'Zoom-enabled'],
      ['Collection Image', '1024 × 1024 px', 'JPG/WEBP', 'Grid display'],
      ['Hero Banner', '1920 × 1080 px', 'JPG/WEBP', 'Homepage'],
      ['Blog Image', '1200 × 630 px', 'JPG/WEBP', 'OG image'],
    ],
    zh: {
      spec: [
        ['图片类型', '推荐尺寸', '格式', '说明'],
        ['产品图', '2048 × 2048 像素', 'JPG/WEBP', '支持放大'],
        ['合集图', '1024 × 1024 像素', 'JPG/WEBP', '网格展示'],
        ['首页横幅', '1920 × 1080 像素', 'JPG/WEBP', '主页'],
        ['博客图', '1200 × 630 像素', 'JPG/WEBP', 'OG 图'],
      ],
      intro: '当产品图经过合理优化后，Shopify 店铺加载更快、排名更高。我们的 Shopify 图片优化器可压缩 JPG、PNG 并转换为 WEBP，文件体积最多可缩小 80%。调整为 Shopify 推荐尺寸，缩短加载时间，提升转化。',
      faqs: [
        ['Shopify 产品图应该多大？', 'Shopify 推荐产品图为 2048×2048 像素。该尺寸支持放大功能，并在所有设备上表现良好。'],
        ['Shopify 支持 WEBP 图片吗？', '支持，Shopify 自 2022 年起支持 WEBP。WEBP 文件比 JPG 小 25%–80%，可提升页面速度。'],
        ['Shopify 的最佳图片格式是什么？', '照片首选 WEBP（更小且画质相当）。带透明度的图形选 PNG。JPG 则通用性最好。'],
        ['Shopify 图片如何影响 SEO？', '图片优化直接影响 Core Web Vitals，尤其是 LCP。更小、尺寸合适的图片在谷歌搜索中排名更好。'],
        ['可以批量优化 Shopify 图片吗？', '目前可逐张优化。批量处理请等待我们后续的 Pro 功能。'],
      ],
    },
    intro: 'Shopify stores load faster and rank higher when product images are properly optimized. Our Shopify Image Optimizer compresses JPG, PNG, and converts to WEBP for up to 80% smaller file sizes. Resize to Shopify-recommended dimensions, reduce load times, and increase conversion.',
    faqs: [
      ['What size should Shopify product images be?', 'Shopify recommends 2048×2048 pixels for product images. This size supports the zoom feature and works well on all devices.'],
      ['Does Shopify support WEBP images?', 'Yes, Shopify supports WEBP since 2022. WEBP files are 25-80% smaller than JPG, improving page speed.'],
      ['What is the best image format for Shopify?', 'WEBP is best for photos (smaller, same quality). PNG is best for graphics with transparency. JPG works universally.'],
      ['How do Shopify images affect SEO?', 'Image optimization directly impacts Core Web Vitals, especially LCP. Smaller, properly-sized images rank better in Google search.'],
      ['Can I batch optimize Shopify images?', 'Currently you can optimize images one at a time. For batch processing, repeat the process or use our planned Pro features.'],
    ],
  },
  {
    slug: 'etsy-photo-resize',
    title: 'Etsy Photo Resize Tool — Free Online | ImageFitly',
    h1: 'Etsy Photo Resize Tool',
    h1Zh: 'Etsy 图片调整工具',
    sub: 'Resize listing photos to Etsy\'s 2000px recommendation. Perfect dimensions for handmade, vintage, and craft products.',
    subZh: '将商品图调整为 Etsy 推荐的 2000 像素宽。手工艺品、复古商品与手工创作者的完美尺寸。',
    keywords: 'etsy photo resize, etsy listing image size, etsy image dimensions, etsy photo requirements',
    desc: 'Free Etsy photo resize tool. Resize your listing photos to Etsy\'s recommended 2000px width for the best quality display.',
    presets: [
      { label: 'Etsy Listing', labelZh: 'Etsy 商品图', w: 2000, h: 2000, fit: 'contain' },
      { label: 'Etsy Square', labelZh: 'Etsy 方形图', w: 1000, h: 1000, fit: 'contain' },
      { label: 'Etsy Portrait', labelZh: 'Etsy 竖图', w: 2000, h: 1500, fit: 'contain' },
      { label: 'Custom Size', labelZh: '自定义尺寸', w: 1000, h: 1000, fit: 'contain' },
    ],
    defaultFormat: 'image/jpeg',
    defaultQuality: 0.9,
    showBg: false,
    specTable: [
      ['Image Type', 'Recommended Size', 'Format', 'Notes'],
      ['Listing Photo', '2000 px wide', 'JPG/PNG/GIF', 'Best quality'],
      ['Square Thumbnail', '1000 × 1000 px', 'JPG/PNG', 'Search results'],
      ['Profile Photo', '500 × 500 px', 'JPG/PNG', 'Avatar'],
      ['Shop Banner', '3360 × 840 px', 'JPG/PNG', 'Shop header'],
    ],
    zh: {
      spec: [
        ['图片类型', '推荐尺寸', '格式', '说明'],
        ['商品图', '宽 2000 像素', 'JPG/PNG/GIF', '最佳画质'],
        ['方形缩略图', '1000 × 1000 像素', 'JPG/PNG', '搜索结果'],
        ['头像', '500 × 500 像素', 'JPG/PNG', '头像'],
        ['店铺横幅', '3360 × 840 像素', 'JPG/PNG', '店铺头部'],
      ],
      intro: 'Etsy 建议商品图最长边至少 2000 像素以获得最佳放大显示效果。更高分辨率的图片在 Etsy 上已被证实能带来更好的转化。我们的工具在保持画质的同时将图片调整为 Etsy 完美尺寸。',
      faqs: [
        ['Etsy 商品图的最佳尺寸是多少？', 'Etsy 建议最长边为 2000 像素。1500–2000 像素的图片可放大显示，其中 2000 像素是最佳选择。'],
        ['Etsy 应该用 JPG 还是 PNG？', '照片首选 JPG（文件更小）。仅在需要透明度时使用 PNG。我们的工具默认使用最佳质量的 JPG。'],
        ['一个 Etsy 商品图可以放几张照片？', 'Etsy 每个商品最多可放 10 张照片。可使用多个角度和场景图。'],
        ['Etsy 会自动裁剪我的图片吗？', '不会。Etsy 会保留你的宽高比。使用我们的预设尺寸可获得最佳显示效果而无需裁剪。'],
      ],
    },
    intro: 'Etsy recommends listing photos be at least 2000 pixels on the longest side for the best quality zoom display. Higher resolution images are proven to convert better on Etsy. Our tool resizes your photos to Etsy-perfect dimensions while maintaining quality.',
    faqs: [
      ['What is the best image size for Etsy listings?', 'Etsy recommends 2000 pixels on the longest side. Images between 1500-2000px display with zoom, but 2000px is the sweet spot.'],
      ['Should I use JPG or PNG for Etsy?', 'JPG is preferred for photos (smaller files). Use PNG only when you need transparency. Our tool defaults to JPG with optimal quality.'],
      ['How many photos per Etsy listing?', 'Etsy allows up to 10 photos per listing. Use multiple angles and lifestyle shots.'],
      ['Does Etsy auto-crop my images?', 'No. Etsy preserves your aspect ratio. Use our preset sizes to get the best display without cropping.'],
    ],
  },
  {
    slug: 'ebay-image-compressor',
    title: 'eBay Image Compressor — Free Online | ImageFitly',
    h1: 'eBay Image Compressor',
    h1Zh: 'eBay 图片压缩器',
    sub: 'Compress eBay listing images to under 500KB. Fast uploads, clear photos, more clicks.',
    subZh: '将 eBay 商品图压缩至 500KB 以内。上传更快、画质清晰、点击更多。',
    keywords: 'ebay image compressor, ebay listing photo size, ebay image requirements, compress image for ebay',
    desc: 'Free eBay image compressor. Reduce eBay listing image file size while maintaining quality. Meet eBay\'s 500KB recommendation.',
    presets: [
      { label: 'eBay Square', labelZh: 'eBay 方形图', w: 1600, h: 1600, fit: 'contain' },
      { label: 'eBay Recommended', labelZh: 'eBay 推荐', w: 1000, h: 1000, fit: 'contain' },
      { label: 'eBay Thumbnail', labelZh: 'eBay 缩略图', w: 500, h: 500, fit: 'contain' },
      { label: 'Custom Size', labelZh: '自定义尺寸', w: 1000, h: 1000, fit: 'contain' },
    ],
    defaultFormat: 'image/jpeg',
    defaultQuality: 0.8,
    showBg: false,
    specTable: [
      ['Image Type', 'Recommended Size', 'Max File Size', 'Format'],
      ['Listing Photo', '1600 × 1600 px', '500 KB', 'JPG/PNG'],
      ['Gallery Photo', '1000 × 1000 px', '500 KB', 'JPG/PNG'],
      ['Thumbnail', '500 × 500 px', '500 KB', 'JPG/PNG'],
    ],
    zh: {
      spec: [
        ['图片类型', '推荐尺寸', '最大文件大小', '格式'],
        ['商品图', '1600 × 1600 像素', '500 KB', 'JPG/PNG'],
        ['画廊图', '1000 × 1000 像素', '500 KB', 'JPG/PNG'],
        ['缩略图', '500 × 500 像素', '500 KB', 'JPG/PNG'],
      ],
      intro: 'eBay 建议商品图最长边至少 500 像素，1600×1600 像素是最佳选择。将文件大小控制在 500KB 以内可确保页面快速加载并获得更好的搜索排名。我们的压缩器在保持产品图清晰的同时减小文件体积。',
      faqs: [
        ['eBay 的最佳图片尺寸是多少？', 'eBay 推荐 1600×1600 像素以获得最高画质显示，该尺寸支持商品图中的放大功能。'],
        ['eBay 图片的最大文件大小是多少？', '大部分类目每张图片上限为 500KB。使用我们的质量滑块可保持在限制内。'],
        ['eBay 接受 WEBP 图片吗？', '不接受。eBay 要求 JPG、PNG、GIF、BMP 或 TIFF。我们的工具默认输出 JPG 以获得最佳兼容性。'],
        ['一个 eBay 商品可以加几张照片？', 'eBay 每个商品最多可加 24 张照片。使用多个角度和细节图可增强买家信心。'],
      ],
    },
    intro: 'eBay recommends listing images be at least 500 pixels on the longest side, with 1600×1600 pixels being the sweet spot. Keeping file sizes under 500KB ensures fast page loads and better search placement. Our compressor reduces file size while keeping your product photos crystal clear.',
    faqs: [
      ['What is the best image size for eBay?', 'eBay recommends 1600×1600 pixels for the highest quality display. This size supports the picture zoom feature in eBay listings.'],
      ['What is the max file size for eBay images?', 'eBay allows up to 500KB per image in most categories. Use our quality slider to stay within this limit.'],
      ['Does eBay accept WEBP images?', 'No. eBay requires JPG, PNG, GIF, BMP, or TIFF. Our tool outputs JPG by default for best compatibility.'],
      ['How many photos can I add to an eBay listing?', 'eBay allows up to 24 photos per listing. Use multiple angles and detail shots to increase buyer confidence.'],
    ],
  },
  {
    slug: 'product-photo-background-remover',
    title: 'Product Photo Background Remover — AI Free | ImageFitly',
    h1: 'AI Product Photo Background Remover',
    h1Zh: 'AI 产品图背景去除器',
    sub: 'Remove backgrounds from product photos with AI. Get a clean white or transparent background in one click.',
    subZh: '用 AI 去除产品图背景。一键获得干净的白底或透明背景。',
    keywords: 'product photo background remover, remove background, ai background removal, white background product photo',
    desc: 'Free AI-powered product photo background remover. Remove backgrounds from product images instantly. No Photoshop needed.',
    presets: [
      { label: 'White BG Square', labelZh: '白底方形', w: 1500, h: 1500, fit: 'contain' },
      { label: 'White BG Portrait', labelZh: '白底竖图', w: 1500, h: 2000, fit: 'contain' },
      { label: 'Transparent', labelZh: '透明背景', w: 1500, h: 1500, fit: 'contain' },
      { label: 'Custom Size', labelZh: '自定义尺寸', w: 1000, h: 1000, fit: 'contain' },
    ],
    defaultFormat: 'image/png',
    defaultQuality: 1.0,
    showBg: true,
    specTable: [
      ['Platform', 'Recommended BG', 'Output Format', 'Best Practice'],
      ['Amazon', 'Pure white (255,255,255)', 'JPG', '100% white required'],
      ['Shopify', 'White or lifestyle', 'JPG/WEBP', 'Consistent style'],
      ['Etsy', 'White or contextual', 'JPG', 'Showcase product'],
      ['eBay', 'White or solid color', 'JPG', 'Clean look'],
    ],
    zh: {
      spec: [
        ['平台', '推荐背景', '输出格式', '最佳实践'],
        ['亚马逊', '纯白 (255,255,255)', 'JPG', '必须为纯白'],
        ['Shopify', '白底或场景', 'JPG/WEBP', '风格统一'],
        ['Etsy', '白底或情境', 'JPG', '展示产品'],
        ['eBay', '白底或纯色', 'JPG', '简洁观感'],
      ],
      intro: '白底产品图能带来更好的转化。亚马逊、沃尔玛及大多数平台都要求或偏好纯白背景。我们的 AI 背景去除器能自动识别产品并生成干净、独立的图像——无需 Photoshop、无需手动选取、无需技巧。',
      faqs: [
        ['AI 背景去除是如何工作的？', '我们的 AI 使用深度学习模型识别主体并将其与背景分离。它完全在你的浏览器中运行，保障隐私。'],
        ['背景去除器真的免费吗？', '是的——100% 免费、无水印、无需注册。首次使用会加载 AI 模型（约 5MB），之后在本地运行。'],
        ['透明背景应该用哪种格式？', '透明背景请用 PNG。PNG 支持 alpha 通道，而 JPG 不支持。'],
        ['可以从 JPG 去除背景吗？', '可以，但输出必须为 PNG 才能保留透明度。我们的工具会自动处理转换。'],
        ['AI 的准确度如何？', '我们的 AI 在边缘清晰的产品（服装、电子产品、包装商品）上效果最佳。复杂场景的结果可能有所差异。'],
      ],
    },
    intro: 'White background product photos convert better. Amazon, Walmart, and most marketplaces require or prefer pure white backgrounds. Our AI background remover automatically detects your product and creates a clean, isolated image — no Photoshop, no manual selection, no skills needed.',
    faqs: [
      ['How does AI background removal work?', 'Our AI uses a deep learning model that recognizes the main subject and separates it from the background. It runs entirely in your browser for privacy.'],
      ['Is the background remover really free?', 'Yes — 100% free, no watermark, no sign-up. The first use loads the AI model (~5MB), then runs locally.'],
      ['What image format for transparent background?', 'Use PNG for transparent backgrounds. PNG supports alpha channel, while JPG does not.'],
      ['Can I remove background from a JPG?', 'Yes, but the output must be PNG to keep transparency. Our tool automatically handles the conversion.'],
      ['How accurate is the AI?', 'Our AI works best on products with clear edges (clothing, electronics, packaged goods). For complex scenes, results may vary.'],
    ],
  },
  {
    slug: 'instagram-post-size',
    title: 'Instagram Post Size — Free Resizer | ImageFitly',
    h1: 'Instagram Post Size Converter',
    h1Zh: 'Instagram 帖子尺寸转换器',
    sub: 'Resize images for Instagram posts, stories, and reels. Square, portrait, landscape — perfect dimensions every time.',
    subZh: '为 Instagram 帖子、故事和 Reels 调整尺寸。方形、竖图、横图——每次都恰到好处。',
    keywords: 'instagram post size, instagram image resize, instagram story size, instagram square size',
    desc: 'Free Instagram image resizer. Resize to Instagram square (1080×1080), portrait (1080×1350), story (1080×1920), and more.',
    presets: [
      { label: 'Square (1:1)', labelZh: '方形 (1:1)', w: 1080, h: 1080, fit: 'contain' },
      { label: 'Portrait (4:5)', labelZh: '竖图 (4:5)', w: 1080, h: 1350, fit: 'contain' },
      { label: 'Story (9:16)', labelZh: '故事 (9:16)', w: 1080, h: 1920, fit: 'contain' },
      { label: 'Landscape', labelZh: '横图', w: 1080, h: 566, fit: 'contain' },
      { label: 'Custom Size', labelZh: '自定义尺寸', w: 1080, h: 1080, fit: 'contain' },
    ],
    defaultFormat: 'image/jpeg',
    defaultQuality: 0.92,
    showBg: false,
    specTable: [
      ['Format', 'Size (px)', 'Aspect Ratio', 'Best For'],
      ['Square Post', '1080 × 1080', '1:1', 'Feed posts'],
      ['Portrait Post', '1080 × 1350', '4:5', 'More screen real estate'],
      ['Landscape Post', '1080 × 566', '1.91:1', 'Cinematic look'],
      ['Story / Reel', '1080 × 1920', '9:16', 'Full screen'],
    ],
    zh: {
      spec: [
        ['格式', '尺寸（像素）', '宽高比', '适合'],
        ['方形帖子', '1080 × 1080', '1:1', '信息流帖子'],
        ['竖图帖子', '1080 × 1350', '4:5', '更多屏幕空间'],
        ['横图帖子', '1080 × 566', '1.91:1', '电影感'],
        ['故事 / Reels', '1080 × 1920', '9:16', '全屏'],
      ],
      intro: 'Instagram 支持多种图片尺寸，其中最具吸引力的是 4:5 竖图（1080×1350），因为它在信息流中占据更多垂直空间。我们的 Instagram 调整器为每种格式提供预设，自动处理宽高比，并以完美分辨率输出。',
      faqs: [
        ['Instagram 帖子的最佳尺寸是多少？', '1080×1350 像素（4:5 竖图）互动最佳，因为它在信息流中占据最多屏幕空间。'],
        ['Instagram 会压缩我的图片吗？', '会，Instagram 会压缩所有上传内容。以 1080 像素宽上传可在压缩后仍保持画质。'],
        ['Instagram 故事的尺寸是多少？', '1080×1920 像素（9:16 宽高比）。故事在移动端全屏显示。'],
        ['同一张图可以发到多个格式吗？', '可以——使用我们的预设将同一张图导出为方形、竖图和故事版本。'],
      ],
    },
    intro: 'Instagram supports several image sizes, but the most engaging is the 4:5 portrait (1080×1350) because it takes up more vertical space in the feed. Our Instagram resizer has presets for every format, automatically handles aspect ratios, and outputs at the perfect resolution.',
    faqs: [
      ['What is the best Instagram post size?', '1080×1350 pixels (4:5 portrait) is the best for engagement because it takes up the most screen space in the feed.'],
      ['Does Instagram compress my images?', 'Yes, Instagram compresses all uploads. Upload at 1080px wide to maintain quality after Instagram\'s compression.'],
      ['What is the size of an Instagram story?', '1080×1920 pixels (9:16 aspect ratio). Stories display full-screen on mobile devices.'],
      ['Can I post the same image to multiple formats?', 'Yes — use our presets to export the same image as square, portrait, and story versions.'],
    ],
  },
  {
    slug: 'youtube-thumbnail-size',
    title: 'YouTube Thumbnail Size — Free Maker | ImageFitly',
    h1: 'YouTube Thumbnail Maker',
    h1Zh: 'YouTube 缩略图制作器',
    sub: 'Create eye-catching YouTube thumbnails at 1280×720. Boost your click-through rate and grow your channel.',
    subZh: '制作 1280×720 的吸睛 YouTube 缩略图。提升点击率，助力频道成长。',
    keywords: 'youtube thumbnail size, youtube thumbnail maker, youtube thumbnail dimensions, youtube cover size',
    desc: 'Free YouTube thumbnail maker. Resize images to 1280×720 (perfect YouTube thumbnail size) and boost your video CTR.',
    presets: [
      { label: 'YouTube Thumbnail', labelZh: 'YouTube 缩略图', w: 1280, h: 720, fit: 'contain' },
      { label: 'HD Thumbnail', labelZh: '高清缩略图', w: 1920, h: 1080, fit: 'contain' },
      { label: 'Custom Size', labelZh: '自定义尺寸', w: 1280, h: 720, fit: 'contain' },
    ],
    defaultFormat: 'image/jpeg',
    defaultQuality: 0.92,
    showBg: false,
    specTable: [
      ['Format', 'Size (px)', 'Aspect Ratio', 'Max File Size'],
      ['Thumbnail', '1280 × 720', '16:9', '2 MB'],
      ['HD Thumbnail', '1920 × 1080', '16:9', '2 MB'],
      ['Channel Banner', '2560 × 1440', '16:9', '6 MB'],
    ],
    zh: {
      spec: [
        ['格式', '尺寸（像素）', '宽高比', '最大文件大小'],
        ['缩略图', '1280 × 720', '16:9', '2 MB'],
        ['高清缩略图', '1920 × 1080', '16:9', '2 MB'],
        ['频道横幅', '2560 × 1440', '16:9', '6 MB'],
      ],
      intro: 'YouTube 缩略图是影响视频点击率的最重要因素。最佳尺寸为 1280×720 像素（16:9 宽高比），最大文件大小为 2MB。使用醒目文字、对比色和清晰人物可最大化点击率。',
      faqs: [
        ['YouTube 缩略图的最佳尺寸是多少？', '1280×720 像素是最佳尺寸——契合 YouTube 播放器，并在所有设备上清晰显示。'],
        ['YouTube 缩略图的最大文件大小是多少？', '2 MB。使用我们的质量滑块压缩到该限制以内。'],
        ['YouTube 缩略图用 JPG 还是 PNG？', '照片首选 JPG（文件更小）。仅在带透明文字的图形时使用 PNG。'],
        ['如何提高 YouTube 点击率？', '使用醒目文字、对比色、富有表现力的人物，并将文字控制在 6 个字以内。多测试几个版本。'],
      ],
    },
    intro: 'YouTube thumbnails are the single most important factor for video click-through rate. The optimal size is 1280×720 pixels (16:9 aspect ratio), with a maximum file size of 2MB. Use bold text, contrasting colors, and clear faces to maximize CTR.',
    faqs: [
      ['What is the best YouTube thumbnail size?', '1280×720 pixels is the optimal size — it matches the YouTube player and displays sharply on all devices.'],
      ['What is the maximum file size for a YouTube thumbnail?', '2 MB. Use our quality slider to compress below this limit.'],
      ['JPG or PNG for YouTube thumbnails?', 'JPG is best for photos (smaller files). Use PNG only for graphics with text on transparency.'],
      ['How can I increase my YouTube CTR?', 'Use bold text, contrasting colors, expressive faces, and keep text under 6 words. Test multiple versions.'],
    ],
  },
  {
    slug: 'linkedin-banner-size',
    title: 'LinkedIn Banner Size — Free Resizer | ImageFitly',
    h1: 'LinkedIn Banner Resizer',
    h1Zh: 'LinkedIn 封面尺寸调整器',
    sub: 'Resize LinkedIn cover photos to 1584×396. Personal profile or company page — perfect every time.',
    subZh: '将 LinkedIn 封面图调整为 1584×396。个人或企业主页——每次都完美。',
    keywords: 'linkedin banner size, linkedin cover photo size, linkedin header dimensions, linkedin profile banner',
    desc: 'Free LinkedIn banner resizer. Resize cover photos to LinkedIn\'s recommended 1584×396 pixels for personal and company pages.',
    presets: [
      { label: 'Personal Profile', labelZh: '个人主页', w: 1584, h: 396, fit: 'contain' },
      { label: 'Company Page', labelZh: '企业主页', w: 1128, h: 191, fit: 'contain' },
      { label: 'LinkedIn Post', labelZh: 'LinkedIn 帖子', w: 1200, h: 627, fit: 'contain' },
      { label: 'Custom Size', labelZh: '自定义尺寸', w: 1584, h: 396, fit: 'contain' },
    ],
    defaultFormat: 'image/jpeg',
    defaultQuality: 0.9,
    showBg: false,
    specTable: [
      ['Type', 'Size (px)', 'Aspect Ratio', 'Max File Size'],
      ['Personal Profile', '1584 × 396', '4:1', '8 MB'],
      ['Company Page', '1128 × 191', '5.9:1', '2 MB'],
      ['LinkedIn Post', '1200 × 627', '1.91:1', '5 MB'],
      ['Career Page', '1128 × 376', '3:1', '2 MB'],
    ],
    zh: {
      spec: [
        ['类型', '尺寸（像素）', '宽高比', '最大文件大小'],
        ['个人主页', '1584 × 396', '4:1', '8 MB'],
        ['企业主页', '1128 × 191', '5.9:1', '2 MB'],
        ['LinkedIn 帖子', '1200 × 627', '1.91:1', '5 MB'],
        ['招聘主页', '1128 × 376', '3:1', '2 MB'],
      ],
      intro: 'LinkedIn 封面是访客在你的主页上看到的第一样东西。个人主页推荐尺寸为 1584×396 像素；企业主页则用 1128×191。我们的工具将封面调整为完美尺寸，并考虑移动端安全区。',
      faqs: [
        ['LinkedIn 封面的尺寸是多少？', '个人主页为 1584×396 像素，企业主页为 1128×191。使用我们的预设即可获得准确尺寸。'],
        ['为什么我的 LinkedIn 封面在手机上被裁切？', 'LinkedIn 在移动端裁剪方式不同。将重要内容保持在图片中央，确保在所有设备上都能显示。'],
        ['个人和企业可以用同一个封面吗？', '不可以，宽高比不同（4:1 与 5.9:1）。请为各自使用相应预设。'],
      ],
    },
    intro: 'Your LinkedIn banner is the first thing visitors see on your profile. The recommended size is 1584×396 pixels for personal profiles. For company pages, use 1128×191. Our tool resizes your banner to the perfect dimensions with mobile-safe area considerations.',
    faqs: [
      ['What is the LinkedIn banner size?', '1584×396 pixels for personal profiles, 1128×191 for company pages. Use our presets to get the exact right size.'],
      ['Why is my LinkedIn banner cropped on mobile?', 'LinkedIn crops differently on mobile. Keep important content in the center of the image to ensure it shows on all devices.'],
      ['Can I use the same banner for personal and company?', 'No, the aspect ratios are different (4:1 vs 5.9:1). Use the appropriate preset for each.'],
    ],
  },
  {
    slug: 'twitter-header-size',
    title: 'Twitter Header Size — Free Resizer | ImageFitly',
    h1: 'Twitter/X Header Resizer',
    h1Zh: 'Twitter/X 头图尺寸调整器',
    sub: 'Convert images to Twitter header (1500×500). Mobile-safe area included for best display on all devices.',
    subZh: '将图片转换为 Twitter 头图（1500×500）。已包含移动端安全区，在所有设备上显示最佳。',
    keywords: 'twitter header size, twitter cover photo, x header size, twitter banner dimensions',
    desc: 'Free Twitter/X header resizer. Resize cover photos to 1500×500 pixels with mobile-safe area consideration.',
    presets: [
      { label: 'X/Twitter Header', labelZh: 'X/Twitter 头图', w: 1500, h: 500, fit: 'contain' },
      { label: 'X Post Image', labelZh: 'X 帖子图', w: 1600, h: 900, fit: 'contain' },
      { label: 'Custom Size', labelZh: '自定义尺寸', w: 1500, h: 500, fit: 'contain' },
    ],
    defaultFormat: 'image/jpeg',
    defaultQuality: 0.9,
    showBg: false,
    specTable: [
      ['Type', 'Size (px)', 'Aspect Ratio', 'Max File Size'],
      ['Header / Banner', '1500 × 500', '3:1', '5 MB'],
      ['In-Stream Photo', '1600 × 900', '16:9', '5 MB'],
      ['Profile Photo', '400 × 400', '1:1', '2 MB'],
    ],
    zh: {
      spec: [
        ['类型', '尺寸（像素）', '宽高比', '最大文件大小'],
        ['头图 / 横幅', '1500 × 500', '3:1', '5 MB'],
        ['信息流图片', '1600 × 900', '16:9', '5 MB'],
        ['头像', '400 × 400', '1:1', '2 MB'],
      ],
      intro: 'Twitter（现 X）建议头图为 1500×500 像素（3:1 宽高比）。注意：底部区域在移动端可能被头像遮挡，因此请将关键内容保留在图片上方 2/3。我们的预设会自动处理这一点。',
      faqs: [
        ['X（Twitter）头图的尺寸是多少？', '1500×500 像素，推荐宽高比 3:1，最大文件大小 5MB。'],
        ['为什么我的 Twitter 头图被截断了？', 'Twitter 在移动端会裁切头图底部以腾出头像位置。请将关键内容保持在上方 2/3。'],
        ['Twitter 接受哪些文件格式？', 'Twitter 接受 JPG、PNG、GIF 和 WEBP。我们的工具默认输出 JPG。'],
      ],
    },
    intro: 'Twitter (now X) recommends headers be 1500×500 pixels (3:1 aspect ratio). Important: the bottom portion may be covered by your profile picture on mobile, so keep critical content in the upper 2/3 of the image. Our presets handle this automatically.',
    faqs: [
      ['What is the X (Twitter) header size?', '1500×500 pixels. The recommended aspect ratio is 3:1, and the maximum file size is 5MB.'],
      ['Why is my Twitter header cut off?', 'Twitter crops the bottom portion of headers on mobile to make room for the profile photo. Keep important content in the upper 2/3.'],
      ['What file formats does Twitter accept?', 'Twitter accepts JPG, PNG, GIF, and WEBP. Our tool outputs JPG by default.'],
    ],
  },
  {
    slug: 'facebook-cover-photo-size',
    title: 'Facebook Cover Photo Size — Free Resizer | ImageFitly',
    h1: 'Facebook Cover Photo Resizer',
    h1Zh: 'Facebook 封面尺寸调整器',
    sub: 'Resize Facebook cover photos to 820×312. Page, profile, event, or group — perfect dimensions.',
    subZh: '将 Facebook 封面调整为 820×312。主页、个人、活动或群组——完美尺寸。',
    keywords: 'facebook cover photo size, facebook cover dimensions, facebook page cover, facebook event cover',
    desc: 'Free Facebook cover photo resizer. Resize to 820×312 for pages, 851×315 for events, and more formats.',
    presets: [
      { label: 'Facebook Page', labelZh: 'Facebook 主页', w: 820, h: 312, fit: 'contain' },
      { label: 'Facebook Event', labelZh: 'Facebook 活动', w: 1920, h: 1005, fit: 'contain' },
      { label: 'Facebook Group', labelZh: 'Facebook 群组', w: 1640, h: 924, fit: 'contain' },
      { label: 'Personal Cover', labelZh: '个人封面', w: 851, h: 315, fit: 'contain' },
      { label: 'Custom Size', labelZh: '自定义尺寸', w: 820, h: 312, fit: 'contain' },
    ],
    defaultFormat: 'image/jpeg',
    defaultQuality: 0.9,
    showBg: false,
    specTable: [
      ['Type', 'Size (px)', 'Aspect Ratio', 'Notes'],
      ['Page Cover', '820 × 312', '2.63:1', 'Desktop / mobile safe'],
      ['Event Cover', '1920 × 1005', '1.91:1', 'Event display'],
      ['Group Cover', '1640 × 924', '1.78:1', 'Facebook Group'],
      ['Personal Cover', '851 × 315', '2.7:1', 'Timeline cover'],
    ],
    zh: {
      spec: [
        ['类型', '尺寸（像素）', '宽高比', '说明'],
        ['主页封面', '820 × 312', '2.63:1', '桌面 / 移动安全'],
        ['活动封面', '1920 × 1005', '1.91:1', '活动展示'],
        ['群组封面', '1640 × 924', '1.78:1', 'Facebook 群组'],
        ['个人封面', '851 × 315', '2.7:1', '时间线封面'],
      ],
      intro: 'Facebook 封面在不同位置上尺寸不同。Facebook 主页推荐尺寸为桌面 820×312 像素、移动端 640×360 像素。我们的预设涵盖所有格式——主页、活动、群组和个人时间线。',
      faqs: [
        ['Facebook 主页封面尺寸是多少？', '桌面为 820×312 像素，移动端为 640×360。Facebook 会自动裁剪以同时适配两者。'],
        ['Facebook 活动封面尺寸是多少？', '1920×1005 像素（1.91:1）。活动封面展示非常突出。'],
        ['为什么我的封面模糊？', 'Facebook 会重度压缩图片。以推荐尺寸或更大尺寸上传可保持清晰。'],
        ['主页和活动可以用同一个封面吗？', '不可以，宽高比不同。请为各自使用相应预设。'],
      ],
    },
    intro: 'Facebook cover photos have different sizes for different surfaces. For a Facebook Page, the recommended size is 820×312 pixels on desktop and 640×360 on mobile. Our presets handle all formats — page, event, group, and personal timeline.',
    faqs: [
      ['What is the Facebook Page cover photo size?', '820×312 pixels for desktop, 640×360 for mobile. Facebook automatically crops to show on both.'],
      ['What is the Facebook event cover size?', '1920×1005 pixels (1.91:1). Events display cover photos prominently.'],
      ['Why is my cover photo blurry?', 'Facebook compresses images heavily. Upload at the recommended size or larger to maintain sharpness.'],
      ['Can I use the same cover for page and event?', 'No, the aspect ratios are different. Use the appropriate preset for each.'],
    ],
  },
];

function renderPage(tool) {
  const presetButtons = tool.presets.map((p, i) => {
    const sizeText = p.w ? `${p.w}×${p.h}px` : 'Custom';
    return `<button class="preset-btn${i === 0 ? ' active' : ''}" data-idx="${i}" data-en="${p.label}" data-zh="${p.labelZh || p.label}">${p.label}<small>${sizeText}</small></button>`;
  }).join('\n            ');

  const specRows = tool.specTable.map((row, i) => {
    const zhRow = tool.zh.spec[i];
    const cells = row.map((c, ci) => `<span data-zh="${zhRow[ci]}">${c}</span>`);
    return i === 0
      ? `<tr><th>${cells.join('</th><th>')}</th></tr>`
      : `<tr><td>${cells.join('</td><td>')}</td></tr>`;
  }).join('\n          ');

  const faqHtml = tool.faqs.map((q, i) => {
    const zq = tool.zh.faqs[i];
    return `
      <div class="faq-item${i === 0 ? ' open' : ''}">
        <button class="faq-q" data-zh="${zq[0]}">${q[0]}</button>
        <div class="faq-a"><p data-zh="${zq[1]}">${q[1]}</p></div>
      </div>`;
  }).join('\n      ');

  const relHtml = RELATED.map((r) => `
      <a href="${r.slug}.html" class="tool-card">
        <div class="tool-icon">${r.icon}</div>
        <h3 data-zh="${r.titleZh}">${r.title}</h3>
        <p data-zh="${r.descZh}">${r.desc}</p>
      </a>`).join('\n      ');

  const bgButton = tool.showBg ? `<button class="btn btn-secondary" id="bgRemoveBtn" type="button" data-en="AI Remove Background" data-zh="AI 智能去背景">AI Remove Background</button>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title data-zh="${tool.h1Zh} | ImageFitly 免费在线">${tool.title}</title>
  <meta name="description" content="${tool.desc}" data-zh="${tool.desc}" />
  <meta name="keywords" content="${tool.keywords}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://imagefitly.com/tools/${tool.slug}.html" />
  <meta property="og:title" content="${tool.title}" data-zh="${tool.h1Zh} | ImageFitly" />
  <meta property="og:description" content="${tool.desc}" data-zh="${tool.desc}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://imagefitly.com/tools/${tool.slug}.html" />
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%236366f1'/%3E%3Ctext x='16' y='22' font-size='18' text-anchor='middle' fill='white' font-family='Arial' font-weight='900'%3EIF%3C/text%3E%3C/svg%3E" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${tool.h1}",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ${tool.faqs.map(f => `{
        "@type": "Question",
        "name": "${f[0].replace(/"/g, '\\"')}",
        "acceptedAnswer": { "@type": "Answer", "text": "${f[1].replace(/"/g, '\\"')}" }
      }`).join(',\n      ')}
    ]
  }
  </script>
</head>
<body>

<header class="header">
  <div class="container">
    <nav class="nav">
      <a href="../index.html" class="logo">
        <span class="logo-icon">IF</span>
        <span>ImageFitly</span>
      </a>
      <button class="mobile-toggle" aria-label="Menu">☰</button>
      <ul class="nav-links">
        <li><a href="../index.html" data-zh="首页">Home</a></li>
        <li><a href="../index.html#tools" data-zh="全部工具">All Tools</a></li>
        <li><a href="../blog/index.html" data-zh="博客">Blog</a></li>
        <li><a href="../about.html" data-zh="关于">About</a></li>
        <li><a href="../index.html#start" class="nav-cta" data-zh="立即开始">Get Started</a></li>
      </ul>
      <div class="lang-switch" role="group" aria-label="Language">
        <button class="lang-btn" data-lang="en">EN</button>
        <button class="lang-btn" data-lang="zh">中文</button>
      </div>
    </nav>
  </div>
</header>

<section class="tool-hero">
  <div class="container">
    <h1 data-zh="${tool.h1Zh}">${tool.h1}</h1>
    <p data-zh="${tool.subZh}">${tool.sub}</p>
    <div class="tool-meta">
      <span data-zh="⚡ 100% 免费">⚡ 100% Free</span>
      <span data-zh="🔒 100% 隐私">🔒 100% Private</span>
      <span data-zh="📱 移动端可用">📱 Works on Mobile</span>
      <span data-zh="🚀 无需注册">🚀 No Sign-up</span>
    </div>
  </div>
</section>

<section class="tool-app">
  <div class="container">
    <div class="app-card">
      <div class="dropzone" id="dropzone">
        <span class="dropzone-icon">📤</span>
        <h3 data-zh="将图片拖拽到此处">Drop your image here</h3>
        <p data-zh="或点击选择文件 — 支持 JPG、PNG、WEBP，最大 20MB">or click to browse — JPG, PNG, WEBP up to 20MB</p>
        <input type="file" id="fileInput" accept="image/*" />
      </div>

      <div class="editor" id="editor">
        <div class="editor-grid">
          <div class="preview-wrap" id="previewWrap">
            <div class="preview-canvas-box" id="previewCanvasBox">
              <img id="previewImg" alt="Preview" />
              <div class="replace-hint" data-zh="点击替换图片">Click to replace image</div>
            </div>
            <div class="preview-meta">
              <span class="preview-badge" id="previewBadge" data-zh="上传图片以预览">Upload an image to preview</span>
              <span class="preview-zoom" id="previewZoom"></span>
            </div>
          </div>
          <div class="controls">
            <h4 data-zh="快速预设">Quick Presets</h4>
            <div class="preset-grid" id="presetGrid">
              ${presetButtons}
            </div>

            <h4 data-zh="自定义尺寸">Custom Dimensions</h4>
            <div class="control-group">
              <div class="input-row">
                <input type="number" id="widthInput" min="1" max="8000" placeholder="Width" data-zh="宽度" />
                <input type="number" id="heightInput" min="1" max="8000" placeholder="Height" data-zh="高度" />
              </div>
            </div>

            <div class="control-group">
              <label data-zh="填充模式">Fit Mode</label>
              <select id="fitSelect">
                <option value="contain" data-zh="Contain（添加留白）">Contain (add padding)</option>
                <option value="cover" data-zh="Cover（裁剪填满）">Cover (crop to fit)</option>
                <option value="fill" data-zh="Fill（拉伸填满）">Fill (stretch)</option>
              </select>
            </div>

            <div class="control-group">
              <label data-zh="背景颜色">Background Color</label>
              <input type="color" id="bgColor" value="#ffffff" style="width: 100%; height: 40px; border: 1px solid var(--border); border-radius: 8px; cursor: pointer;" />
            </div>

            <h4 data-zh="输出设置">Output Settings</h4>
            <div class="control-group">
              <label data-zh="格式">Format</label>
              <select id="formatSelect">
                <option value="image/jpeg" data-zh="JPG（最小）">JPG (smallest)</option>
                <option value="image/png" data-zh="PNG（无损）">PNG (lossless)</option>
                <option value="image/webp" data-zh="WEBP（现代）">WEBP (modern)</option>
              </select>
            </div>

            <div class="control-group">
              <label data-zh="质量">Quality</label>
              <div class="range-row">
                <input type="range" id="quality" min="0.1" max="1" step="0.05" value="${tool.defaultQuality}" />
                <span class="val" id="qualityVal">${Math.round(tool.defaultQuality * 100)}%</span>
              </div>
            </div>

            <div class="actions">
              <button class="btn btn-primary" id="processBtn" type="button" data-en="Apply Changes" data-zh="应用修改">Apply Changes</button>
              <button class="btn btn-gradient" id="downloadBtn" type="button" disabled data-en="Download" data-zh="下载">Download</button>
              ${bgButton}
              <button class="btn btn-secondary" id="resetBtn" type="button" data-en="Upload New" data-zh="重新上传">Upload New</button>
            </div>
            <p style="margin-top: 16px; font-size: 13px; color: var(--text-muted);" id="fileInfo"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Content section for SEO -->
<section style="background: var(--bg-soft);">
  <div class="container">
    <div class="prose">
      <h2 data-zh="关于本工具">About this tool</h2>
      <p data-zh="${tool.introZh}">${tool.intro}</p>

      <h2 data-zh="推荐尺寸">Recommended Sizes</h2>
      <table>
        ${specRows}
      </table>

      <h2 data-zh="为什么选择 ImageFitly？">Why use ImageFitly?</h2>
      <ul>
        <li><strong data-zh="100% 免费">100% Free</strong> <span data-zh="—— 无隐藏费用、无水印、无需注册。">— No hidden costs, no watermarks, no sign-up required.</span></li>
        <li><strong data-zh="浏览器端">Browser-based</strong> <span data-zh="—— 图片在本地处理，不会上传到任何服务器。">— Your images are processed locally. Nothing is uploaded to any server.</span></li>
        <li><strong data-zh="极速">Fast</strong> <span data-zh="—— 利用设备原生算力，几秒完成处理。">— Process images in seconds using your device's native speed.</span></li>
        <li><strong data-zh="多格式">Multiple formats</strong> <span data-zh="—— 可导出 JPG、PNG 或 WEBP，质量可调。">— Export to JPG, PNG, or WEBP with adjustable quality.</span></li>
        <li><strong data-zh="自定义尺寸">Custom dimensions</strong> <span data-zh="—— 使用预设或输入任意宽高。">— Use presets or enter any custom width and height.</span></li>
      </ul>
    </div>
  </div>
</section>

<!-- FAQ -->
<section>
  <div class="container">
    <div class="section-head">
      <span class="section-eyebrow" data-zh="常见问题">FAQ</span>
      <h2 class="section-title" data-zh="常见问题解答">Frequently asked questions</h2>
    </div>
    <div class="faq">
      ${faqHtml}
    </div>
  </div>
</section>

<!-- Related tools -->
<section style="background: var(--bg-soft); padding: 60px 0;">
  <div class="container">
    <div class="section-head">
      <h2 class="section-title" data-zh="更多图片工具">More image tools</h2>
    </div>
    <div class="tool-grid">
      ${relHtml}
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">
          <span class="logo-icon">IF</span>
          <span>ImageFitly</span>
        </div>
        <p data-zh="面向电商卖家与内容创作者的免费、隐私、浏览器端图片工具箱。">The free, private, browser-based image toolkit for e-commerce sellers and content creators.</p>
      </div>
      <div>
        <h5 data-zh="电商">E-commerce</h5>
        <ul>
          <li><a href="amazon-image-size-converter.html" data-zh="亚马逊">Amazon</a></li>
          <li><a href="shopify-image-optimizer.html" data-zh="Shopify">Shopify</a></li>
          <li><a href="etsy-photo-resize.html" data-zh="Etsy">Etsy</a></li>
          <li><a href="ebay-image-compressor.html" data-zh="eBay">eBay</a></li>
        </ul>
      </div>
      <div>
        <h5 data-zh="社交媒体">Social Media</h5>
        <ul>
          <li><a href="instagram-post-size.html" data-zh="Instagram">Instagram</a></li>
          <li><a href="youtube-thumbnail-size.html" data-zh="YouTube">YouTube</a></li>
          <li><a href="linkedin-banner-size.html" data-zh="LinkedIn">LinkedIn</a></li>
          <li><a href="twitter-header-size.html" data-zh="Twitter">Twitter</a></li>
        </ul>
      </div>
      <div>
        <h5 data-zh="公司">Company</h5>
        <ul>
          <li><a href="../about.html" data-zh="关于">About</a></li>
          <li><a href="../contact.html" data-zh="联系我们">Contact</a></li>
          <li><a href="../privacy.html" data-zh="隐私政策">Privacy</a></li>
          <li><a href="../terms.html" data-zh="服务条款">Terms</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span data-zh="© 2026 ImageFitly. 版权所有。">© 2026 ImageFitly. All rights reserved.</span>
      <span data-zh="为全球创作者用心打造 ❤️">Made with ❤️ for creators worldwide</span>
    </div>
  </div>
</footer>

<script src="../js/main.js"></script>
<script src="../js/i18n.js"></script>
<script src="../js/image-engine.js"></script>
<script src="../js/tool-page.js"></script>
<script>
  const toolConfig = {
    presets: ${JSON.stringify(tool.presets)},
    defaultPreset: 0,
    defaultFormat: '${tool.defaultFormat}',
    defaultQuality: ${tool.defaultQuality},
    showBackgroundRemover: ${tool.showBg},
  };
  document.addEventListener('DOMContentLoaded', () => {
    new ToolPage(toolConfig);
  });
</script>

</body>
</html>`;
}

const outDir = path.join(__dirname, 'tools');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

TOOLS.forEach(tool => {
  const html = renderPage(tool);
  const filePath = path.join(outDir, `${tool.slug}.html`);
  fs.writeFileSync(filePath, html);
  console.log(`✓ Generated: ${tool.slug}.html`);
});

console.log(`\n✅ Done. Generated ${TOOLS.length} tool pages.`);
