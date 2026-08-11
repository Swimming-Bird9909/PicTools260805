@echo off
REM start.bat - 本地启动图片工具站（Windows）
REM 用法：把本文件放在 imagetool-site 目录同级，双击运行

cd /d "%~dp0imagetool-site" 2>nul || cd /d "%~dp0"

python -m http.server 8765 2>nul || py -m http.server 8765 2>nul || python3 -m http.server 8765

if %errorlevel% neq 0 (
    echo.
    echo [错误] 未找到 Python，请先安装 Python 3：https://www.python.org/downloads/
    echo.
    pause
)
