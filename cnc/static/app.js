// Global state
let ws = null;
let connectionAttempts = 0;
let isConnected = false;
let lastUIState = null;
let lastTelemetry = null;
let yoloDetected = false;
let lastObjectInfo = null;
let previewIntervalId = null;

// Jogging defaults
const stepMapping = [0.1, 1, 10, 100]; // mm
let currentStepDistance = 10; // default 10mm
let currentFeedrate = 1000; // mm/min

// Visualizer toolpath state
let toolpathPoints = []; // [{type, x1, y1, z1, x2, y2, z2}]
let boundingBox = { minX: 0, maxX: 0, minY: 0, maxY: 0, center: { x: 0, y: 0 }, width: 0, height: 0 };
let currentWPos = { x: 0, y: 0, z: 0 };
let currentSpindleSpeed = 0;
let targetSpindleSpeed = 0;
let isJoggingSpindle = false;
let jogSpindleTimeout = null;

// Canvas transform parameters
let panX = 0;
let panY = 0;
let zoomScale = 1.0;
let isDragging = false;
let startDragX = 0;
let startDragY = 0;

// Scenario state variables
let activeScenario = null;
let scenarioIsCreating = false;
let scenarioInsertIndex = -1;
let scenarioLooping = false;
let latestCalibrationMatrix = null;

// DOM Elements
const connStatus = document.getElementById("connection-status");
const machineState = document.getElementById("machine-state");
const portInput = document.getElementById("port-input");
const baudrateInput = document.getElementById("baudrate-input");
const connectBtn = document.getElementById("connect-btn");
//reload-ai-model-btn
const reloadAiModelBtn = document.getElementById("reload-ai-model-btn");
const portWarning = document.getElementById("port-warning");
const portWarningText = document.getElementById("port-warning-text");

const valX = document.getElementById("val-x");
const valY = document.getElementById("val-y");
const valZ = document.getElementById("val-z");

const telFeedrate = document.getElementById("tel-feedrate");
const telSpindle = document.getElementById("tel-spindle");
const telBuffer = document.getElementById("tel-buffer");

const sliderStep = document.getElementById("slider-step");
const valStep = document.getElementById("val-step");
const sliderFeed = document.getElementById("slider-feed");
const valFeed = document.getElementById("val-feed");

const fileDropZone = document.getElementById("file-drop-zone");
const fileInput = document.getElementById("file-input");
const fileInfoContainer = document.getElementById("file-info-container");
const loadedFileName = document.getElementById("loaded-file-name");
const loadedFileLines = document.getElementById("loaded-file-lines");
const btnRemoveFile = document.getElementById("btn-remove-file");

const progressContainer = document.getElementById("progress-container");
const progressPercentage = document.getElementById("progress-percentage");
const progressFraction = document.getElementById("progress-fraction");
const streamProgressBar = document.getElementById("stream-progress-bar");

const btnStartStream = document.getElementById("btn-start-stream");
const btnPauseStream = document.getElementById("btn-pause-stream");
const btnAbortStream = document.getElementById("btn-abort-stream");

const consoleOutput = document.getElementById("console-output");
const consoleForm = document.getElementById("console-form");
const consoleInput = document.getElementById("console-input");

// Pen Servo Elements
const btnPenUp = document.getElementById("btn-pen-up");
const btnPenDown = document.getElementById("btn-pen-down");
const penControlMode = document.getElementById("pen-control-mode");
const penUpVal = document.getElementById("pen-up-val");
const penDownVal = document.getElementById("pen-down-val");
const penDwellVal = document.getElementById("pen-dwell-val");
const lblPenUp = document.getElementById("lbl-pen-up");
const lblPenDown = document.getElementById("lbl-pen-down");

const canvas = document.getElementById("toolpath-canvas");
const ctx = canvas.getContext("2d");

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initWebSocket();
    setupEventListeners();
    loadSavedUIPreferences();
    setupCanvas();
    fetchState();
    populateDevices();
    initGcodeEditor();

    if (!isConnected) connectBtn.click();
});

// Fetch and populate available serial ports and camera inputs
async function populateDevices(showInConsole = false) {
    if (showInConsole) {
        logSystemMessage(t("Đang quét các thiết bị kết nối (ls)..."));
    }
    try {
        const portsRes = await fetch("/api/devices/ports");
        const ports = await portsRes.json();
        const portsDatalist = document.getElementById("ports-datalist");
        if (portsDatalist) {
            portsDatalist.innerHTML = "";
            ports.forEach(p => {
                const opt = document.createElement("option");
                opt.value = p.port;
                opt.textContent = p.description;
                portsDatalist.appendChild(opt);
            });
        }
        if (showInConsole) {
            logSystemMessage(t("Các cổng Serial khả dụng:"));
            ports.forEach(p => {
                logSystemMessage(`  • ${p.port} - ${p.description}`);
            });
        }
    } catch (e) {
        console.error(t("Lấy danh sách các cổng Serial khả dụng thất bại:"), e);
        if (showInConsole) logSystemMessage(t("Lỗi quét các cổng: {error}", { error: e }));
    }

    try {
        const camsRes = await fetch("/api/devices/cameras");
        const cams = await camsRes.json();
        const camsDatalist = document.getElementById("cameras-datalist");
        if (camsDatalist) {
            camsDatalist.innerHTML = "";
            cams.forEach(c => {
                const opt = document.createElement("option");
                opt.value = c.index.toString();
                opt.textContent = c.name;
                camsDatalist.appendChild(opt);
            });
        }
        if (showInConsole) {
            logSystemMessage(t("Các Camera USB khả dụng:"));
            cams.forEach(c => {
                logSystemMessage(`  • Cam ${c.index} - ${c.name}`);
            });
        }
    } catch (e) {
        console.error(t("Lấy danh sách camera khả dụng thất bại:"), e);
        if (showInConsole) logSystemMessage(t("Lỗi quét camera: {error}", { error: e }));
    }
}

// Fetch current state on page load
async function fetchState() {
    try {
        const res = await fetch("/api/state");
        const data = await res.json();
        updateUIState(data);
    } catch (e) {
        logSystemMessage(t("Lấy trạng thái ban đầu từ máy chủ thất bại."));
    }
}

// Update UI elements based on API status
function updateUIState(data) {
    lastUIState = data;
    isConnected = data.connected;

    // Connection badge
    if (isConnected) {
        connStatus.innerText = t("ĐÃ KẾT NỐI");
        connStatus.className = "status-badge connected";
        connectBtn.innerText = t("Ngắt Kết Nối");
        connectBtn.className = "btn btn-danger";
        portInput.disabled = true;
        baudrateInput.disabled = true;
        portWarning.classList.add("hidden");
    } else {
        connStatus.innerText = t("MẤT KẾT NỐI");
        connStatus.className = "status-badge disconnected";
        connectBtn.innerText = t("Kết Nối");
        connectBtn.className = "btn btn-primary";
        portInput.disabled = false;
        baudrateInput.disabled = false;

        if (data.port_owner) {
            portWarningText.innerHTML = t("Cổng <strong>{port}</strong> đang bận. Được mở bởi: <strong>{owner}</strong>. Vui lòng đóng và thử lại.", { port: data.port, owner: data.port_owner });
            portWarning.classList.remove("hidden");
        } else {
            portWarning.classList.add("hidden");
        }
    }

    // Machine State
    machineState.innerText = data.machine_state ? t(data.machine_state) : t("NGOẠI TUYẾN");
    machineState.className = "state-badge " + (data.machine_state ? data.machine_state.toLowerCase() : "disconnected");

    // Coordinates (DRO)
    if (data.wpos) {
        currentWPos.x = data.wpos[0];
        currentWPos.y = data.wpos[1];
        currentWPos.z = data.wpos[2];
        valX.innerText = currentWPos.x.toFixed(3);
        valY.innerText = currentWPos.y.toFixed(3);
        valZ.innerText = currentWPos.z.toFixed(3);

        const chkAutoTrackPen = document.getElementById("chk-auto-track-pen");
        if (chkAutoTrackPen && chkAutoTrackPen.checked) {
            const gestureStartX = document.getElementById("gesture-start-x");
            const gestureStartY = document.getElementById("gesture-start-y");
            if (gestureStartX) gestureStartX.value = currentWPos.x.toFixed(1);
            if (gestureStartY) gestureStartY.value = currentWPos.y.toFixed(1);
        }
    }

    // Feed / Spindle
    telFeedrate.innerText = Math.round(data.feedrate || 0);
    currentSpindleSpeed = Math.round(data.spindle_speed || 0);
    if (!isJoggingSpindle) {
        targetSpindleSpeed = currentSpindleSpeed;
    }
    telSpindle.innerText = currentSpindleSpeed;

    // Streaming
    if (data.is_streaming) {
        progressContainer.classList.remove("hidden");
        const pct = ((data.gcode_index / data.gcode_total) * 100) || 0;
        progressPercentage.innerText = Math.round(pct) + "%";
        progressFraction.innerText = t("{index} / {total} dòng", { index: data.gcode_index, total: data.gcode_total });
        streamProgressBar.style.width = pct + "%";

        btnStartStream.disabled = true;
        btnPauseStream.disabled = false;
        btnAbortStream.disabled = false;

        if (data.is_paused) {
            btnPauseStream.innerText = t("Tiếp Tục");
            btnPauseStream.className = "btn btn-success";
        } else {
            btnPauseStream.innerText = t("Tạm Dừng");
            btnPauseStream.className = "btn btn-warning";
        }
    } else {
        progressContainer.classList.add("hidden");
        btnStartStream.disabled = toolpathPoints.length === 0 || !isConnected;
        btnPauseStream.disabled = true;
        btnAbortStream.disabled = true;
    }

    // Redraw Canvas with new tool position
    drawToolpath();
    if (typeof window.updateScenarioButtonsState === 'function') {
        window.updateScenarioButtonsState();
    }
}

// --- WEBSOCKETS LOGIC ---
function initWebSocket() {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    logSystemMessage(t("Đang thiết lập kết nối tới bộ điều khiển..."));
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
        logSystemMessage(t("Kênh truyền telemetry WebSocket hoạt động."));
        connectionAttempts = 0;
    };

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        handleWSMessage(msg);
    };

    ws.onclose = () => {
        logSystemMessage(t("Kênh telemetry WebSocket bị đóng. Đang kết nối lại sau 3 giây..."));
        setTimeout(initWebSocket, 3000);
    };

    ws.onerror = (err) => {
        console.error(t("Lỗi WS:"), err);
    };
}

function handleWSMessage(msg) {
    switch (msg.type) {
        case "init":
            isConnected = msg.connected;
            portInput.value = msg.port;
            baudrateInput.value = msg.baudrate;
            break;

        case "connection":
            isConnected = msg.connected;
            updateConnectionUI();
            logSystemMessage(msg.message);
            fetchState(); // sync state fields
            break;

        case "telemetry":
            updateTelemetry(msg);
            break;

        case "log":
            appendConsoleLog(msg.direction, msg.content);
            break;

        case "stream_status":
            handleStreamStatus(msg);
            break;
    }
}

function updateConnectionUI() {
    if (isConnected) {
        connStatus.innerText = t("ĐÃ KẾT NỐI");
        connStatus.className = "status-badge connected";
        connectBtn.innerText = t("Ngắt Kết Nối");
        connectBtn.className = "btn btn-danger";
        portInput.disabled = true;
        baudrateInput.disabled = true;
        portWarning.classList.add("hidden");
    } else {
        connStatus.innerText = t("MẤT KẾT NỐI");
        connStatus.className = "status-badge disconnected";
        connectBtn.innerText = t("Kết Nối");
        connectBtn.className = "btn btn-primary";
        portInput.disabled = false;
        baudrateInput.disabled = false;
        btnStartStream.disabled = true;
        btnPauseStream.disabled = true;
        btnAbortStream.disabled = true;
    }
    if (typeof window.updateCalibrationUI === 'function') {
        window.updateCalibrationUI();
    }
    if (typeof window.updateHomeUI === 'function') {
        window.updateHomeUI();
    }
    if (typeof window.updateScenarioButtonsState === 'function') {
        window.updateScenarioButtonsState();
    }
}

function updateTelemetry(data) {
    lastTelemetry = data;
    machineState.innerText = t(data.state);
    machineState.className = "state-badge " + data.state.toLowerCase();

    // Toggle unlock button alarm styling (cập nhật 34)
    const btnUnlock = document.getElementById("jog-unlock");
    if (btnUnlock) {
        if (data.state === "Alarm") {
            btnUnlock.classList.add("alarm-locked");
            btnUnlock.title = t("⚠️ Máy Đang Bị Khóa! Click để Mở Khóa ($X)");
        } else {
            btnUnlock.classList.remove("alarm-locked");
            btnUnlock.title = t("Mở Khóa Máy ($X)");
        }
    }

    currentWPos.x = data.wpos[0];
    currentWPos.y = data.wpos[1];
    currentWPos.z = data.wpos[2];
    valX.innerText = currentWPos.x.toFixed(3);
    valY.innerText = currentWPos.y.toFixed(3);
    valZ.innerText = currentWPos.z.toFixed(3);

    const chkAutoTrackPen = document.getElementById("chk-auto-track-pen");
    if (chkAutoTrackPen && chkAutoTrackPen.checked) {
        const gestureStartX = document.getElementById("gesture-start-x");
        const gestureStartY = document.getElementById("gesture-start-y");
        if (gestureStartX) gestureStartX.value = currentWPos.x.toFixed(1);
        if (gestureStartY) gestureStartY.value = currentWPos.y.toFixed(1);
    }

    telFeedrate.innerText = Math.round(data.feedrate);
    currentSpindleSpeed = Math.round(data.spindle_speed);
    if (!isJoggingSpindle) {
        targetSpindleSpeed = currentSpindleSpeed;
    }
    telSpindle.innerText = currentSpindleSpeed;
    telBuffer.innerText = data.buffer_rx;

    if (data.streaming) {
        progressContainer.classList.remove("hidden");
        const pct = (data.streaming_progress * 100) || 0;
        progressPercentage.innerText = Math.round(pct) + "%";
        progressFraction.innerText = t("{index} / {total} dòng", { index: data.gcode_index, total: data.gcode_total });
        streamProgressBar.style.width = pct + "%";

        btnStartStream.disabled = true;
        btnPauseStream.disabled = false;
        btnAbortStream.disabled = false;
    } else {
        progressContainer.classList.add("hidden");
        btnStartStream.disabled = toolpathPoints.length === 0 || !isConnected;
        btnPauseStream.disabled = true;
        btnAbortStream.disabled = true;
    }

    drawToolpath();
    if (typeof window._updateSnapshotPos === 'function') {
        window._updateSnapshotPos(data);
    }
}

function handleStreamStatus(msg) {
    if (msg.status === "started") {
        logSystemMessage(t("Bắt đầu thực hiện công việc G-code."));
    } else if (msg.status === "completed") {
        logSystemMessage(t("Công việc G-code hoàn thành thành công!"));
        fetchState();
        if (scenarioLooping && typeof window.startScenarioExecution === "function") {
            logSystemMessage(t("Vòng lặp kịch bản: bắt đầu lượt tiếp theo sau 1 giây..."));
            setTimeout(() => {
                if (scenarioLooping && typeof window.startScenarioExecution === "function") {
                    window.startScenarioExecution(true);
                }
            }, 1000);
        }
    } else if (msg.status === "failed") {
        logSystemMessage(t("Thực hiện công việc G-code thất bại: {message}", { message: msg.message }));
        fetchState();
        if (scenarioLooping && typeof window.stopScenarioLoop === "function") {
            logSystemMessage(t("Vòng lặp kịch bản đã dừng do thực hiện thất bại."));
            window.stopScenarioLoop();
        }
    } else if (msg.status === "stopped") {
        logSystemMessage(t("Công việc G-code đã bị hủy bởi người dùng. Đã gửi lệnh thiết lập lại mềm bộ điều khiển."));
        fetchState();
        if (scenarioLooping && typeof window.stopScenarioLoop === "function") {
            logSystemMessage(t("Vòng lặp kịch bản đã dừng vì công việc bị hủy."));
            window.stopScenarioLoop();
        }
    }
}

// --- CONSOLE LOGGER ---
function appendConsoleLog(direction, content) {
    const line = document.createElement("div");
    line.className = `log-line ${direction}`;

    let displayContent = content;
    if (direction === "in") {
        displayContent = `<-- ${content}`;
        if (content === "ok") {
            line.classList.add("ok");
        } else if (content.includes("error") || content.includes("ALARM")) {
            line.classList.add("error");
        }
    } else {
        displayContent = `--> ${content}`;
    }

    line.innerText = displayContent;
    consoleOutput.appendChild(line);

    // Auto-scroll to bottom
    // consoleOutput.scrollTop = consoleOutput.scrollHeight;

    // Limit console buffer to 200 lines
    while (consoleOutput.childNodes.length > 200) {
        consoleOutput.removeChild(consoleOutput.firstChild);
    }
}

function logSystemMessage(msg) {
    const line = document.createElement("div");
    line.className = "log-line system";
    line.innerText = `[SYS] ${msg}`;
    consoleOutput.appendChild(line);
    // consoleOutput.scrollTop = consoleOutput.scrollHeight;
    console.log(msg);
}

