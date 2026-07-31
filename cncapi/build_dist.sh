#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_PYINSTALLER="/work/a.i-assistant-chatbot-telegram-serverles/venv/bin/pyinstaller"

echo "=== Bắt đầu đóng gói cncapi ứng dụng thành executable ==="
cd "$SCRIPT_DIR"

if [ -f "$VENV_PYINSTALLER" ]; then
    "$VENV_PYINSTALLER" --noconfirm main.spec
else
    pyinstaller --noconfirm main.spec
fi

if [ -f "calibration_settings.json" ]; then
    cp -f "calibration_settings.json" "$SCRIPT_DIR/dist/calibration_settings.json"
    echo "Đã sao chép calibration_settings.json vào thư mục dist/"
fi

echo "=== Đóng gói hoàn tất. File chạy đã được tạo tại $SCRIPT_DIR/dist/cncapi ==="
