@echo off
echo === Bat dau dong goi cncapi cho Windows ===
cd /d "%~dp0"

echo Kiem tra va cai dat cac thu vien phu thuoc tu requirements.txt...
python -m pip install -r requirements.txt

pyinstaller --noconfirm main.spec

if exist calibration_settings.json (
    copy /Y calibration_settings.json dist\calibration_settings.json
    echo Da sao chep calibration_settings.json vao thu muc dist\
)

echo === Dong goi hoan tat. File chay da duoc tao tai dist\cncapi.exe ===
