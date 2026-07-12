// CNC Text Drawing Controller Client Script

// Global state
let ws = null;
let isConnected = false;
let currentCoords = { x: 0.0, y: 0.0, z: 2.0 };
let activePaths = []; // Raw vector paths from image processing
let drawStartCoords = { x: 0.0, y: 0.0 };
let currentPort = "dummy";
let streamProgress = { index: 0, total: 0 };
let isStreaming = false;

// Settings cache
let settings = {};

// Canvas simulation state
let simRequestFrame = null;
let isSimulating = false;
let simPathIndex = 0;
let simPointIndex = 0;
let simDrawHistory = [];
let lastSimTime = 0;

// Canvas DOM and context
const previewCanvas = document.getElementById("cnc-preview-canvas");
const ctx = previewCanvas.getContext("2d");

// Debounce timer for auto image processing
let processDebounceTimeout = null;

// Initialize Page
window.addEventListener("DOMContentLoaded", async () => {
    // 1. Fetch available serial ports and USB cameras
    await loadSerialPorts();
    await loadCameras();

    // 2. Load settings from server
    await fetchSettings();

    // 3. Setup event listeners
    setupEventListeners();

    // 4. Connect Websocket
    connectWebSocket();

    // 5. Initial canvas render
    resizeCanvases();
});

// Load Serial Ports
async function loadSerialPorts() {
    try {
        const res = await fetch("/api/ports");
        const ports = await res.json();
        const select = document.getElementById("serial-port");
        select.innerHTML = "";
        ports.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.port;
            opt.textContent = p.description;
            select.appendChild(opt);
        });
    } catch (e) {
        logToConsole("System Error: Không thể tải danh sách cổng serial.", "system");
    }
}

// Load Cameras
async function loadCameras() {
    try {
        const res = await fetch("/api/cameras");
        const cams = await res.json();
        const select = document.getElementById("camera-select");
        select.innerHTML = "";
        
        if (cams.length === 0) {
            const opt = document.createElement("option");
            opt.value = "";
            opt.textContent = "Không tìm thấy USB Camera";
            select.appendChild(opt);
            return;
        }

        cams.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.index;
            opt.textContent = c.name;
            select.appendChild(opt);
        });
    } catch (e) {
        logToConsole("System Error: Không thể tải danh sách camera.", "system");
    }
}

// Fetch Settings from Server
async function fetchSettings() {
    try {
        const res = await fetch("/api/settings");
        settings = await res.json();

        // Update form fields
        document.getElementById("cnc-width").value = settings.cnc_width;
        document.getElementById("cnc-height").value = settings.cnc_height;
        document.getElementById("cnc-speed").value = settings.feedrate;
        document.getElementById("cnc-step").value = settings.step_size;
        document.getElementById("serial-port").value = settings.serial_port;
        document.getElementById("thresh-mode").value = settings.thresh_mode;
        document.getElementById("thresh-val").value = settings.thresh_val;
        document.getElementById("invert-img").checked = settings.invert_img;
        document.getElementById("morph-kernel").value = settings.morph_kernel;
        document.getElementById("skeleton-method").value = settings.skeleton_method;
        document.getElementById("min-line-len").value = settings.min_line_len;
        document.getElementById("simplify-epsilon").value = settings.epsilon;
        
        if (settings.pen_mode) document.getElementById("pen-mode").value = settings.pen_mode;
        document.getElementById("pen-up-cmd").value = settings.pen_up_cmd;
        document.getElementById("pen-down-cmd").value = settings.pen_down_cmd;
        document.getElementById("pen-dwell").value = settings.pen_dwell;

        // Trigger labels refresh
        updateSliderLabels();
        toggleThresholdInput();
    } catch (e) {
        console.error("Error loading settings", e);
    }
}

