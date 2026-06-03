import os
import sys
import subprocess
import signal
import csv
from flask import Flask, jsonify, request, render_template_string

app = Flask(__name__)

# Tiến trình huấn luyện chạy ngầm
train_process = None

def is_training_running():
    global train_process
    if train_process is not None:
        if train_process.poll() is None:  # Tiến trình vẫn đang chạy
            return True
    return False

# =====================================================================
# GIAO DIỆN WEB (DASHBOARD)
# =====================================================================

INDEX_HTML = """<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Huấn Luyện Custom Face CNN</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --bg-color: #0d0d12;
            --panel-bg: rgba(22, 22, 33, 0.7);
            --border-color: rgba(99, 102, 241, 0.15);
            --primary: #6366f1;
            --primary-glow: rgba(99, 102, 241, 0.4);
            --success: #10b981;
            --danger: #f43f5e;
            --warning: #f59e0b;
            --text-main: #f3f4f6;
            --text-muted: #9ca3af;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Outfit', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
            background-image: 
                radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.1) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.05) 0px, transparent 50%);
        }

        header {
            padding: 1.5rem 2rem;
            border-bottom: 1px solid var(--border-color);
            background: rgba(13, 13, 18, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header-title h1 {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #a78bfa, #6366f1, #34d399);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .header-title p {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: 0.2rem;
        }

        .status-container {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .status-badge {
            padding: 0.4rem 0.8rem;
            border-radius: 9999px;
            font-size: 0.8rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.3s ease;
        }

        .status-badge.running {
            background: rgba(16, 185, 129, 0.15);
            color: var(--success);
            border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .status-badge.stopped {
            background: rgba(244, 63, 94, 0.15);
            color: var(--danger);
            border: 1px solid rgba(244, 63, 94, 0.3);
        }

        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }

        .status-badge.running .status-dot {
            background: var(--success);
            animation: pulse 1.5s infinite;
        }

        .status-badge.stopped .status-dot {
            background: var(--danger);
        }

        @keyframes pulse {
            0% { transform: scale(0.9); opacity: 0.6; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(0.9); opacity: 0.6; }
        }

        main {
            flex: 1;
            padding: 2rem;
            max-width: 1600px;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        /* Control Panel */
        .control-panel {
            background: var(--panel-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 1.5rem;
            backdrop-filter: blur(16px);
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
            align-items: flex-end;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }

        .input-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            min-width: 120px;
            flex: 1;
        }

        .input-group label {
            font-size: 0.8rem;
            font-weight: 500;
            color: var(--text-muted);
        }

        .input-group input, .input-group select {
            background: rgba(13, 13, 18, 0.6);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 8px;
            padding: 0.6rem 0.8rem;
            color: var(--text-main);
            font-family: inherit;
            font-size: 0.9rem;
            outline: none;
            transition: all 0.2s ease;
        }

        .input-group input:focus, .input-group select:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 2px var(--primary-glow);
        }

        .btn {
            padding: 0.6rem 1.5rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            height: 38px;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary), #4f46e5);
            color: white;
            box-shadow: 0 4px 14px 0 var(--primary-glow);
        }

        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px 0 var(--primary-glow);
        }

        .btn-danger {
            background: linear-gradient(135deg, var(--danger), #e11d48);
            color: white;
            box-shadow: 0 4px 14px 0 rgba(244, 63, 94, 0.3);
        }

        .btn-danger:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px 0 rgba(244, 63, 94, 0.4);
        }

        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none !important;
            box-shadow: none !important;
        }

        /* Stats Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
        }

        .stat-card {
            background: var(--panel-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 1.5rem;
            backdrop-filter: blur(16px);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            position: relative;
            overflow: hidden;
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: var(--primary);
        }

        .stat-card.success::before { background: var(--success); }
        .stat-card.warning::before { background: var(--warning); }
        .stat-card.danger::before { background: var(--danger); }

        .stat-label {
            font-size: 0.8rem;
            font-weight: 500;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
        }

        /* Grid Layout for Charts & Logs */
        .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        @media (max-width: 1024px) {
            .content-grid {
                grid-template-columns: 1fr;
            }
        }

        .card {
            background: var(--panel-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 1.5rem;
            backdrop-filter: blur(16px);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .card-title {
            font-size: 1.1rem;
            font-weight: 600;
        }

        .chart-container {
            position: relative;
            height: 300px;
            width: 100%;
        }

        .log-panel {
            grid-column: span 2;
        }

        @media (max-width: 1024px) {
            .log-panel {
                grid-column: span 1;
            }
        }

        .log-viewer {
            background: rgba(10, 10, 15, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 1rem;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.85rem;
            color: #34d399;
            height: 350px;
            overflow-y: auto;
            white-space: pre-wrap;
            box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.8);
            line-height: 1.4;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(99, 102, 241, 0.3);
            border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(99, 102, 241, 0.6);
        }
    </style>
</head>
<body>
    <header>
        <div class="header-title">
            <h1>Custom Face CNN Training Dashboard</h1>
            <p>Giám sát thời gian thực tiến trình huấn luyện nhận diện khuôn mặt châu Á</p>
        </div>
        <div class="status-container">
            <div id="statusBadge" class="status-badge stopped">
                <span class="status-dot"></span>
                <span id="statusText">Dừng</span>
            </div>
        </div>
    </header>

    <main>
        <!-- Panel Điều Khiển -->
        <section class="control-panel">
            <div class="input-group">
                <label for="epochs">Epochs</label>
                <input type="number" id="epochs" value="200" min="1" max="1000">
            </div>
            <div class="input-group">
                <label for="batchSize">Batch Size</label>
                <input type="number" id="batchSize" value="64" min="1" max="512">
            </div>
            <div class="input-group">
                <label for="learningRate">Learning Rate</label>
                <input type="number" id="learningRate" value="0.0002" step="0.0001" min="0.00001">
            </div>
            <div class="input-group">
                <label for="device">Thiết bị (Device)</label>
                <select id="device">
                    <option value="cpu" selected>CPU</option>
                    <option value="cuda">CUDA (NVIDIA GPU)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="backbone">Backbone</label>
                <select id="backbone">
                    <option value="resnet50" selected>resnet50 (Khuyên dùng)</option>
                    <option value="resnet18">resnet18 (Nhẹ)</option>
                    <option value="mobilenet_v3">mobilenet_v3 (Rất nhẹ)</option>
                    <option value="convnext">convnext (Hiện đại)</option>
                </select>
            </div>
            <button id="btnStart" class="btn btn-primary" onclick="startTraining()">▶ Bắt đầu Train</button>
            <button id="btnStop" class="btn btn-danger" onclick="stopTraining()" disabled>■ Dừng Train</button>
        </section>

        <!-- Thẻ Chỉ Số -->
        <section class="stats-grid">
            <div class="stat-card">
                <span class="stat-label">Tiến trình Epoch</span>
                <span id="statEpoch" class="stat-value">0 / 0</span>
            </div>
            <div class="stat-card warning">
                <span class="stat-label">Batch hiện tại</span>
                <span id="statBatch" class="stat-value">-</span>
            </div>
            <div class="stat-card danger">
                <span class="stat-label">Loss hiện tại</span>
                <span id="statLoss" class="stat-value">0.0000</span>
            </div>
            <div class="stat-card success">
                <span class="stat-label">Độ chính xác (Accuracy)</span>
                <span id="statAcc" class="stat-value">0.00%</span>
            </div>
        </section>

        <!-- Đồ thị -->
        <section class="content-grid">
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Hội Tụ Hàm Mất Mát (Loss Curve)</span>
                </div>
                <div class="chart-container">
                    <canvas id="lossChart"></canvas>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Độ Chính Xác (Accuracy Curve)</span>
                </div>
                <div class="chart-container">
                    <canvas id="accChart"></canvas>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Biểu Đồ Loss Từng Batch (Real-time Batch Loss)</span>
                </div>
                <div class="chart-container">
                    <canvas id="batchLossChart"></canvas>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Biểu Đồ Acc Từng Batch (Real-time Batch Acc)</span>
                </div>
                <div class="chart-container">
                    <canvas id="batchAccChart"></canvas>
                </div>
            </div>

            <!-- Panel Logs -->
            <div class="card log-panel">
                <div class="card-header">
                    <span class="card-title">Nhật ký Hệ Thống (Console Log Output)</span>
                    <button class="btn" style="height: 28px; padding: 0 0.75rem; font-size: 0.75rem; background: rgba(255,255,255,0.05);" onclick="clearLogs()">Xóa màn hình</button>
                </div>
                <div id="logViewer" class="log-viewer">Đang chờ tiến trình huấn luyện...</div>
            </div>
        </section>
    </main>

    <script>
        // Cấu hình Chart.js chung cho giao diện tối giản, hiện đại
        const chartOptions = (yTitle) => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#f3f4f6', font: { family: 'Outfit' } }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#9ca3af', font: { family: 'Outfit' } }
                },
                y: {
                    title: { display: true, text: yTitle, color: '#f3f4f6', font: { family: 'Outfit' } },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#9ca3af', font: { family: 'Outfit' } }
                }
            }
        });

        // 1. Biểu đồ Loss
        const ctxLoss = document.getElementById('lossChart').getContext('2d');
        const lossChart = new Chart(ctxLoss, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    { label: 'Train Loss', data: [], borderColor: '#818cf8', backgroundColor: 'rgba(129, 140, 248, 0.1)', borderWidth: 2, tension: 0.1, fill: true },
                    { label: 'Val Loss', data: [], borderColor: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.1)', borderWidth: 2, tension: 0.1, fill: true }
                ]
            },
            options: chartOptions('Loss Value')
        });

        // 2. Biểu đồ Accuracy
        const ctxAcc = document.getElementById('accChart').getContext('2d');
        const accChart = new Chart(ctxAcc, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    { label: 'Train Acc', data: [], borderColor: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)', borderWidth: 2, tension: 0.1, fill: true },
                    { label: 'Val Acc', data: [], borderColor: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.1)', borderWidth: 2, tension: 0.1, fill: true }
                ]
            },
            options: chartOptions('Accuracy (%)')
        });

        // 3. Biểu đồ Batch Loss
        const ctxBatchLoss = document.getElementById('batchLossChart').getContext('2d');
        const batchLossChart = new Chart(ctxBatchLoss, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    { label: 'Batch Loss', data: [], borderColor: '#a78bfa', backgroundColor: 'rgba(167, 139, 250, 0.05)', borderWidth: 1.5, pointRadius: 1, tension: 0.2 }
                ]
            },
            options: chartOptions('Loss')
        });

        // 4. Biểu đồ Batch Accuracy
        const ctxBatchAcc = document.getElementById('batchAccChart').getContext('2d');
        const batchAccChart = new Chart(ctxBatchAcc, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    { label: 'Batch Acc', data: [], borderColor: '#6ee7b7', backgroundColor: 'rgba(110, 231, 183, 0.05)', borderWidth: 1.5, pointRadius: 1, tension: 0.2 }
                ]
            },
            options: chartOptions('Accuracy (%)')
        });

        // Điều khiển luồng AJAX liên tục
        let isPolling = false;
        let pollTimer = null;

        function startPolling() {
            if (isPolling) return;
            isPolling = true;
            updateDashboard();
            pollTimer = setInterval(updateDashboard, 1500);
        }

        function stopPolling() {
            isPolling = false;
            if (pollTimer) {
                clearInterval(pollTimer);
                pollTimer = null;
            }
        }

        async function updateDashboard() {
            try {
                // Lấy trạng thái
                const statusRes = await fetch('/api/status');
                const status = await statusRes.json();

                const statusBadge = document.getElementById('statusBadge');
                const statusText = document.getElementById('statusText');
                const btnStart = document.getElementById('btnStart');
                const btnStop = document.getElementById('btnStop');

                if (status.running) {
                    statusBadge.className = 'status-badge running';
                    statusText.textContent = 'Đang huấn luyện';
                    btnStart.disabled = true;
                    btnStop.disabled = false;
                    startPolling(); // Đảm bảo luôn kích hoạt poll khi đang chạy
                } else {
                    statusBadge.className = 'status-badge stopped';
                    statusText.textContent = 'Đã dừng / Xong';
                    btnStart.disabled = false;
                    btnStop.disabled = true;
                }

                // Cập nhật card chỉ số
                const totalEpochsInput = document.getElementById('epochs').value;
                document.getElementById('statEpoch').textContent = `${status.epoch} / ${totalEpochsInput}`;
                document.getElementById('statBatch').textContent = status.batch || '-';
                document.getElementById('statLoss').textContent = status.loss ? status.loss.toFixed(4) : '0.0000';
                document.getElementById('statAcc').textContent = status.accuracy ? `${status.accuracy.toFixed(2)}%` : '0.00%';

                // Lấy Logs
                const logsRes = await fetch('/api/logs');
                const logsData = await logsRes.json();
                const logViewer = document.getElementById('logViewer');
                if (logsData.logs) {
                    const atBottom = logViewer.scrollHeight - logViewer.clientHeight <= logViewer.scrollTop + 50;
                    logViewer.textContent = logsData.logs;
                    if (atBottom) {
                        logViewer.scrollTop = logViewer.scrollHeight;
                    }
                }

                // Lấy Dữ liệu vẽ đồ thị
                const dataRes = await fetch('/api/data');
                const data = await dataRes.json();

                if (data.epochs && data.epochs.length > 0) {
                    // Update Epoch Loss
                    lossChart.data.labels = data.epochs;
                    lossChart.data.datasets[0].data = data.train_loss;
                    lossChart.data.datasets[1].data = data.val_loss;
                    lossChart.update('none'); // Update without animation for performance

                    // Update Epoch Accuracy
                    accChart.data.labels = data.epochs;
                    accChart.data.datasets[0].data = data.train_acc;
                    accChart.data.datasets[1].data = data.val_acc;
                    accChart.update('none');
                }

                if (data.batches && data.batches.length > 0) {
                    // Update Batch Loss
                    batchLossChart.data.labels = data.batches;
                    batchLossChart.data.datasets[0].data = data.batch_loss;
                    batchLossChart.update('none');

                    // Update Batch Accuracy
                    batchAccChart.data.labels = data.batches;
                    batchAccChart.data.datasets[0].data = data.batch_acc;
                    batchAccChart.update('none');
                }

                if (!status.running) {
                    stopPolling();
                }

            } catch (err) {
                console.error("Lỗi cập nhật dashboard:", err);
            }
        }

        async function startTraining() {
            const epochs = parseInt(document.getElementById('epochs').value) || 200;
            const batchSize = parseInt(document.getElementById('batchSize').value) || 64;
            const learningRate = parseFloat(document.getElementById('learningRate').value) || 0.0002;
            const device = document.getElementById('device').value;
            const backbone = document.getElementById('backbone').value;

            try {
                const res = await fetch('/api/start', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ epochs, batch_size: batchSize, lr: learningRate, device, backbone })
                });
                const data = await res.json();
                if (data.status === 'success') {
                    document.getElementById('logViewer').textContent = "🔄 Đang khởi tạo luồng chạy train...";
                    startPolling();
                } else {
                    alert("Lỗi: " + data.message);
                }
            } catch (err) {
                alert("Lỗi kết nối server: " + err);
            }
        }

        async function stopTraining() {
            if (!confirm("Bạn có chắc chắn muốn dừng tiến trình train hiện tại không?")) return;
            try {
                const res = await fetch('/api/stop', { method: 'POST' });
                const data = await res.json();
                alert(data.message);
                updateDashboard();
            } catch (err) {
                alert("Lỗi kết nối server: " + err);
            }
        }

        function clearLogs() {
            document.getElementById('logViewer').textContent = "";
        }

        // Tự động kiểm tra trạng thái khi vào trang
        window.onload = () => {
            startPolling();
        };
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(INDEX_HTML)

# =====================================================================
# API ENDPOINTS
# =====================================================================

@app.route('/api/status', methods=['GET'])
def get_status():
    running = is_training_running()
    
    current_epoch = 0
    current_batch = 0
    current_loss = 0.0
    current_acc = 0.0
    
    # Lấy thông tin mới nhất từ CSV
    if os.path.exists("train_log.csv"):
        try:
            with open("train_log.csv", "r", encoding="utf-8") as f:
                lines = f.readlines()
                if len(lines) > 1:
                    last_line = lines[-1].strip()
                    row = list(csv.reader([last_line]))[0]
                    if len(row) >= 6:
                        # Format: timestamp,epoch,batch,loss,accuracy,phase
                        current_epoch = int(row[1])
                        current_batch = row[2]
                        current_loss = float(row[3])
                        current_acc = float(row[4])
        except Exception:
            pass

    return jsonify({
        "running": running,
        "epoch": current_epoch,
        "batch": current_batch,
        "loss": current_loss,
        "accuracy": current_acc
    })

@app.route('/api/start', methods=['POST'])
def start_training():
    global train_process
    if is_training_running():
        return jsonify({"status": "running", "message": "Tiến trình train đang chạy rồi!"}), 400
        
    # Clear file log cũ
    if os.path.exists("train.log"):
        try:
            os.remove("train.log")
        except Exception:
            pass
            
    # Clear file CSV cũ
    if os.path.exists("train_log.csv"):
        try:
            os.remove("train_log.csv")
        except Exception:
            pass

    # Đọc tham số tùy chỉnh từ UI
    data = request.get_json() or {}
    epochs = data.get("epochs", 200)
    batch_size = data.get("batch_size", 64)
    device = data.get("device", "cpu")
    backbone = data.get("backbone", "resnet50")
    lr = data.get("lr", 0.0002)
    
    cmd = [
        sys.executable, "train.py",
        "--epochs", str(epochs),
        "--batch_size", str(batch_size),
        "--device", device,
        "--backbone", backbone,
        "--lr", str(lr)
    ]
    
    try:
        # Popen redirect stdout/stderr tới train.log
        log_file = open("train.log", "w", encoding="utf-8")
        if os.name != 'nt':
            train_process = subprocess.Popen(
                cmd,
                stdout=log_file,
                stderr=subprocess.STDOUT,
                preexec_fn=os.setsid
            )
        else:
            train_process = subprocess.Popen(
                cmd,
                stdout=log_file,
                stderr=subprocess.STDOUT
            )
        return jsonify({"status": "success", "message": "Đã khởi động tiến trình train chạy ngầm!"})
    except Exception as e:
        return jsonify({"status": "error", "message": f"Không thể bắt đầu train: {str(e)}"}), 500

@app.route('/api/stop', methods=['POST'])
def stop_training():
    global train_process
    if not is_training_running():
        return jsonify({"status": "stopped", "message": "Không có tiến trình train nào đang chạy."}), 400
        
    try:
        if os.name != 'nt':
            os.killpg(os.getpgid(train_process.pid), signal.SIGINT)
        else:
            train_process.terminate()
        train_process.wait(timeout=5)
        return jsonify({"status": "success", "message": "Đã gửi tín hiệu dừng (SIGINT) đến tiến trình huấn luyện."})
    except Exception:
        # Gửi SIGKILL nếu SIGINT thất bại
        try:
            if os.name != 'nt':
                os.killpg(os.getpgid(train_process.pid), signal.SIGKILL)
            else:
                train_process.kill()
            return jsonify({"status": "success", "message": "Đã cưỡng bức dừng tiến trình train (SIGKILL)."})
        except Exception as ex:
            return jsonify({"status": "error", "message": f"Lỗi khi dừng tiến trình: {str(ex)}"}), 500

@app.route('/api/logs', methods=['GET'])
def get_logs():
    if not os.path.exists("train.log"):
        return jsonify({"logs": "Chưa tìm thấy nhật ký. Bấm Bắt đầu huấn luyện để ghi log."})
        
    try:
        with open("train.log", "r", encoding="utf-8") as f:
            lines = f.readlines()
        # Trả về 200 dòng cuối cùng để đảm bảo hiệu suất
        last_lines = lines[-200:]
        return jsonify({"logs": "".join(last_lines)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/data', methods=['GET'])
def get_chart_data():
    if not os.path.exists("train_log.csv"):
        return jsonify({
            "epochs": [],
            "train_loss": [],
            "val_loss": [],
            "train_acc": [],
            "val_acc": [],
            "batches": [],
            "batch_loss": [],
            "batch_acc": []
        })
        
    epochs = []
    train_loss = []
    val_loss = []
    train_acc = []
    val_acc = []
    
    batches = []
    batch_loss = []
    batch_acc = []
    
    try:
        with open("train_log.csv", "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            epoch_data = {}
            for row in reader:
                phase = row.get("phase")
                epoch_val = row.get("epoch")
                if not epoch_val:
                    continue
                epoch_num = int(epoch_val)
                
                if phase == "train_batch":
                    batch_num = row.get("batch")
                    loss_val = float(row.get("loss", 0.0))
                    acc_val = float(row.get("accuracy", 0.0))
                    batches.append(f"E{epoch_num} B{batch_num}")
                    batch_loss.append(loss_val)
                    batch_acc.append(acc_val)
                
                elif phase in ("train_epoch", "val_epoch"):
                    if epoch_num not in epoch_data:
                        epoch_data[epoch_num] = {}
                    loss_val = float(row.get("loss", 0.0))
                    acc_val = float(row.get("accuracy", 0.0))
                    if phase == "train_epoch":
                        epoch_data[epoch_num]["train_loss"] = loss_val
                        epoch_data[epoch_num]["train_acc"] = acc_val
                    elif phase == "val_epoch":
                        epoch_data[epoch_num]["val_loss"] = loss_val
                        epoch_data[epoch_num]["val_acc"] = acc_val

            sorted_epochs = sorted(epoch_data.keys())
            for ep in sorted_epochs:
                epochs.append(f"Epoch {ep}")
                train_loss.append(epoch_data[ep].get("train_loss", None))
                val_loss.append(epoch_data[ep].get("val_loss", None))
                train_acc.append(epoch_data[ep].get("train_acc", None))
                val_acc.append(epoch_data[ep].get("val_acc", None))
                
        return jsonify({
            "epochs": epochs,
            "train_loss": train_loss,
            "val_loss": val_loss,
            "train_acc": train_acc,
            "val_acc": val_acc,
            "batches": batches[-100:],  # Trả về 100 batch gần nhất tránh lag
            "batch_loss": batch_loss[-100:],
            "batch_acc": batch_acc[-100:]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Chạy Flask ở port 5000, cho phép truy cập cục bộ/ngoại tuyến
    app.run(host='0.0.0.0', port=5000, debug=True)
