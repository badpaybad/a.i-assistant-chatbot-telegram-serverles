# Sử dụng base image Python 3.12 slim nhẹ và tối ưu
FROM python:3.12-slim

# Thiết lập biến môi trường
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000 \
    SOCKS5_PORT=1080 \
    HOST=0.0.0.0 \
    DB_PATH=/app/data/llm_audit.db \
    POLICY_FILE=/app/policy_matrix.yaml

# Cài đặt các công cụ mạng hệ thống cần thiết (iproute2 cho lệnh ip neigh, curl cho healthcheck)
RUN apt-get update && apt-get install -y --no-install-recommends \
    iproute2 \
    curl \
    procps \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Cài đặt thư viện Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép mã nguồn ứng dụng
COPY database.py token_utils.py proxy_server.py policy_matrix.yaml ./
COPY static/ ./static/

# Tạo thư mục data lưu trữ SQLite database
RUN mkdir -p /app/data

# Mở cổng HTTP/WebSocket 8000 và SOCKS5 1080
EXPOSE 8000 1080

# Kiểm tra trạng thái sức khỏe định kỳ
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/api/stats || exit 1

# Khởi chạy ứng dụng
CMD ["python3", "proxy_server.py"]
