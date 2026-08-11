# Deployment Guide — ImageFitly

## Quick Start (5 minutes to deploy)

### Option 1: Cloudflare Pages (RECOMMENDED — Free, Fast Global CDN)

**Prerequisites:** A Cloudflare account (free) and a domain.

**Steps:**
1. Push your code to a GitHub repository:
   ```bash
   cd imagetool-site
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/imagefitly.git
   git push -u origin main
   ```

2. In Cloudflare Dashboard:
   - Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
   - Select your repository
   - **Build settings:**
     - Framework preset: `None`
     - Build command: *(leave empty)*
     - Build output directory: `/` (root)
   - Click **Save and Deploy**

3. Add your custom domain:
   - Go to **Custom domains** → **Set up a custom domain**
   - Enter `imagefitly.com` (or your chosen domain)
   - Cloudflare will automatically configure DNS

**Cost: $0/month** — Free tier includes unlimited requests, 500 builds/month.

---

### Option 2: Netlify Drop (Zero Config — 1 minute)

1. Visit [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop the entire `imagetool-site` folder
3. Done — you get a free `*.netlify.app` URL instantly

For a custom domain:
- Go to **Site settings** → **Domain management** → **Add custom domain**
- Follow DNS instructions

**Cost: $0/month** for free tier.

---

### Option 3: Vercel

```bash
npm i -g vercel
cd imagetool-site
vercel --prod
```

**Cost: $0/month** for free tier.

---

## Domain Setup

### Recommended Domain Registrars (海外友好)
- **Namecheap** (~$10/year for .com) — 推荐，最便宜
- **Cloudflare Registrar** (成本价，无加价)
- **Porkbun** (便宜，UI 友好)

### DNS Configuration
For `imagefitly.com` → Cloudflare Pages:
```
A    @    192.0.2.1   (Cloudflare 自动代理)
CNAME www  your-site.pages.dev
```

---

## Post-Deployment Checklist

### 1. Search Engine Indexing
- [ ] Submit sitemap to **Google Search Console**: https://search.google.com/search-console
  - Add property → URL prefix → enter `https://imagefitly.com/`
  - Sitemaps → Add `https://imagefitly.com/sitemap.xml`
- [ ] Submit to **Bing Webmaster Tools**: https://www.bing.com/webmasters
- [ ] Submit to **Yandex Webmaster** (for some markets)

### 2. Analytics (Privacy-Friendly)
- [ ] Sign up at [Plausible.io](https://plausible.io) (~$9/month, no cookie banner needed)
  - Add this to all HTML files before `</head>`:
    ```html
    <script defer data-domain="imagefitly.com" src="https://plausible.io/js/script.js"></script>
    ```
- [ ] OR use **Umami** (free self-hosted)

### 3. Monetization Setup
- [ ] **Google AdSense** (apply after ~50 daily visitors)
  - Add the AdSense script before `</head>`
  - Create ad units in your dashboard
- [ ] **Ezoic** (alternative to AdSense, higher CPM, requires 10k visits/month)
- [ ] Affiliate links: Sign up for **Canva**, **Shopify**, **Amazon**, **PhotoRoom** affiliate programs

### 4. Legal Compliance
- [ ] Privacy Policy ✅ (already created at `/privacy.html`)
- [ ] Terms of Service ✅ (already created at `/terms.html`)
- [ ] Cookie banner (only if you use non-essential cookies)
- [ ] GDPR-compliant analytics ✅ (Plausible/Umami don't need consent)
- [ ] Contact page ✅ (already created at `/contact.html`)

### 5. Performance
- [ ] Enable Cloudflare's auto-minify (HTML/CSS/JS)
- [ ] Enable Brotli compression (default on Cloudflare)
- [ ] Set cache rules: `Cache everything` for static assets
- [ ] Add security headers (CSP, X-Frame-Options)

### 6. Branding
- [ ] Create a simple logo (use [Canva](https://canva.com) or [Figma](https://figma.com))
- [ ] Save as SVG, replace the inline SVG favicon in each HTML file
- [ ] Create Open Graph image (1200×630px) — use Canva

---

## SEO Strategy (Programmatic SEO)

The site is already structured for pSEO. To dominate search results:

### Keyword Expansion (50+ more pages)
Add landing pages for long-tail variations:

```
/amazon-product-photo-requirements
/shopify-product-image-best-size
/etsy-listing-photo-resolution
/ebay-photo-size-requirements
/instagram-story-aspect-ratio
/youtube-thumbnail-dimensions-2026
/linkedin-company-page-banner-size
/twitter-banner-mobile-safe-area
/facebook-page-cover-photo
/pinterest-pin-image-size
/tiktok-video-thumbnail
/wordpress-featured-image-size
/etsy-photo-zoom-requirements
/shopify-collection-image-dimensions
/amazon-main-image-requirements
... (50+ more)
```

Each new page is a copy of an existing one with different title/description/intro. Use the `generate-tools.js` script as a template.

### Content Marketing (Blog)
- Publish 2-4 articles per month targeting long-tail keywords
- Focus on topics with commercial intent (sellers searching for solutions)

### Link Building
- Submit to free tool directories: ProductHunt, BetaList, AlternativeTo
- Guest posts on Shopify, Amazon seller blogs
- Reddit: r/Shopify, r/FulfillmentByAmazon, r/Etsy, r/youtube

---

## Scaling Strategy

### Phase 1 (0-6 months): Free tools, AdSense
- Build organic traffic through pSEO
- 100% free service, AdSense monetization
- Goal: 1,000 daily visitors

### Phase 2 (6-12 months): Premium features
- Add **Pro tier** ($5/month):
  - Batch processing (resize 100 images at once)
  - No ads
  - Higher quality AI background removal
  - API access
- Use **Stripe** for payments

### Phase 3 (12-18 months): SaaS Expansion
- Image SEO optimizer (auto alt text, file naming)
- Multi-language support (Spanish, Portuguese, German, French)
- Mobile app (PWA → native)
- White-label API for agencies

---

## Common Issues

### Issue: "AI background removal is slow"
**Solution:** This is expected for first use — the AI model (~5MB) is downloaded once, then cached. Subsequent uses are instant.

### Issue: "Images look low quality after resizing"
**Solution:** Upload images at 2x the target resolution. If targeting 2000×2000, upload at 4000×4000 for best results.

### Issue: "Cloudflare Pages can't find index.html"
**Solution:** Make sure the build output directory is set to `/` (root), not `/public` or any other folder.

### Issue: "Google isn't indexing my pages"
**Solution:** Submit sitemap in Search Console. Wait 1-2 weeks. Make sure robots.txt doesn't block anything.

---

## Support

For questions about deployment, contact: hello@imagefitly.com