// Save Settings to Server
async function saveSettingsToServer() {
    const updatedSettings = {
        cnc_width: parseFloat(document.getElementById("cnc-width").value),
        cnc_height: parseFloat(document.getElementById("cnc-height").value),
        feedrate: parseFloat(document.getElementById("cnc-speed").value),
        step_size: parseFloat(document.getElementById("cnc-step").value),
        serial_port: document.getElementById("serial-port").value,
        thresh_mode: document.getElementById("thresh-mode").value,
        thresh_val: parseInt(document.getElementById("thresh-val").value),
        invert_img: document.getElementById("invert-img").checked,
        morph_kernel: parseInt(document.getElementById("morph-kernel").value),
        skeleton_method: document.getElementById("skeleton-method").value,
        min_line_len: parseInt(document.getElementById("min-line-len").value),
        epsilon: parseFloat(document.getElementById("simplify-epsilon").value),
        pen_mode: document.getElementById("pen-mode").value,
        pen_up_cmd: document.getElementById("pen-up-cmd").value,
        pen_down_cmd: document.getElementById("pen-down-cmd").value,
        pen_dwell: parseFloat(document.getElementById("pen-dwell").value)
    };

    try {
        const res = await fetch("/api/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedSettings)
        });
        const ans = await res.json();
        if (ans.status === "ok") {
            settings = updatedSettings;
            logToConsole("System: Đã lưu thông số thành công.", "system");
            resizeCanvases();
        } else {
            logToConsole("System Error: Lưu thông số thất bại: " + ans.message, "system");
        }
    } catch (e) {
        logToConsole("System Error: Không thể gửi yêu cầu lưu thông số.", "system");
    }
}

// Setup Websocket Connection
function connectWebSocket() {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
        logToConsole("System: Đã mở kênh truyền dữ liệu thời gian thực (WebSocket).", "system");
    };

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        handleSocketMessage(msg);
    };

    ws.onclose = () => {
        logToConsole("System WARNING: Ngắt kết nối kênh truyền dữ liệu WebSocket. Đang thử kết nối lại...", "system");
        setTimeout(connectWebSocket, 3000);
    };
}

// Handle socket packages
function handleSocketMessage(msg) {
    switch (msg.type) {
        case "connection":
            isConnected = msg.connected;
            updateConnectionUI(msg.connected, msg.port);
            if (msg.message) logToConsole("System: " + msg.message, "system");
            break;
        case "telemetry":
            currentCoords.x = msg.wpos[0];
            currentCoords.y = msg.wpos[1];
            currentCoords.z = msg.wpos[2];
            document.getElementById("dro-x").textContent = currentCoords.x.toFixed(3);
            document.getElementById("dro-y").textContent = currentCoords.y.toFixed(3);
            document.getElementById("dro-z").textContent = currentCoords.z.toFixed(3);
            
            const stateEl = document.getElementById("dro-state");
            stateEl.textContent = msg.state;
            stateEl.className = "dro-value " + msg.state;
            
            drawPreviewCanvas(); // Repaint canvas to show current pen location
            break;
        case "log":
            logToConsole(msg.content, msg.direction);
            break;
        case "progress":
            streamProgress.index = msg.index;
            streamProgress.total = msg.total;
            break;
        case "stream_status":
            if (msg.status === "started") {
                isStreaming = true;
                logToConsole("System: Bắt đầu gửi file Gcode tới máy vẽ...", "system");
            } else if (msg.status === "completed") {
                isStreaming = false;
                logToConsole("System: Máy CNC đã vẽ xong. Trả đầu vẽ về vị trí bắt đầu.", "system");
            } else if (msg.status === "stopped") {
                isStreaming = false;
                logToConsole("System: Đã dừng vẽ. Máy CNC đã nhấc bút vẽ và quay về home.", "system");
            }
            break;
    }
}

// Update UI depending on connection status
function updateConnectionUI(connected, port) {
    const btn = document.getElementById("btn-connect");
    const select = document.getElementById("serial-port");
    const stateEl = document.getElementById("dro-state");

    if (connected) {
        btn.textContent = "Ngắt kết nối";
        btn.className = "btn btn-danger";
        select.value = port;
        select.disabled = true;
    } else {
        btn.textContent = "Kết nối";
        btn.className = "btn btn-primary";
        select.disabled = false;
        stateEl.textContent = "Offline";
        stateEl.className = "dro-value Offline";
    }
}

