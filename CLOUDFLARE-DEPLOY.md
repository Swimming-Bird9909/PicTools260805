# Cloudflare Pages 部署 — wezzik.com 子域名

## 前置条件
你已经在 Namecheap 注册了 `wezzik.com`。

---

## 步骤 1：把 wezzik.com 接入 Cloudflare（免费，5 分钟）

1. 注册 [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)（免费）
2. 登录后点「+ Add a site」，输入 `wezzik.com`
3. 选择 Free 套餐（$0/月）
4. Cloudflare 会扫描你的 DNS 记录（现在应该是空的，没关系）
5. Cloudflare 会给你两�� nameserver 地址（类似 `alfred.ns.cloudflare.com`）
6. 打开 Namecheap → Domain List → wezzik.com → Manage → DNS → 把 Nameservers 从 Namecheap BasicDNS 改成 Custom DNS，填入 Cloudflare 给的两个地址
7. 等待 DNS 生效（通常 5-30 分钟，Cloudflare 会发邮件通知你）

---

## 步骤 2：用 Cloudflare Pages 部署站点（1 分钟）

1. Cloudflare 控制台左侧 → **Workers & Pages** → **Pages** → **Create**
2. 选择 **Direct Upload**（不需要 Git）
3. 输入项目名，例如 `imagefitly`
4. 点击 **Upload assets**，把整个 `imagetool-site` 文件夹拖进去
5. 部署完成后 Cloudflare 会给你一个 `xxx.pages.dev` 的临时域名

---

## 步骤 3：绑定 wezzik.com 子域名（1 分钟）

1. 在 Pages 项目里 → **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入你想用的子域名，例如：
   - `tools.wezzik.com`（推荐，图片工具站）
   - `img.wezzik.com`（简洁）
   - `www.wezzik.com`（如果只有这一个站）
4. 点击 Activate，Cloudflare 会自动添加 DNS 记录
5. 等待 1-2 分钟生效，访问你的子域名就能看到网站了

---

## 备选方案：Vercel（也很简单）

如果不想用 Cloudflare，Vercel 同样方便：

1. 注册 [vercel.com](https://vercel.com)（用 GitHub 登录）
2. Dashboard → Add New → Project → 把 `imagetool-site` 文件夹拖进去
3. 获得 `xxx.vercel.app` 临时域名
4. Settings → Domains → 添加 `tools.wezzik.com`
5. 去 Cloudflare/Namecheap 添加一条 CNAME 记录：`tools → cname.vercel-dns.com`

---

## 部署后别忘了

- [ ] 在 Cloudflare Pages → Settings → Build configuration 中确认 build command 为空（纯静态不需要 build）
- [ ] 开启 **Auto Minify**（HTML/CSS/JS）
- [ ] 如果后续上 AdSense，在 Cloudflare 中开启 **Bot Fight Mode**
- [ ] 提交 `sitemap.xml` 到 Google Search Console
