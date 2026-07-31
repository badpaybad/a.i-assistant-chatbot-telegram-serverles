$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $ScriptDir

Write-Host "=== Kiểm tra và cài đặt các thư viện từ requirements.txt ===" -ForegroundColor Cyan
python -m pip install -r requirements.txt

Write-Host "=== Bắt đầu đóng gói cncapi cho Windows ===" -ForegroundColor Green
pyinstaller --noconfirm main.spec

if (Test-Path "calibration_settings.json") {
    Copy-Item -Force "calibration_settings.json" "dist\calibration_settings.json"
    Write-Host "Đã sao chép calibration_settings.json vào thư mục dist\" -ForegroundColor Yellow
}

Write-Host "=== Đóng gói hoàn tất. File chạy đã được tạo tại dist\cncapi.exe ===" -ForegroundColor Green