// Event Listeners setup
function setupEventListeners() {
    // 1. Connection buttons
    document.getElementById("btn-connect").addEventListener("click", () => {
        if (isConnected) {
            disconnectDevice();
        } else {
            connectDevice();
        }
    });

    document.getElementById("btn-save-settings").addEventListener("click", saveSettingsToServer);

    // 2. Source Toggle Selection
    const sourceType = document.getElementById("source-type");
    sourceType.addEventListener("change", (e) => {
        const val = e.target.value;
        document.querySelectorAll(".source-panel").forEach(p => p.classList.remove("active"));
        
        if (val === "image") {
            document.getElementById("panel-source-image").classList.add("active");
            stopCamera();
            document.getElementById("camera-stream").style.display = "none";
            document.getElementById("raw-img-preview").style.display = "block";
            
            if (activePaths && activePaths.length > 0) {
                document.getElementById("raw-img-preview").classList.add("faded");
                document.getElementById("processed-img-preview").style.display = "block";
            } else {
                document.getElementById("raw-img-preview").classList.remove("faded");
                document.getElementById("processed-img-preview").style.display = "none";
            }
        } else {
            document.getElementById("panel-source-camera").classList.add("active");
            document.getElementById("raw-img-preview").style.display = "none";
            document.getElementById("processed-img-preview").style.display = "none";
            
            const camStream = document.getElementById("camera-stream");
            camStream.style.display = "block";
            camStream.classList.remove("faded");
            startCamera();
        }
    });

    // 3. Image upload zones
    const zone = document.getElementById("upload-zone");
    const fileInput = document.getElementById("file-input");
    
    zone.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handleImageUpload(e.target.files[0]);
        }
    });

    zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.style.borderColor = "var(--primary)";
    });
    
    zone.addEventListener("dragleave", () => {
        zone.style.borderColor = "var(--border-color)";
    });
    
    zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.style.borderColor = "var(--border-color)";
        if (e.dataTransfer.files.length > 0) {
            handleImageUpload(e.dataTransfer.files[0]);
        }
    });

    // 4. Camera Snapshot button
    document.getElementById("btn-capture-cam").addEventListener("click", captureCameraSnapshot);

    // 5. Image processing sliders changes (trigger reprocessing)
    const sliders = ["thresh-val", "morph-kernel", "min-line-len", "simplify-epsilon"];
    sliders.forEach(id => {
        document.getElementById(id).addEventListener("input", () => {
            updateSliderLabels();
            triggerAutoReprocess();
        });
    });

    document.getElementById("thresh-mode").addEventListener("change", () => {
        toggleThresholdInput();
        triggerAutoReprocess();
    });

    document.getElementById("invert-img").addEventListener("change", triggerAutoReprocess);
    document.getElementById("skeleton-method").addEventListener("change", triggerAutoReprocess);

    // 6. CNC Jog actions
    document.querySelectorAll(".btn-jog[data-dir]").forEach(btn => {
        btn.addEventListener("click", () => {
            const dir = btn.getAttribute("data-dir");
            const step = parseFloat(document.getElementById("cnc-step").value);
            const speed = parseFloat(document.getElementById("cnc-speed").value);
            jogMove(dir, step, speed);
        });
    });

    document.getElementById("btn-set-home").addEventListener("click", setHomeCoordinate);
    document.getElementById("btn-pen-up").addEventListener("click", () => setPenState("up"));
    document.getElementById("btn-pen-down").addEventListener("click", () => setPenState("down"));

    // 7. Tasks execution triggers
    document.getElementById("btn-preview").addEventListener("click", toggleSimulation);
    document.getElementById("btn-draw").addEventListener("click", startActualDrawing);
    document.getElementById("btn-stop").addEventListener("click", stopActualDrawing);

    // 8. Direct Console input
    document.getElementById("console-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendConsoleCommand();
    });
    document.getElementById("btn-send-console").addEventListener("click", sendConsoleCommand);

    // 9. CNC Preview Viewport Controls
    document.getElementById("btn-reset-zoom").addEventListener("click", () => {
        zoomLevel = 1.0;
        zoomOffset = { x: 0, y: 0 };
        drawPreviewCanvas();
    });
    document.getElementById("btn-zoom-in").addEventListener("click", () => {
        zoomLevel *= 1.15;
        drawPreviewCanvas();
    });
    document.getElementById("btn-zoom-out").addEventListener("click", () => {
        zoomLevel /= 1.15;
        drawPreviewCanvas();
    });

    // 10. Pan / drag inside G-code Canvas
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    
    previewCanvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        dragStart.x = e.clientX - zoomOffset.x;
        dragStart.y = e.clientY - zoomOffset.y;
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        zoomOffset.x = e.clientX - dragStart.x;
        zoomOffset.y = e.clientY - dragStart.y;
        drawPreviewCanvas();
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    previewCanvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.08 : 0.92;
        zoomLevel *= factor;
        drawPreviewCanvas();
    }, { passive: false });
}

