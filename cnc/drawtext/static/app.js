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
let activeProcessingMode = "text";

// Initialize Page
window.addEventListener("DOMContentLoaded", async () => {
    // 1. Load settings from server
    await fetchSettings();

    // 2. Fetch available serial ports and USB cameras
    await loadSerialPorts();
    await loadCameras();

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
        let hasDefault = false;
        ports.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.port;
            opt.textContent = p.description;
            select.appendChild(opt);
            if (p.port === settings.serial_port) {
                hasDefault = true;
            }
        });
        if (settings.serial_port && !hasDefault) {
            const opt = document.createElement("option");
            opt.value = settings.serial_port;
            opt.textContent = `${settings.serial_port} (Chưa kết nối)`;
            select.appendChild(opt);
        }
        if (settings.serial_port) {
            select.value = settings.serial_port;
        }
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
        document.getElementById("mirror-x").checked = !!settings.mirror_x;
        document.getElementById("mirror-y").checked = !!settings.mirror_y;
        
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
        pen_dwell: parseFloat(document.getElementById("pen-dwell").value),
        mirror_x: document.getElementById("mirror-x").checked,
        mirror_y: document.getElementById("mirror-y").checked
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
        if (port) select.value = port;
        select.disabled = true;
        if (stateEl.textContent === "Offline") {
            stateEl.textContent = "Idle";
            stateEl.className = "dro-value Idle";
        }
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
    const sliders = [
        "thresh-val", "morph-kernel", "min-line-len", "simplify-epsilon", 
        "clahe-limit", "clahe-grid", "blur-size", 
        "canny-ultra-low", "canny-ultra-high", 
        "canny-medium-low", "canny-medium-high", 
        "canny-strong-low", "canny-strong-high",
        "scale-factor",
        "text-blur-size", "text-dilate-size", "path-connect-dist",
        "potrace-thresh-val", "potrace-blur-size", "potrace-morph-kernel", 
        "potrace-dilate-size", "potrace-turdsize", "potrace-alphamax", 
        "potrace-opttolerance", "potrace-bezier-steps",
        "erode-thinness-level", "erode-thresh-val", "erode-blur-size", 
        "erode-turdsize", "erode-alphamax", "erode-opttolerance", "erode-bezier-steps"
    ];
    sliders.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", () => {
                updateSliderLabels();
                triggerAutoReprocess();
            });
        }
    });

    ["thresh-mode", "potrace-thresh-mode", "potrace-turnpolicy", "skeleton-method", "erode-thresh-mode", "erode-turnpolicy"].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("change", () => {
                syncGroupVisibilities();
                triggerAutoReprocess();
            });
        }
    });

    // 5b. Processing Tabs switching
    const tabBtns = document.querySelectorAll(".processing-tabs .tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const mode = btn.getAttribute("data-proc-mode");
            activeProcessingMode = mode;
            
            // Toggle panels
            document.querySelectorAll(".proc-tab-panel").forEach(p => p.classList.remove("active"));
            const targetPanel = document.getElementById(`panel-proc-${mode}`);
            if (targetPanel) {
                targetPanel.classList.add("active");
            }
            
            // Reprocess automatically
            triggerAutoReprocess();
        });
    });

    // 5c. Listeners for Sketch and Text checkboxes
    const checkboxes = [
        "use-clahe", "use-blur", "use-connect", "use-thin", "use-len-filter",
        "use-text-blur", "use-text-morph", "use-text-dilate", "use-path-connect",
        "invert-img", "potrace-invert-img", "potrace-use-blur", 
        "potrace-use-morph", "potrace-use-dilate", "potrace-opticurve",
        "use-simplify-epsilon", "use-potrace-turdsize", "use-potrace-alphamax", "use-potrace-opttolerance",
        "use-erode-thinness", "erode-invert-img", "erode-use-blur", "use-erode-turdsize", "use-erode-alphamax", "use-erode-opttolerance", "erode-opticurve"
    ];
    checkboxes.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("change", () => {
                syncGroupVisibilities();
                triggerAutoReprocess();
            });
        }
    });

    // Listeners for mirror checkboxes
    ["mirror-x", "mirror-y"].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("change", () => {
                drawPreviewCanvas();
                triggerAutoReprocess();
            });
        }
    });

    // Initial group visibility sync
    syncGroupVisibilities();

    // 5d. Import/Export Config Actions
    const downloadConfigBtn = document.getElementById("btn-download-config");
    const uploadConfigBtn = document.getElementById("btn-upload-config");
    const configFileEl = document.getElementById("config-file-input");

    if (downloadConfigBtn) {
        downloadConfigBtn.addEventListener("click", () => {
            const configData = {
                activeProcessingMode: activeProcessingMode,
                
                // Common controls
                min_line_len: parseInt(document.getElementById("min-line-len").value),
                use_simplify_epsilon: document.getElementById("use-simplify-epsilon").checked,
                simplify_epsilon: parseFloat(document.getElementById("simplify-epsilon").value),
                scale_factor: parseFloat(document.getElementById("scale-factor").value),

                // Text mode controls
                thresh_mode: document.getElementById("thresh-mode").value,
                thresh_val: parseInt(document.getElementById("thresh-val").value),
                invert_img: document.getElementById("invert-img").checked,
                morph_kernel: parseInt(document.getElementById("morph-kernel").value),
                skeleton_method: document.getElementById("skeleton-method").value,
                use_text_blur: document.getElementById("use-text-blur").checked,
                text_blur_size: parseInt(document.getElementById("text-blur-size").value),
                use_text_morph: document.getElementById("use-text-morph").checked,
                use_text_dilate: document.getElementById("use-text-dilate").checked,
                text_dilate_size: parseInt(document.getElementById("text-dilate-size").value),
                
                // Path welding controls
                use_path_connect: document.getElementById("use-path-connect").checked,
                path_connect_dist: parseFloat(document.getElementById("path-connect-dist").value),

                // Sketch mode controls
                use_clahe: document.getElementById("use-clahe").checked,
                clahe_limit: parseFloat(document.getElementById("clahe-limit").value),
                clahe_grid: parseInt(document.getElementById("clahe-grid").value),
                use_blur: document.getElementById("use-blur").checked,
                blur_size: parseInt(document.getElementById("blur-size").value),
                use_connect: document.getElementById("use-connect").checked,
                use_thin: document.getElementById("use-thin").checked,
                use_len_filter: document.getElementById("use-len-filter").checked,
                canny_ultra_low: parseInt(document.getElementById("canny-ultra-low").value),
                canny_ultra_high: parseInt(document.getElementById("canny-ultra-high").value),
                canny_medium_low: parseInt(document.getElementById("canny-medium-low").value),
                canny_medium_high: parseInt(document.getElementById("canny-medium-high").value),
                canny_strong_low: parseInt(document.getElementById("canny-strong-low").value),
                canny_strong_high: parseInt(document.getElementById("canny-strong-high").value),

                // Potrace mode controls
                potrace_thresh_mode: document.getElementById("potrace-thresh-mode").value,
                potrace_thresh_val: parseInt(document.getElementById("potrace-thresh-val").value),
                potrace_invert_img: document.getElementById("potrace-invert-img").checked,
                potrace_use_blur: document.getElementById("potrace-use-blur").checked,
                potrace_blur_size: parseInt(document.getElementById("potrace-blur-size").value),
                potrace_use_morph: document.getElementById("potrace-use-morph").checked,
                potrace_morph_kernel: parseInt(document.getElementById("potrace-morph-kernel").value),
                potrace_use_dilate: document.getElementById("potrace-use-dilate").checked,
                potrace_dilate_size: parseInt(document.getElementById("potrace-dilate-size").value),
                use_potrace_turdsize: document.getElementById("use-potrace-turdsize").checked,
                potrace_turdsize: parseInt(document.getElementById("potrace-turdsize").value),
                use_potrace_alphamax: document.getElementById("use-potrace-alphamax").checked,
                potrace_alphamax: parseFloat(document.getElementById("potrace-alphamax").value),
                use_potrace_opttolerance: document.getElementById("use-potrace-opttolerance").checked,
                potrace_opttolerance: parseFloat(document.getElementById("potrace-opttolerance").value),
                potrace_opticurve: document.getElementById("potrace-opticurve").checked,
                potrace_turnpolicy: document.getElementById("potrace-turnpolicy").value,
                potrace_bezier_steps: parseInt(document.getElementById("potrace-bezier-steps").value),

                // Erode Outline mode controls
                erode_thinness_level: parseInt(document.getElementById("erode-thinness-level").value),
                use_erode_thinness: document.getElementById("use-erode-thinness").checked,
                erode_thresh_mode: document.getElementById("erode-thresh-mode").value,
                erode_thresh_val: parseInt(document.getElementById("erode-thresh-val").value),
                erode_invert_img: document.getElementById("erode-invert-img").checked,
                erode_use_blur: document.getElementById("erode-use-blur").checked,
                erode_blur_size: parseInt(document.getElementById("erode-blur-size").value),
                use_erode_turdsize: document.getElementById("use-erode-turdsize").checked,
                erode_turdsize: parseInt(document.getElementById("erode-turdsize").value),
                use_erode_alphamax: document.getElementById("use-erode-alphamax").checked,
                erode_alphamax: parseFloat(document.getElementById("erode-alphamax").value),
                use_erode_opttolerance: document.getElementById("use-erode-opttolerance").checked,
                erode_opttolerance: parseFloat(document.getElementById("erode-opttolerance").value),
                erode_opticurve: document.getElementById("erode-opticurve").checked,
                erode_turnpolicy: document.getElementById("erode-turnpolicy").value,
                erode_bezier_steps: parseInt(document.getElementById("erode-bezier-steps").value)
            };

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configData, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `drawtext_image_config_${activeProcessingMode}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            logToConsole(`System: Đã tải xuống tệp cấu hình drawtext_image_config_${activeProcessingMode}.json`, "system");
        });
    }

    const selectPresetEl = document.getElementById("select-preset");
    if (selectPresetEl) {
        selectPresetEl.addEventListener("change", (e) => {
            const val = e.target.value;
            if (!val) return;
            
            const switchTab = (mode) => {
                activeProcessingMode = mode;
                const tabBtns = document.querySelectorAll(".processing-tabs .tab-btn");
                tabBtns.forEach(btn => {
                    if (btn.getAttribute("data-proc-mode") === mode) {
                        btn.classList.add("active");
                    } else {
                        btn.classList.remove("active");
                    }
                });
                document.querySelectorAll(".proc-tab-panel").forEach(p => p.classList.remove("active"));
                const targetPanel = document.getElementById(`panel-proc-${mode}`);
                if (targetPanel) {
                    targetPanel.classList.add("active");
                }
            };
            
            const presetName = e.target.options[e.target.selectedIndex].text;
            
            if (val === "text-clean") {
                switchTab("text");
                document.getElementById("thresh-mode").value = "otsu";
                document.getElementById("invert-img").checked = true;
                document.getElementById("use-text-blur").checked = false;
                document.getElementById("use-text-morph").checked = true;
                document.getElementById("morph-kernel").value = 3;
                document.getElementById("use-text-dilate").checked = false;
                document.getElementById("use-path-connect").checked = true;
                document.getElementById("path-connect-dist").value = 5;
                document.getElementById("min-line-len").value = 5;
                document.getElementById("simplify-epsilon").value = 1.0;
            } else if (val === "text-raw") {
                switchTab("text");
                document.getElementById("thresh-mode").value = "otsu";
                document.getElementById("invert-img").checked = true;
                document.getElementById("use-text-blur").checked = false;
                document.getElementById("use-text-morph").checked = false;
                document.getElementById("use-text-dilate").checked = false;
                document.getElementById("use-path-connect").checked = false;
                document.getElementById("min-line-len").value = 10;
                document.getElementById("simplify-epsilon").value = 0.5;
            } else if (val === "sketch-minimal") {
                switchTab("sketch");
                document.getElementById("use-clahe").checked = true;
                document.getElementById("clahe-limit").value = 1.5;
                document.getElementById("clahe-grid").value = 8;
                document.getElementById("use-blur").checked = true;
                document.getElementById("blur-size").value = 5;
                document.getElementById("use-connect").checked = true;
                document.getElementById("use-thin").checked = true;
                document.getElementById("use-len-filter").checked = true;
                document.getElementById("min-line-len").value = 15;
                document.getElementById("simplify-epsilon").value = 1.0;
                document.getElementById("canny-ultra-low").value = 30;
                document.getElementById("canny-ultra-high").value = 70;
                document.getElementById("canny-medium-low").value = 50;
                document.getElementById("canny-medium-high").value = 90;
                document.getElementById("canny-strong-low").value = 80;
                document.getElementById("canny-strong-high").value = 140;
            } else if (val === "sketch-realistic") {
                switchTab("sketch");
                document.getElementById("use-clahe").checked = true;
                document.getElementById("clahe-limit").value = 2.0;
                document.getElementById("clahe-grid").value = 8;
                document.getElementById("use-blur").checked = true;
                document.getElementById("blur-size").value = 3;
                document.getElementById("use-connect").checked = true;
                document.getElementById("use-thin").checked = true;
                document.getElementById("use-len-filter").checked = true;
                document.getElementById("min-line-len").value = 5;
                document.getElementById("simplify-epsilon").value = 1.0;
                document.getElementById("canny-ultra-low").value = 3;
                document.getElementById("canny-ultra-high").value = 15;
                document.getElementById("canny-medium-low").value = 10;
                document.getElementById("canny-medium-high").value = 30;
                document.getElementById("canny-strong-low").value = 30;
                document.getElementById("canny-strong-high").value = 80;
            }
            
            syncGroupVisibilities();
            updateSliderLabels();
            triggerAutoReprocess();
            
            selectPresetEl.value = "";
            logToConsole(`System: Đã nạp cấu hình nhanh "${presetName}".`, "system");
        });
    }

    if (uploadConfigBtn) {
        uploadConfigBtn.addEventListener("click", () => {
            configFileEl.click();
        });
    }

    if (configFileEl) {
        configFileEl.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(evt) {
                try {
                    const loaded = JSON.parse(evt.target.result);
                    
                    // Check if it's a project JSON file like "project_2 cosplay (1).json"
                    const isProjectFile = (loaded.sketchUseClahe !== undefined || loaded.sketchCannyUltraLow !== undefined);
                    if (isProjectFile) {
                        loaded.activeProcessingMode = "sketch";
                        loaded.use_clahe = loaded.sketchUseClahe;
                        loaded.clahe_limit = loaded.sketchClaheClip;
                        loaded.use_blur = loaded.sketchUseBlur;
                        loaded.blur_size = loaded.sketchBlurSize;
                        loaded.use_connect = loaded.sketchUseConnect;
                        loaded.use_thin = loaded.sketchUseThin;
                        loaded.use_len_filter = loaded.sketchUseLenFilter;
                        loaded.min_line_len = loaded.sketchMinContourLen;
                        loaded.canny_ultra_low = loaded.sketchCannyUltraLow;
                        loaded.canny_ultra_high = loaded.sketchCannyUltraHigh;
                        loaded.canny_medium_low = loaded.sketchCannyMediumLow;
                        loaded.canny_medium_high = loaded.sketchCannyMediumHigh;
                        loaded.canny_strong_low = loaded.sketchCannyStrongLow;
                        loaded.canny_strong_high = loaded.sketchCannyStrongHigh;
                    }
                    
                    // Set active mode if present
                    if (loaded.activeProcessingMode) {
                        activeProcessingMode = loaded.activeProcessingMode;
                        // Select corresponding button
                        const tabBtn = document.querySelector(`.processing-tabs .tab-btn[data-proc-mode="${activeProcessingMode}"]`);
                        if (tabBtn) {
                            document.querySelectorAll(".processing-tabs .tab-btn").forEach(b => b.classList.remove("active"));
                            tabBtn.classList.add("active");
                        }
                        // Toggle panels
                        document.querySelectorAll(".proc-tab-panel").forEach(p => p.classList.remove("active"));
                        const targetPanel = document.getElementById(`panel-proc-${activeProcessingMode}`);
                        if (targetPanel) {
                            targetPanel.classList.add("active");
                        }
                    }

                    // Mapping helper
                    const setVal = (id, val) => {
                        const el = document.getElementById(id);
                        if (el && val !== undefined) {
                            if (el.type === "checkbox") {
                                el.checked = !!val;
                            } else {
                                el.value = val;
                            }
                        }
                    };

                    // Common
                    setVal("min-line-len", loaded.min_line_len);
                    setVal("use-simplify-epsilon", loaded.use_simplify_epsilon !== undefined ? loaded.use_simplify_epsilon : true);
                    setVal("simplify-epsilon", loaded.simplify_epsilon);
                    setVal("scale-factor", loaded.scale_factor);

                    // Text
                    setVal("thresh-mode", loaded.thresh_mode);
                    setVal("thresh-val", loaded.thresh_val);
                    setVal("invert-img", loaded.invert_img);
                    setVal("morph-kernel", loaded.morph_kernel);
                    setVal("skeleton-method", loaded.skeleton_method);
                    setVal("use-text-blur", loaded.use_text_blur);
                    setVal("text-blur-size", loaded.text_blur_size);
                    setVal("use-text-morph", loaded.use_text_morph);
                    setVal("use-text-dilate", loaded.use_text_dilate);
                    setVal("text-dilate-size", loaded.text_dilate_size);
                    
                    // Path welding
                    setVal("use-path-connect", loaded.use_path_connect);
                    setVal("path-connect-dist", loaded.path_connect_dist);

                    // Sketch
                    setVal("use-clahe", loaded.use_clahe);
                    setVal("clahe-limit", loaded.clahe_limit);
                    setVal("clahe-grid", loaded.clahe_grid);
                    setVal("use-blur", loaded.use_blur);
                    setVal("blur-size", loaded.blur_size);
                    setVal("use-connect", loaded.use_connect);
                    setVal("use-thin", loaded.use_thin);
                    setVal("use-len-filter", loaded.use_len_filter);
                    setVal("canny-ultra-low", loaded.canny_ultra_low);
                    setVal("canny-ultra-high", loaded.canny_ultra_high);
                    setVal("canny-medium-low", loaded.canny_medium_low);
                    setVal("canny-medium-high", loaded.canny_medium_high);
                    setVal("canny-strong-low", loaded.canny_strong_low);
                    setVal("canny-strong-high", loaded.canny_strong_high);

                    // Potrace
                    setVal("potrace-thresh-mode", loaded.potrace_thresh_mode);
                    setVal("potrace-thresh-val", loaded.potrace_thresh_val);
                    setVal("potrace-invert-img", loaded.potrace_invert_img);
                    setVal("potrace-use-blur", loaded.potrace_use_blur);
                    setVal("potrace-blur-size", loaded.potrace_blur_size);
                    setVal("potrace-use-morph", loaded.potrace_use_morph);
                    setVal("potrace-morph-kernel", loaded.potrace_morph_kernel);
                    setVal("potrace-use-dilate", loaded.potrace_use_dilate);
                    setVal("potrace-dilate-size", loaded.potrace_dilate_size);
                    setVal("use-potrace-turdsize", loaded.use_potrace_turdsize !== undefined ? loaded.use_potrace_turdsize : true);
                    setVal("potrace-turdsize", loaded.potrace_turdsize);
                    setVal("use-potrace-alphamax", loaded.use_potrace_alphamax !== undefined ? loaded.use_potrace_alphamax : true);
                    setVal("potrace-alphamax", loaded.potrace_alphamax);
                    setVal("use-potrace-opttolerance", loaded.use_potrace_opttolerance !== undefined ? loaded.use_potrace_opttolerance : true);
                    setVal("potrace-opttolerance", loaded.potrace_opttolerance);
                    setVal("potrace-opticurve", loaded.potrace_opticurve);
                    setVal("potrace-turnpolicy", loaded.potrace_turnpolicy);
                    setVal("potrace-bezier-steps", loaded.potrace_bezier_steps);

                    // Erode Outline controls
                    setVal("erode-thinness-level", loaded.erode_thinness_level);
                    setVal("use-erode-thinness", loaded.use_erode_thinness !== undefined ? loaded.use_erode_thinness : true);
                    setVal("erode-thresh-mode", loaded.erode_thresh_mode);
                    setVal("erode-thresh-val", loaded.erode_thresh_val);
                    setVal("erode-invert-img", loaded.erode_invert_img);
                    setVal("erode-use-blur", loaded.erode_use_blur);
                    setVal("erode-blur-size", loaded.erode_blur_size);
                    setVal("use-erode-turdsize", loaded.use_erode_turdsize !== undefined ? loaded.use_erode_turdsize : true);
                    setVal("erode-turdsize", loaded.erode_turdsize);
                    setVal("use-erode-alphamax", loaded.use_erode_alphamax !== undefined ? loaded.use_erode_alphamax : true);
                    setVal("erode-alphamax", loaded.erode_alphamax);
                    setVal("use-erode-opttolerance", loaded.use_erode_opttolerance !== undefined ? loaded.use_erode_opttolerance : true);
                    setVal("erode-opttolerance", loaded.erode_opttolerance);
                    setVal("erode-opticurve", loaded.erode_opticurve);
                    setVal("erode-turnpolicy", loaded.erode_turnpolicy);
                    setVal("erode-bezier-steps", loaded.erode_bezier_steps);

                    // Sync group visibilities
                    syncGroupVisibilities();

                    // Update range labels text
                    updateSliderLabels();

                    logToConsole("System: Nạp tệp cấu hình thành công! Đang xử lý lại...", "system");
                    
                    // Reprocess
                    reprocessImage();
                } catch(err) {
                    logToConsole("System Error: Định dạng tệp cấu hình không hợp lệ.", "system");
                }
            };
            reader.readAsText(file);
            configFileEl.value = ""; // Clear file selection
        });
    }

    // 6. CNC Jog actions
    document.querySelectorAll(".btn-jog[data-dir]").forEach(btn => {
        btn.addEventListener("click", () => {
            const dir = btn.getAttribute("data-dir");
            const step = parseFloat(document.getElementById("cnc-step").value);
            const speed = parseFloat(document.getElementById("cnc-speed").value);
            jogMove(dir, step, speed);
        });
    });

    const setHomeBtn = document.getElementById("btn-set-home");
    if (setHomeBtn) setHomeBtn.addEventListener("click", setHomeCoordinate);
    const setHomeMainBtn = document.getElementById("btn-set-home-main");
    if (setHomeMainBtn) setHomeMainBtn.addEventListener("click", setHomeCoordinate);

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
        if (ans.status === "ok") {
            isConnected = true;
            updateConnectionUI(true, port);
            logToConsole("System: " + ans.message, "system");
        } else {
            isConnected = false;
            updateConnectionUI(false, port);
            logToConsole("System Error: Kết nối thất bại: " + ans.message, "system");
        }
    } catch (e) {
        isConnected = false;
        updateConnectionUI(false, port);
        logToConsole("System Error: Không thể kết nối tới server.", "system");
    }
}

// Disconnect Serial Port
async function disconnectDevice() {
    try {
        const res = await fetch("/api/disconnect", { method: "POST" });
        const ans = await res.json();
        isConnected = false;
        const port = document.getElementById("serial-port").value;
        updateConnectionUI(false, port);
        if (ans.status === "error") {
            logToConsole("System Error: Ngắt kết nối thất bại: " + ans.message, "system");
        } else {
            logToConsole("System: Đã ngắt kết nối với máy CNC.", "system");
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
    const stepEl = document.getElementById("step-mm");
    const step_mm = stepEl ? parseFloat(stepEl.value) : 0.4;
    const cncWidthEl = document.getElementById("cnc-width");
    const cncHeightEl = document.getElementById("cnc-height");
    const cnc_width = cncWidthEl ? parseFloat(cncWidthEl.value) : 300.0;
    const cnc_height = cncHeightEl ? parseFloat(cncHeightEl.value) : 200.0;
    
    const updatedParams = {
        step_mm: step_mm,
        cnc_width: cnc_width,
        cnc_height: cnc_height,
        pen_up_cmd: document.getElementById("pen-up-cmd") ? document.getElementById("pen-up-cmd").value : "M3 S10",
        pen_down_cmd: document.getElementById("pen-down-cmd") ? document.getElementById("pen-down-cmd").value : "M3 S90",
        pen_dwell: document.getElementById("pen-dwell") ? parseFloat(document.getElementById("pen-dwell").value) : 0.2,
        feedrate: document.getElementById("cnc-speed") ? parseFloat(document.getElementById("cnc-speed").value) : 1000.0,
        mirror_x: document.getElementById("mirror-x") ? document.getElementById("mirror-x").checked : false,
        mirror_y: document.getElementById("mirror-y") ? document.getElementById("mirror-y").checked : false
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
            
            // Update download links
            const svgBtn = document.getElementById("btn-download-svg");
            if (ans.svg_url) {
                svgBtn.href = `${ans.svg_url}?t=${Date.now()}`;
                svgBtn.style.display = "block";
            } else {
                svgBtn.style.display = "none";
            }

            const gcodeBtn = document.getElementById("btn-download-gcode");
            if (activePaths && activePaths.length > 0) {
                gcodeBtn.href = `/static/cnc_output.nc?t=${Date.now()}`;
                gcodeBtn.style.display = "block";
            } else {
                gcodeBtn.style.display = "none";
            }

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

    const scaleEl = document.getElementById("scale-factor");
    const scale = scaleEl ? parseFloat(scaleEl.value) : 1.0;
    
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
        ctx.moveTo(tx, ty + gy * cncScale);
        ctx.lineTo(tx + tableW, ty + gy * cncScale);
        ctx.stroke();
    }

    // Outer bounding border
    ctx.strokeStyle = "#2e3a5a";
    ctx.lineWidth = 2;
    ctx.strokeRect(tx, ty, tableW, tableH);
    
    // Label origin
    ctx.fillStyle = "var(--text-muted)";
    ctx.font = "10px sans-serif";
    ctx.fillText("0,0", tx - 5, ty - 6);

    // DRAW THE PATH VECTORS
    if (activePaths.length > 0) {
        const scaleEl = document.getElementById("scale-factor");
        const drawScale = scaleEl ? parseFloat(scaleEl.value) : 1.0;
        
        // References (relative coordinates translation)
        let min_x = Infinity, max_y = -Infinity;
        activePaths.forEach(p => p.forEach(pt => {
            if (pt[0] < min_x) min_x = pt[0];
            if (pt[1] > max_y) max_y = pt[1];
        }));

        let start_cnc_x = drawStartCoords.x;
        let start_cnc_y = drawStartCoords.y;
        if (!isStreaming && !isSimulating) {
            // If idle, represent paths offset relative to current pen location
            start_cnc_x = currentCoords.x;
            start_cnc_y = currentCoords.y;
        }

        const mirrorXEl = document.getElementById("mirror-x");
        const mirrorYEl = document.getElementById("mirror-y");
        const mirrorX = mirrorXEl ? mirrorXEl.checked : false;
        const mirrorY = mirrorYEl ? mirrorYEl.checked : false;

        // Draw all extracted toolpaths
        activePaths.forEach((path, pIdx) => {
            ctx.beginPath();
            
            // Map image path relative to origin to simulated CNC positions
            path.forEach((pt, idx) => {
                let dx = pt[0] - min_x;
                let dy = max_y - pt[1];
                if (mirrorX) dx = -dx;
                if (mirrorY) dy = -dy;
                const px = (dx * drawScale + start_cnc_x) * cncScale;
                const py = (dy * drawScale + start_cnc_y) * cncScale;
                
                const screenX = tx + px;
                const screenY = ty + tableH - py;
                
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
                
                let ldx = lastPt[0] - ref_x;
                let ldy = lastPt[1] - ref_y;
                if (mirrorX) ldx = -ldx;
                if (mirrorY) ldy = -ldy;
                const l_px = (ldx * drawScale + start_cnc_x) * cncScale;
                const l_py = (ldy * drawScale + start_cnc_y) * cncScale;
                
                let sdx = startPt[0] - ref_x;
                let sdy = startPt[1] - ref_y;
                if (mirrorX) sdx = -sdx;
                if (mirrorY) sdy = -sdy;
                const s_px = (sdx * drawScale + start_cnc_x) * cncScale;
                const s_py = (sdy * drawScale + start_cnc_y) * cncScale;

                ctx.moveTo(tx + l_px, ty + l_py);
                ctx.lineTo(tx + s_px, ty + s_py);
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
                let dx = pt.x - ref_x;
                let dy = pt.y - ref_y; // Y positive down
                if (mirrorX) dx = -dx;
                if (mirrorY) dy = -dy;
                const px = (dx * drawScale + start_cnc_x) * cncScale;
                const py = (dy * drawScale + start_cnc_y) * cncScale;
                
                const screenX = tx + px;
                const screenY = ty + py; // Map Y down
                
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
                let dx = last.x - ref_x;
                let dy = last.y - ref_y; // Y positive down
                if (mirrorX) dx = -dx;
                if (mirrorY) dy = -dy;
                const px = (dx * drawScale + start_cnc_x) * cncScale;
                const py = (dy * drawScale + start_cnc_y) * cncScale;
                
                ctx.beginPath();
                ctx.arc(tx + px, ty + py, 6, 0, 2 * Math.PI); // Map Y down
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
        const penScreenY = ty + currentCoords.y * cncScale; // Y positive down

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
    const threshVal = document.getElementById("thresh-val");
    if (threshVal) document.getElementById("lbl-thresh-val").textContent = threshVal.value;

    const morphKernel = document.getElementById("morph-kernel");
    if (morphKernel) document.getElementById("lbl-morph-kernel").textContent = morphKernel.value;

    const minLineLen = document.getElementById("min-line-len");
    if (minLineLen) document.getElementById("lbl-min-line-len").textContent = minLineLen.value;

    const simplifyEps = document.getElementById("simplify-epsilon");
    if (simplifyEps) document.getElementById("lbl-simplify-epsilon").textContent = parseFloat(simplifyEps.value).toFixed(1);

    const claheLimit = document.getElementById("clahe-limit");
    if (claheLimit) document.getElementById("lbl-clahe-limit").textContent = parseFloat(claheLimit.value).toFixed(1);

    const claheGrid = document.getElementById("clahe-grid");
    if (claheGrid) document.getElementById("lbl-clahe-grid").textContent = claheGrid.value;

    const blurSize = document.getElementById("blur-size");
    if (blurSize) document.getElementById("lbl-blur-size").textContent = blurSize.value;

    const textBlurSize = document.getElementById("text-blur-size");
    if (textBlurSize) document.getElementById("lbl-text-blur-size").textContent = textBlurSize.value;

    const textDilateSize = document.getElementById("text-dilate-size");
    if (textDilateSize) document.getElementById("lbl-text-dilate-size").textContent = textDilateSize.value;

    const pathConnectDist = document.getElementById("path-connect-dist");
    if (pathConnectDist) document.getElementById("lbl-path-connect-dist").textContent = pathConnectDist.value;

    // Canny thresholds
    const cannyUltraLow = document.getElementById("canny-ultra-low");
    if (cannyUltraLow) document.getElementById("lbl-canny-ultra-low").textContent = cannyUltraLow.value;
    const cannyUltraHigh = document.getElementById("canny-ultra-high");
    if (cannyUltraHigh) document.getElementById("lbl-canny-ultra-high").textContent = cannyUltraHigh.value;

    const cannyMediumLow = document.getElementById("canny-medium-low");
    if (cannyMediumLow) document.getElementById("lbl-canny-medium-low").textContent = cannyMediumLow.value;
    const cannyMediumHigh = document.getElementById("canny-medium-high");
    if (cannyMediumHigh) document.getElementById("lbl-canny-medium-high").textContent = cannyMediumHigh.value;

    const cannyStrongLow = document.getElementById("canny-strong-low");
    if (cannyStrongLow) document.getElementById("lbl-canny-strong-low").textContent = cannyStrongLow.value;
    const cannyStrongHigh = document.getElementById("canny-strong-high");
    if (cannyStrongHigh) document.getElementById("lbl-canny-strong-high").textContent = cannyStrongHigh.value;

    // Scale factor
    const scaleFactor = document.getElementById("scale-factor");
    if (scaleFactor) document.getElementById("lbl-scale-factor").textContent = parseFloat(scaleFactor.value).toFixed(3);

    // Potrace
    const potraceThreshVal = document.getElementById("potrace-thresh-val");
    if (potraceThreshVal) document.getElementById("lbl-potrace-thresh-val").textContent = potraceThreshVal.value;

    const potraceBlurSize = document.getElementById("potrace-blur-size");
    if (potraceBlurSize) document.getElementById("lbl-potrace-blur-size").textContent = potraceBlurSize.value;

    const potraceMorphKernel = document.getElementById("potrace-morph-kernel");
    if (potraceMorphKernel) document.getElementById("lbl-potrace-morph-kernel").textContent = potraceMorphKernel.value;

    const potraceDilateSize = document.getElementById("potrace-dilate-size");
    if (potraceDilateSize) document.getElementById("lbl-potrace-dilate-size").textContent = potraceDilateSize.value;

    const potraceTurdsize = document.getElementById("potrace-turdsize");
    if (potraceTurdsize) document.getElementById("lbl-potrace-turdsize").textContent = potraceTurdsize.value;

    const potraceAlphamax = document.getElementById("potrace-alphamax");
    if (potraceAlphamax) document.getElementById("lbl-potrace-alphamax").textContent = parseFloat(potraceAlphamax.value).toFixed(2);

    const potraceOptolerance = document.getElementById("potrace-opttolerance");
    if (potraceOptolerance) document.getElementById("lbl-potrace-opttolerance").textContent = parseFloat(potraceOptolerance.value).toFixed(2);

    const potraceBezierSteps = document.getElementById("potrace-bezier-steps");
    if (potraceBezierSteps) document.getElementById("lbl-potrace-bezier-steps").textContent = potraceBezierSteps.value;

    // Erode Outline
    const erodeThinnessLevel = document.getElementById("erode-thinness-level");
    if (erodeThinnessLevel) document.getElementById("lbl-erode-thinness-level").textContent = erodeThinnessLevel.value;

    const erodeThreshVal = document.getElementById("erode-thresh-val");
    if (erodeThreshVal) document.getElementById("lbl-erode-thresh-val").textContent = erodeThreshVal.value;

    const erodeBlurSize = document.getElementById("erode-blur-size");
    if (erodeBlurSize) document.getElementById("lbl-erode-blur-size").textContent = erodeBlurSize.value;

    const erodeTurdsize = document.getElementById("erode-turdsize");
    if (erodeTurdsize) document.getElementById("lbl-erode-turdsize").textContent = erodeTurdsize.value;

    const erodeAlphamax = document.getElementById("erode-alphamax");
    if (erodeAlphamax) document.getElementById("lbl-erode-alphamax").textContent = parseFloat(erodeAlphamax.value).toFixed(2);

    const erodeOptolerance = document.getElementById("erode-opttolerance");
    if (erodeOptolerance) document.getElementById("lbl-erode-opttolerance").textContent = parseFloat(erodeOptolerance.value).toFixed(2);

    const erodeBezierSteps = document.getElementById("erode-bezier-steps");
    if (erodeBezierSteps) document.getElementById("lbl-erode-bezier-steps").textContent = erodeBezierSteps.value;
}

// Toggle manual threshold value control depending on threshold selection type
function toggleThresholdInput() {
    const threshMode = document.getElementById("thresh-mode");
    if (threshMode) {
        const mode = threshMode.value;
        const div = document.getElementById("threshold-val-group");
        if (div) div.style.display = (mode === "manual") ? "block" : "none";
    }

    const potraceThreshMode = document.getElementById("potrace-thresh-mode");
    if (potraceThreshMode) {
        const potraceMode = potraceThreshMode.value;
        const potraceDiv = document.getElementById("potrace-thresh-val-group");
        if (potraceDiv) potraceDiv.style.display = (potraceMode === "manual") ? "block" : "none";
    }

    const erodeThreshMode = document.getElementById("erode-thresh-mode");
    if (erodeThreshMode) {
        const erodeMode = erodeThreshMode.value;
        const erodeDiv = document.getElementById("erode-thresh-val-group");
        if (erodeDiv) erodeDiv.style.display = (erodeMode === "manual") ? "block" : "none";
    }
}

// Sync the visual display of all slider controls depending on their checkbox state
function syncGroupVisibilities() {
    toggleThresholdInput();
    
    // CLAHE
    const useClaheEl = document.getElementById("use-clahe");
    if (useClaheEl) {
        const grp = document.getElementById("clahe-limit-group");
        if (grp) grp.style.display = useClaheEl.checked ? "block" : "none";
        const grpGrid = document.getElementById("clahe-grid-group");
        if (grpGrid) grpGrid.style.display = useClaheEl.checked ? "block" : "none";
    }
    
    // Sketch Blur
    const useBlurEl = document.getElementById("use-blur");
    if (useBlurEl) {
        const grp = document.getElementById("blur-size-group");
        if (grp) grp.style.display = useBlurEl.checked ? "block" : "none";
    }
    
    // Text Blur
    const useTextBlurEl = document.getElementById("use-text-blur");
    if (useTextBlurEl) {
        const grp = document.getElementById("text-blur-size-group");
        if (grp) grp.style.display = useTextBlurEl.checked ? "block" : "none";
    }
    
    // Text Morph Close
    const useTextMorphEl = document.getElementById("use-text-morph");
    if (useTextMorphEl) {
        const grp = document.getElementById("morph-kernel-group");
        if (grp) grp.style.display = useTextMorphEl.checked ? "block" : "none";
    }
    
    // Text Morph Dilate
    const useTextDilateEl = document.getElementById("use-text-dilate");
    if (useTextDilateEl) {
        const grp = document.getElementById("text-dilate-size-group");
        if (grp) grp.style.display = useTextDilateEl.checked ? "block" : "none";
    }

    // Potrace Blur
    const usePotraceBlurEl = document.getElementById("potrace-use-blur");
    if (usePotraceBlurEl) {
        const grp = document.getElementById("potrace-blur-size-group");
        if (grp) grp.style.display = usePotraceBlurEl.checked ? "block" : "none";
    }

    // Potrace Morph Close
    const usePotraceMorphEl = document.getElementById("potrace-use-morph");
    if (usePotraceMorphEl) {
        const grp = document.getElementById("potrace-morph-kernel-group");
        if (grp) grp.style.display = usePotraceMorphEl.checked ? "block" : "none";
    }

    // Potrace Morph Dilate
    const usePotraceDilateEl = document.getElementById("potrace-use-dilate");
    if (usePotraceDilateEl) {
        const grp = document.getElementById("potrace-dilate-size-group");
        if (grp) grp.style.display = usePotraceDilateEl.checked ? "block" : "none";
    }
    
    // Path Welding
    const usePathConnectEl = document.getElementById("use-path-connect");
    if (usePathConnectEl) {
        const grp = document.getElementById("path-connect-dist-group");
        if (grp) grp.style.display = usePathConnectEl.checked ? "block" : "none";
    }

    // Epsilon Simplification
    const useSimplifyEpsilonEl = document.getElementById("use-simplify-epsilon");
    if (useSimplifyEpsilonEl) {
        const grp = document.getElementById("simplify-epsilon-group");
        if (grp) grp.style.display = useSimplifyEpsilonEl.checked ? "block" : "none";
    }

    // Potrace Turd Size
    const usePotraceTurdsizeEl = document.getElementById("use-potrace-turdsize");
    if (usePotraceTurdsizeEl) {
        const grp = document.getElementById("potrace-turdsize-group");
        if (grp) grp.style.display = usePotraceTurdsizeEl.checked ? "block" : "none";
    }

    // Potrace Alphamax
    const usePotraceAlphamaxEl = document.getElementById("use-potrace-alphamax");
    if (usePotraceAlphamaxEl) {
        const grp = document.getElementById("potrace-alphamax-group");
        if (grp) grp.style.display = usePotraceAlphamaxEl.checked ? "block" : "none";
    }

    // Potrace Optolerance
    const usePotraceOptoleranceEl = document.getElementById("use-potrace-opttolerance");
    if (usePotraceOptoleranceEl) {
        const grp = document.getElementById("potrace-opttolerance-group");
        if (grp) grp.style.display = usePotraceOptoleranceEl.checked ? "block" : "none";
    }

    // Erode thinness
    const useErodeThinnessEl = document.getElementById("use-erode-thinness");
    if (useErodeThinnessEl) {
        const grp = document.getElementById("erode-thinness-level-group");
        if (grp) grp.style.display = useErodeThinnessEl.checked ? "block" : "none";
    }

    // Erode Blur
    const erodeUseBlurEl = document.getElementById("erode-use-blur");
    if (erodeUseBlurEl) {
        const grp = document.getElementById("erode-blur-size-group");
        if (grp) grp.style.display = erodeUseBlurEl.checked ? "block" : "none";
    }

    // Erode Turd Size
    const useErodeTurdsizeEl = document.getElementById("use-erode-turdsize");
    if (useErodeTurdsizeEl) {
        const grp = document.getElementById("erode-turdsize-group");
        if (grp) grp.style.display = useErodeTurdsizeEl.checked ? "block" : "none";
    }

    // Erode Alphamax
    const useErodeAlphamaxEl = document.getElementById("use-erode-alphamax");
    if (useErodeAlphamaxEl) {
        const grp = document.getElementById("erode-alphamax-group");
        if (grp) grp.style.display = useErodeAlphamaxEl.checked ? "block" : "none";
    }

    // Erode Optolerance
    const useErodeOptoleranceEl = document.getElementById("use-erode-opttolerance");
    if (useErodeOptoleranceEl) {
        const grp = document.getElementById("erode-opttolerance-group");
        if (grp) grp.style.display = useErodeOptoleranceEl.checked ? "block" : "none";
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
