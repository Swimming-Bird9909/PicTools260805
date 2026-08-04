# ImageFitly - Free Image Tools for E-commerce & Social Media

A 100% free, browser-based image toolkit targeting the e-commerce seller and social media creator markets. Built around programmatic SEO — each tool is a dedicated landing page optimized for one high-intent keyword.

## Features

- **10+ free tools** covering Amazon, Shopify, Etsy, eBay product image requirements
- **Social media presets** for Instagram, YouTube, LinkedIn, Twitter, Facebook
- **AI background removal** using WebAssembly (runs locally, 100% private)
- **Smart compression** to meet platform file size limits
- **Multiple format support** — JPG, PNG, WEBP

## Architecture

- **Static site** — HTML + CSS + vanilla JS, no build step required
- **Client-side image processing** — Canvas API + @imgly/background-removal (WASM)
- **Zero server costs** — Can be deployed to any static host (Cloudflare Pages, Vercel, Netlify, GitHub Pages)
- **SEO-optimized** — Programmatic landing pages, JSON-LD schema, structured FAQ

## Structure

```
imagetool-site/
├── index.html                       # Homepage
├── about.html
├── contact.html
├── privacy.html
├── terms.html
├── sitemap.xml
├── robots.txt
├── css/style.css
├── js/
│   ├── image-engine.js              # Image processing core
│   └── tool-page.js                 # Tool UI controller
├── tools/                           # 10 SEO landing pages
│   ├── amazon-image-size-converter.html
│   ├── shopify-image-optimizer.html
│   ├── ...
└── blog/                            # Content marketing
    ├── index.html
    ├── amazon-image-size-guide.html
    └── ...
```

## Deployment

1. **Cloudflare Pages** (recommended): Connect GitHub repo, build command empty, output dir `/imagetool-site`
2. **Vercel**: `vercel --prod`
3. **Netlify**: Drag & drop the `imagetool-site` folder to Netlify Drop
4. **GitHub Pages**: Push to `gh-pages` branch

## Monetization

- Google AdSense / Ezoic on free tools
- Affiliate links to Canva, Shopify, Amazon seller tools
- Future Pro tier: batch processing, no ads, API access

## License

MIT
