pip install pyinstaller

pyinstaller --onefile --clean --add-data "static:static" main.py


pyinstaller --onedir --clean --add-data "static:static" main.py

pyinstaller --onefile --hidden-import=uvicorn.logging --hidden-import=uvicorn.loops --hidden-import=uvicorn.loops.auto --hidden-import=uvicorn.protocols --hidden-import=uvicorn.protocols.http --hidden-import=uvicorn.protocols.http.auto --hidden-import=uvicorn.protocols.websockets --hidden-import=uvicorn.protocols.websockets.auto --hidden-import=uvicorn.lifespan --hidden-import=uvicorn.lifespan.on --add-data "static:static" main.py x`x`


# Tạo môi trường ảo tên là venv
python3 -m venv venv

# Kích hoạt môi trường ảo
source venv/bin/activate

# Nâng cấp pip trước
pip install --upgrade pip

# Cài đặt các thư viện cần thiết cho FastAPI và Uvicorn
pip install fastapi uvicorn python-multipart pydantic

# Cài đặt các thư viện xử lý hình ảnh, đồ thị và Serial (GRBL)
pip install opencv-python numpy scikit-image networkx pyserial

# Cài đặt PyInstaller phiên bản mới nhất
pip install pyinstaller


apt-get install -y wine64 wine32 wget ca-certificates

wget https://www.python.org/ftp/python/3.12.3/python-3.12.3-amd64.exe -O /tmp/python-installer.exe

wine /tmp/python-installer.exe /quiet InstallAllUsers=1 PrependPath=1

wget https://www.python.org/ftp/python/3.12.3/python-3.12.3-amd64.exe

# install python cho wine 
wine python-3.12.3-amd64.exe 

wine ~/.wine/drive_c/users/$USER/AppData/Local/Programs/Python/Python312/python.exe -m pip install --upgrade pip

wine ~/.wine/drive_c/users/$USER/AppData/Local/Programs/Python/Python312/python.exe -m pip install opencv-python-headless numpy scikit-image networkx pyserial fastapi uvicorn python-multipart pydantic pyinstaller

wine ~/.wine/drive_c/users/$USER/AppData/Local/Programs/Python/Python312/Scripts/pyinstaller.exe --onefile --clean --add-data "static;static" main.py