// Reposition view zoom variables
let zoomLevel = 1.0;
let zoomOffset = { x: 0, y: 0 };

// Connect Serial Port
async function connectDevice() {
    const port = document.getElementById("serial-port").value;
    const speed = 115200;

    const fd = new FormData();
    fd.append("port", port);
    fd.append("baudrate", speed);

    try {
        logToConsole(`System: Đang kết nối tới cổng ${port}...`, "system");
        const res = await fetch("/api/connect", {
            method: "POST",
            body: fd
        });
        const ans = await res.json();
        if (ans.status === "error") {
            logToConsole("System Error: Kết nối thất bại: " + ans.message, "system");
        }
    } catch (e) {
        logToConsole("System Error: Không thể kết nối tới server.", "system");
    }
}

// Disconnect Serial Port
async function disconnectDevice() {
    try {
        const res = await fetch("/api/disconnect", { method: "POST" });
        const ans = await res.json();
        if (ans.status === "error") {
            logToConsole("System Error: Ngắt kết nối thất bại: " + ans.message, "system");
        }
    } catch (e) {
        logToConsole("System Error: Không thể gửi yêu cầu ngắt kết nối.", "system");
    }
}

// Start USB Camera Feed
async function startCamera() {
    const camIdx = document.getElementById("camera-select").value;
    if (camIdx === "") return;

    const fd = new FormData();
    fd.append("index", camIdx);

    try {
        const res = await fetch("/api/camera/start", {
            method: "POST",
            body: fd
        });
        const ans = await res.json();
        if (ans.status === "ok") {
            // Set streaming source
            document.getElementById("camera-stream").src = `/api/camera/feed?t=${Date.now()}`;
            logToConsole("System: Bật camera thành công.", "system");
        } else {
            logToConsole("System Error: Bật camera thất bại: " + ans.message, "system");
        }
    } catch (e) {
        logToConsole("System Error: Không thể bắt đầu luồng dữ liệu camera.", "system");
    }
}

// Stop USB Camera Feed
async function stopCamera() {
    try {
        document.getElementById("camera-stream").src = "";
        await fetch("/api/camera/stop", { method: "POST" });
    } catch (e) {}
}

// Capture camera snapshot
async function captureCameraSnapshot() {
    try {
        logToConsole("System: Đang chụp ảnh từ USB camera...", "system");
        const res = await fetch("/api/camera/capture", { method: "POST" });
        const ans = await res.json();
        if (ans.status === "ok") {
            logToConsole("System: Đã chụp ảnh và đặt làm file làm việc chính.", "system");
            
            // Switch view back to original preview with the new snapshot
            document.getElementById("raw-img-preview").src = `/static/working_image.png?t=${Date.now()}`;
            document.getElementById("raw-img-preview").style.display = "block";
            document.getElementById("camera-stream").style.display = "none";
            document.getElementById("source-type").value = "image";
            
            stopCamera();
            
            // Trigger processing immediately
            reprocessImage();
        } else {
            logToConsole("System Error: Chụp ảnh thất bại: " + ans.message, "system");
        }
    } catch (e) {
        logToConsole("System Error: Không thể kết nối để chụp ảnh.", "system");
    }
}

// Handle Image File upload
async function handleImageUpload(file) {
    const fd = new FormData();
    fd.append("file", file);

    try {
        logToConsole("System: Đang tải ảnh lên máy chủ...", "system");
        const res = await fetch("/api/upload", {
            method: "POST",
            body: fd
        });
        const ans = await res.json();
        if (ans.status === "ok") {
            logToConsole("System: Tải ảnh lên thành công. Đang xử lý...", "system");
            document.getElementById("raw-img-preview").src = `/static/working_image.png?t=${Date.now()}`;
            reprocessImage();
        } else {
            logToConsole("System Error: Không thể tải ảnh lên: " + ans.message, "system");
        }
    } catch (e) {
        logToConsole("System Error: Lỗi kết nối tải ảnh.", "system");
    }
}

