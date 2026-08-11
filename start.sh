#!/bin/bash
# start.sh - 本地启动图片工具站（macOS / Linux）
# 用法：把本文件放在 imagetool-site 目录同级，然后执行 ./start.sh

cd "$(dirname "$0")/imagetool-site" 2>/dev/null || cd "$(dirname "$0")"

# 优先用 Python 3
PYTHON=$(command -v python3 2>/dev/null || command -v python 2>/dev/null)
PORT=8765

if [ -z "$PYTHON" ]; then
    echo "❌ 未找到 Python，请安装 Python 3"
    exit 1
fi

echo "🦞 启动 Image Tool Station..."
echo "   本地地址: http://localhost:$PORT"
echo "   按 Ctrl+C 停止"
echo ""

$PYTHON -m http.server $PORT
