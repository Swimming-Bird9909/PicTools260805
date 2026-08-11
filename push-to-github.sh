#!/bin/bash
# 将代码推送到 PicTools260805 仓库
# 在你的终端里运行：bash push-to-github.sh

set -e

cd "$(dirname "$0")"

echo "==> 设置 Git remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/Swimming-Bird9909/PicTools260805.git"
echo "ℹ️  如需推送，请先设置带 token 的 remote（或用 gh auth）："
echo "    git remote set-url origin https://<YOUR_TOKEN>@github.com/Swimming-Bird9909/PicTools260805.git"

echo "==> 推送代码到 GitHub..."
git push -u origin main --force

echo ""
echo "✅ 推送成功！打开 https://github.com/Swimming-Bird9909/PicTools260805 查看"
echo ""
echo "⚠️  推送完成后，建议删除 GitHub Token（github.com/settings/tokens）"
