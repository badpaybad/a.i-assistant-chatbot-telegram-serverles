#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_PIP="/work/a.i-assistant-chatbot-telegram-serverles/venv/bin/pip"
VENV_PYINSTALLER="/work/a.i-assistant-chatbot-telegram-serverles/venv/bin/pyinstaller"

cd "$SCRIPT_DIR"

echo "=== 1. Cài đặt/Kiểm tra các thư viện phụ thuộc từ requirements.txt ==="
if [ -f "$VENV_PIP" ]; then
    "$VENV_PIP" install -q -r requirements.txt
elif command -v pip &> /dev/null; then
    pip install -q -r requirements.txt
else
    python3 -m pip install -q -r requirements.txt
fi

echo "=== 2. Đóng gói binary cho Linux (Ubuntu) ==="
if [ -f "$VENV_PYINSTALLER" ]; then
    "$VENV_PYINSTALLER" --noconfirm main.spec
elif command -v pyinstaller &> /dev/null; then
    pyinstaller --noconfirm main.spec
else
    python3 -m PyInstaller --noconfirm main.spec
fi

if command -v wine &> /dev/null && wine python --version &> /dev/null; then
    echo "=== 3. Đóng gói executable cho Windows (.exe) qua Wine ==="
    WINEDEBUG=-all wine python -m pip install -q -r requirements.txt 2>/dev/null || true
    WINEDEBUG=-all wine python -m PyInstaller --noconfirm main.spec
fi

if [ -f "calibration_settings.json" ]; then
    cp -f "calibration_settings.json" "$SCRIPT_DIR/dist/calibration_settings.json"
    echo "Đã sao chép calibration_settings.json vào thư mục dist/"
fi

echo "=== Đóng gói hoàn tất! các file trong dist/:"
ls -lh "$SCRIPT_DIR/dist/"