// Debounced reprocessing wrapper
function triggerAutoReprocess() {
    clearTimeout(processDebounceTimeout);
    processDebounceTimeout = setTimeout(reprocessImage, 400);
}

// Trigger Image Process Pipeline on server
async function reprocessImage() {
    const updatedParams = {
        thresh_mode: document.getElementById("thresh-mode").value,
        thresh_val: parseInt(document.getElementById("thresh-val").value),
        invert_img: document.getElementById("invert-img").checked,
        morph_kernel: parseInt(document.getElementById("morph-kernel").value),
        skeleton_method: document.getElementById("skeleton-method").value,
        min_line_len: parseInt(document.getElementById("min-line-len").value),
        epsilon: parseFloat(document.getElementById("simplify-epsilon").value)
    };

    try {
        const res = await fetch("/api/process", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedParams)
        });
        const ans = await res.json();
        if (ans.status === "ok") {
            activePaths = ans.paths;
            const procPreview = document.getElementById("processed-img-preview");
            procPreview.src = ans.preview_image;
            procPreview.style.display = "block";
            
            // Fade the background images
            document.getElementById("raw-img-preview").classList.add("faded");
            document.getElementById("camera-stream").classList.add("faded");
            
            logToConsole(`System: Trích xuất thành công ${activePaths.length} nét vẽ nét đơn.`, "system");
            
            // Redraw CNC preview canvas with new paths
            drawPreviewCanvas();
        } else {
            logToConsole("System Error: Xử lý ảnh thất bại: " + ans.message, "system");
        }
    } catch (e) {
        console.error("Connection error processing", e);
    }
}

// Jog arrow actions
async function jogMove(direction, step, feedrate) {
    const fd = new FormData();
    fd.append("direction", direction);
    fd.append("step", step);
    fd.append("feedrate", feedrate);

    try {
        await fetch("/api/jog", {
            method: "POST",
            body: fd
        });
    } catch (e) {
        logToConsole("System Error: Không thể gửi lệnh di chuyển Jog.", "system");
    }
}

// Reset CNC home position G10 L20 P1
async function setHomeCoordinate() {
    try {
        logToConsole("System: Thiết lập gốc tọa độ vẽ (Set Home) và nhấc bút vẽ...", "system");
        const res = await fetch("/api/set_home", { method: "POST" });
        const ans = await res.json();
        if (ans.status === "ok") {
            logToConsole("System: Đã Reset gốc tọa độ tuyệt đối XYZ về (0, 0, 0).", "system");
        }
    } catch (e) {
        logToConsole("System Error: Không thể gửi lệnh Set Home.", "system");
    }
}

// Control Pen Up / Pen Down manually
async function setPenState(action) {
    const fd = new FormData();
    fd.append("action", action);
    try {
        await fetch("/api/pen", {
            method: "POST",
            body: fd
        });
    } catch (e) {
        logToConsole("System Error: Không thể gửi lệnh điều khiển bút vẽ.", "system");
    }
}

// Start Actual CNC Drawing (Send G-code streaming)
async function startActualDrawing() {
    if (!isConnected) {
        alert("Chưa kết nối Serial Port với máy CNC!");
        return;
    }
    if (activePaths.length === 0) {
        alert("Chưa có nét chữ vẽ nào được trích xuất. Hãy chọn ảnh và xử lý trước!");
        return;
    }

    const scale = parseFloat(document.getElementById("scale-factor").value);
    
    // Save starting position
    drawStartCoords.x = currentCoords.x;
    drawStartCoords.y = currentCoords.y;

    const fd = new FormData();
    fd.append("scale_factor", scale);

    try {
        const res = await fetch("/api/draw/start", {
            method: "POST",
            body: fd
        });
        const ans = await res.json();
        if (ans.status === "error") {
            logToConsole("System Error: Không thể bắt đầu vẽ: " + ans.message, "system");
        }
    } catch (e) {
        logToConsole("System Error: Lỗi kết nối khi bắt đầu vẽ.", "system");
    }
}

