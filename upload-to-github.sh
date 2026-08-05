#!/bin/bash
# upload-to-github.sh — 一键推送代码到 GitHub
# 用法：在终端里执行 bash upload-to-github.sh

set -e

echo "🦞 开始推送 ImageFitly 到 GitHub..."
echo ""

# 检查 gh CLI
if ! command -v gh &> /dev/null; then
    echo "📦 安装 GitHub CLI..."
    brew install gh
fi

# 登录 GitHub
echo ""
echo "🔐 需要登录 GitHub..."
gh auth login

# 创建仓库并推送
echo ""
echo "📤 创建仓库并推送代码..."
cd /Users/malcolm/WorkBuddy/2026-08-02-23-15-06/imagetool-site

gh repo create wezzik-tools --public --push --source=. --remote=origin

echo ""
echo "✅ 完成！"
echo "   GitHub: https://github.com/qiuliang087/wezzik-tools"
echo "   网站:   https://tools.wezzik.com"
echo ""
echo "下一步：在 Vercel Dashboard 连接 GitHub 仓库，实现自动部署"
echo "  https://vercel.com/qiuliang087-5768s-projects/wezzik-tools/settings/git"
