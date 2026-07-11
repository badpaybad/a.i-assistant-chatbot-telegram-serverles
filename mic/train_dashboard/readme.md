Nếu bạn muốn host các file này qua server cục bộ:

Mở terminal tại thư mục gốc của dự án (/work/a.i-assistant-chatbot-telegram-serverles) và chạy lệnh sau:
bash
python3 -m http.server 8000
Sau đó truy cập các đường dẫn tương ứng trên trình duyệt:
CameraIP Dashboard: http://localhost:8000/cameraip/train/train_dashboard/
Mic Dashboard: http://localhost:8000/mic/train_dashboard/