// Stop Streaming and reset CNC
async function stopActualDrawing() {
    try {
        logToConsole("System: Hủy tác vụ vẽ. Đang dừng chuyển động...", "system");
        const res = await fetch("/api/draw/stop", { method: "POST" });
        const ans = await res.json();
        if (ans.status === "error") {
            logToConsole("System Error: Dừng vẽ thất bại: " + ans.message, "system");
        }
    } catch (e) {
        logToConsole("System Error: Lỗi kết nối khi dừng vẽ.", "system");
    }
}

// Direct console input command sender
async function sendConsoleCommand() {
    const el = document.getElementById("console-input");
    const cmd = el.value.trim();
    if (!cmd) return;

    const fd = new FormData();
    fd.append("command", cmd);

    try {
        el.value = "";
        const res = await fetch("/api/command", {
            method: "POST",
            body: fd
        });
        const ans = await res.json();
        if (ans.status === "error") {
            logToConsole("Console Error: " + ans.message, "system");
        }
    } catch (e) {
        logToConsole("Console Error: Không thể gửi lệnh G-code.", "system");
    }
}

// Local simulation logic
function toggleSimulation() {
    if (activePaths.length === 0) {
        alert("Chưa có nét chữ vẽ nào được trích xuất. Hãy chọn ảnh và xử lý trước!");
        return;
    }

    if (isSimulating) {
        stopSimulation();
    } else {
        startSimulation();
    }
}

function startSimulation() {
    isSimulating = true;
    simPathIndex = 0;
    simPointIndex = 0;
    simDrawHistory = [];
    lastSimTime = performance.now();
    
    document.getElementById("btn-preview").innerHTML = '<i class="fa-solid fa-circle-pause"></i> Dừng Mô phỏng';
    logToConsole("System: Bắt đầu chạy mô phỏng nét vẽ...", "system");
    
    simulationLoop();
}

function stopSimulation() {
    isSimulating = false;
    if (simRequestFrame) {
        cancelAnimationFrame(simRequestFrame);
        simRequestFrame = null;
    }
    document.getElementById("btn-preview").innerHTML = '<i class="fa-solid fa-circle-play"></i> Xem trước (Mô phỏng)';
    logToConsole("System: Đã dừng mô phỏng.", "system");
    drawPreviewCanvas();
}

// Animation loop for local preview simulation
function simulationLoop() {
    if (!isSimulating) return;

    const now = performance.now();
    const elapsed = now - lastSimTime;
    
    // speed of simulation steps (draw coordinates progress)
    if (elapsed > 16) { // ~60fps step
        lastSimTime = now;
        
        // Progress step
        if (simPathIndex < activePaths.length) {
            const currentPath = activePaths[simPathIndex];
            if (simPointIndex < currentPath.length) {
                const pt = currentPath[simPointIndex];
                simDrawHistory.push({
                    x: pt[0],
                    y: pt[1],
                    penDown: simPointIndex > 0 // Pen up during jump to starting point
                });
                simPointIndex++;
            } else {
                // Done with current path stroke. Raise pen and move to next
                simPathIndex++;
                simPointIndex = 0;
            }
        } else {
            // Finished simulation
            stopSimulation();
            return;
        }
    }

    drawPreviewCanvas();
    simRequestFrame = requestAnimationFrame(simulationLoop);
}