// --- JOG CONTROLS & API TRIGGERS ---
async function sendCommand(cmd) {
    try {
        const formData = new FormData();
        formData.append("command", cmd);

        const res = await fetch("/api/command", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        if (data.status === "error") {
            logSystemMessage(t("Lỗi lệnh: {message}", { message: data.message }));
        }
    } catch (e) {
        logSystemMessage(t("Lỗi mạng khi gửi lệnh: {error}", { error: e }));
    }
}

function setupEventListeners() {
    // List ports button click
    const btnListPorts = document.getElementById("btn-list-ports");
    if (btnListPorts) {
        btnListPorts.addEventListener("click", (e) => {
            e.preventDefault();
            populateDevices(true);
        });
    }

    reloadAiModelBtn.addEventListener("click", async () => {
        try {
            const res = await fetch("/api/reload-ai-model", { method: "GET" });
            const data = await res.json();
            if (data.status === "error") {
                logSystemMessage(t("Lỗi tải lại mô hình AI: {message}", { message: data.message }));
            }
        } catch (e) {
            logSystemMessage(t("Lỗi mạng khi tải lại mô hình AI: {error}", { error: e }));
        }
    });

    // Port Connection
    connectBtn.addEventListener("click", async () => {
        if (isConnected) {
            // Disconnect
            try {
                connectBtn.disabled = true;
                const res = await fetch("/api/disconnect", { method: "POST" });
                const data = await res.json();
                connectBtn.disabled = false;
                if (data.status === "error") {
                    logSystemMessage(t("Lỗi ngắt kết nối: {message}", { message: data.message }));
                }
            } catch (e) {
                connectBtn.disabled = false;
                logSystemMessage(t("Lỗi mạng khi ngắt kết nối: {error}", { error: e }));
            }
        } else {
            // Connect
            try {
                connectBtn.disabled = true;
                const res = await fetch("/api/connect", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        port: portInput.value,
                        baudrate: parseInt(baudrateInput.value, 10)
                    })
                });
                const data = await res.json();
                connectBtn.disabled = false;
                if (data.status === "error") {
                    logSystemMessage(t("Lỗi kết nối: {message}", { message: data.message }));
                    portWarningText.innerHTML = data.message;
                    portWarning.classList.remove("hidden");
                } else {
                    portWarning.classList.add("hidden");
                }
            } catch (e) {
                connectBtn.disabled = false;
                logSystemMessage(t("Lỗi mạng khi kết nối: {error}", { error: e }));
            }
        }
    });

    // Console Command Input Submission
    consoleForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const cmd = consoleInput.value.trim();
        if (!cmd) return;
        if (cmd.toLowerCase() === "ls") {
            populateDevices(true);
            consoleInput.value = "";
            return;
        }
        sendCommand(cmd);
        consoleInput.value = "";
    });

    // Step Slider & Dropdown Logic
    const selectStepPreset = document.getElementById("select-step-preset");

    const updateDropdownSelection = (val) => {
        if (selectStepPreset) {
            const valNum = parseFloat(val);
            if (valNum === 0.1 || valNum === 1 || valNum === 10 || valNum === 100) {
                selectStepPreset.value = valNum.toString();
            } else {
                selectStepPreset.value = "custom";
            }
        }
    };

    sliderStep.addEventListener("input", () => {
        currentStepDistance = parseFloat(sliderStep.value) || 10.0;
        valStep.innerText = `${currentStepDistance} mm`;
        updateDropdownSelection(currentStepDistance);
        saveUIPreferencesToServer();
    });

    if (selectStepPreset) {
        selectStepPreset.addEventListener("change", () => {
            const val = selectStepPreset.value;
            if (val !== "custom") {
                currentStepDistance = parseFloat(val);
                sliderStep.value = currentStepDistance;
                valStep.innerText = `${currentStepDistance} mm`;
                saveUIPreferencesToServer();
            }
        });
    }

    // Feed Slider
    sliderFeed.addEventListener("input", () => {
        currentFeedrate = sliderFeed.value;
        valFeed.innerText = `${currentFeedrate} mm/min`;
        saveUIPreferencesToServer();
    });

    // Gesture input listeners to auto-save preferences
    const gestureFeedrateInput = document.getElementById("gesture-feedrate");
    if (gestureFeedrateInput) {
        gestureFeedrateInput.addEventListener("input", () => {
            saveUIPreferencesToServer();
        });
    }

    const gestureDistanceInput = document.getElementById("gesture-distance");
    if (gestureDistanceInput) {
        gestureDistanceInput.addEventListener("input", () => {
            saveUIPreferencesToServer();
        });
    }

    const gestureDwellInput = document.getElementById("gesture-dwell");
    if (gestureDwellInput) {
        gestureDwellInput.addEventListener("input", () => {
            saveUIPreferencesToServer();
        });
    }

    const gestureTapDwellInput = document.getElementById("gesture-tap-dwell");
    if (gestureTapDwellInput) {
        gestureTapDwellInput.addEventListener("input", () => {
            saveUIPreferencesToServer();
        });
    }

    const cameraHeightInput = document.getElementById("camera-height");
    if (cameraHeightInput) {
        cameraHeightInput.addEventListener("input", () => {
            saveUIPreferencesToServer();
        });
    }
    function jog_keyboard_register_event() {

        // Interactive Jog Keypad
        document.getElementById("jog-y-plus").addEventListener("click", () => jogAxis("Y", 1));
        document.getElementById("jog-y-minus").addEventListener("click", () => jogAxis("Y", -1));
        document.getElementById("jog-x-plus").addEventListener("click", () => jogAxis("X", 1));
        document.getElementById("jog-x-minus").addEventListener("click", () => jogAxis("X", -1));
        document.getElementById("jog-z-plus").addEventListener("click", () => jogAxis("Z", 1));
        document.getElementById("jog-z-minus").addEventListener("click", () => jogAxis("Z", -1));

        // Diagonal Jogging
        document.getElementById("jog-y-plus-x-minus").addEventListener("click", () => jogDiagonal(-1, 1));
        document.getElementById("jog-y-plus-x-plus").addEventListener("click", () => jogDiagonal(1, 1));
        document.getElementById("jog-y-minus-x-minus").addEventListener("click", () => jogDiagonal(-1, -1));
        document.getElementById("jog-y-minus-x-plus").addEventListener("click", () => jogDiagonal(1, -1));

        // Home / Unlock
        // document.getElementById("jog-home").addEventListener("click", () => sendCommand("$H"));
        document.getElementById("jog-home").addEventListener("click", () => {

            // if (btnSetHome) {
            //     btnSetHome.scrollIntoView({
            //         behavior: 'smooth',
            //         block: 'start' // Aligns the top of the element to the top of the viewport
            //     });
            // }

            // btnSetHome.click();
            btnStopToHome.click();
        });
        document.getElementById("jog-unlock").addEventListener("click", () => sendCommand("$X"));

        // Axis Zeroing
        document.getElementById("btn-zero-x").addEventListener("click", () => sendCommand("G10 L20 P1 X0"));
        document.getElementById("btn-zero-y").addEventListener("click", () => sendCommand("G10 L20 P1 Y0"));
        document.getElementById("btn-zero-z").addEventListener("click", () => sendCommand("G10 L20 P1 Z0"));
        document.getElementById("btn-zero-all").addEventListener("click", () => {
            if (confirm("Are you sure you want to ZERO all axes relative coordinates?")) {
                sendCommand("G10 L20 P1 X0 Y0 Z0");
            }
        });

    }

    // File Selection Trigger
    fileDropZone.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", handleFileSelection);

    // Drag & drop file UI visual cue
    fileDropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        fileDropZone.style.borderColor = "var(--primary)";
        fileDropZone.style.backgroundColor = "hsla(200, 100%, 50%, 0.08)";
    });

    fileDropZone.addEventListener("dragleave", () => {
        fileDropZone.style.borderColor = "var(--border-color)";
        fileDropZone.style.backgroundColor = "hsla(220, 25%, 8%, 0.2)";
    });

    fileDropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        fileDropZone.style.borderColor = "var(--border-color)";
        fileDropZone.style.backgroundColor = "hsla(220, 25%, 8%, 0.2)";
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelection();
        }
    });

    // Unload file
    btnRemoveFile.addEventListener("click", (e) => {
        e.stopPropagation();
        fileInput.value = "";
        toolpathPoints = [];
        boundingBox = { minX: 0, maxX: 0, minY: 0, maxY: 0, center: { x: 0, y: 0 }, width: 0, height: 0 };

        fileInfoContainer.classList.add("hidden");
        fileDropZone.classList.remove("hidden");
        btnStartStream.disabled = true;

        resetCanvasView();
    });

    // Stream Execution Controllers
    btnStartStream.addEventListener("click", async () => {
        const res = await fetch("/api/start", { method: "POST" });
        const data = await res.json();
        if (data.status === "error") {
            logSystemMessage(t("Lỗi khởi động luồng phát: {message}", { message: data.message }));
        }
    });

    btnPauseStream.addEventListener("click", () => {
        const text = btnPauseStream.innerText;
        if (text === t("Tạm Dừng")) {
            sendCommand("!");
        } else {
            sendCommand("~");
        }
    });

    btnAbortStream.addEventListener("click", async () => {
        if (confirm(t("CẢNH BÁO: Bạn có chắc chắn muốn HỦY công việc G-code đang chạy không?"))) {
            const res = await fetch("/api/stop", { method: "POST" });
            const data = await res.json();
            if (data.status === "error") {
                logSystemMessage(t("Lỗi hủy bỏ: {message}", { message: data.message }));
            }
        }
    });

    // --- Pen Servo Configuration Logic ---
    const updatePenLabels = () => {
        const mode = penControlMode.value;
        if (mode === "z-axis") {
            lblPenUp.innerText = t("Vị Trí NHẤC (mm)");
            lblPenDown.innerText = t("Vị Trí HẠ (mm)");
            penUpVal.step = "0.5";
            penDownVal.step = "0.5";

            // Load saved coordinates
            penUpVal.value = localStorage.getItem("cnc_pen_up_z") || "3.0";
            penDownVal.value = localStorage.getItem("cnc_pen_down_z") || "0.0";
        } else {
            lblPenUp.innerText = t("Vị Trí NHẤC PWM / Tốc độ (S)");
            lblPenDown.innerText = t("Vị Trí HẠ PWM / Tốc độ (S)");
            penUpVal.step = "5";
            penDownVal.step = "5";

            // Load saved PWM values
            penUpVal.value = localStorage.getItem("cnc_pen_up_pwm") || "30";
            penDownVal.value = localStorage.getItem("cnc_pen_down_pwm") || "90";
        }
    };

    // --- API Sync for Pen Settings ---
    const loadPenSettings = async () => {
        try {
            const res = await fetch("/api/pen_settings");
            const settings = await res.json();

            localStorage.setItem("cnc_pen_mode", settings.mode);
            localStorage.setItem("cnc_pen_up_z", settings.pen_up_z.toString());
            localStorage.setItem("cnc_pen_down_z", settings.pen_down_z.toString());
            localStorage.setItem("cnc_pen_up_pwm", settings.pen_up_pwm.toString());
            localStorage.setItem("cnc_pen_down_pwm", settings.pen_down_pwm.toString());
            localStorage.setItem("cnc_pen_dwell", settings.pen_dwell.toString());

            penControlMode.value = settings.mode;
            penDwellVal.value = settings.pen_dwell;
            updatePenLabels();
        } catch (e) {
            console.error(t("Tải cấu hình bút từ backend thất bại:"), e);
            updatePenLabels();
        }
    };

    const savePenSettingsToBackend = async () => {
        const mode = penControlMode.value;
        const settings = {
            mode: mode,
            pen_up_z: parseFloat(localStorage.getItem("cnc_pen_up_z") || "3.0"),
            pen_down_z: parseFloat(localStorage.getItem("cnc_pen_down_z") || "0.0"),
            pen_up_pwm: parseFloat(localStorage.getItem("cnc_pen_up_pwm") || "30"),
            pen_down_pwm: parseFloat(localStorage.getItem("cnc_pen_down_pwm") || "90"),
            pen_dwell: parseFloat(penDwellVal.value || "0.25")
        };

        if (mode === "z-axis") {
            settings.pen_up_z = parseFloat(penUpVal.value);
            settings.pen_down_z = parseFloat(penDownVal.value);
        } else {
            settings.pen_up_pwm = parseFloat(penUpVal.value);
            settings.pen_down_pwm = parseFloat(penDownVal.value);
        }

        try {
            await fetch("/api/pen_settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
        } catch (e) {
            console.error(t("Lưu cấu hình bút vào backend thất bại:"), e);
        }
    };

    // Load initial values from backend
    loadPenSettings();

    penControlMode.addEventListener("change", () => {
        localStorage.setItem("cnc_pen_mode", penControlMode.value);
        updatePenLabels();
        savePenSettingsToBackend();
    });

    penUpVal.addEventListener("change", () => {
        const mode = penControlMode.value;
        if (mode === "z-axis") {
            localStorage.setItem("cnc_pen_up_z", penUpVal.value);
        } else {
            localStorage.setItem("cnc_pen_up_pwm", penUpVal.value);
        }
        savePenSettingsToBackend();
    });

    penDownVal.addEventListener("change", () => {
        const mode = penControlMode.value;
        if (mode === "z-axis") {
            localStorage.setItem("cnc_pen_down_z", penDownVal.value);
        } else {
            localStorage.setItem("cnc_pen_down_pwm", penDownVal.value);
        }
        savePenSettingsToBackend();
    });

    penDwellVal.addEventListener("change", () => {
        localStorage.setItem("cnc_pen_dwell", penDwellVal.value);
        savePenSettingsToBackend();
    });

    // Pen Click Triggers
    btnPenUp.addEventListener("click", () => {
        if (!isConnected) {
            logSystemMessage(t("Không thể di chuyển bút: máy chưa kết nối."));
            return;
        }
        const mode = penControlMode.value;
        const val = penUpVal.value;
        if (mode === "z-axis") {
            logSystemMessage(t("Đang nhấc bút lên Z {value}", { value: val }));
            sendCommand(`G0 Z${val}`);
        } else {
            logSystemMessage(t("Đang nhấc bút: Spindle PWM S{value}", { value: val }));
            targetSpindleSpeed = parseFloat(val);
            sendCommand(`M3 S${val}`);
        }
    });

    btnPenDown.addEventListener("click", () => {
        if (!isConnected) {
            logSystemMessage(t("Không thể di chuyển bút: máy chưa kết nối."));
            return;
        }
        const mode = penControlMode.value;
        const val = penDownVal.value;
        if (mode === "z-axis") {
            logSystemMessage(t("Đang hạ bút xuống Z {value}", { value: val }));
            sendCommand(`G0 Z${val}`);
        } else {
            logSystemMessage(t("Đang hạ bút: Spindle PWM S{value}", { value: val }));
            targetSpindleSpeed = parseFloat(val);
            sendCommand(`M3 S${val}`);
        }
    });

    document.getElementById("btn-clear-path").addEventListener("click", resetCanvasView);

    // --- Touch & Swipe Gesture Event Listeners ---
    const chkAutoTrackPen = document.getElementById("chk-auto-track-pen");
    const gestureStartX = document.getElementById("gesture-start-x");
    const gestureStartY = document.getElementById("gesture-start-y");
    const btnSetStart = document.getElementById("btn-set-start");

    const updateAutoTrackUI = () => {
        if (chkAutoTrackPen && chkAutoTrackPen.checked) {
            if (gestureStartX) gestureStartX.disabled = true;
            if (gestureStartY) gestureStartY.disabled = true;
            if (btnSetStart) btnSetStart.disabled = true;
            if (gestureStartX) gestureStartX.value = currentWPos.x.toFixed(1);
            if (gestureStartY) gestureStartY.value = currentWPos.y.toFixed(1);
        } else {
            if (gestureStartX) gestureStartX.disabled = false;
            if (gestureStartY) gestureStartY.disabled = false;
            if (btnSetStart) btnSetStart.disabled = false;
        }
    };

    if (chkAutoTrackPen) {
        chkAutoTrackPen.addEventListener("change", updateAutoTrackUI);
        updateAutoTrackUI();
    }

    if (btnSetStart) {
        btnSetStart.addEventListener("click", () => {
            if (gestureStartX) gestureStartX.value = currentWPos.x.toFixed(1);
            if (gestureStartY) gestureStartY.value = currentWPos.y.toFixed(1);
        });
    }
    document.getElementById("btn-set-end").addEventListener("click", () => {
        document.getElementById("gesture-end-x").value = currentWPos.x.toFixed(1);
        document.getElementById("gesture-end-y").value = currentWPos.y.toFixed(1);
    });

    document.getElementById("btn-gesture-tap").addEventListener("click", () => executeGesture("tap"));
    document.getElementById("btn-gesture-doubletap").addEventListener("click", () => executeGesture("doubletap"));
    document.getElementById("btn-gesture-longpress").addEventListener("click", () => executeGesture("longpress"));
    document.getElementById("btn-gesture-swipe-up").addEventListener("click", () => executeGesture("swipe-up"));
    document.getElementById("btn-gesture-swipe-down").addEventListener("click", () => executeGesture("swipe-down"));
    document.getElementById("btn-gesture-swipe-left").addEventListener("click", () => executeGesture("swipe-left"));
    document.getElementById("btn-gesture-swipe-right").addEventListener("click", () => executeGesture("swipe-right"));
    document.getElementById("btn-gesture-swipe-custom").addEventListener("click", () => executeGesture("swipe-custom"));

    // --- Collapsible Floating Camera Panel Logic ---
    const cameraFloatingPanel = document.getElementById("camera-floating-panel");
    const btnCameraToggle = document.getElementById("btn-camera-toggle");
    const cameraPanelHeader = document.getElementById("camera-panel-header");
    const cameraSelect = document.getElementById("camera-select");
    const cameraStreamImg = document.getElementById("camera-stream-img");
    const cameraStatusText = document.getElementById("camera-status-text");
    const cameraActiveDot = document.getElementById("camera-active-dot");
    const btnCameraExpand = document.getElementById("btn-camera-expand");
    const chkDetectObjects = document.getElementById("chk-detect-objects");
    const btnDetectMove = document.getElementById("btn-detect-move");
    let isCameraFullscreen = false;

    // Left Scenario Sidebar logic (cập nhật 41)
    const btnToggleScenarioSidebar = document.getElementById("btn-toggle-scenario-sidebar");
    const isSidebarCollapsed = localStorage.getItem("cnc_scenario_sidebar_collapsed") === "true";
    if (isSidebarCollapsed && cameraFloatingPanel) {
        cameraFloatingPanel.classList.add("sidebar-collapsed");
    }
    if (btnToggleScenarioSidebar) {
        btnToggleScenarioSidebar.addEventListener("click", (e) => {
            e.stopPropagation();
            if (cameraFloatingPanel) {
                cameraFloatingPanel.classList.toggle("sidebar-collapsed");
                const currentlyCollapsed = cameraFloatingPanel.classList.contains("sidebar-collapsed");
                localStorage.setItem("cnc_scenario_sidebar_collapsed", currentlyCollapsed.toString());
            }
        });
    }

    // Load saved preferences
    const savedCameraIndex = localStorage.getItem("cnc_camera_index");
    if (savedCameraIndex) {
        cameraSelect.value = savedCameraIndex;
    }

    let isCameraCollapsed = localStorage.getItem("cnc_camera_collapsed") !== "false"; // Default to collapsed: true

    const updateCameraStream = () => {
        const camIndex = cameraSelect.value;
        cameraStreamImg.src = `/api/video_feed?index=${camIndex}`;
        cameraStreamImg.width = 720;
        cameraStreamImg.height = 720;
        cameraStatusText.innerText = t("Đã kết nối: Camera {index}", { index: camIndex });
        cameraActiveDot.classList.add("active");
        logSystemMessage(t("Đã bắt đầu luồng truyền hình ảnh camera trực tiếp (Chỉ số Cam {index})", { index: camIndex }));
    };

    const stopCameraStream = () => {
        cameraStreamImg.src = "";
        cameraStatusText.innerText = t("Camera Ngoại Tuyến");
        cameraActiveDot.classList.remove("active");
        const container = document.getElementById("detected-labels-container");
        if (container) container.innerHTML = "";
        logSystemMessage(t("Luồng truyền hình ảnh camera đã dừng"));
    };

    const toggleCameraCollapse = () => {
        isCameraCollapsed = !isCameraCollapsed;
        localStorage.setItem("cnc_camera_collapsed", isCameraCollapsed.toString());
        applyCameraState();
    };

    const applyCameraState = () => {
        if (isCameraCollapsed) {
            cameraFloatingPanel.classList.add("collapsed");
            cameraFloatingPanel.style.removeProperty("width");
            cameraFloatingPanel.style.removeProperty("height");
            stopCameraStream();
            if (typeof window.stopCalibrationPolling === 'function') window.stopCalibrationPolling();
        } else {
            cameraFloatingPanel.classList.remove("collapsed");

            // Restore saved size
            // const savedWidth = localStorage.getItem("cnc_camera_width");
            // const savedHeight = localStorage.getItem("cnc_camera_height");
            const savedWidth = 720;
            const savedHeight = 720;
            if (savedWidth && savedHeight) {
                cameraFloatingPanel.style.width = (savedWidth + 450) + "px";
                cameraFloatingPanel.style.height = (savedHeight + 0) + "px";
            } else {
                cameraFloatingPanel.style.removeProperty("width");
                cameraFloatingPanel.style.removeProperty("height");
            }

            updateCameraStream();
            if (typeof window.startCalibrationPolling === 'function') window.startCalibrationPolling();
        }
    };

    // Toggle collapse on clicking header or toggle button
    btnCameraToggle.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent header click trigger
        toggleCameraCollapse();
    });

    // Toggle fullscreen camera view (cập nhật 3)
    if (btnCameraExpand) {
        btnCameraExpand.addEventListener("click", (e) => {
            e.stopPropagation();
            if (isCameraCollapsed) {
                isCameraCollapsed = false;
                localStorage.setItem("cnc_camera_collapsed", "false");
                applyCameraState();
            }
            isCameraFullscreen = !isCameraFullscreen;
            if (isCameraFullscreen) {
                cameraFloatingPanel.classList.add("fullscreen");
                btnCameraExpand.querySelector(".expand-icon").innerText = "❐";
                btnCameraExpand.title = t("Khôi phục bảng điều khiển Camera");
            } else {
                cameraFloatingPanel.classList.remove("fullscreen");
                btnCameraExpand.querySelector(".expand-icon").innerText = "⛶";
                btnCameraExpand.title = t("Mở rộng toàn màn hình");
            }
        });
    }

    cameraPanelHeader.addEventListener("click", (e) => {
        // Only toggle collapse if user didn't click inside panel actions (e.g. the select dropdown)
        if (!e.target.closest(".panel-actions")) {
            // Restore window if collapsed
            if (isCameraFullscreen) {
                isCameraFullscreen = false;
                cameraFloatingPanel.classList.remove("fullscreen");
                if (btnCameraExpand) {
                    btnCameraExpand.querySelector(".expand-icon").innerText = "⛶";
                    btnCameraExpand.title = t("Mở rộng toàn màn hình");
                }
            }
            toggleCameraCollapse();
        }
    });

    const handleCameraChange = () => {
        const val = cameraSelect.value.trim();
        if (val === "") return;
        localStorage.setItem("cnc_camera_index", val);
        if (!isCameraCollapsed) {
            updateCameraStream();
        }
    };
    cameraSelect.addEventListener("change", handleCameraChange);
    cameraSelect.addEventListener("input", handleCameraChange);

    const btnListCameras = document.getElementById("btn-list-cameras");
    if (btnListCameras) {
        btnListCameras.addEventListener("click", (e) => {
            e.preventDefault();
            populateDevices(true);
        });
    }

    // --- Camera Capture & Download (cập nhật 14) ---
    const btnCapture1280 = document.getElementById("btn-capture-1280");
    const btnCapture720 = document.getElementById("btn-capture-720");

    const triggerCaptureDownload = (mode) => {
        if (isCameraCollapsed) {
            logSystemMessage(t("⚠️ Không thể chụp ảnh: luồng camera ngoại tuyến. Vui lòng mở bảng điều khiển camera."));
            return;
        }
        const camIdx = cameraSelect ? cameraSelect.value : 4;

        if (mode === "1280") {
            logSystemMessage(t("📸 Đang tải xuống ảnh chụp khung hình gốc 1280x720 JPEG..."));
            const link = document.createElement("a");
            link.href = `/api/capture/download?mode=1280&camera_index=${camIdx}`;
            link.download = `capture_1280_${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (mode === "720") {
            logSystemMessage(t("📸 Đang tải xuống các ảnh chụp gốc & cắt gọn 720x720 JPEG..."));

            // // Raw frame download
            // const linkRaw = document.createElement("a");
            // linkRaw.href = `/api/capture/download?mode=720_raw&camera_index=${camIdx}`;
            // linkRaw.download = `capture_raw_${Date.now()}.jpg`;
            // document.body.appendChild(linkRaw);
            // linkRaw.click();
            // document.body.removeChild(linkRaw);

            // Cropped frame download (with a tiny delay to ensure both downloads can start)

            const linkCrop = document.createElement("a");
            linkCrop.href = `/api/capture/download?mode=720_cropped&camera_index=${camIdx}`;
            linkCrop.download = `capture_cropped_${Date.now()}.jpg`;
            document.body.appendChild(linkCrop);
            linkCrop.click();
            document.body.removeChild(linkCrop);

            // setTimeout(() => {
            // }, 300);
        }
    };

    if (btnCapture1280) {
        btnCapture1280.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            triggerCaptureDownload("1280");
        });
    }

    if (btnCapture720) {
        btnCapture720.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            triggerCaptureDownload("720");
        });
    }

    // Object Detection controls (cập nhật 3)
    if (chkDetectObjects) {
        chkDetectObjects.addEventListener("change", async () => {
            try {
                const res = await fetch("/api/detection/toggle", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ detect_objects: chkDetectObjects.checked })
                });
                const data = await res.json();
                if (data.status === "ok") {
                    logSystemMessage(t("Lớp phủ nhận diện vật thể đã {status}.", { status: chkDetectObjects.checked ? t("bật") : t("tắt") }));
                }
            } catch (e) {
                logSystemMessage(t("Bật/tắt nhận diện vật thể thất bại: {error}", { error: e }));
            }
        });
    }

    if (btnDetectMove) {
        btnDetectMove.addEventListener("click", async () => {
            if (!isConnected) return;
            try {
                btnDetectMove.disabled = true;
                btnDetectMove.innerText = t("⏳ Đang căn chỉnh...");
                logSystemMessage(t("Đang chạy nhận diện YOLO & di chuyển tới tâm vật thể lớn nhất..."));

                const camIdx = cameraSelect ? cameraSelect.value : 4;
                const res = await fetch(`/api/detection/move_to_largest?camera_index=${camIdx}`, {
                    method: "POST"
                });
                const data = await res.json();
                btnDetectMove.disabled = false;
                btnDetectMove.innerText = t("Đến Vật Thể Lớn Nhất");

                if (data.status === "ok") {
                    logSystemMessage(`✅ ${data.message}`);
                } else {
                    logSystemMessage(t("❌ Nhận diện/Di chuyển thất bại: {message}", { message: data.message }));
                }
            } catch (e) {
                btnDetectMove.disabled = false;
                btnDetectMove.innerText = t("Đến Vật Thể Lớn Nhất");
                logSystemMessage(t("❌ Lỗi mạng khi căn chỉnh: {error}", { error: e }));
            }
        });
    }
    function isPointInPolygon(cx, cy, points) {
        // Sắp xếp các điểm theo thứ tự vòng tròn (TL -> TR -> BR -> BL)
        const polygon = [
            points.TL,
            points.TR,
            points.BR,
            points.BL
        ];

        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i][0], yi = polygon[i][1];
            const xj = polygon[j][0], yj = polygon[j][1];

            // Thuật toán bắn tia Ray-casting
            const intersect = ((yi > cy) !== (yj > cy))
                && (cx < (xj - xi) * (cy - yi) / (yj - yi) + xi);

            if (intersect) inside = !inside;
        }

        return inside;
    }
    // Camera stream click to move (cập nhật 5)
    cameraStreamImg.addEventListener("click", async (e) => {
        if (!isConnected) {
            logSystemMessage(t("Không thể di chuyển: máy chưa kết nối."));
            return;
        }

        const rect = cameraStreamImg.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // Scale to 720x720 coordinate space (cập nhật 11)
        const cx = (clickX / rect.width) * 720.0;
        const cy = (clickY / rect.height) * 720.0;

        if (window.isWaitingForTouchPenClick) {
            window.isWaitingForTouchPenClick = false;
            await handleSetTouchPenClick(cx, cy);
            return;
        }

        if (!isCalibrated) {
            logSystemMessage(t("Không thể click để di chuyển: chưa hoàn thành căn chỉnh."));
            return;
        }

        // arucoStandardPoints
        const insideStrict = isPointInPolygon(cx, cy, arucoStandardPoints);
        if (!insideStrict) {
            alert("Điểm Không nằm trong tứ giác ArUco: " + JSON.stringify(arucoStandardPoints));
            return;
        }

        // Spawn visual ripple ring
        const parentRect = cameraStreamImg.parentElement.getBoundingClientRect();
        const parentClickX = e.clientX - parentRect.left;
        const parentClickY = e.clientY - parentRect.top;

        const ripple = document.createElement("div");
        ripple.className = "click-indicator-ring";
        ripple.style.left = `${parentClickX}px`;
        ripple.style.top = `${parentClickY}px`;
        cameraStreamImg.parentElement.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        logSystemMessage(t("Đã click trên khung hình camera tại pixel: ({x}, {y}). Đang gửi lệnh di chuyển...", { x: cx.toFixed(1), y: cy.toFixed(1) }));

        try {
            const camIdx = cameraSelect ? cameraSelect.value : 4;
            const res = await fetch("/api/detection/click_go", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ x: cx, y: cy, camera_index: parseInt(camIdx) || 4 })
            });
            const data = await res.json();
            if (data.status === "ok") {
                logSystemMessage(`✅ ${data.message}`);
            } else {
                logSystemMessage(t("❌ Di chuyển bằng click thất bại: {message}", { message: data.message }));
            }
        } catch (err) {
            logSystemMessage(t("❌ Lỗi mạng khi di chuyển bằng click: {error}", { error: err }));
        }
    });

    async function handleCornerArucoClick(corner, px, py) {

        logSystemMessage(t("Đang đặt điểm góc thủ công {id} tại pixel ({x}, {y})...", { id: corner.id, x: px.toFixed(1), y: py.toFixed(1) }));

        try {
            const res = await fetch("/api/calibration/set_manual_corner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ corner: corner.id, x: px, y: py })
            });

            const data = await res.json();

            if (data.status === "ok") {
                logSystemMessage(t("📐 Đặt {id} thành công!", { id: corner.id }));
                fetchCalibrationConfig(); // Đảm bảo hàm này tồn tại trong phạm vi (scope) của bạn
            } else {
                logSystemMessage(t("❌ Đặt điểm góc thủ công thất bại: {message}", { message: data.message }));
            }
        } catch (err) {
            logSystemMessage(t("❌ Lỗi mạng khi căn chỉnh điểm góc thủ công: {error}", { error: err }));
        }
    }

    async function handleSetTouchPenClick(px, py) {
        logSystemMessage(t("Đang đặt vị trí bút touch tại pixel ({x}, {y})...", { x: px.toFixed(1), y: py.toFixed(1) }));
        try {
            const res = await fetch("/api/calibration/set_touch_pen", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ x: px, y: py })
            });
            const data = await res.json();
            if (data.status === "ok") {
                logSystemMessage(t("🖊️ Đặt vị trí bút touch thành công!"));
                fetchCalibrationConfig();
            } else {
                logSystemMessage(t("❌ Đặt vị trí bút touch thất bại: {message}", { message: data.message }));
            }
        } catch (err) {
            logSystemMessage(t("❌ Lỗi mạng khi đặt vị trí bút touch: {error}", { error: err }));
        }
    }

    // Camera stream right-click to manually set ArUco corners (cập nhật 13)
    cameraStreamImg.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        // Remove existing context menu if any
        const existing = document.getElementById("camera-context-menu");
        if (existing) existing.remove();

        const rect = cameraStreamImg.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // Scale to 720x720 coordinate space
        const px = (clickX / rect.width) * 720.0;
        const py = (clickY / rect.height) * 720.0;

        if (scenarioIsCreating && activeScenario) {
            if (typeof showScenarioContextMenu === "function") {
                showScenarioContextMenu(e, px, py);
            }
            return;
        }

        // Create context menu element
        const menu = document.createElement("div");
        menu.id = "camera-context-menu";
        menu.className = "camera-context-menu";
        menu.style.left = `${e.clientX + window.scrollX}px`;
        menu.style.top = `${e.clientY + window.scrollY - 70}px`;

        const corners = [
            { id: "TL", label: "📐 Đặt Trên - Trái (TL)" },
            { id: "TR", label: "📐 Đặt Trên - Phải (TR)" },
            { id: "BL", label: "📐 Đặt Dưới - Trái (BL)" },
            { id: "BR", label: "📐 Đặt Dưới - Phải (BR)" },
            { id: "TOUCH_PEN", label: "🖊️ Đặt Vị Trí Bút Touch" }
        ];

        corners.forEach(corner => {
            const item = document.createElement("div");
            item.className = "context-menu-item";
            item.innerText = t(corner.label);
            item.addEventListener("click", async () => {
                menu.remove();
                if (corner.id === "TOUCH_PEN") {
                    await handleSetTouchPenClick(px, py);
                } else {
                    await handleCornerArucoClick(corner, px, py);
                }
                // logSystemMessage(`Setting manual corner ${corner.id} at pixel (${px.toFixed(1)}, ${py.toFixed(1)})...`);
                // try {
                //     const res = await fetch("/api/calibration/set_manual_corner", {
                //         method: "POST",
                //         headers: { "Content-Type": "application/json" },
                //         body: JSON.stringify({ corner: corner.id, x: px, y: py })
                //     });
                //     const data = await res.json();
                //     if (data.status === "ok") {
                //         logSystemMessage(`📐 Set ${corner.id} successfully!`);
                //         fetchCalibrationConfig();
                //     } else {
                //         logSystemMessage(`❌ Failed to set manual corner: ${data.message}`);
                //     }
                // } catch (err) {
                //     logSystemMessage(`❌ Network error during manual corner calibration: ${err}`);
                // }
            });
            menu.appendChild(item);
        });

        document.body.appendChild(menu);

        // Click outside to dismiss context menu
        const dismissMenu = (event) => {
            if (!menu.contains(event.target)) {
                menu.remove();
                document.removeEventListener("click", dismissMenu);
            }
        };
        setTimeout(() => {
            document.addEventListener("click", dismissMenu);
        }, 10);
    });

    // --- Calibration Control Logic ---
    const chkShowOverlay = document.getElementById("chk-show-overlay");
    const badgeTL = document.getElementById("badge-tl");
    const badgeTR = document.getElementById("badge-tr");
    const badgeBR = document.getElementById("badge-br");
    const badgeBL = document.getElementById("badge-bl");

    const btnCalTL = document.getElementById("btn-cal-tl");
    const btnCalTR = document.getElementById("btn-cal-tr");
    const btnCalBR = document.getElementById("btn-cal-br");
    const btnCalBL = document.getElementById("btn-cal-bl");
    const btnCalClear = document.getElementById("btn-cal-clear");
    const btnResetAruco = document.getElementById("btn-reset-aruco");
    const btnMoveToCenter = document.getElementById("btn-move-to-center");
    const btnStopToHome = document.getElementById("btn-stop-to-home");



    let calibrationInterval = null;
    let calibratedPoints = {};
    let arucoStandardPoints = {};
    let cncPoints = {};
    let isCalibrated = false;
    let isHomeSet = false;
    yoloDetected = false;
    let hasLastObject = false;  // cập nhật 5: keeps true after first detection
    lastObjectInfo = null;  // cập nhật 5: stores last largest object data
    let movingAroundRunning = false;
    let isAbortingMovingAround = false;

    // cập nhật 5: UI refs for detection status
    const detectStatusDot = document.getElementById("detect-status-dot");
    const detectStatusText = document.getElementById("detect-status-text");
    const lastObjectInfoPanel = document.getElementById("last-object-info");
    const lastObjPixel = document.getElementById("last-obj-pixel");
    const lastObjMachine = document.getElementById("last-obj-machine");

    const updateDetectionStatusUI = (detected, objectInfo, calibMatrix) => {
        if (detectStatusDot && detectStatusText) {
            if (detected) {
                detectStatusDot.classList.add("active");
                detectStatusText.textContent = t("✅ Phát hiện vật thể (trực tiếp)");
            } else if (hasLastObject) {
                detectStatusDot.classList.remove("active");
                detectStatusDot.classList.add("stale");
                detectStatusText.textContent = t("📋 Sử dụng vị trí cuối cùng đã biết");
            } else {
                detectStatusDot.classList.remove("active");
                detectStatusDot.classList.remove("stale");
                detectStatusText.textContent = t("Không phát hiện vật thể");
            }
        }

        if (lastObjectInfoPanel && lastObjPixel && lastObjMachine) {
            if (objectInfo) {
                lastObjectInfoPanel.classList.remove("hidden");
                const cx = objectInfo.center ? objectInfo.center[0].toFixed(1) : "?";
                const cy = objectInfo.center ? objectInfo.center[1].toFixed(1) : "?";
                lastObjPixel.textContent = `(${cx}, ${cy})`;

                // Convert to machine coords if calibration matrix available
                if (calibMatrix && objectInfo.center) {
                    try {
                        const M = calibMatrix;
                        const px = objectInfo.center[0];
                        const py = objectInfo.center[1];
                        const denom = M.length > 2 ? (M[2][0] * px + M[2][1] * py + M[2][2]) : 1.0;
                        const wx = (M[0][0] * px + M[0][1] * py + M[0][2]) / (denom || 1.0);
                        const wy = (M[1][0] * px + M[1][1] * py + M[1][2]) / (denom || 1.0);
                        lastObjMachine.textContent = `X=${wx.toFixed(3)}, Y=${wy.toFixed(3)}`;
                    } catch (e) {
                        lastObjMachine.textContent = "—";
                    }
                } else {
                    lastObjMachine.textContent = calibMatrix ? "—" : t("(cần căn chỉnh)");
                }
            } else {
                lastObjectInfoPanel.classList.add("hidden");
            }
        }
    };

    const updateDetectedLabelsUI = (detections) => {
        window.lastDetections = detections;
        const container = document.getElementById("detected-labels-container");
        if (!container) return;

        container.innerHTML = "";
        if (!detections || detections.length === 0) return;

        // Filter out cnchead as we don't want to click to move to the CNC head itself
        const targets = detections.filter(d => d.class_name !== "cnchead");

        targets.forEach(obj => {
            const btn = document.createElement("button");
            btn.className = "detected-label-btn";
            
            // Translate the class_name if there is a translation mapping
            const labelName = t(obj.class_name);
            const labelText = `${labelName} (${(obj.confidence * 100).toFixed(0)}%)`;
            btn.textContent = labelText;
            btn.title = t("Click để di chuyển đầu CNC tới vật thể {label}", {label: labelName});
            
            btn.addEventListener("click", () => {
                moveCNCHeadToObject(obj);
            });
            container.appendChild(btn);
        });
    };

    const moveCNCHeadToObject = async (obj) => {
        if (!isConnected) return;
        try {
            const labelName = t(obj.class_name);
            logSystemMessage(t("Đang di chuyển đầu CNC tới vật thể {label}...", {label: labelName}));
            const camIdx = cameraSelect ? cameraSelect.value : 4;
            const res = await fetch("/api/detection/move_to_object", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    class_id: obj.class_id,
                    center: obj.center,
                    bbox: obj.bbox,
                    camera_index: parseInt(camIdx)
                })
            });
            const data = await res.json();
            if (data.status === "ok") {
                logSystemMessage(`✅ ${data.message}`);
            } else {
                logSystemMessage(t("Di chuyển tới vật thể thất bại: {error}", {error: data.message}));
            }
        } catch (e) {
            logSystemMessage(t("Lỗi mạng khi di chuyển tới vật thể: {error}", {error: e.message || e}));
        }
    };

    window.updateCalibrationUI = () => {
        const badges = { TL: badgeTL, TR: badgeTR, BR: badgeBR, BL: badgeBL };
        for (const [key, badge] of Object.entries(badges)) {
            if (badge) {
                const hasAruco = arucoStandardPoints[key] !== undefined;
                const hasCnc = cncPoints[key] !== undefined;

                badge.classList.remove("calibrated", "detected");
                if (hasAruco && hasCnc) {
                    badge.classList.add("calibrated");
                } else if (hasAruco) {
                    badge.classList.add("detected");
                }
            }
        }
        const cncButtons = {
            TL: document.getElementById("btn-set-cnc-tl"),
            TR: document.getElementById("btn-set-cnc-tr"),
            BR: document.getElementById("btn-set-cnc-br"),
            BL: document.getElementById("btn-set-cnc-bl")
        };
        for (const [key, btn] of Object.entries(cncButtons)) {
            if (btn) {
                btn.disabled = !isConnected;
            }
        }
        const btnSetTouchPen = document.getElementById("btn-set-touch-pen");
        if (btnSetTouchPen) {
            btnSetTouchPen.disabled = !isConnected || !isHomeSet;
        }
        if (btnMoveToCenter) {
            btnMoveToCenter.disabled = !isCalibrated || !isHomeSet || !isConnected || isAbortingMovingAround;
        }
        if (btnDetectMove) {
            // Enable when connected, home is set, and we have a saved last object position (cập nhật 7)
            btnDetectMove.disabled = !isConnected || !isHomeSet || !hasLastObject;
        }
    };

    const fetchCalibrationConfig = async () => {
        try {
            const res = await fetch("/api/calibration/config");
            const data = await res.json();
            calibratedPoints = data.points || {};
            arucoStandardPoints = data.aruco_standard_points || {};
            cncPoints = data.cnc_points || {};
            isCalibrated = data.calibrated || false;
            if (chkShowOverlay) {
                chkShowOverlay.checked = data.draw_overlay !== false;
            }
            window.updateCalibrationUI();
        } catch (e) {
            console.error(t("Lấy cấu hình căn chỉnh thất bại:"), e);
        }
    };

    const pollCalibrationStatus = async () => {
        if (isCameraCollapsed) return;

        try {
            const res = await fetch("/api/calibration/status");
            const data = await res.json();
            const detected = data.detected || [];

            const badges = { TL: badgeTL, TR: badgeTR, BR: badgeBR, BL: badgeBL };
            const buttons = { TL: btnCalTL, TR: btnCalTR, BR: btnCalBR, BL: btnCalBL };

            for (const [key, badge] of Object.entries(badges)) {
                if (badge) {
                    if (detected.includes(key)) {
                        badge.classList.add("detected");
                    } else {
                        badge.classList.remove("detected");
                    }
                }
            }

            for (const [key, btn] of Object.entries(buttons)) {
                if (btn) {
                    btn.disabled = !detected.includes(key) || !isConnected;
                }
            }

            const btnSetAruco = document.getElementById("btn-set-aruco");
            if (btnSetAruco) {
                btnSetAruco.disabled = detected.length !== 4 || !isConnected;
            }

            yoloDetected = data.yolo_detected || false;
            // cập nhật 5: hasLastObject stays true once an object has been detected
            if (data.has_last_object) hasLastObject = true;
            if (data.last_object) lastObjectInfo = data.last_object;

            // Dynamically sync isCalibrated and isHomeSet status from backend
            latestCalibrationMatrix = data.calibration_matrix;
            isCalibrated = data.calibration_matrix !== null;
            isHomeSet = data.home_set || false;

            if (activeScenario && !previewIntervalId) {
                if (typeof drawScenarioOnCamera === "function") {
                    drawScenarioOnCamera();
                }
            }

            arucoStandardPoints = data.aruco_standard_points || {};
            cncPoints = data.cnc_points || {};

            // Sync moving around status
            movingAroundRunning = data.moving_around_running || false;
            if (btnMoveToCenter && !isAbortingMovingAround) {
                if (movingAroundRunning) {
                    btnMoveToCenter.textContent = t("Đang di chuyển vòng quanh");
                } else {
                    btnMoveToCenter.textContent = t("Di chuyển vòng quanh");
                }
            }

            window.updateCalibrationUI();
            if (window.updateHomeUI) window.updateHomeUI();

            // Update detection status UI
            updateDetectionStatusUI(yoloDetected, lastObjectInfo, isCalibrated ? data.calibration_matrix : null);
            updateDetectedLabelsUI(data.yolo_detections);

            if (btnDetectMove) {
                // Button enabled when connected, home is set, and have a cached last object (cập nhật 7)
                btnDetectMove.disabled = !isConnected || !isHomeSet || !hasLastObject;
            }
        } catch (e) {
            console.error(t("Kiểm tra trạng thái căn chỉnh thất bại:"), e);
        }
    };

    window.startCalibrationPolling = () => {
        if (calibrationInterval) clearInterval(calibrationInterval);
        pollCalibrationStatus();
        calibrationInterval = setInterval(pollCalibrationStatus, 1000);
    };

    window.stopCalibrationPolling = () => {
        if (calibrationInterval) {
            clearInterval(calibrationInterval);
            calibrationInterval = null;
        }
    };

    const setupCalibrationEvents = () => {
        if (chkShowOverlay) {
            chkShowOverlay.addEventListener("change", async () => {
                try {
                    await fetch("/api/calibration/toggle_overlay", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ draw_overlay: chkShowOverlay.checked })
                    });
                } catch (e) {
                    logSystemMessage(t("Bật/tắt lớp phủ thất bại: {error}", { error: e }));
                }
            });
        }

        // const recordCorner = async (corner) => {
        //     try {
        //         const res = await fetch("/api/calibration/record", {
        //             method: "POST",
        //             headers: { "Content-Type": "application/json" },
        //             body: JSON.stringify({ corner: corner })
        //         });
        //         const data = await res.json();
        //         if (data.status === "ok") {
        //             calibratedPoints = data.config;
        //             isCalibrated = data.calibrated;
        //             window.updateCalibrationUI();
        //             logSystemMessage(`Calibrated ${corner} successfully!`);
        //         } else {
        //             logSystemMessage(`Calibration failed: ${data.message}`);
        //         }
        //     } catch (e) {
        //         logSystemMessage(`Network error during calibration: ${e}`);
        //     }
        // };

        // if (btnCalTL) btnCalTL.addEventListener("click", () => recordCorner("TL"));
        // if (btnCalTR) btnCalTR.addEventListener("click", () => recordCorner("TR"));
        // if (btnCalBR) btnCalBR.addEventListener("click", () => recordCorner("BR"));
        // if (btnCalBL) btnCalBL.addEventListener("click", () => recordCorner("BL"));
        if (btnCalTL) btnCalTL.addEventListener("click", () => { });
        if (btnCalTR) btnCalTR.addEventListener("click", () => { });
        if (btnCalBR) btnCalBR.addEventListener("click", () => { });
        if (btnCalBL) btnCalBL.addEventListener("click", () => { });

        // CNC mapping button click listeners
        const btnSetCncTL = document.getElementById("btn-set-cnc-tl");
        const btnSetCncTR = document.getElementById("btn-set-cnc-tr");
        const btnSetCncBR = document.getElementById("btn-set-cnc-br");
        const btnSetCncBL = document.getElementById("btn-set-cnc-bl");

        const setCncCorner = async (corner) => {
            try {
                const res = await fetch("/api/calibration/set_cnc", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ corner: corner })
                });
                const data = await res.json();
                if (data.status === "ok") {
                    cncPoints = data.cnc_points;
                    isCalibrated = data.calibrated;
                    window.updateCalibrationUI();
                    logSystemMessage(t("📐 Đặt CNC {corner} về vị trí hiện tại thành công!", { corner: corner }));
                } else {
                    logSystemMessage(t("❌ Đặt góc CNC {corner} thất bại: {message}", { corner: corner, message: data.message }));
                }
            } catch (e) {
                logSystemMessage(t("❌ Lỗi mạng khi đặt CNC {corner}: {error}", { corner: corner, error: e }));
            }
        };

        if (btnSetCncTL) btnSetCncTL.addEventListener("click", () => setCncCorner("TL"));
        if (btnSetCncTR) btnSetCncTR.addEventListener("click", () => setCncCorner("TR"));
        if (btnSetCncBR) btnSetCncBR.addEventListener("click", () => setCncCorner("BR"));
        if (btnSetCncBL) btnSetCncBL.addEventListener("click", () => setCncCorner("BL"));

        const btnSetTouchPen = document.getElementById("btn-set-touch-pen");
        if (btnSetTouchPen) {
            btnSetTouchPen.addEventListener("click", () => {
                window.isWaitingForTouchPenClick = true;
                logSystemMessage(t("👉 Click chuột trái lên khung hình camera tại vị trí đầu bút touch."));
            });
        }

        const btnSetAruco = document.getElementById("btn-set-aruco");
        if (btnSetAruco) {
            btnSetAruco.addEventListener("click", async () => {
                try {
                    const res = await fetch("/api/calibration/set_aruco", { method: "POST" });
                    const data = await res.json();
                    if (data.status === "ok") {
                        logSystemMessage(t("📐 Đặt các điểm tiêu chuẩn ArUco thành công!"));
                    } else {
                        logSystemMessage(t("❌ Đặt các điểm tiêu chuẩn ArUco thất bại: {message}", { message: data.message }));
                    }
                } catch (e) {
                    logSystemMessage(t("❌ Lỗi mạng khi đặt ArUco: {error}", { error: e }));
                }
            });
        }

        if (btnCalClear) {
            btnCalClear.addEventListener("click", async () => {
                if (confirm(t("Bạn có chắc chắn muốn xóa căn chỉnh không?"))) {
                    try {
                        const res = await fetch("/api/calibration/clear", { method: "POST" });
                        const data = await res.json();
                        if (data.status === "ok") {
                            calibratedPoints = {};
                            arucoStandardPoints = {};
                            cncPoints = {};
                            isCalibrated = false;
                            window.updateCalibrationUI();
                            logSystemMessage(t("Đã xóa căn chỉnh."));
                        }
                    } catch (e) {
                        logSystemMessage(t("Xóa căn chỉnh thất bại: {error}", { error: e }));
                    }
                }
            });
        }

        if (btnResetAruco) {
            btnResetAruco.addEventListener("click", async () => {
                if (confirm(t("Bạn có chắc chắn muốn đặt lại các điểm tiêu chuẩn ArUco không?"))) {
                    try {
                        const res = await fetch("/api/calibration/reset_aruco", { method: "POST" });
                        const data = await res.json();
                        if (data.status === "ok") {
                            logSystemMessage(t("Đã đặt lại các điểm tiêu chuẩn ArUco."));
                            arucoStandardPoints = {};
                            fetchCalibrationConfig();
                        }
                    } catch (e) {
                        logSystemMessage(t("Đặt lại ArUco thất bại: {error}", { error: e }));
                    }
                }
            });
        }

        if (btnStopToHome) {
            btnStopToHome.addEventListener("click", async () => {
                try {
                    // 1. Call api to stop/abort CNC streaming
                    logSystemMessage(t("Đang dừng luồng phát CNC và thiết lập lại máy..."));
                    const res = await fetch("/api/stop", { method: "POST" });
                    const data = await res.json();

                    if (data.status === "ok") {
                        logSystemMessage(t("Đã gửi lệnh Dừng và Thiết lập lại CNC."));
                    } else {
                        logSystemMessage(t("Cảnh báo: API dừng trả về trạng thái: ") + data.status);
                    }

                    // 2. Wait 1.5 seconds for soft-reset to execute and connection to settle
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    // 3. Send Unlock command $X to unlock GRBL from Alarm state after reset
                    logSystemMessage(t("Đang gửi lệnh mở khóa ($X) tới GRBL..."));
                    await sendCommand("$X");
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // 4. Raise the Pen/Spindle tool up to safe height (Avoid dragging on paper)
                    const isSpindle = (penControlMode.value === "spindle-pwm");
                    const penUpValLocal = penUpVal.value;
                    const penUpCmd = isSpindle ? `M3 S${penUpValLocal}` : `G0 Z${penUpValLocal}`;

                    logSystemMessage(t("Đang nhấc bút/trục chính: {command}", { command: penUpCmd }));
                    await sendCommand(penUpCmd);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // 5. Move the CNC head back to the home position (0,0)
                    logSystemMessage(t("Đang di chuyển đầu CNC về Home (X0 Y0)..."));
                    await sendCommand("G90\nG0 X0 Y0");
                } catch (err) {
                    console.error(t("Lỗi thực hiện Dừng & Về Home:"), err);
                    logSystemMessage(t("Lỗi thực hiện Dừng & Về Home: {error}", { error: err }));
                }
            });
        }

        if (btnMoveToCenter) {
            btnMoveToCenter.addEventListener("click", async () => {
                if (isAbortingMovingAround) return;

                if (!movingAroundRunning) {
                    try {
                        logSystemMessage(t("Đang bắt đầu vòng lặp căn chỉnh di chuyển vòng quanh..."));
                        btnMoveToCenter.disabled = true; // Temporary disable while waiting for request
                        const res = await fetch("/api/calibration/moving_around/start", { method: "POST" });
                        const data = await res.json();
                        if (data.status === "ok") {
                            movingAroundRunning = true;
                            btnMoveToCenter.textContent = t("Đang di chuyển vòng quanh");
                            logSystemMessage(t("Đã bắt đầu vòng lặp di chuyển vòng quanh thành công."));
                        } else {
                            logSystemMessage(t("Bắt đầu di chuyển vòng quanh thất bại: {message}", { message: data.message }));
                        }
                    } catch (e) {
                        logSystemMessage(t("Lỗi mạng khi bắt đầu vòng lặp: {error}", { error: e }));
                    } finally {
                        window.updateCalibrationUI();
                    }
                } else {
                    try {
                        logSystemMessage(t("Đang dừng vòng lặp di chuyển vòng quanh..."));
                        const res = await fetch("/api/calibration/moving_around/stop", { method: "POST" });
                        const data = await res.json();
                        if (data.status === "ok") {
                            movingAroundRunning = false;
                            isAbortingMovingAround = true;
                            btnMoveToCenter.textContent = t("Đã dừng di chuyển vòng quanh");
                            window.updateCalibrationUI();
                            logSystemMessage(t("Vòng lặp di chuyển vòng quanh đã dừng. Đầu cắt đang reset và về gốc tọa độ."));

                            setTimeout(() => {
                                isAbortingMovingAround = false;
                                btnMoveToCenter.textContent = t("Di chuyển vòng quanh");
                                window.updateCalibrationUI();
                            }, 1500);
                        } else {
                            logSystemMessage(t("Dừng di chuyển vòng quanh thất bại: {message}", { message: data.message }));
                            window.updateCalibrationUI();
                        }
                    } catch (e) {
                        logSystemMessage(t("Lỗi mạng khi dừng vòng lặp: {error}", { error: e }));
                        window.updateCalibrationUI();
                    }
                }
            });
        }
    };

    fetchCalibrationConfig();
    setupCalibrationEvents();

    // Also trigger initial polling if the camera starts in open state
    if (!isCameraCollapsed) {
        window.startCalibrationPolling();
    }

    // --- HOME & GOTO Logic (cập nhật 2) ---
    const btnSetHome = document.getElementById("btn-set-home");
    const btnViewSnapshot = document.getElementById("btn-view-snapshot");
    const btnResetHome = document.getElementById("btn-reset-home");
    const btnGoto = document.getElementById("btn-goto");
    const gotoX = document.getElementById("goto-x");
    const gotoY = document.getElementById("goto-y");
    const homeDot = document.getElementById("home-dot");
    const homeStatusLabel = document.getElementById("home-status-label");
    const homeSnapshotContainer = document.getElementById("home-snapshot-container");
    const homeSnapshotImg = document.getElementById("home-snapshot-img");
    const btnCloseSnapshot = document.getElementById("btn-close-snapshot");
    const snapshotCurrentPos = document.getElementById("snapshot-current-pos");

    let homeSnapshotVisible = false;

    const updateHomeUI = () => {
        if (btnSetHome) btnSetHome.disabled = !isConnected;
        if (btnGoto) btnGoto.disabled = !isConnected || !isHomeSet;
        if (btnViewSnapshot) btnViewSnapshot.disabled = !isHomeSet;
        if (btnResetHome) btnResetHome.disabled = !isHomeSet;
        if (homeDot) homeDot.className = "home-dot" + (isHomeSet ? " home-active" : "");
        if (homeStatusLabel) homeStatusLabel.innerText = isHomeSet ? t("Đã Đặt Home ✓") : t("Chưa Đặt Home");
    };
    window.updateHomeUI = updateHomeUI;

    const fetchHomeStatus = async () => {
        try {
            const res = await fetch("/api/home_status");
            const data = await res.json();
            isHomeSet = data.home_set || false;
            updateHomeUI();
            if (isHomeSet && data.has_snapshot && homeSnapshotImg) {
                homeSnapshotImg.src = "/api/home_snapshot?t=" + Date.now();
            }
            if (isHomeSet && data.home_pixel) {
                const crosshair = document.getElementById("snapshot-crosshair");
                if (crosshair) {
                    crosshair.style.left = `${(data.home_pixel[0] / 720) * 100}%`;
                    crosshair.style.top = `${(data.home_pixel[1] / 720) * 100}%`;
                }
            } else {
                const crosshair = document.getElementById("snapshot-crosshair");
                if (crosshair) {
                    crosshair.style.left = "50%";
                    crosshair.style.top = "50%";
                }
            }
        } catch (e) {
            console.error("Failed to fetch home status:", e);
        }
    };

    const updateSnapshotPos = (data) => {
        if (snapshotCurrentPos) {
            snapshotCurrentPos.innerText = t("Bút: X={x}, Y={y}", { x: currentWPos.x.toFixed(3), y: currentWPos.y.toFixed(3) });
        }
        const penMarker = document.getElementById("snapshot-pen-marker");
        if (penMarker) {
            if (isHomeSet && data && data.pen_px) {
                penMarker.style.display = "block";
                penMarker.style.left = `${(data.pen_px[0] / 720) * 100}%`;
                penMarker.style.top = `${(data.pen_px[1] / 720) * 100}%`;
            } else {
                penMarker.style.display = "none";
            }
        }
    };
    window._updateSnapshotPos = updateSnapshotPos;

    if (btnSetHome) {
        let homeConfirmPending = false;
        const homeConfirmRow = document.getElementById("home-confirm-row");

        const resetHomeConfirm = () => {
            homeConfirmPending = false;
            btnSetHome.innerText = t("🏠 Đặt Gốc Home (0,0,0)");
            btnSetHome.className = "btn btn-warning";
            if (homeConfirmRow) homeConfirmRow.classList.add("hidden");
        };

        btnSetHome.addEventListener("click", async () => {
            if (!isConnected) return;

            if (!homeConfirmPending) {
                // Step 1: Show inline confirm
                homeConfirmPending = true;
                btnSetHome.innerText = "⚠️ Nhấn xác nhận bên dưới ↓";
                btnSetHome.className = "btn btn-danger";
                if (homeConfirmRow) homeConfirmRow.classList.remove("hidden");
                // Auto-cancel after 10 seconds
                setTimeout(() => { if (homeConfirmPending) resetHomeConfirm(); }, 10000);
                return;
            }
        });

        // Bind confirm/cancel buttons inside the confirm row
        const btnHomeConfirmYes = document.getElementById("btn-home-confirm-yes");
        const btnHomeConfirmNo = document.getElementById("btn-home-confirm-no");

        if (btnHomeConfirmYes) {
            btnHomeConfirmYes.addEventListener("click", async () => {
                if (!isConnected) return;
                resetHomeConfirm();
                try {
                    btnSetHome.disabled = true;
                    btnSetHome.innerText = t("⏳ Đang đặt gốc Home...");
                    const camIdx = cameraSelect ? cameraSelect.value : 4;
                    const res = await fetch("/api/home?camera_index=" + camIdx, { method: "POST" });
                    const data = await res.json();
                    if (data.status === "ok") {
                        isHomeSet = true;
                        updateHomeUI();
                        logSystemMessage(t("✅ Đặt Home thành công! Vị trí hiện tại là (0, 0, 0). Đã lưu ảnh tham chiếu."));
                        if (homeSnapshotImg) homeSnapshotImg.src = "/api/home_snapshot?t=" + Date.now();
                        if (data.home_pixel) {
                            const crosshair = document.getElementById("snapshot-crosshair");
                            if (crosshair) {
                                crosshair.style.left = `${(data.home_pixel[0] / 720) * 100}%`;
                                crosshair.style.top = `${(data.home_pixel[1] / 720) * 100}%`;
                            }
                        }
                    } else {
                        logSystemMessage(t("❌ Đặt home thất bại: {message}", { message: data.message }));
                    }
                } catch (e) {
                    logSystemMessage(t("❌ Lỗi mạng khi đặt home: {error}", { error: e }));
                } finally {
                    btnSetHome.innerText = t("🏠 Đặt Gốc Home (0,0,0)");
                    btnSetHome.className = "btn btn-warning";
                    updateHomeUI();
                }
            });
        }

        if (btnHomeConfirmNo) {
            btnHomeConfirmNo.addEventListener("click", () => resetHomeConfirm());
        }
    }

    if (btnResetHome) {
        btnResetHome.addEventListener("click", async () => {
            if (confirm(t("Bạn có muốn khôi phục vị trí Home của CNC về điểm đã lưu?"))) {
                try {
                    btnResetHome.disabled = true;
                    btnResetHome.innerText = t("Đang Khôi Phục...");
                    const res = await fetch("/api/home/reset", { method: "POST" });
                    const data = await res.json();
                    btnResetHome.disabled = false;
                    btnResetHome.innerText = t("Khôi Phục Gốc Home");

                    if (data.status === "ok") {
                        logSystemMessage("✅ " + data.message);
                        alert(data.message);
                    } else if (data.status === "head_not_detected") {
                        if (confirm(data.message + "\n\n" + t("Nhấn OK để thiết lập vị trí hiện tại làm mốc Home."))) {
                            // User chose to manually align and force zero
                            btnResetHome.disabled = true;
                            btnResetHome.innerText = t("Đang Khôi Phục...");
                            const forceRes = await fetch("/api/home/reset?force_current=true", { method: "POST" });
                            const forceData = await forceRes.json();
                            btnResetHome.disabled = false;
                            btnResetHome.innerText = t("Khôi Phục Gốc Home");

                            if (forceData.status === "ok") {
                                logSystemMessage("✅ " + forceData.message);
                                alert(forceData.message);
                            } else {
                                alert(t("Khôi phục thất bại: {message}", { message: forceData.message }));
                            }
                        }
                    } else {
                        alert(t("Lỗi khôi phục Home: {message}", { message: data.message }));
                    }
                } catch (e) {
                    btnResetHome.disabled = false;
                    btnResetHome.innerText = t("Khôi Phục Gốc Home");
                    logSystemMessage(t("Khôi phục Home thất bại: {error}", { error: e }));
                    alert(t("Lỗi mạng khi khôi phục Home: {error}", { error: e }));
                }
            }
        });
    }


    if (btnViewSnapshot) {
        btnViewSnapshot.addEventListener("click", () => {
            if (!homeSnapshotContainer) return;
            homeSnapshotVisible = !homeSnapshotVisible;
            if (homeSnapshotVisible) {
                homeSnapshotContainer.classList.remove("hidden");
                btnViewSnapshot.innerText = t("📷 Ẩn Bản Đồ");
                if (homeSnapshotImg) homeSnapshotImg.src = "/api/home_snapshot?t=" + Date.now();
                updateSnapshotPos();
            } else {
                homeSnapshotContainer.classList.add("hidden");
                btnViewSnapshot.innerText = t("📸 Xem Bản Đồ");
            }
        });
    }

    if (btnCloseSnapshot) {
        btnCloseSnapshot.addEventListener("click", () => {
            homeSnapshotVisible = false;
            if (homeSnapshotContainer) homeSnapshotContainer.classList.add("hidden");
            if (btnViewSnapshot) btnViewSnapshot.innerText = t("📸 Xem Bản Đồ");
        });
    }

    if (btnGoto) {
        btnGoto.addEventListener("click", async () => {
            if (!isConnected || !isHomeSet) return;
            const x = parseFloat(gotoX ? gotoX.value : 0) || 0;
            const y = parseFloat(gotoY ? gotoY.value : 0) || 0;

            // const insideStrict = isPointInPolygon(x, y, arucoStandardPoints);
            // if (!insideStrict) {
            //     alert("Điểm không nằm trong tứ giác ArUco: "+ JSON.stringify(arucoStandardPoints));
            //     return;
            // }

            // Use the global gesture feedrate
            const gestureFeedrateInput = document.getElementById("gesture-feedrate");
            const feedrate = parseFloat(gestureFeedrateInput ? gestureFeedrateInput.value : 4000) || 4000;
            try {
                logSystemMessage(t("➡ GoTo: Đang di chuyển bút tới X={x}, Y={y} @ F{feedrate}", { x: x.toFixed(3), y: y.toFixed(3), feedrate: feedrate }));
                const res = await fetch("/api/goto", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ x: x, y: y, feedrate: feedrate })
                });
                const data = await res.json();
                if (data.status === "ok") {
                    logSystemMessage("✅ " + data.message);
                } else {
                    logSystemMessage(t("❌ GoTo thất bại: {message}", { message: data.message }));
                }
            } catch (e) {
                logSystemMessage(t("❌ Lỗi mạng trong quá trình GoTo: {error}", { error: e }));
            }
        });
    }

    fetchHomeStatus();

    // --- Custom Drag-to-Resize Logic for Floating Camera Panel ---
    const handleTopLeft = cameraFloatingPanel.querySelector(".resize-handle.top-left");
    const handleTop = cameraFloatingPanel.querySelector(".resize-handle.top");
    const handleLeft = cameraFloatingPanel.querySelector(".resize-handle.left");

    let isResizing = false;
    let currentHandle = null;
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;

    const performResize = (e) => {
        if (!isResizing) return;

        if (currentHandle === "left" || currentHandle === "top-left") {
            const dx = startX - e.clientX;
            const newWidth = Math.max(280, Math.min(800, startWidth + dx));
            cameraFloatingPanel.style.width = newWidth + "px";
        }

        if (currentHandle === "top" || currentHandle === "top-left") {
            const dy = startY - e.clientY;
            const newHeight = Math.max(200, Math.min(700, startHeight + dy));
            cameraFloatingPanel.style.height = newHeight + "px";
        }
    };

    const stopResize = () => {
        isResizing = false;
        currentHandle = null;
        document.removeEventListener("mousemove", performResize);
        document.removeEventListener("mouseup", stopResize);
    };

    const startResize = (e, handleType) => {
        e.preventDefault();
        isResizing = true;
        currentHandle = handleType;
        startX = e.clientX;
        startY = e.clientY;
        const rect = cameraFloatingPanel.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;

        document.addEventListener("mousemove", performResize);
        document.addEventListener("mouseup", stopResize);
    };

    handleTopLeft.addEventListener("mousedown", (e) => startResize(e, "top-left"));
    handleTop.addEventListener("mousedown", (e) => startResize(e, "top"));
    handleLeft.addEventListener("mousedown", (e) => startResize(e, "left"));

    // Observe panel resizing to save user's custom dimensions
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            if (!isCameraCollapsed) {
                const rect = cameraFloatingPanel.getBoundingClientRect();
                if (rect.width > 100 && rect.height > 100) {
                    localStorage.setItem("cnc_camera_width", Math.round(rect.width).toString());
                    localStorage.setItem("cnc_camera_height", Math.round(rect.height).toString());
                }
            }
        }
    });

    // Apply initial collapse/expand state on load
    applyCameraState();

    // Start observing after initial layout
    resizeObserver.observe(cameraFloatingPanel);

    jog_keyboard_register_event();
    window.updateDetectionStatusUI = updateDetectionStatusUI;
    window.updateDetectedLabelsUI = updateDetectedLabelsUI;
}

function jogAxis(axis, direction) {
    if (!isConnected) {
        logSystemMessage(t("Không thể di chuyển Jog: máy chưa kết nối."));
        return;
    }

    if (axis === "Z" && penControlMode.value === "spindle-pwm") {
        isJoggingSpindle = true;
        clearTimeout(jogSpindleTimeout);
        jogSpindleTimeout = setTimeout(() => {
            isJoggingSpindle = false;
        }, 1000);

        targetSpindleSpeed = targetSpindleSpeed + (10 * direction);
        if (targetSpindleSpeed < 0) targetSpindleSpeed = 0;
        if (targetSpindleSpeed > 1000) targetSpindleSpeed = 1000;

        logSystemMessage(t("Đang điều chỉnh spindle PWM thêm 10: S{speed}", { speed: targetSpindleSpeed }));
        sendCommand(`M3 S${targetSpindleSpeed}`);
        return;
    }

    const distance = currentStepDistance * direction;
    // For universal compatibility (including GRBL v0.9 which doesn't support $J=),
    // we jog using standard relative G-code coordinates and then immediately restore G90 (absolute mode)
    sendCommand(`G91 G21 G1 ${axis}${distance} F${currentFeedrate}`);
    sendCommand(`G90`);
}

function jogDiagonal(dirX, dirY) {
    if (!isConnected) {
        logSystemMessage(t("Không thể di chuyển Jog: máy chưa kết nối."));
        return;
    }
    const distX = currentStepDistance * dirX;
    const distY = currentStepDistance * dirY;
    sendCommand(`G91 G21 G1 X${distX} Y${distY} F${currentFeedrate}`);
    sendCommand(`G90`);
}

// --- FILE UPLOAD AND PARSING ---
async function handleFileSelection() {
    const file = fileInput.files[0];
    if (!file) return;

    logSystemMessage(t("Đang tải lên file: {filename}...", { filename: file.name }));

    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        if (data.status === "ok") {
            logSystemMessage(t("Tải lên thành công. Đang đọc G-code để phân tích đường chạy dao..."));

            // Set file UI info card
            loadedFileName.innerText = file.name;
            loadedFileLines.innerText = t("{count} dòng", { count: data.lines_count });
            fileDropZone.classList.add("hidden");
            fileInfoContainer.classList.remove("hidden");
            btnStartStream.disabled = !isConnected;

            // Read file on client side for parsing
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                toolpathPoints = parseGcode(text);
                calculateBoundingBox();
                resetCanvasView();
                logSystemMessage(t("Đã phân tích {count} phân đoạn chuyển động từ G-code.", { count: toolpathPoints.length }));
            };
            reader.readAsText(file);

        } else {
            logSystemMessage(t("Tải lên thất bại: {message}", { message: data.message }));
        }
    } catch (e) {
        logSystemMessage(t("Lỗi mạng khi tải lên: {error}", { error: e }));
    }
}

// Client-side robust G-code parser to extract toolpaths (rapid & cut line vectors)
function parseGcode(gcodeText) {
    const lines = gcodeText.split('\n');
    const path = [];
    let curX = 0, curY = 0, curZ = 0;
    let isAbsolute = true; // default G90

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        // Remove comments
        line = line.replace(/\(.*?\)/g, '').replace(/;.*/g, '').trim();
        if (!line) continue;

        // Positioning modes
        if (line.includes('G90') || line.includes('g90')) isAbsolute = true;
        if (line.includes('G91') || line.includes('g91')) isAbsolute = false;

        const xMatch = line.match(/X([-+]?[0-9]*\.?[0-9]+)/i);
        const yMatch = line.match(/Y([-+]?[0-9]*\.?[0-9]+)/i);
        const zMatch = line.match(/Z([-+]?[0-9]*\.?[0-9]+)/i);

        const gMatch = line.match(/G([0-9]+)/i);
        let gCmd = gMatch ? parseInt(gMatch[1], 10) : null;

        if (xMatch || yMatch || zMatch) {
            let nextX = curX;
            let nextY = curY;
            let nextZ = curZ;

            if (xMatch) {
                const val = parseFloat(xMatch[1]);
                nextX = isAbsolute ? val : curX + val;
            }
            if (yMatch) {
                const val = parseFloat(yMatch[1]);
                nextY = isAbsolute ? val : curY + val;
            }
            if (zMatch) {
                const val = parseFloat(zMatch[1]);
                nextZ = isAbsolute ? val : curZ + val;
            }

            if (gCmd === null) gCmd = 1; // Default to linear cut

            // Only capture G0 and G1/2/3 for visual rendering
            if (gCmd === 0 || gCmd === 1 || gCmd === 2 || gCmd === 3) {
                path.push({
                    type: gCmd,
                    x1: curX, y1: curY, z1: curZ,
                    x2: nextX, y2: nextY, z2: nextZ
                });
            }

            curX = nextX;
            curY = nextY;
            curZ = nextZ;
        }
    }
    return path;
}

function calculateBoundingBox() {
    if (toolpathPoints.length === 0) return;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    toolpathPoints.forEach(p => {
        minX = Math.min(minX, p.x1, p.x2);
        maxX = Math.max(maxX, p.x1, p.x2);
        minY = Math.min(minY, p.y1, p.y2);
        maxY = Math.max(maxY, p.y1, p.y2);
    });

    // In case drawing is single point or error
    if (minX === Infinity) {
        boundingBox = { minX: 0, maxX: 0, minY: 0, maxY: 0, center: { x: 0, y: 0 }, width: 0, height: 0 };
        return;
    }

    boundingBox = {
        minX, maxX, minY, maxY,
        width: maxX - minX,
        height: maxY - minY,
        center: {
            x: minX + (maxX - minX) / 2,
            y: minY + (maxY - minY) / 2
        }
    };
}

// --- CANVAS VISUALIZER RENDERING ---
function setupCanvas() {
    // Adjust canvas resolution dynamically on window resize
    const resizeCanvas = () => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        drawToolpath();
    };

    window.addEventListener("resize", resizeCanvas);
    setTimeout(resizeCanvas, 100);

    // Zoom handler
    canvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        const zoomIntensity = 0.1;

        // Mouse coordinate relative to canvas top-left
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        // Convert mouse position to visual coordinate space before zooming
        const worldX = (mouseX - panX) / zoomScale;
        const worldY = (mouseY - panY) / zoomScale;

        // Calculate new scale
        const scaleFactor = e.deltaY < 0 ? (1 + zoomIntensity) : (1 - zoomIntensity);
        zoomScale = Math.max(0.1, Math.min(50, zoomScale * scaleFactor));

        // Re-align pan so zoom anchors on mouse pointer
        panX = mouseX - worldX * zoomScale;
        panY = mouseY - worldY * zoomScale;

        drawToolpath();
    });

    // Pan Handlers
    canvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        startDragX = e.offsetX - panX;
        startDragY = e.offsetY - panY;
    });

    canvas.addEventListener("mousemove", (e) => {
        if (isDragging) {
            panX = e.offsetX - startDragX;
            panY = e.offsetY - startDragY;
            drawToolpath();
        }
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

function resetCanvasView() {
    if (toolpathPoints.length === 0) {
        panX = canvas.width / 2;
        panY = canvas.height / 2;
        zoomScale = 1.0;
        drawToolpath();
        return;
    }

    // Find zoom scale fitting visual boundaries with padding
    const padding = 40;
    const availW = canvas.width - padding * 2;
    const availH = canvas.height - padding * 2;

    const scaleX = availW / (boundingBox.width || 1);
    const scaleY = availH / (boundingBox.height || 1);

    // Select minimum scale to fit in both directions
    zoomScale = Math.min(scaleX, scaleY);
    // Boundary checks
    zoomScale = Math.max(0.2, Math.min(20, zoomScale));

    // Position center of visual path to center of canvas
    // Y-axis alignment: screen Y increases downwards (Cập nhật 24)
    panX = canvas.width / 2 - (boundingBox.center.x * zoomScale);
    panY = canvas.height / 2 - (boundingBox.center.y * zoomScale);

    drawToolpath();
}

function drawToolpath() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background grid lines relative to current pan & zoom
    drawGrid();

    if (toolpathPoints.length > 0) {
        ctx.lineWidth = 1;

        toolpathPoints.forEach(p => {
            ctx.beginPath();

            // Transform point coordinates to screen pixels
            const x1 = panX + p.x1 * zoomScale;
            const y1 = panY + p.y1 * zoomScale; // Screen Y increases downwards (Cập nhật 24)
            const x2 = panX + p.x2 * zoomScale;
            const y2 = panY + p.y2 * zoomScale;

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);

            // Visual indicators for G0 Rapid (dotted orange) vs G1 Feed cuts (solid blue)
            if (p.type === 0) {
                ctx.strokeStyle = "hsla(35, 90%, 55%, 0.35)"; // faint orange
                ctx.setLineDash([2, 4]);
            } else {
                ctx.strokeStyle = "hsla(200, 100%, 50%, 0.8)"; // bright blue
                ctx.setLineDash([]);
            }

            ctx.stroke();
        });

        ctx.setLineDash([]); // Reset dash state
    }

    // Draw Current Tool Position (Glowing Crosshair overlay)
    drawToolCrosshair();
}

function drawGrid() {
    const gridSpacing = 10 * zoomScale; // base 10mm grid spacing
    if (gridSpacing < 5) return; // avoid tight loops on heavy zooms

    ctx.strokeStyle = "hsla(220, 25%, 24%, 0.15)";
    ctx.lineWidth = 0.5;

    // Draw vertical lines from center grid origin
    let originX = panX;
    while (originX > 0) {
        ctx.beginPath();
        ctx.moveTo(originX, 0);
        ctx.lineTo(originX, canvas.height);
        ctx.stroke();
        originX -= gridSpacing;
    }
    originX = panX + gridSpacing;
    while (originX < canvas.width) {
        ctx.beginPath();
        ctx.moveTo(originX, 0);
        ctx.lineTo(originX, canvas.height);
        ctx.stroke();
        originX += gridSpacing;
    }

    // Draw horizontal lines from center grid origin
    let originY = panY;
    while (originY > 0) {
        ctx.beginPath();
        ctx.moveTo(0, originY);
        ctx.lineTo(canvas.width, originY);
        ctx.stroke();
        originY -= gridSpacing;
    }
    originY = panY + gridSpacing;
    while (originY < canvas.height) {
        ctx.beginPath();
        ctx.moveTo(0, originY);
        ctx.lineTo(canvas.width, originY);
        ctx.stroke();
        originY += gridSpacing;
    }

    // Draw Grid Center Axes lines (X=0, Y=0 origin)
    ctx.strokeStyle = "hsla(220, 25%, 34%, 0.5)";
    ctx.lineWidth = 1.0;

    // X Axis line
    ctx.beginPath();
    ctx.moveTo(0, panY);
    ctx.lineTo(canvas.width, panY);
    ctx.stroke();

    // Y Axis line
    ctx.beginPath();
    ctx.moveTo(panX, 0);
    ctx.lineTo(panX, canvas.height);
    ctx.stroke();
}

function drawToolCrosshair() {
    // Current tool positions on screen pixel space
    const screenX = panX + currentWPos.x * zoomScale;
    const screenY = panY + currentWPos.y * zoomScale; // Screen Y increases downwards (Cập nhật 24)

    // Draw outer glow ring
    ctx.beginPath();
    ctx.arc(screenX, screenY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "hsla(0, 85%, 60%, 0.2)";
    ctx.strokeStyle = "hsl(0, 85%, 60%)";
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();

    // Draw crosshair ticks
    ctx.beginPath();
    ctx.strokeStyle = "hsl(0, 85%, 60%)";
    ctx.lineWidth = 1.0;

    // Horizontal tick
    ctx.moveTo(screenX - 15, screenY);
    ctx.lineTo(screenX + 15, screenY);

    // Vertical tick
    ctx.moveTo(screenX, screenY - 15);
    ctx.lineTo(screenX, screenY + 15);

    ctx.stroke();

    // Draw tiny center dot
    ctx.beginPath();
    ctx.arc(screenX, screenY, 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
}

// --- TOUCH & SWIPE GESTURE IMPLEMENTATION ---
async function executeGesture(type) {
    if (!isConnected) {
        logSystemMessage(t("Không thể thực hiện cử chỉ: máy chưa kết nối."));
        return;
    }

    // Get gesture inputs
    const startX = parseFloat(document.getElementById("gesture-start-x").value) || 0.0;
    const startY = parseFloat(document.getElementById("gesture-start-y").value) || 0.0;
    const endX = parseFloat(document.getElementById("gesture-end-x").value) || 0.0;
    const endY = parseFloat(document.getElementById("gesture-end-y").value) || 0.0;

    const feedrate = parseInt(document.getElementById("gesture-feedrate").value) || 4000;
    const dwell = parseFloat(document.getElementById("gesture-dwell").value) || 0.15;
    const distance = parseFloat(document.getElementById("gesture-distance").value) || 40.0;
    const tapDwell = parseFloat(document.getElementById("gesture-tap-dwell").value) || 0.10;

    // Get UP/DOWN command strings from active mode settings
    const penUpValLocal = penUpVal.value;
    const penDownValLocal = penDownVal.value;
    const penDwellLocal = penDwellVal.value; // dwell for physical pen down/up movement
    const isSpindle = (penControlMode.value === "spindle-pwm");

    const penUpCmd = isSpindle ? `M3 S${penUpValLocal}` : `G0 Z${penUpValLocal}`;
    const penDownCmd = isSpindle ? `M3 S${penDownValLocal}` : `G0 Z${penDownValLocal}`;
    const penDwellCmd = `G4 P${penDwellLocal}`;
    const tapDwellCmd = `G4 P${tapDwell}`;

    const gcode = [];

    // Always start by ensuring absolute coordinates (G90) and millimeters (G21)
    gcode.push("G90 G21");

    switch (type) {
        case "tap":
            logSystemMessage(t("Đang giả lập Chạm tại X:{x}, Y:{y}", { x: startX, y: startY }));
            gcode.push(`G1 X${startX} Y${startY} F${feedrate}`);
            gcode.push(penDownCmd);
            gcode.push(tapDwellCmd);
            gcode.push(penUpCmd);
            gcode.push(tapDwellCmd);
            break;

        case "doubletap":
            logSystemMessage(t("Đang giả lập Chạm Đúp tại X:{x}, Y:{y}", { x: startX, y: startY }));
            gcode.push(`G1 X${startX} Y${startY} F${feedrate}`);
            // First Tap
            gcode.push(penDownCmd);
            gcode.push(tapDwellCmd);
            gcode.push(penUpCmd);
            gcode.push(tapDwellCmd);
            // Wait brief gap between taps
            gcode.push(tapDwellCmd);
            // Second Tap
            gcode.push(penDownCmd);
            gcode.push(tapDwellCmd);
            gcode.push(penUpCmd);
            gcode.push(tapDwellCmd);
            break;

        case "longpress":
            logSystemMessage(t("Đang giả lập Nhấn Giữ (1s) tại X:{x}, Y:{y}", { x: startX, y: startY }));
            gcode.push(`G1 X${startX} Y${startY} F${feedrate}`);
            gcode.push(penDownCmd);
            gcode.push(penDwellCmd);
            gcode.push(`G4 P1.0`);
            gcode.push(penUpCmd);
            gcode.push(penDwellCmd);
            break;

        case "swipe-up":
        case "swipe-down":
        case "swipe-left":
        case "swipe-right":
        case "swipe-custom":
            let swipeEndX = startX;
            let swipeEndY = startY;
            let logMsg = "";

            switch (type) {
                case "swipe-up":
                    swipeEndY = startY - distance;
                    logMsg = t("Giả lập Vuốt Lên: di chuyển lên {distance}mm", { distance: distance });
                    break;
                case "swipe-down":
                    swipeEndY = startY + distance;
                    logMsg = t("Giả lập Vuốt Xuống: di chuyển xuống {distance}mm", { distance: distance });
                    break;
                case "swipe-left":
                    swipeEndX = startX - distance;
                    logMsg = t("Giả lập Vuốt Trái: di chuyển sang trái {distance}mm", { distance: distance });
                    break;
                case "swipe-right":
                    swipeEndX = startX + distance;
                    logMsg = t("Giả lập Vuốt Phải: di chuyển sang phải {distance}mm", { distance: distance });
                    break;
                case "swipe-custom":
                    swipeEndX = endX;
                    swipeEndY = endY;
                    logMsg = t("Giả lập Vuốt Tự Chọn từ X:{startX} Y:{startY} tới X:{endX} Y:{endY}", { startX, startY, endX, endY });
                    break;
            }

            logSystemMessage(t("{message} @ F{feedrate}", { message: logMsg, feedrate: feedrate }));
            gcode.push(`G1 X${startX} Y${startY} F${feedrate}`);
            gcode.push(penDownCmd);
            gcode.push(penDwellCmd);

            // Single fast straight G1 swipe movement keeping the pen fully down
            gcode.push(`G1 X${swipeEndX.toFixed(3)} Y${swipeEndY.toFixed(3)} F${feedrate}`);

            // Final confirm pen is up
            gcode.push(penUpCmd);
            gcode.push(penDwellCmd);
            break;

        default:
            console.error(t("Cử chỉ không hợp lệ: ") + type);
            return;
    }

    // Send G-code lines to backend
    await sendCommand(gcode.join("\n"));
}

async function loadSavedUIPreferences() {
    let prefs = {
        step_distance: 10.0,
        jog_feedrate: 1000,
        gesture_feedrate: 4000,
        gesture_distance: 40.0,
        gesture_dwell: 0.15,
        gesture_tap_dwell: 0.05,
        camera_height: 542.0
    };

    try {
        const res = await fetch("/api/ui_preferences");
        if (res.ok) {
            prefs = await res.json();
            // Handle fallback for step_index
            if (prefs.step_distance === undefined && prefs.step_index !== undefined) {
                const mapping = [0.1, 1.0, 10.0, 100.0];
                prefs.step_distance = mapping[prefs.step_index] || 10.0;
            }
        }
    } catch (e) {
        console.error(t("Tải cấu hình giao diện từ server thất bại, sử dụng localStorage hoặc mặc định:"), e);
        // Try fallback to localStorage
        const localStepDist = localStorage.getItem("cnc_step_distance");
        if (localStepDist !== null) {
            prefs.step_distance = parseFloat(localStepDist);
        } else {
            const localStepIndex = localStorage.getItem("cnc_step_index");
            if (localStepIndex !== null) {
                const mapping = [0.1, 1.0, 10.0, 100.0];
                prefs.step_distance = mapping[parseInt(localStepIndex, 10)] || 10.0;
            }
        }

        const localJogFeedrate = localStorage.getItem("cnc_jog_feedrate");
        if (localJogFeedrate !== null) prefs.jog_feedrate = parseInt(localJogFeedrate, 10);

        const localGestureFeedrate = localStorage.getItem("cnc_gesture_feedrate");
        if (localGestureFeedrate !== null) prefs.gesture_feedrate = parseInt(localGestureFeedrate, 10);

        const localGestureDistance = localStorage.getItem("cnc_gesture_distance");
        if (localGestureDistance !== null) prefs.gesture_distance = parseFloat(localGestureDistance);

        const localGestureDwell = localStorage.getItem("cnc_gesture_dwell");
        if (localGestureDwell !== null) prefs.gesture_dwell = parseFloat(localGestureDwell);

        const localGestureTapDwell = localStorage.getItem("cnc_gesture_tap_dwell");
        if (localGestureTapDwell !== null) prefs.gesture_tap_dwell = parseFloat(localGestureTapDwell);

        const localCameraHeight = localStorage.getItem("cnc_camera_height");
        if (localCameraHeight !== null) prefs.camera_height = parseFloat(localCameraHeight);
    }

    // Apply to DOM and Global variables
    sliderStep.value = prefs.step_distance;
    currentStepDistance = prefs.step_distance;
    valStep.innerText = `${currentStepDistance} mm`;

    // Update preset dropdown selection
    const selectStepPreset = document.getElementById("select-step-preset");
    if (selectStepPreset) {
        const valNum = currentStepDistance;
        if (valNum === 0.1 || valNum === 1 || valNum === 10 || valNum === 100) {
            selectStepPreset.value = valNum.toString();
        } else {
            selectStepPreset.value = "custom";
        }
    }

    sliderFeed.value = prefs.jog_feedrate;
    currentFeedrate = prefs.jog_feedrate;
    valFeed.innerText = `${currentFeedrate} mm/min`;

    const gestureFeedrateInput = document.getElementById("gesture-feedrate");
    if (gestureFeedrateInput) gestureFeedrateInput.value = prefs.gesture_feedrate;

    const gestureDistanceInput = document.getElementById("gesture-distance");
    if (gestureDistanceInput) gestureDistanceInput.value = prefs.gesture_distance;

    const gestureDwellInput = document.getElementById("gesture-dwell");
    if (gestureDwellInput) gestureDwellInput.value = prefs.gesture_dwell;

    const gestureTapDwellInput = document.getElementById("gesture-tap-dwell");
    if (gestureTapDwellInput) gestureTapDwellInput.value = prefs.gesture_tap_dwell;

    const cameraHeightInput = document.getElementById("camera-height");
    if (cameraHeightInput) cameraHeightInput.value = prefs.camera_height !== undefined ? prefs.camera_height : 542.0;

    // Sync to localStorage
    syncPreferencesToLocalStorage(prefs);
}

function syncPreferencesToLocalStorage(prefs) {
    localStorage.setItem("cnc_step_distance", prefs.step_distance);
    localStorage.setItem("cnc_jog_feedrate", prefs.jog_feedrate);
    localStorage.setItem("cnc_gesture_feedrate", prefs.gesture_feedrate);
    localStorage.setItem("cnc_gesture_distance", prefs.gesture_distance);
    localStorage.setItem("cnc_gesture_dwell", prefs.gesture_dwell);
    localStorage.setItem("cnc_gesture_tap_dwell", prefs.gesture_tap_dwell);
    localStorage.setItem("cnc_camera_height", prefs.camera_height);
}

async function saveUIPreferencesToServer() {
    const gestureFeedrateInput = document.getElementById("gesture-feedrate");
    const gestureDistanceInput = document.getElementById("gesture-distance");
    const gestureDwellInput = document.getElementById("gesture-dwell");
    const gestureTapDwellInput = document.getElementById("gesture-tap-dwell");
    const cameraHeightInput = document.getElementById("camera-height");

    const prefs = {
        step_distance: parseFloat(sliderStep.value) || 10.0,
        jog_feedrate: parseInt(sliderFeed.value, 10),
        gesture_feedrate: gestureFeedrateInput ? parseInt(gestureFeedrateInput.value, 10) : 4000,
        gesture_distance: gestureDistanceInput ? parseFloat(gestureDistanceInput.value) : 40.0,
        gesture_dwell: gestureDwellInput ? parseFloat(gestureDwellInput.value) : 0.15,
        gesture_tap_dwell: gestureTapDwellInput ? parseFloat(gestureTapDwellInput.value) : 0.05,
        camera_height: cameraHeightInput ? parseFloat(cameraHeightInput.value) : 542.0
    };

    // Save to localStorage
    syncPreferencesToLocalStorage(prefs);

    // Save to server
    try {
        await fetch("/api/ui_preferences", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prefs)
        });
    } catch (e) {
        console.error(t("Lưu cấu hình giao diện lên server thất bại:"), e);
    }
}

const ERASER_RADIUS = 15; // pixels
// --- G-CODE EDITOR INTERACTIVE CANVAS CONTROLLER ---
function initGcodeEditor() {
    const btnToggleGcodeEditor = document.getElementById("btn-toggle-gcode-editor");
    const panelGcodeEditor = document.getElementById("gcode-editor-panel");
    const btnCloseGcodeEditor = document.getElementById("btn-close-gcode-editor");
    const editorDropZone = document.getElementById("editor-drop-zone");
    const editorFileInput = document.getElementById("editor-file-input");
    const editorFileInfo = document.getElementById("editor-file-info");
    const editorFileName = document.getElementById("editor-file-name");
    const btnEditorRemoveFile = document.getElementById("btn-editor-remove-file");
    const editorScale = document.getElementById("editor-scale");
    const editorFeedrate = document.getElementById("editor-feedrate");
    const editorMode = document.getElementById("editor-mode");
    const editorAlgo = document.getElementById("editor-algo");
    const btnEditorConvert = document.getElementById("btn-editor-convert");
    const sliderLineWidth = document.getElementById("slider-editor-linewidth");
    const valLineWidth = document.getElementById("val-editor-linewidth");
    const btnSmooth = document.getElementById("btn-editor-smooth");
    const btnStraighten = document.getElementById("btn-editor-straighten");
    const btnSaveOrigImg = document.getElementById("btn-save-orig-img");
    const btnSaveOrigGcode = document.getElementById("btn-save-orig-gcode");
    const btnSaveEditGcode = document.getElementById("btn-save-edit-gcode");
    const btnSaveProject = document.getElementById("btn-save-project");
    const btnLoadProjectTrigger = document.getElementById("btn-load-project-trigger");
    const editorProjectInput = document.getElementById("editor-project-input");
    const btnEditorExecute = document.getElementById("btn-editor-execute");
    const btnEditorPreviewInVideoFrame = document.getElementById("btn-editor-preview-in-video-frame");
    const editorCanvas = document.getElementById("editor-canvas");
    const editorStatusSegments = document.getElementById("editor-status-segments");
    const editorStatusCoords = document.getElementById("editor-status-coords");
    const groupEditorAlgo = document.getElementById("group-editor-algo");
    const editorCanvasWrapper = document.getElementById("editor-canvas-wrapper");

    if (!editorCanvas) return;
    const ctx = editorCanvas.getContext("2d");

    // Editor State
    let editorSegments = [];
    let editorOriginalSegments = [];
    let editorOriginalImageBase64 = "";
    let editorOriginalImageFile = null;
    let editorOriginalFilename = "";
    let editorOriginalGcodeText = "";
    let editorCurrentMode = "edit"; // edit, move, delete, draw
    let editorSelectedNode = null; // { index, type: 'start'|'end' }
    let editorLineWidth = 2.0;
    previewIntervalId = null; // Declare in parent scope for auto-preview control (Cập nhật 28)

    // Sketch Parameters mapping
    const sketchParams = [
        { id: "sketch-clahe-clip", valId: "val-sketch-clahe-clip", suffix: "" },
        { id: "sketch-blur-size", valId: "val-sketch-blur-size", suffix: " px" },
        { id: "sketch-canny-ultra-low", valId: "val-sketch-canny-ultra-low", suffix: "" },
        { id: "sketch-canny-ultra-high", valId: "val-sketch-canny-ultra-high", suffix: "" },
        { id: "sketch-canny-medium-low", valId: "val-sketch-canny-medium-low", suffix: "" },
        { id: "sketch-canny-medium-high", valId: "val-sketch-canny-medium-high", suffix: "" },
        { id: "sketch-canny-strong-low", valId: "val-sketch-canny-strong-low", suffix: "" },
        { id: "sketch-canny-strong-high", valId: "val-sketch-canny-strong-high", suffix: "" },
        { id: "sketch-min-contour-len", valId: "val-sketch-min-contour-len", suffix: " px" }
    ];

    // View transform
    let editorZoom = 1.0;
    let editorPan = { x: 0, y: 0 };
    let editorBoundingBox = { minX: 0, maxX: 120, minY: 0, maxY: 120 };
    let scale = 1.0;
    const padding = 40;

    // Pan & Draw state
    let isPanning = false;
    let panStart = { x: 0, y: 0 };
    let isTranslating = false;
    let translationStart = { x: 0, y: 0 };
    let editorIsDrawingPath = false;
    let editorDrawPathPoints = [];
    let isShiftPressed = false;
    let editorBgImage = null;
    let hoveredSegmentIndex = -1;
    let lastMousePos = null;

    // Listen to Shift Key
    window.addEventListener("keydown", (e) => { if (e.key === "Shift") isShiftPressed = true; });
    window.addEventListener("keyup", (e) => { if (e.key === "Shift") isShiftPressed = false; });

    // Toggle editor visibility
    if (btnToggleGcodeEditor) {
        btnToggleGcodeEditor.addEventListener("click", () => {
            panelGcodeEditor.classList.toggle("hidden");
            if (!panelGcodeEditor.classList.contains("hidden")) {
                resizeEditorCanvas();
                drawEditorCanvas();
            }
        });
    }
    if (btnCloseGcodeEditor) {
        btnCloseGcodeEditor.addEventListener("click", () => {
            panelGcodeEditor.classList.add("hidden");
            stopPreviewInVideoFrame(); // Stop preview on close (Cập nhật 27)
        });
    }

    // Resize Canvas to wrapper
    function resizeEditorCanvas() {
        const rect = editorCanvasWrapper.getBoundingClientRect();
        const sidebar = document.getElementById("editor-sketch-sidebar");
        let availableWidth = rect.width;
        if (sidebar && !sidebar.classList.contains("hidden")) {
            availableWidth -= sidebar.getBoundingClientRect().width;
        }
        const size = Math.min(availableWidth, rect.height, 720) || 720;
        editorCanvas.width = size;
        editorCanvas.height = size;
        updateScale();
    }
    window.addEventListener("resize", () => {
        if (!panelGcodeEditor.classList.contains("hidden")) {
            resizeEditorCanvas();
            drawEditorCanvas();
        }
    });

    // File inputs & Drag and drop
    if (editorDropZone) {
        editorDropZone.addEventListener("click", () => editorFileInput.click());
        editorDropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            editorDropZone.classList.add("dragover");
        });
        editorDropZone.addEventListener("dragleave", () => {
            editorDropZone.classList.remove("dragover");
        });
        editorDropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            editorDropZone.classList.remove("dragover");
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleEditorFile(files[0]);
            }
        });
    }

    if (editorFileInput) {
        editorFileInput.addEventListener("change", () => {
            if (editorFileInput.files.length > 0) {
                handleEditorFile(editorFileInput.files[0]);
            }
        });
    }

    if (btnEditorRemoveFile) {
        btnEditorRemoveFile.addEventListener("click", () => {
            editorOriginalImageFile = null;
            editorOriginalImageBase64 = "";
            editorOriginalFilename = "";
            editorBgImage = null;
            editorFileInput.value = "";
            editorFileName.innerText = "-";
            editorFileInfo.classList.add("hidden");
            editorDropZone.classList.remove("hidden");
            editorSegments = [];
            editorOriginalSegments = [];
            editorOriginalGcodeText = "";
            updateBoundingBox();
            drawEditorCanvas();
        });
    }

    function handleEditorFile(file) {
        const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
        if (![".svg", ".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
            alert(t("File không hỗ trợ! Vui lòng chọn ảnh JPG, PNG hoặc file SVG."));
            return;
        }

        if (ext === ".svg") {
            editorOriginalImageFile = file;
            editorOriginalFilename = file.name;
            editorFileName.innerText = file.name;
            editorDropZone.classList.add("hidden");
            editorFileInfo.classList.remove("hidden");

            groupEditorAlgo.classList.add("hidden");
            editorScale.value = "0.5";
            editorAlgo.value = "centerline";
            editorAlgo.dispatchEvent(new Event("change"));

            const reader = new FileReader();
            reader.onload = (e) => {
                editorOriginalImageBase64 = e.target.result;
                editorBgImage = new Image();
                editorBgImage.onload = () => {
                    drawEditorCanvas();
                };
                editorBgImage.src = editorOriginalImageBase64;
            };
            reader.readAsDataURL(file);
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target.result;
                resizeImageIfNeeded(dataUrl, file.name, file.type, (finalFile, finalDataUrl) => {
                    editorOriginalImageFile = finalFile;
                    editorOriginalImageBase64 = finalDataUrl;
                    editorOriginalFilename = file.name;
                    editorFileName.innerText = file.name;
                    editorDropZone.classList.add("hidden");
                    editorFileInfo.classList.remove("hidden");

                    groupEditorAlgo.classList.remove("hidden");
                    editorScale.value = "0.15";
                    editorAlgo.value = "sketch";
                    editorAlgo.dispatchEvent(new Event("change"));

                    // Auto start preview if not already active (Cập nhật 28)
                    if (btnEditorPreviewInVideoFrame && !previewIntervalId) {
                        btnEditorPreviewInVideoFrame.click();
                    }

                    editorBgImage = new Image();
                    editorBgImage.onload = () => {
                        drawEditorCanvas();
                    };
                    editorBgImage.src = finalDataUrl;
                });
            };
            reader.readAsDataURL(file);
        }
    }

    // Server conversion triggers
    if (btnEditorConvert) {
        btnEditorConvert.addEventListener("click", async () => {
            if (!editorOriginalImageFile) {
                alert(t("Vui lòng chọn một file ảnh hoặc SVG trước!"));
                return;
            }

            btnEditorConvert.disabled = true;
            btnEditorConvert.innerText = t("Đang chuyển đổi...");

            const formData = new FormData();
            formData.append("file", editorOriginalImageFile);
            formData.append("scale_factor", parseFloat(editorScale.value) || 0.1);
            formData.append("feed_rate", parseInt(editorFeedrate.value, 10) || 2000);
            formData.append("mode", editorMode.value);
            formData.append("algorithm", editorAlgo.value);
            formData.append("active_tab", typeof activeSketchTab !== "undefined" ? activeSketchTab : "sketch");

            if (editorAlgo.value === "sketch" || (typeof activeSketchTab !== "undefined" && activeSketchTab === "sketch")) {
                formData.append("clahe_clip_limit", parseFloat(document.getElementById("sketch-clahe-clip").value) || 1.5);
                formData.append("blur_size", parseInt(document.getElementById("sketch-blur-size").value, 10) || 3);
                formData.append("canny_ultra_low", parseInt(document.getElementById("sketch-canny-ultra-low").value, 10) || 5);
                formData.append("canny_ultra_high", parseInt(document.getElementById("sketch-canny-ultra-high").value, 10) || 25);
                formData.append("canny_medium_low", parseInt(document.getElementById("sketch-canny-medium-low").value, 10) || 20);
                formData.append("canny_medium_high", parseInt(document.getElementById("sketch-canny-medium-high").value, 10) || 60);
                formData.append("canny_strong_low", parseInt(document.getElementById("sketch-canny-strong-low").value, 10) || 50);
                formData.append("canny_strong_high", parseInt(document.getElementById("sketch-canny-strong-high").value, 10) || 120);
                formData.append("min_contour_len", parseInt(document.getElementById("sketch-min-contour-len").value, 10) || 5);
                formData.append("use_clahe", document.getElementById("sketch-use-clahe").checked);
                formData.append("use_blur", document.getElementById("sketch-use-blur").checked);
                formData.append("use_connect", document.getElementById("sketch-use-connect").checked);
                formData.append("use_thin", document.getElementById("sketch-use-thin").checked);
                formData.append("use_len_filter", document.getElementById("sketch-use-len-filter").checked);
            }

            if (editorAlgo.value === "handwriting" || (typeof activeSketchTab !== "undefined" && activeSketchTab === "handwriting")) {
                formData.append("handwriting_auto_invert", document.getElementById("hw-auto-invert")?.checked ? "true" : "false");
                formData.append("handwriting_use_otsu", document.getElementById("hw-use-otsu")?.checked ? "true" : "false");
                formData.append("handwriting_thresh_val", parseInt(document.getElementById("hw-thresh-val")?.value, 10) || 127);
                formData.append("handwriting_use_thinning", document.getElementById("hw-use-thinning")?.checked ? "true" : "false");
                formData.append("handwriting_use_smooth", document.getElementById("hw-use-smooth")?.checked ? "true" : "false");
                formData.append("handwriting_morph_kernel", parseInt(document.getElementById("hw-morph-kernel")?.value, 10) || 3);
                formData.append("handwriting_min_len", parseInt(document.getElementById("hw-min-len")?.value, 10) || 5);
                formData.append("handwriting_mode", document.getElementById("hw-mode")?.value || "centerline");
                formData.append("handwriting_raster_step", parseInt(document.getElementById("hw-raster-step")?.value, 10) || 2);
            }

            try {
                const res = await fetch("/api/gcode-editor/convert", {
                    method: "POST",
                    body: formData
                });
                const data = await res.json();
                btnEditorConvert.disabled = false;
                btnEditorConvert.innerText = t("Tạo G-Code");

                if (data.status === "ok") {
                    editorSegments = data.segments;
                    editorOriginalSegments = JSON.parse(JSON.stringify(data.segments));
                    editorOriginalGcodeText = data.gcode;
                    editorZoom = 1.0;
                    editorPan = { x: 0, y: 0 };

                    updateBoundingBox();
                    updateScale();
                    drawEditorCanvas();
                } else {
                    alert(t("Chuyển đổi thất bại: {message}", { message: data.message }));
                }
            } catch (err) {
                btnEditorConvert.disabled = false;
                btnEditorConvert.innerText = t("Tạo G-Code");
                alert(t("Lỗi kết nối máy chủ: {error}", { error: err }));
            }
        });
    }

    // Map bounding boxes and scaling
    function updateBoundingBox() {
        if (editorSegments.length === 0) {
            editorBoundingBox = { minX: 0, maxX: 120, minY: 0, maxY: 120 };
            return;
        }
        // const allX = editorSegments.map(s => s.x1).concat(editorSegments.map(s => s.x2));
        // const allY = editorSegments.map(s => s.y1).concat(editorSegments.map(s => s.y2));
        // editorBoundingBox = {
        //     minX: Math.min(...allX),
        //     maxX: Math.max(...allX),
        //     minY: Math.min(...allY),
        //     maxY: Math.max(...allY)
        // };
    }

    function updateScale() {
        const gcodeWidth = editorBoundingBox.maxX - editorBoundingBox.minX;
        const gcodeHeight = editorBoundingBox.maxY - editorBoundingBox.minY;
        const scaleX = (editorCanvas.width - padding * 2) / (gcodeWidth || 1);
        const scaleY = (editorCanvas.height - padding * 2) / (gcodeHeight || 1);
        scale = Math.min(scaleX, scaleY) || 1.0;
    }

    // Coordinates mapping math
    function realToCanvas(rx, ry) {
        const xOffset = rx - editorBoundingBox.minX;
        const yOffset = ry - editorBoundingBox.minY;

        const scaledX = padding + xOffset * scale;
        const scaledY = padding + yOffset * scale;

        const canvasX = (scaledX + editorPan.x) * editorZoom;
        const canvasY = (scaledY + editorPan.y) * editorZoom;

        return { x: canvasX, y: canvasY };
    }

    function canvasToReal(cx, cy) {
        const scaledX = (cx / editorZoom) - editorPan.x;
        const scaledY = (cy / editorZoom) - editorPan.y;

        const xOffset = (scaledX - padding) / scale;
        const yOffset = (scaledY - padding) / scale;

        const rx = xOffset + editorBoundingBox.minX;
        const ry = yOffset + editorBoundingBox.minY;

        return { x: rx, y: ry };
    }

    // Interactive Canvas drawing
    function drawEditorCanvas() {
        ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);

        // 1. Draw background image if present
        if (editorBgImage && editorBgImage.complete) {
            ctx.save();
            ctx.globalAlpha = 0.15;
            const pMin = realToCanvas(editorBoundingBox.minX, editorBoundingBox.minY);
            const pMax = realToCanvas(editorBoundingBox.maxX, editorBoundingBox.maxY);
            ctx.drawImage(editorBgImage, pMin.x, pMin.y, pMax.x - pMin.x, pMax.y - pMin.y);
            ctx.restore();
        }

        // 2. Draw origin coordinate axes helper (G54 home)
        ctx.save();
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        const gridStep = 10; // mm
        const xStart = Math.floor(editorBoundingBox.minX / gridStep) * gridStep;
        const xEnd = Math.ceil(editorBoundingBox.maxX / gridStep) * gridStep;
        const yStart = Math.floor(editorBoundingBox.minY / gridStep) * gridStep;
        const yEnd = Math.ceil(editorBoundingBox.maxY / gridStep) * gridStep;

        for (let gx = xStart; gx <= xEnd; gx += gridStep) {
            const p1 = realToCanvas(gx, yStart);
            const p2 = realToCanvas(gx, yEnd);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
        for (let gy = yStart; gy <= yEnd; gy += gridStep) {
            const p1 = realToCanvas(xStart, gy);
            const p2 = realToCanvas(xEnd, gy);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
        ctx.restore();

        // 3. Draw toolpath segments
        ctx.save();
        ctx.lineWidth = editorLineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        editorSegments.forEach((seg, idx) => {
            const p1 = realToCanvas(seg.x1, seg.y1);
            const p2 = realToCanvas(seg.x2, seg.y2);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if (editorCurrentMode === "delete" && idx === hoveredSegmentIndex) {
                ctx.strokeStyle = "#ff4b4b";
                ctx.lineWidth = editorLineWidth + 2;
            } else {
                ctx.strokeStyle = "#00d2ff";
                ctx.lineWidth = editorLineWidth;
            }
            ctx.stroke();
        });
        ctx.restore();

        // 4. Draw interactive nodes (edit points)
        if (editorCurrentMode === "edit") {
            ctx.save();
            editorSegments.forEach(seg => {
                const p1 = realToCanvas(seg.x1, seg.y1);
                const p2 = realToCanvas(seg.x2, seg.y2);
                [p1, p2].forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = "#ff4b4b";
                    ctx.fill();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "#fff";
                    ctx.stroke();
                });
            });
            ctx.restore();
        }

        // 5. Draw active stroke during hand drawing
        if (editorIsDrawingPath && editorDrawPathPoints.length > 0) {
            ctx.save();
            ctx.lineWidth = editorLineWidth;
            ctx.strokeStyle = "#ffb300";
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.beginPath();
            const pStart = realToCanvas(editorDrawPathPoints[0].x, editorDrawPathPoints[0].y);
            ctx.moveTo(pStart.x, pStart.y);
            for (let i = 1; i < editorDrawPathPoints.length; i++) {
                const p = realToCanvas(editorDrawPathPoints[i].x, editorDrawPathPoints[i].y);
                ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
            ctx.restore();
        }

        // Draw circular guide for eraser tool in delete mode
        if (editorCurrentMode === "delete" && lastMousePos) {
            ctx.save();
            ctx.strokeStyle = "rgba(255, 75, 75, 0.6)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(lastMousePos.x, lastMousePos.y, ERASER_RADIUS, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
        }

        editorStatusSegments.innerText = t("{count} nét vẽ", { count: editorSegments.length });
    }

    // Tools Toolbar click
    const btnTools = document.querySelectorAll(".btn-tool");
    btnTools.forEach(btn => {
        btn.addEventListener("click", () => {
            btnTools.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            editorCurrentMode = btn.dataset.mode;

            editorCanvas.className = "";
            editorCanvas.classList.add(editorCurrentMode + "-mode");
            drawEditorCanvas();
        });
    });

    // Line width slider listener
    if (sliderLineWidth) {
        sliderLineWidth.addEventListener("input", (e) => {
            editorLineWidth = parseFloat(e.target.value);
            valLineWidth.innerText = `${editorLineWidth} px`;
            drawEditorCanvas();
        });
    }

    // Distance helper from pixel coordinate to line segment
    function getDistanceToSegment(px, py, x1, y1, x2, y2) {
        const A = px - x1;
        const B = py - y1;
        const C = x2 - x1;
        const D = y2 - y1;

        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = -1;
        if (lenSq !== 0) param = dot / lenSq;

        let xx, yy;
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        const dx = px - xx;
        const dy = py - yy;
        return Math.hypot(dx, dy);
    }

    // Connected paths assembler
    function getConnectedPaths() {
        const paths = [];
        const used = new Set();
        const threshold = 0.05; // mm connection threshold

        while (used.size < editorSegments.length) {
            let startIdx = -1;
            for (let i = 0; i < editorSegments.length; i++) {
                if (!used.has(i)) {
                    startIdx = i;
                    break;
                }
            }
            if (startIdx === -1) break;

            const path = [];
            let seg = editorSegments[startIdx];
            path.push({ x: seg.x1, y: seg.y1, index: startIdx, end: "start" });
            path.push({ x: seg.x2, y: seg.y2, index: startIdx, end: "end" });
            used.add(startIdx);

            let growing = true;
            while (growing) {
                growing = false;
                const currentEnd = path[path.length - 1];
                for (let i = 0; i < editorSegments.length; i++) {
                    if (used.has(i)) continue;
                    const other = editorSegments[i];

                    if (Math.hypot(other.x1 - currentEnd.x, other.y1 - currentEnd.y) < threshold) {
                        path.push({ x: other.x2, y: other.y2, index: i, end: "end" });
                        used.add(i);
                        growing = true;
                        break;
                    }
                    if (Math.hypot(other.x2 - currentEnd.x, other.y2 - currentEnd.y) < threshold) {
                        path.push({ x: other.x1, y: other.y1, index: i, end: "start" });
                        used.add(i);
                        growing = true;
                        break;
                    }
                }
            }

            growing = true;
            while (growing) {
                growing = false;
                const currentStart = path[0];
                for (let i = 0; i < editorSegments.length; i++) {
                    if (used.has(i)) continue;
                    const other = editorSegments[i];

                    if (Math.hypot(other.x2 - currentStart.x, other.y2 - currentStart.y) < threshold) {
                        path.unshift({ x: other.x1, y: other.y1, index: i, end: "start" });
                        used.add(i);
                        growing = true;
                        break;
                    }
                    if (Math.hypot(other.x1 - currentStart.x, other.y1 - currentStart.y) < threshold) {
                        path.unshift({ x: other.x2, y: other.y2, index: i, end: "end" });
                        used.add(i);
                        growing = true;
                        break;
                    }
                }
            }
            paths.push(path);
        }
        return paths;
    }

    // Smooth drawing action
    if (btnSmooth) {
        btnSmooth.addEventListener("click", () => {
            if (editorSegments.length === 0) return;
            const paths = getConnectedPaths();
            const newSegments = [];

            paths.forEach(path => {
                if (path.length <= 2) {
                    path.forEach((pt, idx) => {
                        if (idx < path.length - 1) {
                            newSegments.push({
                                x1: pt.x, y1: pt.y,
                                x2: path[idx + 1].x, y2: path[idx + 1].y
                            });
                        }
                    });
                    return;
                }

                const smoothedPts = [];
                smoothedPts.push({ x: path[0].x, y: path[0].y });
                for (let i = 1; i < path.length - 1; i++) {
                    const prev = path[i - 1];
                    const curr = path[i];
                    const next = path[i + 1];
                    smoothedPts.push({
                        x: 0.25 * prev.x + 0.5 * curr.x + 0.25 * next.x,
                        y: 0.25 * prev.y + 0.5 * curr.y + 0.25 * next.y
                    });
                }
                smoothedPts.push({ x: path[path.length - 1].x, y: path[path.length - 1].y });

                for (let i = 0; i < smoothedPts.length - 1; i++) {
                    newSegments.push({
                        x1: smoothedPts[i].x, y1: smoothedPts[i].y,
                        x2: smoothedPts[i + 1].x, y2: smoothedPts[i + 1].y
                    });
                }
            });

            editorSegments = newSegments;
            drawEditorCanvas();
        });
    }

    // Straighten drawing action
    if (btnStraighten) {
        btnStraighten.addEventListener("click", () => {
            if (editorSegments.length === 0) return;
            const paths = getConnectedPaths();
            const newSegments = [];
            paths.forEach(path => {
                newSegments.push({
                    x1: path[0].x, y1: path[0].y,
                    x2: path[path.length - 1].x, y2: path[path.length - 1].y
                });
            });
            editorSegments = newSegments;
            drawEditorCanvas();
        });
    }

    // Canvas Mouse listeners
    editorCanvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        const zoomFactor = 1.15;
        const rect = editorCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const mouseRealBefore = canvasToReal(mouseX, mouseY);

        if (e.deltaY < 0) {
            editorZoom *= zoomFactor;
        } else {
            editorZoom /= zoomFactor;
        }
        editorZoom = Math.max(0.1, Math.min(20, editorZoom));

        const mouseCanvasAfter = realToCanvas(mouseRealBefore.x, mouseRealBefore.y);
        editorPan.x += (mouseX - mouseCanvasAfter.x) / editorZoom;
        editorPan.y += (mouseY - mouseCanvasAfter.y) / editorZoom;

        drawEditorCanvas();
    });

    editorCanvas.addEventListener("mousedown", (e) => {
        const rect = editorCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const realCoords = canvasToReal(mouseX, mouseY);

        const isRightClick = e.button === 2;
        const isMiddleClick = e.button === 1;
        const isLeftClickInMoveMode = e.button === 0 && editorCurrentMode === "move";

        if (isRightClick || isMiddleClick || isLeftClickInMoveMode) {
            isPanning = true;
            panStart = { x: e.clientX, y: e.clientY };
            e.preventDefault();
            return;
        }

        if (e.button === 0) {
            if (editorCurrentMode === "edit") {
                editorSelectedNode = null;
                const NODE_DETECTION_RADIUS = 10;
                for (let i = 0; i < editorSegments.length; i++) {
                    const seg = editorSegments[i];
                    const p1 = realToCanvas(seg.x1, seg.y1);
                    const p2 = realToCanvas(seg.x2, seg.y2);

                    if (Math.hypot(p1.x - mouseX, p1.y - mouseY) < NODE_DETECTION_RADIUS) {
                        editorSelectedNode = { index: i, type: "start" };
                        break;
                    }
                    if (Math.hypot(p2.x - mouseX, p2.y - mouseY) < NODE_DETECTION_RADIUS) {
                        editorSelectedNode = { index: i, type: "end" };
                        break;
                    }
                }
            } else if (editorCurrentMode === "delete") {
                // Drag-to-delete Brush Eraser: delete all segments within a radius of the cursor (15px)
                const remainingSegments = [];
                let changed = false;

                editorSegments.forEach(seg => {
                    const p1 = realToCanvas(seg.x1, seg.y1);
                    const p2 = realToCanvas(seg.x2, seg.y2);
                    const dist = getDistanceToSegment(mouseX, mouseY, p1.x, p1.y, p2.x, p2.y);
                    if (dist < ERASER_RADIUS) {
                        changed = true;
                    } else {
                        remainingSegments.push(seg);
                    }
                });

                if (changed) {
                    editorSegments = remainingSegments;
                    updateBoundingBox();
                    drawEditorCanvas();
                }
            } else if (editorCurrentMode === "draw") {
                editorIsDrawingPath = true;
                editorDrawPathPoints = [realCoords];
            } else if (editorCurrentMode === "delete-all") {
                editorSegments = []
                updateBoundingBox();
                drawEditorCanvas();
            }
        }
    });

    document.getElementById("gcode-editor-delete-all").addEventListener("click", () => {

        editorSegments = []
        updateBoundingBox();
        drawEditorCanvas();
    });

    window.addEventListener("mousemove", (e) => {
        if (isPanning) {
            const dx = (e.clientX - panStart.x) / editorZoom;
            const dy = (e.clientY - panStart.y) / editorZoom;
            editorPan.x += dx;
            editorPan.y += dy;
            panStart = { x: e.clientX, y: e.clientY };
            drawEditorCanvas();
            return;
        }

        const rect = editorCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const realCoords = canvasToReal(mouseX, mouseY);

        if (mouseX >= 0 && mouseX <= editorCanvas.width && mouseY >= 0 && mouseY <= editorCanvas.height) {
            editorStatusCoords.innerText = `X: ${realCoords.x.toFixed(1)}, Y: ${realCoords.y.toFixed(1)} mm`;
        }

        if (editorCurrentMode === "edit" && editorSelectedNode) {
            const seg = editorSegments[editorSelectedNode.index];
            const oldX = editorSelectedNode.type === "start" ? seg.x1 : seg.x2;
            const oldY = editorSelectedNode.type === "start" ? seg.y1 : seg.y2;

            let newX = realCoords.x;
            let newY = realCoords.y;

            if (isShiftPressed) {
                if (editorSelectedNode.type === "start") {
                    if (Math.abs(newX - seg.x2) < Math.abs(newY - seg.y2)) {
                        newX = seg.x2;
                    } else {
                        newY = seg.y2;
                    }
                } else {
                    if (Math.abs(newX - seg.x1) < Math.abs(newY - seg.y1)) {
                        newX = seg.x1;
                    } else {
                        newY = seg.y1;
                    }
                }
            }

            editorSegments.forEach((otherSeg) => {
                const threshold = 0.01;
                if (Math.abs(otherSeg.x1 - oldX) < threshold && Math.abs(otherSeg.y1 - oldY) < threshold) {
                    otherSeg.x1 = newX;
                    otherSeg.y1 = newY;
                }
                if (Math.abs(otherSeg.x2 - oldX) < threshold && Math.abs(otherSeg.y2 - oldY) < threshold) {
                    otherSeg.x2 = newX;
                    otherSeg.y2 = newY;
                }
            });

            if (editorSelectedNode.type === "start") {
                seg.x1 = newX;
                seg.y1 = newY;
            } else {
                seg.x2 = newX;
                seg.y2 = newY;
            }

            drawEditorCanvas();
        } else if (editorCurrentMode === "delete") {
            // Track last mouse position for guide rendering
            lastMousePos = { x: mouseX, y: mouseY };

            // If dragging (left button down), erase segments
            if (e.buttons === 1) {
                const ERASER_RADIUS = 15; // pixels
                const remainingSegments = [];
                let changed = false;

                editorSegments.forEach(seg => {
                    const p1 = realToCanvas(seg.x1, seg.y1);
                    const p2 = realToCanvas(seg.x2, seg.y2);
                    const dist = getDistanceToSegment(mouseX, mouseY, p1.x, p1.y, p2.x, p2.y);
                    if (dist < ERASER_RADIUS) {
                        changed = true;
                    } else {
                        remainingSegments.push(seg);
                    }
                });

                if (changed) {
                    editorSegments = remainingSegments;
                    updateBoundingBox();
                }
            }
            drawEditorCanvas();
        } else if (editorCurrentMode === "draw" && editorIsDrawingPath) {
            const lastPt = editorDrawPathPoints[editorDrawPathPoints.length - 1];
            if (Math.hypot(realCoords.x - lastPt.x, realCoords.y - lastPt.y) > 0.5) {
                editorDrawPathPoints.push(realCoords);
                drawEditorCanvas();
            }
        }
    });

    // Clear last mouse position on mouseleave to hide eraser guide
    editorCanvas.addEventListener("mouseleave", () => {
        lastMousePos = null;
        drawEditorCanvas();
    });

    window.addEventListener("mouseup", () => {
        if (editorSelectedNode) {
            editorSelectedNode = null;
            updateBoundingBox();
        }
        if (editorIsDrawingPath) {
            editorIsDrawingPath = false;
            if (editorDrawPathPoints.length > 1) {
                // Snap start and end points of hand-drawn path to existing endpoints if close
                const snapThreshold = 6.0; // mm (about 15-20 pixels depending on scale)
                let startPt = editorDrawPathPoints[0];
                let endPt = editorDrawPathPoints[editorDrawPathPoints.length - 1];
                let minStartDist = snapThreshold;
                let snapStartPt = null;
                let minEndDist = snapThreshold;
                let snapEndPt = null;

                editorSegments.forEach(seg => {
                    const dS1 = Math.hypot(seg.x1 - startPt.x, seg.y1 - startPt.y);
                    if (dS1 < minStartDist) {
                        minStartDist = dS1;
                        snapStartPt = { x: seg.x1, y: seg.y1 };
                    }
                    const dS2 = Math.hypot(seg.x2 - startPt.x, seg.y2 - startPt.y);
                    if (dS2 < minStartDist) {
                        minStartDist = dS2;
                        snapStartPt = { x: seg.x2, y: seg.y2 };
                    }

                    const dE1 = Math.hypot(seg.x1 - endPt.x, seg.y1 - endPt.y);
                    if (dE1 < minEndDist) {
                        minEndDist = dE1;
                        snapEndPt = { x: seg.x1, y: seg.y1 };
                    }
                    const dE2 = Math.hypot(seg.x2 - endPt.x, seg.y2 - endPt.y);
                    if (dE2 < minEndDist) {
                        minEndDist = dE2;
                        snapEndPt = { x: seg.x2, y: seg.y2 };
                    }
                });

                if (snapStartPt) {
                    editorDrawPathPoints[0].x = snapStartPt.x;
                    editorDrawPathPoints[0].y = snapStartPt.y;
                }
                if (snapEndPt) {
                    editorDrawPathPoints[editorDrawPathPoints.length - 1].x = snapEndPt.x;
                    editorDrawPathPoints[editorDrawPathPoints.length - 1].y = snapEndPt.y;
                }

                // Add the new hand-drawn segments
                for (let i = 0; i < editorDrawPathPoints.length - 1; i++) {
                    editorSegments.push({
                        x1: editorDrawPathPoints[i].x,
                        y1: editorDrawPathPoints[i].y,
                        x2: editorDrawPathPoints[i + 1].x,
                        y2: editorDrawPathPoints[i + 1].y
                    });
                }

                // Auto-smooth the connected paths that were modified to ensure smooth continuous lines
                const paths = getConnectedPaths();
                const newSegments = [];

                paths.forEach(path => {
                    if (path.length <= 2) {
                        // Single segment paths don't need smoothing
                        path.forEach((pt, idx) => {
                            if (idx < path.length - 1) {
                                newSegments.push({
                                    x1: pt.x, y1: pt.y,
                                    x2: path[idx + 1].x, y2: path[idx + 1].y
                                });
                            }
                        });
                        return;
                    }

                    // Apply moving average to smooth the path
                    const smoothedPts = [];
                    smoothedPts.push({ x: path[0].x, y: path[0].y });
                    for (let i = 1; i < path.length - 1; i++) {
                        const prev = path[i - 1];
                        const curr = path[i];
                        const next = path[i + 1];
                        smoothedPts.push({
                            x: 0.25 * prev.x + 0.5 * curr.x + 0.25 * next.x,
                            y: 0.25 * prev.y + 0.5 * curr.y + 0.25 * next.y
                        });
                    }
                    smoothedPts.push({ x: path[path.length - 1].x, y: path[path.length - 1].y });

                    for (let i = 0; i < smoothedPts.length - 1; i++) {
                        newSegments.push({
                            x1: smoothedPts[i].x, y1: smoothedPts[i].y,
                            x2: smoothedPts[i + 1].x, y2: smoothedPts[i + 1].y
                        });
                    }
                });

                editorSegments = newSegments;
                updateBoundingBox();
                drawEditorCanvas();
            }
            editorDrawPathPoints = [];
        }
    });

    // G-code text builder
    function generateGcodeFromSegments() {
        const paths = getConnectedPaths();
        const feedrate = parseInt(editorFeedrate.value, 10) || 2000;
        const mode = editorMode.value;

        let penDownCmd, penUpCmd;
        if (mode === "servo") {
            penDownCmd = "M3 S90 ; Ha but\nG4 P0.2";
            penUpCmd = "M3 S10 ; Nhac but\nG4 P0.2";
        } else {
            penDownCmd = "G1 Z-1.0 F500 ; Ha dao";
            penUpCmd = "G0 Z2.0 ; Nhac dao";
        }

        const lines = [];
        lines.push(";--- G-CODE GENERATED BY G-CODE EDITOR ---");
        lines.push("G21 ; Don vi: mm");
        lines.push("G90 ; Toa do tuyet doi");
        if (mode !== "servo") {
            lines.push("G0 Z2.0");
        }
        lines.push(`F${feedrate}`);
        lines.push("");

        // Sort paths: longest arc-length first (cập nhật 32)
        const pathLength = (path) => {
            let len = 0;
            for (let i = 1; i < path.length; i++) {
                const dx = path[i].x - path[i - 1].x;
                const dy = path[i].y - path[i - 1].y;
                len += Math.sqrt(dx * dx + dy * dy);
            }
            return len;
        };
        paths.sort((a, b) => pathLength(b) - pathLength(a));

        paths.forEach((path, idx) => {
            if (path.length === 0) return;
            lines.push(`; --- Path ${idx + 1} ---`);
            const start = path[0];
            lines.push(`G0 X${start.x.toFixed(3)} Y${start.y.toFixed(3)}`);
            lines.push(penDownCmd);
            for (let i = 1; i < path.length; i++) {
                const pt = path[i];
                lines.push(`G1 X${pt.x.toFixed(3)} Y${pt.y.toFixed(3)}`);
            }
            lines.push(penUpCmd);
            lines.push("");
        });

        lines.push(";--- END OF PROGRAM ---");
        if (mode !== "servo") {
            lines.push("G0 Z2.0");
        }
        lines.push("G0 X0 Y0");
        lines.push("M30");

        return lines.join("\n");
    }

    // Download triggers
    if (btnSaveOrigImg) {
        btnSaveOrigImg.addEventListener("click", () => {
            if (!editorOriginalImageBase64) return;
            const a = document.createElement("a");
            a.href = editorOriginalImageBase64;
            a.download = "original_" + (editorOriginalFilename || "image.png");
            a.click();
        });
    }

    if (btnSaveOrigGcode) {
        btnSaveOrigGcode.addEventListener("click", () => {
            if (!editorOriginalGcodeText) return;
            const blob = new Blob([editorOriginalGcodeText], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "original_" + (editorOriginalFilename ? editorOriginalFilename.replace(/\.[^/.]+$/, "") : "output") + ".nc";
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    if (btnSaveEditGcode) {
        btnSaveEditGcode.addEventListener("click", () => {
            if (editorSegments.length === 0) return;
            const gcode = generateGcodeFromSegments();
            const blob = new Blob([gcode], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "edited_" + (editorOriginalFilename ? editorOriginalFilename.replace(/\.[^/.]+$/, "") : "draw") + ".gcode";
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    // Helper to reconstruct File object from Base64 string (Cập nhật 25)
    function dataURLtoFile(dataurl, filename) {
        if (!dataurl || !dataurl.includes(",")) return null;
        try {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        } catch (e) {
            console.error("Failed to parse data URL to File object:", e);
            return null;
        }
    }

    // Helper to check and resize image if width or height > 720px (Cập nhật 29)
    function resizeImageIfNeeded(dataUrl, fileName, mimeType, callback) {
        const img = new Image();
        img.onload = () => {
            let w = img.width;
            let h = img.height;
            let finalDataUrl = dataUrl;

            if (w > 720 || h > 720) {
                if (w > h) {
                    h = Math.round((h * 720) / w);
                    w = 720;
                } else {
                    w = Math.round((w * 720) / h);
                    h = 720;
                }
                const canvas = document.createElement("canvas");
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, w, h);

                const mime = mimeType || "image/png";
                finalDataUrl = canvas.toDataURL(mime);
                console.log(`Resized image ${fileName} from ${img.width}x${img.height} to ${w}x${h}`);
            }
            const finalFile = dataURLtoFile(finalDataUrl, fileName);
            callback(finalFile, finalDataUrl);
        };
        img.src = dataUrl;
    }

    if (btnSaveProject) {
        btnSaveProject.addEventListener("click", async () => {
            const project = {
                version: "1.0",
                originalFilename: editorOriginalFilename,
                originalImageBase64: editorOriginalImageBase64,
                originalGcodeText: editorOriginalGcodeText,
                editedGcodeText: generateGcodeFromSegments(), // Include edited Gcode text (Cập nhật 25)
                editorScale: parseFloat(editorScale.value),
                editorFeedrate: parseInt(editorFeedrate.value, 10),
                editorZMode: editorMode.value,
                editorAlgo: editorAlgo.value,
                editorLineWidth: editorLineWidth,
                originalSegments: editorOriginalSegments,
                segments: editorSegments,
                sketchClaheClip: parseFloat(document.getElementById("sketch-clahe-clip").value),
                sketchBlurSize: parseInt(document.getElementById("sketch-blur-size").value, 10),
                sketchCannyUltraLow: parseInt(document.getElementById("sketch-canny-ultra-low").value, 10),
                sketchCannyUltraHigh: parseInt(document.getElementById("sketch-canny-ultra-high").value, 10),
                sketchCannyMediumLow: parseInt(document.getElementById("sketch-canny-medium-low").value, 10),
                sketchCannyMediumHigh: parseInt(document.getElementById("sketch-canny-medium-high").value, 10),
                sketchCannyStrongLow: parseInt(document.getElementById("sketch-canny-strong-low").value, 10),
                sketchCannyStrongHigh: parseInt(document.getElementById("sketch-canny-strong-high").value, 10),
                sketchMinContourLen: parseInt(document.getElementById("sketch-min-contour-len").value, 10),
                sketchUseClahe: document.getElementById("sketch-use-clahe").checked,
                sketchUseBlur: document.getElementById("sketch-use-blur").checked,
                sketchUseConnect: document.getElementById("sketch-use-connect").checked,
                sketchUseThin: document.getElementById("sketch-use-thin").checked,
                sketchUseLenFilter: document.getElementById("sketch-use-len-filter").checked
            };
            const jsonString = JSON.stringify(project, null, 2);

            // Check if showSaveFilePicker is available (File System Access API)
            if (window.showSaveFilePicker) {
                const options = {
                    suggestedName: "project_" + (editorOriginalFilename ? editorOriginalFilename.replace(/\.[^/.]+$/, "") : "unnamed") + ".json",
                    types: [{
                        description: 'JSON Project Files',
                        accept: {
                            'application/json': ['.json'],
                        }
                    }],
                };
                try {
                    const handle = await window.showSaveFilePicker(options);
                    const writable = await handle.createWritable();
                    await writable.write(jsonString);
                    await writable.close();
                    logSystemMessage(t("Lưu dự án thành công bằng trình chọn file."));
                } catch (err) {
                    // If user cancels the dialog, do nothing. If error occurs, fallback.
                    if (err.name !== 'AbortError') {
                        console.error(t("Trình chọn file lưu dự án thất bại, đang chuyển hướng sang tải xuống tiêu chuẩn:"), err);
                        fallbackDownload(jsonString);
                    }
                }
            } else {
                fallbackDownload(jsonString);
            }

            function fallbackDownload(content) {
                const blob = new Blob([content], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "project_" + (editorOriginalFilename ? editorOriginalFilename.replace(/\.[^/.]+$/, "") : "unnamed") + ".json";
                a.click();
                URL.revokeObjectURL(url);
                logSystemMessage(t("Dự án đã được tải xuống thành công."));
            }
        });
    }

    if (btnLoadProjectTrigger) {
        btnLoadProjectTrigger.addEventListener("click", () => editorProjectInput.click());
    }

    if (editorProjectInput) {
        editorProjectInput.addEventListener("change", () => {
            if (editorProjectInput.files.length === 0) return;
            const file = editorProjectInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    editorOriginalFilename = data.originalFilename || "";
                    editorOriginalImageBase64 = data.originalImageBase64 || "";
                    editorOriginalGcodeText = data.originalGcodeText || "";
                    editorScale.value = data.editorScale !== undefined ? data.editorScale : "0.1";
                    editorFeedrate.value = data.editorFeedrate !== undefined ? data.editorFeedrate : "2000";
                    editorMode.value = data.editorZMode || "servo";
                    editorAlgo.value = data.editorAlgo || "centerline";
                    editorSegments = data.segments || [];
                    editorOriginalSegments = data.originalSegments || JSON.parse(JSON.stringify(editorSegments));

                    // Load sketch settings if present
                    if (data.sketchClaheClip !== undefined) document.getElementById("sketch-clahe-clip").value = data.sketchClaheClip;
                    if (data.sketchBlurSize !== undefined) document.getElementById("sketch-blur-size").value = data.sketchBlurSize;
                    if (data.sketchCannyUltraLow !== undefined) document.getElementById("sketch-canny-ultra-low").value = data.sketchCannyUltraLow;
                    if (data.sketchCannyUltraHigh !== undefined) document.getElementById("sketch-canny-ultra-high").value = data.sketchCannyUltraHigh;
                    if (data.sketchCannyMediumLow !== undefined) document.getElementById("sketch-canny-medium-low").value = data.sketchCannyMediumLow;
                    if (data.sketchCannyMediumHigh !== undefined) document.getElementById("sketch-canny-medium-high").value = data.sketchCannyMediumHigh;
                    if (data.sketchCannyStrongLow !== undefined) document.getElementById("sketch-canny-strong-low").value = data.sketchCannyStrongLow;
                    if (data.sketchCannyStrongHigh !== undefined) document.getElementById("sketch-canny-strong-high").value = data.sketchCannyStrongHigh;
                    if (data.sketchMinContourLen !== undefined) document.getElementById("sketch-min-contour-len").value = data.sketchMinContourLen;
                    if (data.sketchUseClahe !== undefined) document.getElementById("sketch-use-clahe").checked = data.sketchUseClahe;
                    if (data.sketchUseBlur !== undefined) document.getElementById("sketch-use-blur").checked = data.sketchUseBlur;
                    if (data.sketchUseConnect !== undefined) document.getElementById("sketch-use-connect").checked = data.sketchUseConnect;
                    if (data.sketchUseThin !== undefined) document.getElementById("sketch-use-thin").checked = data.sketchUseThin;
                    if (data.sketchUseLenFilter !== undefined) document.getElementById("sketch-use-len-filter").checked = data.sketchUseLenFilter;

                    // Trigger input event to update displays
                    sketchParams.forEach(param => {
                        const input = document.getElementById(param.id);
                        if (input) input.dispatchEvent(new Event("input"));
                    });

                    // Trigger change to update side-menu visibility
                    editorAlgo.dispatchEvent(new Event("change"));

                    if (data.editorLineWidth !== undefined) {
                        editorLineWidth = data.editorLineWidth;
                        if (sliderLineWidth) sliderLineWidth.value = editorLineWidth;
                        if (valLineWidth) valLineWidth.innerText = `${editorLineWidth} px`;
                    }

                    editorFileName.innerText = editorOriginalFilename || "project.json";
                    editorDropZone.classList.add("hidden");
                    editorFileInfo.classList.remove("hidden");

                    const finalizeLoad = (finalFile, finalDataUrl) => {
                        editorOriginalImageFile = finalFile;
                        editorOriginalImageBase64 = finalDataUrl;
                        if (finalDataUrl) {
                            editorBgImage = new Image();
                            editorBgImage.onload = () => {
                                drawEditorCanvas();
                            };
                            editorBgImage.src = finalDataUrl;
                        } else {
                            editorBgImage = null;
                        }

                        editorZoom = 1.0;
                        editorPan = { x: 0, y: 0 };
                        updateBoundingBox();
                        updateScale();
                        drawEditorCanvas();
                    };

                    // Reconstruct editorOriginalImageFile so parameters tweak & re-converts work (Cập nhật 25 & 29)
                    if (editorOriginalImageBase64) {
                        if (!editorOriginalFilename.toLowerCase().endsWith(".svg")) {
                            resizeImageIfNeeded(editorOriginalImageBase64, editorOriginalFilename || "image.png", "", (finalFile, finalDataUrl) => {
                                finalizeLoad(finalFile, finalDataUrl);
                            });
                        } else {
                            const fileObj = dataURLtoFile(editorOriginalImageBase64, editorOriginalFilename || "image.png");
                            finalizeLoad(fileObj, editorOriginalImageBase64);
                        }
                    } else {
                        finalizeLoad(null, "");
                    }
                } catch (err) {
                    alert(t("Lỗi tải project: JSON không hợp lệ. ") + err);
                }
            };
            reader.readAsText(file);
            editorProjectInput.value = "";
        });
    }

    // CNC Stream Execution Trigger
    if (btnEditorExecute) {
        btnEditorExecute.addEventListener("click", async () => {
            // Stop preview before execution to release resources (Cập nhật 27)
            stopPreviewInVideoFrame();

            if (editorSegments.length === 0) {
                alert(t("Không có đường vẽ nào để thực hiện!"));
                return;
            }

            btnEditorExecute.disabled = true;
            btnEditorExecute.innerText = t("Đang gửi G-Code...");

            const gcode = generateGcodeFromSegments();

            try {
                const res = await fetch("/api/gcode-editor/set-gcode", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ gcode: gcode })
                });
                const data = await res.json();
                btnEditorExecute.disabled = false;
                btnEditorExecute.innerText = t("⚡ Thực hiện vẽ (Chạy CNC)");

                if (data.status === "ok") {
                    logSystemMessage(t("Đã nạp G-Code thành công lên máy chủ ({count} dòng).", { count: data.lines_count }));

                    toolpathPoints = parseGcode(gcode);
                    calculateBoundingBox();
                    resetCanvasView();

                    loadedFileName.innerText = "edited_" + (editorOriginalFilename ? editorOriginalFilename.replace(/\.[^/.]+$/, "") : "editor") + ".gcode";
                    loadedFileLines.innerText = t("{count} dòng", { count: data.lines_count });
                    fileDropZone.classList.add("hidden");
                    fileInfoContainer.classList.remove("hidden");
                    btnStartStream.disabled = !isConnected;

                    // panelGcodeEditor.classList.add("hidden");

                    if (isConnected) {
                        btnStartStream.click();
                    } else {
                        alert(t("G-Code đã được nạp lên máy vẽ. Hãy kết nối CNC để bắt đầu."));
                    }
                } else {
                    alert(t("Gửi G-Code thất bại: {message}", { message: data.message }));
                }
            } catch (err) {
                btnEditorExecute.disabled = false;
                btnEditorExecute.innerText = t("⚡ Thực hiện vẽ (Chạy CNC)");
                alert(t("Lỗi mạng: {error}", { error: err }));
            }
        });
    }

    // --- Camera Feed G-Code Preview Logic (Cập nhật 27) ---

    if (btnEditorPreviewInVideoFrame) {
        btnEditorPreviewInVideoFrame.addEventListener("click", async () => {
            if (previewIntervalId) {
                stopPreviewInVideoFrame();
                return;
            }

            // Start preview mode
            btnEditorPreviewInVideoFrame.classList.add("active");
            btnEditorPreviewInVideoFrame.innerText = t("Dừng xem trước");
            logSystemMessage(t("Đang bắt đầu xem trước G-Code trực tiếp trên hình ảnh camera..."));

            // Ensure camera panel is expanded
            const cameraFloatingPanel = document.getElementById("camera-floating-panel");
            const btnCameraToggle = document.getElementById("btn-camera-toggle");
            if (cameraFloatingPanel && cameraFloatingPanel.classList.contains("collapsed")) {
                if (btnCameraToggle) btnCameraToggle.click();
            }

            // Ensure object detection is checked
            const chkDetectObjects = document.getElementById("chk-detect-objects");
            if (chkDetectObjects && !chkDetectObjects.checked) {
                chkDetectObjects.checked = true;
                chkDetectObjects.dispatchEvent(new Event("change"));
            }

            // Poll and draw every 300ms
            previewIntervalId = setInterval(async () => {
                await drawPreviewOnCamera();
            }, 300);
        });
    }

    function stopPreviewInVideoFrame() {
        if (previewIntervalId) {
            clearInterval(previewIntervalId);
            previewIntervalId = null;
        }
        if (btnEditorPreviewInVideoFrame) {
            btnEditorPreviewInVideoFrame.classList.remove("active");
            btnEditorPreviewInVideoFrame.innerText = t("Xem trước");
        }
        // Clear overlay canvas
        const overlayCanvas = document.getElementById("camera-overlay-canvas");
        if (overlayCanvas) {
            const ctx = overlayCanvas.getContext("2d");
            ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        }
        logSystemMessage(t("Đã dừng xem trước G-Code trên camera."));
    }

    async function drawPreviewOnCamera() {
        const overlayCanvas = document.getElementById("camera-overlay-canvas");
        if (!overlayCanvas) return;
        const ctx = overlayCanvas.getContext("2d");

        const cameraStreamImg = document.getElementById("camera-stream-img");
        if (!cameraStreamImg) return;

        // Set logical dimensions of canvas to match natural resolution of video frame
        const w = cameraStreamImg.naturalWidth || 1280;
        const h = cameraStreamImg.naturalHeight || 720;
        if (overlayCanvas.width !== w || overlayCanvas.height !== h) {
            overlayCanvas.width = w;
            overlayCanvas.height = h;
        }

        ctx.clearRect(0, 0, w, h);

        if (editorSegments.length === 0) return;

        try {
            const res = await fetch("/api/calibration/status");
            const data = await res.json();

            const M = data.calibration_matrix;
            if (!M || M.length !== 3) {
                // Not calibrated yet
                ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
                ctx.font = "bold 20px sans-serif";
                ctx.fillText(t("⚠️ Camera chưa hiệu chỉnh!"), 20, 40);
                return;
            }

            // Find cnchead position in YOLO detections (Cập nhật 27: class_id=0 hoặc class_name=cnchead)
            const head = data.yolo_detections ? data.yolo_detections.find(d => d.class_id === 0 || d.class_name === "cnchead") : null;
            if (!head) {
                ctx.fillStyle = "rgba(255, 165, 0, 0.8)";
                ctx.font = "bold 16px sans-serif";
                ctx.fillText(t("⚠️ Đang tìm đầu CNC (cnchead)..."), 20, 40);
                return;
            }

            // Head pixel coordinates
            const cx = head.center[0];
            const cy = head.center[1];

            // 1. Calculate head workspace coordinates: W_head = M * [cx, cy, 1]
            const head_w_x = M[0][0] * cx + M[0][1] * cy + M[0][2];
            const head_w_y = M[1][0] * cx + M[1][1] * cy + M[1][2];
            const head_w_z = M[2][0] * cx + M[2][1] * cy + M[2][2];
            if (Math.abs(head_w_z) < 1e-8) return;
            const wx = head_w_x / head_w_z;
            const wy = head_w_y / head_w_z;

            // 2. Compute M_inv to map absolute workspace coordinate back to camera pixels
            const M_inv = invert3x3(M);
            if (!M_inv) return;

            // // 3. Draw head position bounding box highlight
            // const bbox = head.bbox; // [x1, y1, x2, y2]
            // ctx.strokeStyle = "rgba(0, 255, 0, 0.6)";
            // ctx.lineWidth = 2;
            // ctx.strokeRect(bbox[0], bbox[1], bbox[2] - bbox[0], bbox[3] - bbox[1]);
            // ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
            // ctx.font = "12px sans-serif";
            // ctx.fillText("CNC Head", bbox[0], bbox[1] - 5);

            // 4. Draw G-Code segments relative to head position
            ctx.strokeStyle = "rgba(255, 0, 128, 0.85)"; // vibrant magenta
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            editorSegments.forEach(seg => {
                // segment coordinates relative to head starting position (which is 0,0)
                const abs_w_x1 = wx + seg.x1;
                const abs_w_y1 = wy + seg.y1;
                const abs_w_x2 = wx + seg.x2;
                const abs_w_y2 = wy + seg.y2;

                // Map back to pixels
                const p1 = workspaceToPixel(M_inv, abs_w_x1, abs_w_y1);
                const p2 = workspaceToPixel(M_inv, abs_w_x2, abs_w_y2);

                if (p1 && p2) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });

            if (activeScenario) {
                if (typeof drawScenarioOnCamera === "function") {
                    drawScenarioOnCamera(ctx, w, h);
                }
            }

        } catch (err) {
            console.error(t("Lỗi vẽ xem trước G-Code trên khung hình camera:"), err);
        }
    }

    // Matrix inversion helper
    function invert3x3(m) {
        const a = m[0][0], b = m[0][1], c = m[0][2];
        const d = m[1][0], e = m[1][1], f = m[1][2];
        const g = m[2][0], h = m[2][1], i = m[2][2];

        const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
        if (Math.abs(det) < 1e-8) return null;

        const invdet = 1.0 / det;
        return [
            [
                (e * i - f * h) * invdet,
                (c * h - b * i) * invdet,
                (b * f - c * e) * invdet
            ],
            [
                (f * g - d * i) * invdet,
                (a * i - c * g) * invdet,
                (c * d - a * f) * invdet
            ],
            [
                (d * h - e * g) * invdet,
                (b * g - a * h) * invdet,
                (a * e - b * d) * invdet
            ]
        ];
    }

    // Workspace to camera pixel coordinates mapper
    function workspaceToPixel(M_inv, wx, wy) {
        const px = M_inv[0][0] * wx + M_inv[0][1] * wy + M_inv[0][2];
        const py = M_inv[1][0] * wx + M_inv[1][1] * wy + M_inv[1][2];
        const pz = M_inv[2][0] * wx + M_inv[2][1] * wy + M_inv[2][2];
        if (Math.abs(pz) < 1e-8) return null;
        return { x: px / pz, y: py / pz };
    }

    // --- Sketch Sidebar Controls & Auto-reconversion with Debounce ---
    let activeSketchTab = "sketch";

    function switchSketchTab(tabName) {
        activeSketchTab = tabName;
        const btnSketch = document.getElementById("tab-btn-sketch");
        const btnHw = document.getElementById("tab-btn-handwriting");
        const contentSketch = document.getElementById("tab-content-sketch");
        const contentHw = document.getElementById("tab-content-handwriting");
        const sidebar = document.getElementById("editor-sketch-sidebar");

        if (tabName === "handwriting") {
            if (btnSketch) btnSketch.classList.remove("active");
            if (btnHw) btnHw.classList.add("active");
            if (contentSketch) contentSketch.classList.add("hidden");
            if (contentHw) contentHw.classList.remove("hidden");
            if (editorAlgo) editorAlgo.value = "handwriting";
        } else {
            if (btnHw) btnHw.classList.remove("active");
            if (btnSketch) btnSketch.classList.add("active");
            if (contentHw) contentHw.classList.add("hidden");
            if (contentSketch) contentSketch.classList.remove("hidden");
            if (editorAlgo && editorAlgo.value === "handwriting") editorAlgo.value = "sketch";
        }
        if (panelGcodeEditor) panelGcodeEditor.classList.add("wide");
        if (sidebar) sidebar.classList.remove("hidden");
        resizeEditorCanvas();
        drawEditorCanvas();
    }

    const tabBtnSketch = document.getElementById("tab-btn-sketch");
    const tabBtnHandwriting = document.getElementById("tab-btn-handwriting");
    if (tabBtnSketch) {
        tabBtnSketch.addEventListener("click", () => {
            switchSketchTab("sketch");
            if (editorOriginalImageFile) debouncedConvert();
        });
    }
    if (tabBtnHandwriting) {
        tabBtnHandwriting.addEventListener("click", () => {
            switchSketchTab("handwriting");
            if (editorOriginalImageFile) debouncedConvert();
        });
    }

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const debouncedConvert = debounce(() => {
        if (editorOriginalImageFile && (editorAlgo.value === "sketch" || editorAlgo.value === "handwriting")) {
            btnEditorConvert.click();
        }
    }, 250);

    sketchParams.forEach(param => {
        const input = document.getElementById(param.id);
        const display = document.getElementById(param.valId);
        if (input && display) {
            input.addEventListener("input", () => {
                display.innerText = input.value + param.suffix;
                debouncedConvert();
            });
        }
    });

    const chkUseClahe = document.getElementById("sketch-use-clahe");
    const chkUseBlur = document.getElementById("sketch-use-blur");
    const chkUseConnect = document.getElementById("sketch-use-connect");
    const chkUseThin = document.getElementById("sketch-use-thin");
    const chkUseLenFilter = document.getElementById("sketch-use-len-filter");
    if (chkUseClahe) chkUseClahe.addEventListener("change", () => debouncedConvert());
    if (chkUseBlur) chkUseBlur.addEventListener("change", () => debouncedConvert());
    if (chkUseConnect) chkUseConnect.addEventListener("change", () => debouncedConvert());
    if (chkUseThin) chkUseThin.addEventListener("change", () => debouncedConvert());
    if (chkUseLenFilter) chkUseLenFilter.addEventListener("change", () => debouncedConvert());

    // Handwriting controls listeners
    const hwAutoInvert = document.getElementById("hw-auto-invert");
    const hwUseOtsu = document.getElementById("hw-use-otsu");
    const hwUseThinning = document.getElementById("hw-use-thinning");
    const hwUseSmooth = document.getElementById("hw-use-smooth");
    const hwMode = document.getElementById("hw-mode");
    const hwThreshVal = document.getElementById("hw-thresh-val");
    const valHwThreshVal = document.getElementById("val-hw-thresh-val");
    const groupHwThreshVal = document.getElementById("group-hw-thresh-val");
    const hwMorphKernel = document.getElementById("hw-morph-kernel");
    const valHwMorphKernel = document.getElementById("val-hw-morph-kernel");
    const hwMinLen = document.getElementById("hw-min-len");
    const valHwMinLen = document.getElementById("val-hw-min-len");

    const hwRasterStep = document.getElementById("hw-raster-step");
    const valHwRasterStep = document.getElementById("val-hw-raster-step");
    const groupHwRasterStep = document.getElementById("group-hw-raster-step");

    if (hwAutoInvert) hwAutoInvert.addEventListener("change", () => debouncedConvert());
    if (hwUseOtsu) {
        hwUseOtsu.addEventListener("change", () => {
            if (groupHwThreshVal) {
                groupHwThreshVal.style.display = hwUseOtsu.checked ? "none" : "block";
            }
            debouncedConvert();
        });
    }
    if (hwUseThinning) hwUseThinning.addEventListener("change", () => debouncedConvert());
    if (hwUseSmooth) hwUseSmooth.addEventListener("change", () => debouncedConvert());
    if (hwMode) {
        hwMode.addEventListener("change", () => {
            if (groupHwRasterStep) {
                groupHwRasterStep.style.display = (hwMode.value === "raster") ? "block" : "none";
            }
            debouncedConvert();
        });
    }
    if (hwRasterStep && valHwRasterStep) {
        hwRasterStep.addEventListener("input", () => {
            valHwRasterStep.innerText = `${hwRasterStep.value} px`;
            debouncedConvert();
        });
    }
    if (hwThreshVal && valHwThreshVal) {
        hwThreshVal.addEventListener("input", () => {
            valHwThreshVal.innerText = hwThreshVal.value;
            debouncedConvert();
        });
    }
    if (hwMorphKernel && valHwMorphKernel) {
        hwMorphKernel.addEventListener("input", () => {
            valHwMorphKernel.innerText = `${hwMorphKernel.value} px`;
            debouncedConvert();
        });
    }
    if (hwMinLen && valHwMinLen) {
        hwMinLen.addEventListener("input", () => {
            valHwMinLen.innerText = `${hwMinLen.value} px`;
            debouncedConvert();
        });
    }

    if (editorAlgo) {
        editorAlgo.addEventListener("change", () => {
            const sidebar = document.getElementById("editor-sketch-sidebar");
            if (editorAlgo.value === "sketch" || editorAlgo.value === "handwriting") {
                panelGcodeEditor.classList.add("wide");
                if (sidebar) sidebar.classList.remove("hidden");
                if (editorAlgo.value === "handwriting") {
                    switchSketchTab("handwriting");
                } else {
                    switchSketchTab("sketch");
                }
                if (editorOriginalImageFile) {
                    btnEditorConvert.click();
                }
            } else {
                panelGcodeEditor.classList.remove("wide");
                if (sidebar) sidebar.classList.add("hidden");
            }
            resizeEditorCanvas();
            drawEditorCanvas();
        });
    }

    // Trigger update displays immediately on load
    sketchParams.forEach(param => {
        const input = document.getElementById(param.id);
        const display = document.getElementById(param.valId);
        if (input && display) {
            display.innerText = input.value + param.suffix;
        }
    });

    resizeEditorCanvas();

    // ==========================================
    // SCENARIO FEATURE IMPLEMENTATION
    // ==========================================

    const scenarioNameInput = document.getElementById("scenario-name");
    const btnCreateScenario = document.getElementById("btn-create-scenario");
    const btnSaveScenario = document.getElementById("btn-save-scenario");
    const btnCancelScenario = document.getElementById("btn-cancel-scenario");
    const btnLoadScenario = document.getElementById("btn-load-scenario");
    const inputLoadScenario = document.getElementById("input-load-scenario");
    const btnRunScenario = document.getElementById("btn-run-scenario");
    const btnRunLoopScenario = document.getElementById("btn-run-loop-scenario");
    const btnEditScenario = document.getElementById("btn-edit-scenario");

    const scenarioEditModal = document.getElementById("scenario-edit-modal");
    const scenarioEditHeader = document.getElementById("scenario-edit-header");
    const scenarioEditNameTitle = document.getElementById("scenario-edit-name-title");
    const scenarioItemsList = document.getElementById("scenario-items-list");
    const btnScenarioClearAll = document.getElementById("btn-scenario-clear-all");
    const btnScenarioSaveEdit = document.getElementById("btn-scenario-save-edit");
    const btnCloseScenarioEdit = document.getElementById("btn-close-scenario-edit");
    const scenarioInsertInfo = document.getElementById("scenario-insert-info");
    const scenarioInsertIndexLabel = document.getElementById("scenario-insert-index-label");

    // Initialize Draggable helper for Scenario Edit Modal
    if (scenarioEditModal && scenarioEditHeader) {
        makeElementDraggable(scenarioEditModal, scenarioEditHeader);
    }

    function makeElementDraggable(elmnt, header) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (header) {
            header.onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // Helper: Convert Pixel (0-720) to CNC Coordinates using latest calibration matrix
    function convertPixelToCNC(px, py) {
        if (!latestCalibrationMatrix) return { x: 0, y: 0 };
        const M = latestCalibrationMatrix;
        const denom = M[2][0] * px + M[2][1] * py + M[2][2];
        let wx, wy;
        if (Math.abs(denom) > 1e-5) {
            wx = (M[0][0] * px + M[0][1] * py + M[0][2]) / denom;
            wy = (M[1][0] * px + M[1][1] * py + M[1][2]) / denom;
        } else {
            wx = M[0][0] * px + M[0][1] * py + M[0][2];
            wy = M[1][0] * px + M[1][1] * py + M[1][2];
        }
        return { x: wx, y: wy };
    }

    // Helper: Convert CNC coordinates to Pixel (0-720) using inverted calibration matrix
    function convertCNCToPixel(wx, wy) {
        if (!latestCalibrationMatrix) return null;
        const M_inv = invert3x3(latestCalibrationMatrix);
        if (!M_inv) return null;
        const denom = M_inv[2][0] * wx + M_inv[2][1] * wy + M_inv[2][2];
        if (Math.abs(denom) < 1e-8) return null;
        const px = (M_inv[0][0] * wx + M_inv[0][1] * wy + M_inv[0][2]) / denom;
        const py = (M_inv[1][0] * wx + M_inv[1][1] * wy + M_inv[1][2]) / denom;
        return { x: px, y: py };
    }

    // Context Menu for Scenario Actions
    window.showScenarioContextMenu = function (e, px, py) {
        const menu = document.createElement("div");
        menu.id = "camera-context-menu";
        menu.className = "camera-context-menu";
        menu.style.left = `${e.clientX + window.scrollX}px`;
        menu.style.top = `${e.clientY + window.scrollY - 320}px`;

        const cncPos = convertPixelToCNC(px, py);
        const wx = cncPos ? cncPos.x : 0;
        const wy = cncPos ? cncPos.y : 0;

        const items = [
            { label: "🏁 Thiết lập bắt đầu", action: () => addScenarioAction({ type: "set_begin", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) },
            { label: "🛑 Thiết lập kết thúc", action: () => addScenarioAction({ type: "set_end", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) },
            { divider: true }, { divider: true },
            { label: "📍 Di chuyển tới đây", action: () => addScenarioAction({ type: "go_to_here", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) },
            { label: "➡️ Di chuyển giữ trạng thái", action: () => addScenarioAction({ type: "go_to_keep_state", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) },
            { divider: true }, { divider: true },
            { label: "👇 Chạm", action: () => addScenarioAction({ type: "tap", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) },
            { label: "👇👇 Chạm Đúp", action: () => addScenarioAction({ type: "double_tap", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) },
            { divider: true }, { divider: true },
            { label: "👇 Vuốt Xuống", action: () => addScenarioAction({ type: "swipe_down", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) },
            { label: "👆 Vuốt Lên", action: () => addScenarioAction({ type: "swipe_up", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) },
            { divider: true }, { divider: true },
            { label: "👈 Vuốt Trái", action: () => addScenarioAction({ type: "swipe_left", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) },
            { label: "👉 Vuốt Phải", action: () => addScenarioAction({ type: "swipe_right", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) },
            { divider: true }, { divider: true },
            { label: "⏱️ Nhấn Giữ", action: () => addScenarioAction({ type: "long_press", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) },
            { label: "⏸️ Dừng 0.25 giây", action: () => addScenarioAction({ type: "dwell", duration: 0.25 }) },
            { label: "⏸️ Dừng 0.5 giây", action: () => addScenarioAction({ type: "dwell", duration: 0.5 }) },
            { label: "⏸️ Dừng 1 giây", action: () => addScenarioAction({ type: "dwell", duration: 1 }) },
            { label: "✒️ Hạ Bút", action: () => addScenarioAction({ type: "pen_down", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) },
            { label: "✒️ Nhấc Bút", action: () => addScenarioAction({ type: "pen_up", px, py, wx, wy, head_x: currentWPos.x, head_y: currentWPos.y }) }

        ];

        items.forEach(item => {
            if (item.divider) {
                const hr = document.createElement("hr");
                hr.style.margin = "4px 0";
                hr.style.border = "none";
                hr.style.borderTop = "1px solid rgba(255, 255, 255, 0.1)";
                menu.appendChild(hr);
                return;
            }
            const div = document.createElement("div");
            div.className = "context-menu-item";
            div.innerText = t(item.label);
            div.addEventListener("click", () => {
                menu.remove();
                item.action();
            });
            menu.appendChild(div);
        });

        document.body.appendChild(menu);

        const dismissMenu = (event) => {
            if (!menu.contains(event.target)) {
                menu.remove();
                document.removeEventListener("click", dismissMenu);
            }
        };
        setTimeout(() => {
            document.addEventListener("click", dismissMenu);
        }, 10);
    };

    // Add Scenario Action
    function addScenarioAction(action) {
        if (!activeScenario) return;

        if (scenarioInsertIndex !== -1) {
            activeScenario.actions.splice(scenarioInsertIndex + 1, 0, action);
            logSystemMessage(t("Kịch bản: Đã chèn bước {type} sau bước {index}", { type: action.type, index: scenarioInsertIndex + 1 }));
            scenarioInsertIndex++;
        } else {
            activeScenario.actions.push(action);
            logSystemMessage(t("Kịch bản: Đã thêm bước {type} vào cuối", { type: action.type }));
        }

        updateScenarioButtonsState();
        drawScenarioOnCamera();
        renderScenarioItemsList();
    }

    // Update buttons visibility & disabled states
    function updateScenarioButtonsState() {
        const sidebarActions = document.querySelectorAll(".btn-scenario-action");
        const shouldEnableSidebar = activeScenario && scenarioIsCreating;
        sidebarActions.forEach(btn => {
            btn.disabled = !shouldEnableSidebar;
        });

        if (!activeScenario) {
            btnSaveScenario.style.display = "none";
            btnCancelScenario.style.display = "none";
            btnEditScenario.style.display = "none";
            btnRunScenario.disabled = true;
            if (btnRunLoopScenario) {
                btnRunLoopScenario.disabled = true;
            }
            return;
        }

        btnSaveScenario.style.display = "inline-block";
        btnCancelScenario.style.display = "inline-block";
        btnEditScenario.style.display = "inline-block";

        const hasSetEnd = activeScenario.actions.some(act => act.type === "set_end");
        btnRunScenario.disabled = !hasSetEnd || !isConnected;
        if (btnRunLoopScenario) {
            btnRunLoopScenario.disabled = !hasSetEnd || !isConnected;
        }

        if (scenarioLooping) {
            btnRunScenario.disabled = true;
        }

        if (scenarioInsertIndex !== -1) {
            scenarioInsertInfo.style.display = "block";
            scenarioInsertIndexLabel.innerText = `${scenarioInsertIndex + 1}`;
        } else {
            scenarioInsertInfo.style.display = "none";
        }
    }

    // Draw Scenario Visual Paths on Canvas
    window.drawScenarioOnCamera = function (targetCtx = null, canvasWidth = null, canvasHeight = null) {
        const overlayCanvas = document.getElementById("camera-overlay-canvas");
        if (!overlayCanvas) return;
        const ctx = targetCtx || overlayCanvas.getContext("2d");

        const cameraStreamImg = document.getElementById("camera-stream-img");
        if (!cameraStreamImg) return;

        const w = canvasWidth || overlayCanvas.width;
        const h = canvasHeight || overlayCanvas.height;

        if (!targetCtx) {
            const nw = cameraStreamImg.naturalWidth || 1280;
            const nh = cameraStreamImg.naturalHeight || 720;
            if (overlayCanvas.width !== nw || overlayCanvas.height !== nh) {
                overlayCanvas.width = nw;
                overlayCanvas.height = nh;
            }
            ctx.clearRect(0, 0, nw, nh);
        }

        if (!activeScenario || !activeScenario.actions || activeScenario.actions.length === 0) return;

        const M = latestCalibrationMatrix;
        const M_inv = M ? invert3x3(M) : null;

        let lastX = null;
        let lastY = null;

        // Draw arrow helper
        function drawArrowOnCanvas(context, fromX, fromY, toX, toY, arrowColor) {
            const headlen = 8;
            const dx = toX - fromX;
            const dy = toY - fromY;
            const angle = Math.atan2(dy, dx);

            context.beginPath();
            context.moveTo(fromX, fromY);
            context.lineTo(toX, toY);
            context.strokeStyle = arrowColor;
            context.lineWidth = 2.5;
            context.stroke();

            context.beginPath();
            context.moveTo(toX, toY);
            context.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
            context.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
            context.closePath();
            context.fillStyle = arrowColor;
            context.fill();
        }

        activeScenario.actions.forEach((act, idx) => {
            let px = act.px;
            let py = act.py;

            if ((px === undefined || py === undefined) && M_inv && act.head_x !== undefined && act.head_y !== undefined) {
                const pt = workspaceToPixel(M_inv, act.head_x, act.head_y);
                if (pt) {
                    px = pt.x;
                    py = pt.y;
                }
            }

            if (px === undefined || py === undefined) return;

            const cx = (px / 720.0) * w;
            const cy = (py / 720.0) * h;

            if (lastX !== null && lastY !== null) {
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(cx, cy);
                ctx.strokeStyle = "rgba(234, 179, 8, 0.6)";
                ctx.lineWidth = 2.5;
                ctx.setLineDash([6, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            ctx.beginPath();
            ctx.arc(cx, cy, 7, 0, 2 * Math.PI);

            let color = "#ea580c";
            if (act.type === "set_begin") color = "#22c55e";
            else if (act.type === "set_end") color = "#ef4444";
            else if (act.type === "go_to_here") color = "#3b82f6";
            else if (act.type === "go_to_keep_state") color = "#a855f7";

            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw swipe direction arrows
            if (act.type.startsWith("swipe_")) {
                let dx_px = 0, dy_px = 0;
                if (act.type === "swipe_down") dy_px = 35; // points down on screen
                else if (act.type === "swipe_up") dy_px = -35;  // points up on screen
                else if (act.type === "swipe_left") dx_px = -35;
                else if (act.type === "swipe_right") dx_px = 35;

                const arrowEndX = cx + (dx_px / 720.0) * w;
                const arrowEndY = cy + (dy_px / 720.0) * h;

                drawArrowOnCanvas(ctx, cx, cy, arrowEndX, arrowEndY, "#fbbf24");
            }

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 11px sans-serif";
            ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
            ctx.shadowBlur = 4;

            let label = act.type.toUpperCase().replace(/_/g, " ");
            ctx.fillText(`[${idx + 1}] ${label}`, cx + 12, cy + 4);

            if (scenarioInsertIndex === idx) {
                ctx.beginPath();
                ctx.arc(cx, cy, 12, 0, 2 * Math.PI);
                ctx.strokeStyle = "#fbbf24";
                ctx.lineWidth = 2.5;
                ctx.stroke();
            }

            lastX = cx;
            lastY = cy;
        });

        ctx.shadowBlur = 0;
    };

    // Render list items in Scenario Edit Modal
    function renderScenarioItemsList() {
        if (!scenarioItemsList) return;
        scenarioItemsList.innerHTML = "";

        if (!activeScenario || activeScenario.actions.length === 0) {
            scenarioItemsList.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 11px; padding: 10px;">${t("Kịch bản trống. Nhấp chuột phải vào luồng camera để thêm các điểm.")}</div>`;
            return;
        }

        activeScenario.actions.forEach((act, idx) => {
            const card = document.createElement("div");
            card.className = "scenario-item-card" + (scenarioInsertIndex === idx ? " insert-active" : "");

            const info = document.createElement("div");
            info.className = "scenario-item-info";

            const title = document.createElement("div");
            title.className = "scenario-item-title";
            title.innerText = `[${idx + 1}] ${act.type.toUpperCase().replace(/_/g, " ")}`;

            const subtitle = document.createElement("div");
            subtitle.className = "scenario-item-subtitle";

            if (act.type === "dwell") {
                subtitle.innerText = t("Tạm dừng {duration}s", { duration: act.duration ?? 0.25 });
            } else if (act.wx !== undefined && act.wy !== undefined) {
                subtitle.innerText = `CNC: X=${act.wx.toFixed(2)}, Y=${act.wy.toFixed(2)}`;
            } else {
                subtitle.innerText = t("Tại vị trí đầu ghi");
            }

            info.appendChild(title);
            info.appendChild(subtitle);

            const actions = document.createElement("div");
            actions.className = "scenario-item-actions";

            // Insert Pin Button
            const btnPin = document.createElement("button");
            btnPin.className = "btn-scenario-action" + (scenarioInsertIndex === idx ? " active" : "");
            btnPin.title = scenarioInsertIndex === idx ? t("Xóa điểm chèn") : t("Đặt điểm chèn sau bước này");
            btnPin.innerHTML = "📌";
            btnPin.addEventListener("click", () => {
                if (scenarioInsertIndex === idx) {
                    scenarioInsertIndex = -1;
                } else {
                    scenarioInsertIndex = idx;
                }
                updateScenarioButtonsState();
                drawScenarioOnCamera();
                renderScenarioItemsList();
            });

            // Move Up Button (▲)
            const btnUp = document.createElement("button");
            btnUp.className = "btn-scenario-action";
            btnUp.title = t("Di chuyển lên");
            btnUp.innerHTML = "▲";
            // if (idx <= 1 || idx === activeScenario.actions.length - 1) {
            //     // btnUp.disabled = true;
            //     btnUp.style.opacity = "0.3";
            //     btnUp.style.cursor = "not-allowed";
            // }
            btnUp.addEventListener("click", (evt) => {
                evt.stopPropagation();
                swapScenarioSteps(idx, idx - 1);
            });

            // Move Down Button (▼)
            const btnDown = document.createElement("button");
            btnDown.className = "btn-scenario-action";
            btnDown.title = t("Di chuyển xuống");
            btnDown.innerHTML = "▼";
            // if (idx === 0 || idx >= activeScenario.actions.length - 2) {
            //     // btnDown.disabled = true;
            //     btnDown.style.opacity = "0.3";
            //     btnDown.style.cursor = "not-allowed";
            // }
            btnDown.addEventListener("click", (evt) => {
                evt.stopPropagation();
                swapScenarioSteps(idx, idx + 1);
            });

            // Delete Button
            const btnDel = document.createElement("button");
            btnDel.className = "btn-scenario-action delete";
            btnDel.title = t("Xóa bước này");
            btnDel.innerHTML = "🗑️";
            btnDel.addEventListener("click", () => {
                activeScenario.actions.splice(idx, 1);
                if (scenarioInsertIndex === idx) {
                    scenarioInsertIndex = -1;
                } else if (scenarioInsertIndex > idx) {
                    scenarioInsertIndex--;
                }
                updateScenarioButtonsState();
                drawScenarioOnCamera();
                renderScenarioItemsList();
                logSystemMessage(t("Kịch bản: Đã xóa bước {index}", { index: idx + 1 }));
            });

            actions.appendChild(btnPin);
            actions.appendChild(btnUp);
            actions.appendChild(btnDown);
            actions.appendChild(btnDel);

            card.appendChild(info);
            card.appendChild(actions);
            scenarioItemsList.appendChild(card);
        });
    }

    // Helper: Swap two scenario steps
    function swapScenarioSteps(i, j) {
        if (!activeScenario || !activeScenario.actions) return;
        const len = activeScenario.actions.length;
        // if (i <= 0 || i >= len - 1 || j <= 0 || j >= len - 1) return; // Prevent modifying first or last step
        if (j < 0 || j >= len) return;

        const temp = activeScenario.actions[i];
        activeScenario.actions[i] = activeScenario.actions[j];
        activeScenario.actions[j] = temp;

        if (scenarioInsertIndex === i) {
            scenarioInsertIndex = j;
        } else if (scenarioInsertIndex === j) {
            scenarioInsertIndex = i;
        }

        renderScenarioItemsList();
        drawScenarioOnCamera();
        logSystemMessage(t("Kịch bản: Đã hoán đổi bước {index1} với bước {index2}", { index1: i + 1, index2: j + 1 }));
    }

    // Compile Scenario Actions to standard G-code lines
    function compileScenarioToGcode(scen) {
        if (!scen || !scen.actions || scen.actions.length === 0) return "";

        const lines = [];
        lines.push("; --- Scenario Generated Toolpath ---");
        lines.push("G21 ; Units in mm");
        lines.push("G90 ; Absolute coordinates");

        const pen_up_z = parseFloat(localStorage.getItem("cnc_pen_up_z")) || 3.0;
        const pen_down_z = parseFloat(localStorage.getItem("cnc_pen_down_z")) || 0.0;
        const pen_dwell = parseFloat(localStorage.getItem("cnc_pen_dwell")) || 0.25;
        const feedrate = parseFloat(sliderFeed ? sliderFeed.value : 1000);
        const swipe_dist = parseFloat(document.getElementById("gesture-distance")?.value) || 40.0;

        scen.actions.forEach((act, idx) => {
            lines.push(`; Step ${idx + 1}: ${act.type}`);

            switch (act.type) {
                case "set_begin":
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G0 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)}`);
                    lines.push("G4 P0.25");
                    break;

                case "go_to_here":
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G0 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)}`);
                    lines.push("G4 P0.25");
                    break;

                case "go_to_keep_state":
                    lines.push(`G1 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)} F${feedrate}`);
                    // lines.push("G4 P0.25");
                    break;

                case "set_end":
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G0 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)}`);
                    lines.push("G4 P0.25");
                    break;

                case "tap":
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G0 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)}`);
                    lines.push("G4 P0.25");
                    lines.push(`G1 Z${pen_down_z} F${feedrate}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G4 P${pen_dwell}`);
                    break;

                case "double_tap":
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G0 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)}`);
                    lines.push("G4 P0.25");
                    lines.push(`G1 Z${pen_down_z} F${feedrate}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push(`G1 Z${pen_down_z} F${feedrate}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G4 P${pen_dwell}`);
                    break;

                case "long_press":
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G0 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)}`);
                    lines.push("G4 P0.25");
                    lines.push(`G1 Z${pen_down_z} F${feedrate}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push("G4 P1.0");
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G4 P${pen_dwell}`);
                    break;

                case "pen_down":
                    // lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G0 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)}`);
                    // lines.push("G4 P0.25");
                    lines.push("M3 S40");
                    lines.push(`G1 Z${pen_down_z} F${feedrate}`);
                    // lines.push(`G4 P${pen_dwell}`);
                    break;

                case "pen_up":
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G0 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)}`);
                    // lines.push("G4 P0.25");
                    // lines.push(`G0 Z${pen_up_z}`);
                    // lines.push(`G4 P${pen_dwell}`);
                    lines.push("M3 S0");
                    break;

                case "swipe_up":
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G0 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)}`);
                    lines.push("G4 P0.25");
                    lines.push(`G1 Z${pen_down_z} F${feedrate}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push(`G1 X${act.wx.toFixed(3)} Y${(act.wy - swipe_dist).toFixed(3)} F${feedrate}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G4 P${pen_dwell}`);
                    break;

                case "swipe_down":
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G0 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)}`);
                    lines.push("G4 P0.25");
                    lines.push(`G1 Z${pen_down_z} F${feedrate}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push(`G1 X${act.wx.toFixed(3)} Y${(act.wy + swipe_dist).toFixed(3)} F${feedrate}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G4 P${pen_dwell}`);
                    break;

                case "swipe_left":
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G0 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)}`);
                    lines.push("G4 P0.25");
                    lines.push(`G1 Z${pen_down_z} F${feedrate}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push(`G1 X${(act.wx - swipe_dist).toFixed(3)} Y${act.wy.toFixed(3)} F${feedrate}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G4 P${pen_dwell}`);
                    break;

                case "swipe_right":
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G0 X${act.wx.toFixed(3)} Y${act.wy.toFixed(3)}`);
                    lines.push("G4 P0.25");
                    lines.push(`G1 Z${pen_down_z} F${feedrate}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push(`G1 X${(act.wx + swipe_dist).toFixed(3)} Y${act.wy.toFixed(3)} F${feedrate}`);
                    lines.push(`G4 P${pen_dwell}`);
                    lines.push(`G0 Z${pen_up_z}`);
                    lines.push(`G4 P${pen_dwell}`);
                    break;

                case "dwell":
                    lines.push(`G4 P${(act.duration ?? 0.25).toFixed(3)} ; Dwell pause`);
                    break;
            }
        });

        lines.push(`G0 Z${pen_up_z}`);
        lines.push("; --- End Scenario Generated Toolpath ---");
        return lines.join("\n");
    }

    // EVENT LISTENERS FOR SCENARIO
    if (btnCreateScenario) {
        btnCreateScenario.addEventListener("click", () => {
            const rawName = scenarioNameInput ? scenarioNameInput.value.trim() : "";
            const name = rawName || "Scenario_" + Math.floor(Math.random() * 1000);

            activeScenario = { name: name, actions: [] };
            scenarioIsCreating = true;
            scenarioInsertIndex = -1;

            if (scenarioNameInput) scenarioNameInput.value = name;
            logSystemMessage(t("Đã tạo kịch bản: \"{name}\"", { name: name }));

            updateScenarioButtonsState();
            drawScenarioOnCamera();
            renderScenarioItemsList();

            if (scenarioEditModal) {
                scenarioEditModal.classList.toggle("hidden");
            }
        });
    }

    if (btnSaveScenario) {
        btnSaveScenario.addEventListener("click", () => {
            if (!activeScenario) return;

            const jsonStr = JSON.stringify(activeScenario, null, 2);
            const blob = new Blob([jsonStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${activeScenario.name}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            logSystemMessage(t("Đã tải xuống Scenario JSON: {filename}", { filename: activeScenario.name + ".json" }));
        });
    }

    if (btnCancelScenario) {
        btnCancelScenario.addEventListener("click", () => {
            activeScenario = null;
            scenarioIsCreating = false;
            scenarioInsertIndex = -1;

            if (scenarioNameInput) scenarioNameInput.value = "";
            // if (scenarioEditModal) scenarioEditModal.classList.add("hidden");

            logSystemMessage(t("Đã hủy tạo kịch bản."));

            updateScenarioButtonsState();
            drawScenarioOnCamera();
            renderScenarioItemsList();
        });
    }

    if (btnLoadScenario) {
        btnLoadScenario.addEventListener("click", () => {
            if (inputLoadScenario) inputLoadScenario.click();
        });
    }

    if (inputLoadScenario) {
        inputLoadScenario.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (evt) => {
                try {
                    const data = JSON.parse(evt.target.result);
                    if (data && data.name && Array.isArray(data.actions)) {
                        activeScenario = data;
                        scenarioIsCreating = true;
                        scenarioInsertIndex = -1;

                        if (scenarioNameInput) scenarioNameInput.value = data.name;
                        logSystemMessage(t("Đã nạp kịch bản: \"{name}\" với {count} bước.", { name: data.name, count: data.actions.length }));

                        updateScenarioButtonsState();
                        drawScenarioOnCamera();
                        renderScenarioItemsList();

                        scenarioEditModal.classList.toggle("hidden");
                    } else {
                        alert(t("File kịch bản Scenario JSON không đúng định dạng!"));
                    }
                } catch (err) {
                    alert(t("Lỗi phân tích file JSON Scenario: ") + err);
                }
            };
            reader.readAsText(file);
            e.target.value = ""; // Reset
        });
    }

    if (btnEditScenario) {
        btnEditScenario.addEventListener("click", () => {
            if (scenarioEditModal) {
                scenarioEditModal.classList.toggle("hidden");
                if (!scenarioEditModal.classList.contains("hidden")) {
                    if (scenarioEditNameTitle && activeScenario) {
                        scenarioEditNameTitle.innerText = activeScenario.name;
                    }
                    renderScenarioItemsList();
                }
            }
        });
    }

    if (btnScenarioClearAll) {
        btnScenarioClearAll.addEventListener("click", () => {
            if (activeScenario && confirm(t("Xóa toàn bộ các bước trong kịch bản hiện tại?"))) {
                activeScenario.actions = [];
                scenarioInsertIndex = -1;
                updateScenarioButtonsState();
                drawScenarioOnCamera();
                renderScenarioItemsList();
                logSystemMessage(t("Đã xóa tất cả các bước trong kịch bản."));
            }
        });
    }

    if (btnScenarioSaveEdit) {
        btnScenarioSaveEdit.addEventListener("click", () => {
            if (scenarioEditModal) {
                scenarioEditModal.classList.add("hidden");
            }
        });
    }

    if (btnCloseScenarioEdit) {
        btnCloseScenarioEdit.addEventListener("click", () => {
            if (scenarioEditModal) {
                scenarioEditModal.classList.add("hidden");
            }
        });
    }

    // Setup Left Sidebar Buttons Click Handlers (cập nhật 41)
    const sidebarButtons = document.querySelectorAll(".btn-scenario-action");
    sidebarButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (!activeScenario || !scenarioIsCreating) return;

            const actionAttr = btn.getAttribute("data-action");
            const wx = currentWPos.x;
            const wy = currentWPos.y;
            const pt = convertCNCToPixel(wx, wy);
            const px = pt ? pt.x : 0;
            const py = pt ? pt.y : 0;

            if (actionAttr.startsWith("dwell-")) {
                const duration = parseFloat(actionAttr.replace("dwell-", ""));
                addScenarioAction({
                    type: "dwell",
                    duration: duration
                });
            } else {
                addScenarioAction({
                    type: actionAttr,
                    px: px,
                    py: py,
                    wx: wx,
                    wy: wy,
                    head_x: wx,
                    head_y: wy
                });
            }
        });
    });

    async function startScenarioExecution(isLoopTrigger = false) {
        if (!activeScenario || activeScenario.actions.length === 0) return;

        const hasSetEnd = activeScenario.actions.some(act => act.type === "set_end");
        if (!hasSetEnd) {
            alert(t("Kịch bản cần có ít nhất một bước Set End để chạy!"));
            if (scenarioLooping) {
                stopScenarioLoop();
            }
            return;
        }

        if (!isLoopTrigger) {
            if (scenarioLooping) {
                if (btnRunLoopScenario) {
                    btnRunLoopScenario.innerText = t("🛑 Dừng Lặp");
                    btnRunLoopScenario.className = "btn btn-danger";
                }
                btnRunScenario.disabled = true;
            } else {
                btnRunScenario.disabled = true;
                btnRunScenario.innerText = t("⏳ Đang chạy...");
            }
        }

        const gcode = compileScenarioToGcode(activeScenario);

        try {
            const res = await fetch("/api/gcode-editor/set-gcode", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gcode: gcode })
            });
            const data = await res.json();

            if (!scenarioLooping) {
                btnRunScenario.disabled = false;
                btnRunScenario.innerText = t("Chạy");
            }

            if (data.status === "ok") {
                logSystemMessage(t("Kịch bản đã được biên dịch thành công thành G-code ({count} dòng).", { count: data.lines_count }));

                // Parse & load G-code into the visual toolpath
                toolpathPoints = parseGcode(gcode);
                calculateBoundingBox();
                resetCanvasView();

                loadedFileName.innerText = "scenario_" + activeScenario.name + ".gcode";
                loadedFileLines.innerText = t("{count} dòng", { count: data.lines_count });
                fileDropZone.classList.add("hidden");
                fileInfoContainer.classList.remove("hidden");
                btnStartStream.disabled = !isConnected;

                if (isConnected) {
                    btnStartStream.click();
                } else {
                    alert(t("G-Code kịch bản đã được nạp. Hãy kết nối CNC để bắt đầu."));
                    if (scenarioLooping) {
                        stopScenarioLoop();
                    }
                }
            } else {
                alert(t("Nạp G-Code kịch bản thất bại: {message}", { message: data.message }));
                if (scenarioLooping) {
                    stopScenarioLoop();
                }
            }
        } catch (err) {
            if (!scenarioLooping) {
                btnRunScenario.disabled = false;
                btnRunScenario.innerText = t("Chạy");
            }
            alert(t("Lỗi mạng khi nạp G-code kịch bản: {error}", { error: err }));
            if (scenarioLooping) {
                stopScenarioLoop();
            }
        }
    }

    function stopScenarioLoop() {
        scenarioLooping = false;
        if (btnRunLoopScenario) {
            btnRunLoopScenario.innerText = t("Chạy Vòng Lặp");
            btnRunLoopScenario.className = "btn btn-warning";
        }
        updateScenarioButtonsState();
        logSystemMessage(t("Đã dừng thực hiện kịch bản lặp."));
    }

    window.startScenarioExecution = startScenarioExecution;
    window.stopScenarioLoop = stopScenarioLoop;
    window.updateScenarioButtonsState = updateScenarioButtonsState;

    if (btnRunScenario) {
        btnRunScenario.addEventListener("click", () => {
            startScenarioExecution(false);
        });
    }

    if (btnRunLoopScenario) {
        btnRunLoopScenario.addEventListener("click", async () => {
            if (scenarioLooping) {
                stopScenarioLoop();
                try {
                    await fetch("/api/stop", { method: "POST" });
                } catch (e) {
                    console.error(t("Dừng luồng phát thất bại khi dừng lặp:"), e);
                }
            } else {
                scenarioLooping = true;
                startScenarioExecution(false);
            }
        });
    }

    resizeEditorCanvas();
    window.renderScenarioItemsList = renderScenarioItemsList;
}

    // --- i18n Localization Engine ---
    let currentLang = localStorage.getItem("app_lang") || "vi";
    const translations = {};

    window.translations = translations; // Expose translations for inspection

    async function loadLanguage(lang) {
        if (!translations[lang]) {
            try {
                const response = await fetch(`/static/lang/${lang}.json`);
                if (response.ok) {
                    translations[lang] = await response.json();
                } else {
                    translations[lang] = {};
                }
            } catch (e) {
                console.error(`Tải file dịch JSON cho ${lang} thất bại:`, e);
                translations[lang] = {};
            }
        }
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem("app_lang", lang);
        document.documentElement.lang = lang;

        // 1. Update elements with innerText (data-i18n)
        document.querySelectorAll("[data-i18n]").forEach(el => {
            if (el.dataset.originalText === undefined) {
                el.dataset.originalText = el.innerText.trim();
            }
            const key = el.dataset.originalText;
            const text = (translations[lang] && translations[lang][key]) ? translations[lang][key] : key;
            el.innerText = text;
        });

        // 2. Update all input/tag attributes dynamically (data-i18n-*)
        document.querySelectorAll("*").forEach(el => {
            Array.from(el.attributes).forEach(attr => {
                if (attr.name.startsWith("data-i18n-")) {
                    const targetAttr = attr.name.replace("data-i18n-", "");
                    const storageKey = `original_${targetAttr}`;
                    if (el.dataset[storageKey] === undefined) {
                        el.dataset[storageKey] = el.getAttribute(targetAttr) || "";
                    }
                    const key = el.dataset[storageKey];
                    const val = (translations[lang] && translations[lang][key]) ? translations[lang][key] : key;
                    el.setAttribute(targetAttr, val);
                }
            });
        });

        // 3. Refresh dynamic JS-bound UI states
        if (lastUIState) {
            updateUIState(lastUIState);
        }
        if (lastTelemetry) {
            updateTelemetry(lastTelemetry);
        }
        if (window.updateHomeUI) {
            window.updateHomeUI();
        }
        if (window.updateCalibrationUI) {
            window.updateCalibrationUI();
        }
        if (window.updateDetectionStatusUI) {
            window.updateDetectionStatusUI(yoloDetected, lastObjectInfo, latestCalibrationMatrix);
        }
        if (window.updateDetectedLabelsUI && window.lastDetections) {
            window.updateDetectedLabelsUI(window.lastDetections);
        }
        if (window.renderScenarioItemsList) {
            window.renderScenarioItemsList();
        }

        // 4. Refresh scenario control buttons text
        const btnRunLoopScenario = document.getElementById("btn-run-loop-scenario");
        const btnRunScenario = document.getElementById("btn-run-scenario");
        if (btnRunLoopScenario) {
            if (scenarioLooping) {
                btnRunLoopScenario.innerText = t("🛑 Dừng Lặp");
                btnRunLoopScenario.className = "btn btn-danger";
            } else {
                btnRunLoopScenario.innerText = t("Chạy Vòng Lặp");
                btnRunLoopScenario.className = "btn btn-warning";
            }
        }
        if (btnRunScenario && btnRunScenario.innerText !== t("⏳ Đang chạy...")) {
            btnRunScenario.innerText = t("Chạy");
        }

        // 5. Refresh G-code editor buttons text
        const btnEditorPreviewInVideoFrame = document.getElementById("btn-editor-preview-in-video-frame");
        if (btnEditorPreviewInVideoFrame) {
            if (previewIntervalId) {
                btnEditorPreviewInVideoFrame.innerText = t("Dừng xem trước");
            } else {
                btnEditorPreviewInVideoFrame.innerText = t("Xem trước");
            }
        }
        const btnEditorExecute = document.getElementById("btn-editor-execute");
        if (btnEditorExecute && btnEditorExecute.innerText !== t("Đang gửi G-Code...")) {
            btnEditorExecute.innerText = t("⚡ Thực hiện vẽ (Chạy CNC)");
        }
        const btnEditorConvert = document.getElementById("btn-editor-convert");
        if (btnEditorConvert && btnEditorConvert.innerText !== t("Đang chuyển đổi...")) {
            btnEditorConvert.innerText = t("Tạo G-Code");
        }
    }

    window.setLanguage = setLanguage;

    function t(key, replacements = {}) {
        let text = (translations[currentLang] && translations[currentLang][key]) ? translations[currentLang][key] : key;
        Object.entries(replacements).forEach(([k, v]) => {
            text = text.replace(`{${k}}`, v);
        });
        return text;
    }

    window.t = t;

    // Attach Switcher Event Handler
    const langSwitcher = document.getElementById("lang-switcher");
    if (langSwitcher) {
        langSwitcher.value = currentLang;
        langSwitcher.addEventListener("change", async (e) => {
            const nextLang = e.target.value;
            await loadLanguage(nextLang);
            setLanguage(nextLang);
        });
    }

    // Load and set the initial language
    (async () => {
        await loadLanguage(currentLang);
        setLanguage(currentLang);
    })();
