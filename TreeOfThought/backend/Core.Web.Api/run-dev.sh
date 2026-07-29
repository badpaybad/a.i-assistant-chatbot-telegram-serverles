#!/bin/bash

# Ensure we are in the script's directory
cd "$(dirname "$0")"

# Configure .NET 10 PATH & Binary
DOTNET_BIN="/home/dunp/.dotnet/dotnet"
if [ ! -f "$DOTNET_BIN" ]; then
    DOTNET_BIN="dotnet"
fi
export DOTNET_ROOT="/home/dunp/.config/Code/User/globalStorage/ms-dotnettools.vscode-dotnet-runtime/.dotnet/10.0.10~x64~aspnetcore"
export PATH="$(dirname "$DOTNET_BIN"):$DOTNET_ROOT:$PATH"

fuser -k 5000/tcp
fuser -k 4200/tcp

# Create wwwroot/admin if it doesn't exist, and clean it to avoid StaticWebAssets conflicts
rm -rf wwwroot/admin/*
mkdir -p wwwroot/admin

# Copy ArcFaceFinetune folder from docs to Core.Web.Api
echo "Copying ArcFaceFinetune from docs..."
# # Kết hợp bỏ qua hỏi xác nhận và ghi đè nội dung
# \cp -r ../../docs/nhan-dien-khuon-mat/ArcFaceFinetune/. ArcFaceFinetune
rsync -av ../../docs/nhan-dien-khuon-mat/ArcFaceFinetune/ ArcFaceFinetune

# Start Angular build in watch mode in the background
echo "Starting Angular build in watch mode..."
(cd ../../frontend/web && npm run integrated) &
ANGULAR_PID=$!

# Function to kill background processes on exit
cleanup() {
    echo "Stopping Angular build (PID: $ANGULAR_PID)..."
    kill $ANGULAR_PID
    exit
}
# trap cleanup SIGINT SIGTERM

# Start .NET backend by executing the compiled DLL directly to optimize RAM
# TreeOfThought/backend/Core.Web.Api
source ../../../venv/bin/activate
"$DOTNET_BIN" build 
echo "Starting Backend by executing DLL directly to prevent memory exhaustion..."
"$DOTNET_BIN" bin/Debug/net10.0/Core.Web.Api.dll