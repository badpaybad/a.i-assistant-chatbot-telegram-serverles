#!/usr/bin/env bash
# Script đóng gói ứng dụng CNC GRBL bằng Nuitka sang dist/linuxx64 và dist/winx64

set -e

# Xác định thư mục script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "===================================================="
echo "  BUILD SCRIPT: GRBL CNC Web Controller (Nuitka)    "
echo "===================================================="

# Tự động kích hoạt virtual environment nếu có
if [ -d "../venv/bin" ]; then
    export PATH="$SCRIPT_DIR/../venv/bin:$PATH"
elif [ -d "venv/bin" ]; then
    export PATH="$SCRIPT_DIR/venv/bin:$PATH"
fi
export PATH="$HOME/.local/bin:$PATH"

# Kiếm tra Python & Pip
PYTHON_BIN=$(which python3 || which python)
if [ -z "$PYTHON_BIN" ]; then
    echo "❌ Lỗi: Không tìm thấy Python 3!"
    exit 1
fi

echo "📌 Python binary: $PYTHON_BIN"

# Kiểm tra & tự động cài đặt Nuitka và patchelf nếu chưa có
if ! "$PYTHON_BIN" -m nuitka --version &>/dev/null; then
    echo "📦 Nuitka chưa được cài đặt. Đang tiến hành cài đặt..."
    "$PYTHON_BIN" -m pip install nuitka
fi

if ! which patchelf &>/dev/null; then
    echo "📦 patchelf chưa có trong PATH. Đang cài đặt..."
    "$PYTHON_BIN" -m pip install patchelf || true
fi

# Tạo thư mục đầu ra
DIST_LINUX="dist/linuxx64"
DIST_WIN="dist/winx64"

mkdir -p "$DIST_LINUX"
mkdir -p "$DIST_WIN"

echo ""
echo "----------------------------------------------------"
echo "  [1/2] Đóng gói cho Linux x64 (dist/linuxx64)...  "
echo "----------------------------------------------------"

if [ "$(uname -s)" = "Linux" ]; then
    rm -rf "$DIST_LINUX/main.build" "$DIST_LINUX/main.onefile-build"
    "$PYTHON_BIN" -m nuitka \
        --standalone \
        --onefile \
        --remove-output \
        --output-dir="$DIST_LINUX" \
        --output-filename=cnc_main \
        --assume-yes-for-downloads \
        --follow-imports \
        --nofollow-import-to=tensorflow,torch,keras,tensorboard \
        --module-parameter=torch-disable-jit=yes \
        main.py

    echo "📋 Copying static assets to $DIST_LINUX..."
    [ -d "static" ] && cp -r static "$DIST_LINUX/"
    [ -d "fonts" ] && cp -r fonts "$DIST_LINUX/"
    [ -d "aimodels" ] && cp -r aimodels "$DIST_LINUX/"
    [ -f "calibration_settings.json" ] && cp calibration_settings.json "$DIST_LINUX/" || true
    [ -f "camera_calibration_result.npz" ] && cp camera_calibration_result.npz "$DIST_LINUX/" || true
    
    echo "✅ Đóng gói Linux x64 hoàn tất: $DIST_LINUX/cnc_main"
else
    echo "⚠️ Bỏ qua build Linux x64 nguyên bản vì không chạy trên Linux OS."
fi

echo ""
echo "----------------------------------------------------"
echo "  [2/2] Đóng gói cho Windows x64 (dist/winx64)...  "
echo "----------------------------------------------------"

IS_WIN=false
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$OSTYPE" == "cygwin" ]]; then
    IS_WIN=true
fi

if [ "$IS_WIN" = true ]; then
    rm -rf "$DIST_WIN/main.build" "$DIST_WIN/main.onefile-build"
    "$PYTHON_BIN" -m nuitka \
        --standalone \
        --onefile \
        --remove-output \
        --output-dir="$DIST_WIN" \
        --output-filename=cnc_main.exe \
        --assume-yes-for-downloads \
        --follow-imports \
        --nofollow-import-to=tensorflow,torch,keras,tensorboard \
        --module-parameter=torch-disable-jit=yes \
        main.py

    echo "📋 Copying static assets to $DIST_WIN..."
    [ -d "static" ] && cp -r static "$DIST_WIN/"
    [ -d "fonts" ] && cp -r fonts "$DIST_WIN/"
    [ -d "aimodels" ] && cp -r aimodels "$DIST_WIN/"
    [ -f "calibration_settings.json" ] && cp calibration_settings.json "$DIST_WIN/" || true
    [ -f "camera_calibration_result.npz" ] && cp camera_calibration_result.npz "$DIST_WIN/" || true
    
    echo "✅ Đóng gói Windows x64 hoàn tất: $DIST_WIN/cnc_main.exe"
elif command -v docker &>/dev/null && docker info &>/dev/null; then
    echo "🐳 Phát hiện Docker environment. Đang đóng gói Windows x64 qua Nuitka Container..."
    docker run --rm \
        -v "$SCRIPT_DIR":/code \
        -w /code \
        python:3.12-windowsservercore \
        powershell -Command "pip install nuitka fastapi uvicorn opencv-python numpy onnxruntime pyserial pydantic; nuitka --standalone --onefile --output-dir=$DIST_WIN --output-filename=cnc_main.exe --assume-yes-for-downloads main.py" 2>/dev/null || {
            echo "⚠️ Đóng gói Windows bằng Docker yêu cầu Windows container."
        }
else
    echo "ℹ️ Chuẩn bị thư mục và tài nguyên đóng gói cho Windows x64 tại $DIST_WIN..."
    [ -d "static" ] && cp -r static "$DIST_WIN/"
    [ -d "fonts" ] && cp -r fonts "$DIST_WIN/"
    [ -d "aimodels" ] && cp -r aimodels "$DIST_WIN/"
    [ -f "calibration_settings.json" ] && cp calibration_settings.json "$DIST_WIN/" || true
    [ -f "camera_calibration_result.npz" ] && cp camera_calibration_result.npz "$DIST_WIN/" || true
    
    echo "💡 Mẹo: Để đóng gói file executable Windows (.exe) trực tiếp:"
    echo "   1. Chạy bash script này trên máy Windows (Git Bash/WSL) đã cài Python."
    echo "   2. Hoặc chạy lệnh: python -m nuitka --standalone --onefile --output-dir=$DIST_WIN --output-filename=cnc_main.exe main.py"
fi

echo ""
echo "===================================================="
echo "🎉 HOÀN THÀNH QUÁ TRÌNH BUILD DỰ ÁN CNC GRBL!       "
echo "===================================================="