// Render G-code and simulated movements inside CNC Preview Canvas
function drawPreviewCanvas() {
    if (!previewCanvas) return;
    
    // Clear screen
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);

    ctx.save();
    
    // Apply pan & zoom matrix
    ctx.translate(previewCanvas.width / 2 + zoomOffset.x, previewCanvas.height / 2 + zoomOffset.y);
    ctx.scale(zoomLevel, zoomLevel);

    const w_mm = parseFloat(document.getElementById("cnc-width").value) || 200;
    const h_mm = parseFloat(document.getElementById("cnc-height").value) || 200;
    
    // Scale representation (fit workspace inside canvas)
    const padding = 40;
    const availableW = previewCanvas.width - padding * 2;
    const availableH = previewCanvas.height - padding * 2;
    const scaleX = availableW / w_mm;
    const scaleY = availableH / h_mm;
    const cncScale = Math.min(scaleX, scaleY); // mm to screen pixel multiplier

    // Draw boundary box (CNC table representation)
    const tableW = w_mm * cncScale;
    const tableH = h_mm * cncScale;
    const tx = -tableW / 2;
    const ty = -tableH / 2;

    // Draw grid lines
    ctx.strokeStyle = "#1b243b";
    ctx.lineWidth = 1;
    const gridStep = 50; // every 50mm
    
    // Vertical grid lines
    for (let gx = 0; gx <= w_mm; gx += gridStep) {
        ctx.beginPath();
        ctx.moveTo(tx + gx * cncScale, ty);
        ctx.lineTo(tx + gx * cncScale, ty + tableH);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let gy = 0; gy <= h_mm; gy += gridStep) {
        ctx.beginPath();
        ctx.moveTo(tx, ty + (h_mm - gy) * cncScale);
        ctx.lineTo(tx + tableW, ty + (h_mm - gy) * cncScale);
        ctx.stroke();
    }

    // Outer bounding border
    ctx.strokeStyle = "#2e3a5a";
    ctx.lineWidth = 2;
    ctx.strokeRect(tx, ty, tableW, tableH);
    
    // Label origin
    ctx.fillStyle = "var(--text-muted)";
    ctx.font = "10px sans-serif";
    ctx.fillText("0,0", tx - 5, ty + tableH + 12);

    // DRAW THE PATH VECTORS
    if (activePaths.length > 0) {
        const drawScale = parseFloat(document.getElementById("scale-factor").value) || 0.15;
        
        // References (relative coordinates translation)
        const ref_x = activePaths[0][0][0];
        const ref_y = activePaths[0][0][1];
        
        let start_cnc_x = drawStartCoords.x;
        let start_cnc_y = drawStartCoords.y;
        if (!isStreaming && !isSimulating) {
            // If idle, represent paths offset relative to current pen location
            start_cnc_x = currentCoords.x;
            start_cnc_y = currentCoords.y;
        }

        // Draw all extracted toolpaths
        activePaths.forEach((path, pIdx) => {
            ctx.beginPath();
            
            // Map image path relative to origin to simulated CNC positions
            path.forEach((pt, idx) => {
                const dx = pt[0] - ref_x;
                const dy = -(pt[1] - ref_y); // Invert Y
                const px = (dx * drawScale + start_cnc_x) * cncScale;
                const py = (dy * drawScale + start_cnc_y) * cncScale;
                
                const screenX = tx + px;
                const screenY = ty + tableH - py; // Map positive Y up
                
                if (idx === 0) {
                    ctx.moveTo(screenX, screenY);
                } else {
                    ctx.lineTo(screenX, screenY);
                }
            });
            
            ctx.strokeStyle = "rgba(59, 130, 246, 0.4)"; // Blue lines
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // Draw travel jumps lines (dashed orange) between strokes
            if (pIdx > 0) {
                ctx.beginPath();
                const lastPath = activePaths[pIdx - 1];
                const lastPt = lastPath[lastPath.length - 1];
                const startPt = path[0];
                
                const ldx = lastPt[0] - ref_x;
                const ldy = -(lastPt[1] - ref_y);
                const l_px = (ldx * drawScale + start_cnc_x) * cncScale;
                const l_py = (ldy * drawScale + start_cnc_y) * cncScale;
                
                const sdx = startPt[0] - ref_x;
                const sdy = -(startPt[1] - ref_y);
                const s_px = (sdx * drawScale + start_cnc_x) * cncScale;
                const s_py = (sdy * drawScale + start_cnc_y) * cncScale;

                ctx.moveTo(tx + l_px, ty + tableH - l_py);
                ctx.lineTo(tx + s_px, ty + tableH - s_py);
                ctx.strokeStyle = "rgba(245, 158, 11, 0.35)"; // Dashed orange
                ctx.setLineDash([4, 4]);
                ctx.lineWidth = 1.0;
                ctx.stroke();
                ctx.setLineDash([]); // Reset
            }
        });

        // IF LOCAL PREVIEW SIMULATION IS RUNNING, DRAW SIMULATION PROGRESS
        if (isSimulating && simDrawHistory.length > 0) {
            ctx.beginPath();
            simDrawHistory.forEach((pt, idx) => {
                const dx = pt.x - ref_x;
                const dy = -(pt.y - ref_y);
                const px = (dx * drawScale + start_cnc_x) * cncScale;
                const py = (dy * drawScale + start_cnc_y) * cncScale;
                
                const screenX = tx + px;
                const screenY = ty + tableH - py;
                
                if (idx === 0) {
                    ctx.moveTo(screenX, screenY);
                } else {
                    if (pt.penDown) {
                        ctx.lineTo(screenX, screenY);
                    } else {
                        // Lift pen jump, stroke current and start new sub-path
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(screenX, screenY);
                    }
                }
            });
            ctx.strokeStyle = "#06b6d4"; // Cyan simulated lines
            ctx.lineWidth = 2.5;
            ctx.stroke();
            
            // Draw simulated active pen tip location
            if (simDrawHistory.length > 0) {
                const last = simDrawHistory[simDrawHistory.length - 1];
                const dx = last.x - ref_x;
                const dy = -(last.y - ref_y);
                const px = (dx * drawScale + start_cnc_x) * cncScale;
                const py = (dy * drawScale + start_cnc_y) * cncScale;
                
                ctx.beginPath();
                ctx.arc(tx + px, ty + tableH - py, 6, 0, 2 * Math.PI);
                ctx.fillStyle = "#22d3ee";
                ctx.fill();
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    // DRAW CURRENT CNC HARDWARE PEN POSITION (RED TARGET MARKER)
    if (!isSimulating) {
        const penScreenX = tx + currentCoords.x * cncScale;
        const penScreenY = ty + tableH - currentCoords.y * cncScale;

        // Draw crosshair target
        ctx.beginPath();
        ctx.arc(penScreenX, penScreenY, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(239, 68, 68, 0.4)";
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(penScreenX - 12, penScreenY);
        ctx.lineTo(penScreenX + 12, penScreenY);
        ctx.moveTo(penScreenX, penScreenY - 12);
        ctx.lineTo(penScreenX, penScreenY + 12);
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    ctx.restore();
}

// Adjust sizes of preview canvas elements dynamically based on aspect ratio
function resizeCanvases() {
    const w = parseFloat(document.getElementById("cnc-width").value) || 200;
    const h = parseFloat(document.getElementById("cnc-height").value) || 200;
    const aspect = w / h;

    // Boundary limits of preview size
    const container = document.getElementById("preview-canvas-wrapper");
    const parentWidth = container.clientWidth;
    
    // Fit canvas aspect ratio exactly to container boundaries
    previewCanvas.width = parentWidth;
    previewCanvas.height = parentWidth / aspect;
    
    if (previewCanvas.height > 400) {
        previewCanvas.height = 400;
        previewCanvas.width = 400 * aspect;
    }

    drawPreviewCanvas();
}

// Update text label display alongside slide values
function updateSliderLabels() {
    document.getElementById("lbl-thresh-val").textContent = document.getElementById("thresh-val").value;
    document.getElementById("lbl-morph-kernel").textContent = document.getElementById("morph-kernel").value;
    document.getElementById("lbl-min-line-len").textContent = document.getElementById("min-line-len").value;
    document.getElementById("lbl-simplify-epsilon").textContent = parseFloat(document.getElementById("simplify-epsilon").value).toFixed(1);
}

// Toggle manual threshold value control depending on threshold selection type
function toggleThresholdInput() {
    const mode = document.getElementById("thresh-mode").value;
    const div = document.getElementById("threshold-val-group");
    if (mode === "manual") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}

// Append messages to console visualizer box
function logToConsole(message, direction) {
    const box = document.getElementById("console-logs");
    const line = document.createElement("div");
    
    let prefix = "";
    if (direction === "in") {
        prefix = '<span class="log-prefix" style="color:var(--success)">&lt; </span>';
        line.className = "log-line in";
    } else if (direction === "out") {
        prefix = '<span class="log-prefix" style="color:#60a5fa">&gt; </span>';
        line.className = "log-line out";
    } else if (direction === "system") {
        prefix = '<span class="log-prefix" style="color:var(--warning)">[SYSTEM] </span>';
        line.className = "log-line system";
    } else {
        line.className = "log-line info";
    }
    
    line.innerHTML = prefix + escapeHTML(message);
    box.appendChild(line);
    
    // Auto-scroll to bottom of console box
    box.scrollTop = box.scrollHeight;
}

// Helper to escape HTML characters
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
