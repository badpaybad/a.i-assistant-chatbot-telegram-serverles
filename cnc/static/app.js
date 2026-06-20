// Global state
let ws = null;
let connectionAttempts = 0;
let isConnected = false;

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

// DOM Elements
const connStatus = document.getElementById("connection-status");
const machineState = document.getElementById("machine-state");
const portInput = document.getElementById("port-input");
const baudrateInput = document.getElementById("baudrate-input");
const connectBtn = document.getElementById("connect-btn");
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
    setupCanvas();
    fetchState();
});

// Fetch current state on page load
async function fetchState() {
    try {
        const res = await fetch("/api/state");
        const data = await res.json();
        updateUIState(data);
    } catch (e) {
        logSystemMessage("Failed to fetch initial state from server.");
    }
}

// Update UI elements based on API status
function updateUIState(data) {
    isConnected = data.connected;
    
    // Connection badge
    if (isConnected) {
        connStatus.innerText = "CONNECTED";
        connStatus.className = "status-badge connected";
        connectBtn.innerText = "Disconnect";
        connectBtn.className = "btn btn-danger";
        portInput.disabled = true;
        baudrateInput.disabled = true;
        portWarning.classList.add("hidden");
    } else {
        connStatus.innerText = "DISCONNECTED";
        connStatus.className = "status-badge disconnected";
        connectBtn.innerText = "Connect";
        connectBtn.className = "btn btn-primary";
        portInput.disabled = false;
        baudrateInput.disabled = false;
        
        if (data.port_owner) {
            portWarningText.innerHTML = `Port <strong>${data.port}</strong> is busy. Opened by: <strong>${data.port_owner}</strong>. Please close it and retry.`;
            portWarning.classList.remove("hidden");
        } else {
            portWarning.classList.add("hidden");
        }
    }

    // Machine State
    machineState.innerText = data.machine_state || "OFFLINE";
    machineState.className = "state-badge " + (data.machine_state ? data.machine_state.toLowerCase() : "disconnected");

    // Coordinates (DRO)
    if (data.wpos) {
        currentWPos.x = data.wpos[0];
        currentWPos.y = data.wpos[1];
        currentWPos.z = data.wpos[2];
        valX.innerText = currentWPos.x.toFixed(3);
        valY.innerText = currentWPos.y.toFixed(3);
        valZ.innerText = currentWPos.z.toFixed(3);
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
        progressFraction.innerText = `${data.gcode_index} / ${data.gcode_total} lines`;
        streamProgressBar.style.width = pct + "%";
        
        btnStartStream.disabled = true;
        btnPauseStream.disabled = false;
        btnAbortStream.disabled = false;
        
        if (data.is_paused) {
            btnPauseStream.innerText = "Resume";
            btnPauseStream.className = "btn btn-success";
        } else {
            btnPauseStream.innerText = "Pause";
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
}

// --- WEBSOCKETS LOGIC ---
function initWebSocket() {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    logSystemMessage("Establishing connection to controller...");
    ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
        logSystemMessage("WebSocket telemetry channel active.");
        connectionAttempts = 0;
    };
    
    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        handleWSMessage(msg);
    };
    
    ws.onclose = () => {
        logSystemMessage("WebSocket telemetry closed. Reconnecting in 3s...");
        setTimeout(initWebSocket, 3000);
    };
    
    ws.onerror = (err) => {
        console.error("WS error: ", err);
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
        connStatus.innerText = "CONNECTED";
        connStatus.className = "status-badge connected";
        connectBtn.innerText = "Disconnect";
        connectBtn.className = "btn btn-danger";
        portInput.disabled = true;
        baudrateInput.disabled = true;
        portWarning.classList.add("hidden");
    } else {
        connStatus.innerText = "DISCONNECTED";
        connStatus.className = "status-badge disconnected";
        connectBtn.innerText = "Connect";
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
}

function updateTelemetry(data) {
    machineState.innerText = data.state;
    machineState.className = "state-badge " + data.state.toLowerCase();
    
    currentWPos.x = data.wpos[0];
    currentWPos.y = data.wpos[1];
    currentWPos.z = data.wpos[2];
    valX.innerText = currentWPos.x.toFixed(3);
    valY.innerText = currentWPos.y.toFixed(3);
    valZ.innerText = currentWPos.z.toFixed(3);
    
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
        progressFraction.innerText = `${data.gcode_index} / ${data.gcode_total} lines`;
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
}

function handleStreamStatus(msg) {
    if (msg.status === "started") {
        logSystemMessage("G-code job execution started.");
    } else if (msg.status === "completed") {
        logSystemMessage("G-code job completed successfully!");
        fetchState();
    } else if (msg.status === "failed") {
        logSystemMessage(`G-code job execution failed: ${msg.message}`);
        fetchState();
    } else if (msg.status === "stopped") {
        logSystemMessage("G-code job aborted by user. Controller soft-reset sent.");
        fetchState();
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
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
    
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
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
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
            logSystemMessage(`Command error: ${data.message}`);
        }
    } catch (e) {
        logSystemMessage(`Network error sending command: ${e}`);
    }
}

function setupEventListeners() {
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
                    logSystemMessage(`Disconnect error: ${data.message}`);
                }
            } catch (e) {
                connectBtn.disabled = false;
                logSystemMessage(`Network error during disconnect: ${e}`);
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
                    logSystemMessage(`Connection error: ${data.message}`);
                    portWarningText.innerHTML = data.message;
                    portWarning.classList.remove("hidden");
                } else {
                    portWarning.classList.add("hidden");
                }
            } catch (e) {
                connectBtn.disabled = false;
                logSystemMessage(`Network error connecting: ${e}`);
            }
        }
    });

    // Console Command Input Submission
    consoleForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const cmd = consoleInput.value.trim();
        if (!cmd) return;
        sendCommand(cmd);
        consoleInput.value = "";
    });

    // Step Slider
    sliderStep.addEventListener("input", () => {
        currentStepDistance = stepMapping[sliderStep.value];
        valStep.innerText = `${currentStepDistance} mm`;
    });

    // Feed Slider
    sliderFeed.addEventListener("input", () => {
        currentFeedrate = sliderFeed.value;
        valFeed.innerText = `${currentFeedrate} mm/min`;
    });

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
    document.getElementById("jog-home").addEventListener("click", () => sendCommand("$H"));
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
            logSystemMessage(`Error starting stream: ${data.message}`);
        }
    });

    btnPauseStream.addEventListener("click", () => {
        const text = btnPauseStream.innerText;
        if (text === "Pause") {
            sendCommand("!");
        } else {
            sendCommand("~");
        }
    });

    btnAbortStream.addEventListener("click", async () => {
        if (confirm("WARNING: Are you sure you want to ABORT the running G-code job?")) {
            const res = await fetch("/api/stop", { method: "POST" });
            const data = await res.json();
            if (data.status === "error") {
                logSystemMessage(`Error aborting: ${data.message}`);
            }
        }
    });

    // --- Pen Servo Configuration Logic ---
    const updatePenLabels = () => {
        const mode = penControlMode.value;
        if (mode === "z-axis") {
            lblPenUp.innerText = "UP Position (mm)";
            lblPenDown.innerText = "DOWN Position (mm)";
            penUpVal.step = "0.5";
            penDownVal.step = "0.5";
            
            // Load saved coordinates
            penUpVal.value = localStorage.getItem("cnc_pen_up_z") || "3.0";
            penDownVal.value = localStorage.getItem("cnc_pen_down_z") || "0.0";
        } else {
            lblPenUp.innerText = "UP PWM / Speed (S)";
            lblPenDown.innerText = "DOWN PWM / Speed (S)";
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
            console.error("Failed to load pen settings from backend:", e);
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
            console.error("Failed to save pen settings to backend:", e);
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
            logSystemMessage("Cannot move pen: machine is disconnected.");
            return;
        }
        const mode = penControlMode.value;
        const val = penUpVal.value;
        if (mode === "z-axis") {
            logSystemMessage(`Raising pen to Z ${val}`);
            sendCommand(`G0 Z${val}`);
        } else {
            logSystemMessage(`Raising pen: Spindle PWM S${val}`);
            targetSpindleSpeed = parseFloat(val);
            sendCommand(`M3 S${val}`);
        }
    });

    btnPenDown.addEventListener("click", () => {
        if (!isConnected) {
            logSystemMessage("Cannot move pen: machine is disconnected.");
            return;
        }
        const mode = penControlMode.value;
        const val = penDownVal.value;
        if (mode === "z-axis") {
            logSystemMessage(`Lowering pen to Z ${val}`);
            sendCommand(`G0 Z${val}`);
        } else {
            logSystemMessage(`Lowering pen: Spindle PWM S${val}`);
            targetSpindleSpeed = parseFloat(val);
            sendCommand(`M3 S${val}`);
        }
    });

    document.getElementById("btn-clear-path").addEventListener("click", resetCanvasView);

    // --- Touch & Swipe Gesture Event Listeners ---
    document.getElementById("btn-set-start").addEventListener("click", () => {
        document.getElementById("gesture-start-x").value = currentWPos.x.toFixed(1);
        document.getElementById("gesture-start-y").value = currentWPos.y.toFixed(1);
    });
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

    // Load saved preferences
    const savedCameraIndex = localStorage.getItem("cnc_camera_index");
    if (savedCameraIndex) {
        cameraSelect.value = savedCameraIndex;
    }

    let isCameraCollapsed = localStorage.getItem("cnc_camera_collapsed") !== "false"; // Default to collapsed: true

    const updateCameraStream = () => {
        const camIndex = cameraSelect.value;
        cameraStreamImg.src = `/api/video_feed?index=${camIndex}`;
        cameraStatusText.innerText = `Connected: Camera ${camIndex}`;
        cameraActiveDot.classList.add("active");
        logSystemMessage(`Started live camera feed stream (Camera index ${camIndex})`);
    };

    const stopCameraStream = () => {
        cameraStreamImg.src = "";
        cameraStatusText.innerText = "Stream Offline";
        cameraActiveDot.classList.remove("active");
        logSystemMessage("Camera feed stream stopped");
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
            const savedWidth = localStorage.getItem("cnc_camera_width");
            const savedHeight = localStorage.getItem("cnc_camera_height");
            if (savedWidth && savedHeight) {
                cameraFloatingPanel.style.width = savedWidth + "px";
                cameraFloatingPanel.style.height = savedHeight + "px";
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

    cameraPanelHeader.addEventListener("click", (e) => {
        // Only toggle collapse if user didn't click inside panel actions (e.g. the select dropdown)
        if (!e.target.closest(".panel-actions")) {
            toggleCameraCollapse();
        }
    });

    cameraSelect.addEventListener("change", () => {
        localStorage.setItem("cnc_camera_index", cameraSelect.value);
        if (!isCameraCollapsed) {
            updateCameraStream();
        }
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
    const btnMoveToCenter = document.getElementById("btn-move-to-center");
    
    let calibrationInterval = null;
    let calibratedPoints = {};
    let isCalibrated = false;

    window.updateCalibrationUI = () => {
        const badges = { TL: badgeTL, TR: badgeTR, BR: badgeBR, BL: badgeBL };
        for (const [key, badge] of Object.entries(badges)) {
            if (badge) {
                if (calibratedPoints[key]) {
                    badge.classList.add("calibrated");
                } else {
                    badge.classList.remove("calibrated");
                }
            }
        }
        if (btnMoveToCenter) {
            btnMoveToCenter.disabled = !isCalibrated || !isConnected;
        }
    };

    const fetchCalibrationConfig = async () => {
        try {
            const res = await fetch("/api/calibration/config");
            const data = await res.json();
            calibratedPoints = data.points || {};
            isCalibrated = data.calibrated || false;
            if (chkShowOverlay) {
                chkShowOverlay.checked = data.draw_overlay !== false;
            }
            window.updateCalibrationUI();
        } catch (e) {
            console.error("Failed to fetch calibration config: ", e);
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
        } catch (e) {
            console.error("Failed to poll calibration status: ", e);
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
                    logSystemMessage(`Failed to toggle overlay: ${e}`);
                }
            });
        }

        const recordCorner = async (corner) => {
            try {
                const res = await fetch("/api/calibration/record", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ corner: corner })
                });
                const data = await res.json();
                if (data.status === "ok") {
                    calibratedPoints = data.config;
                    isCalibrated = data.calibrated;
                    window.updateCalibrationUI();
                    logSystemMessage(`Calibrated ${corner} successfully!`);
                } else {
                    logSystemMessage(`Calibration failed: ${data.message}`);
                }
            } catch (e) {
                logSystemMessage(`Network error during calibration: ${e}`);
            }
        };

        if (btnCalTL) btnCalTL.addEventListener("click", () => recordCorner("TL"));
        if (btnCalTR) btnCalTR.addEventListener("click", () => recordCorner("TR"));
        if (btnCalBR) btnCalBR.addEventListener("click", () => recordCorner("BR"));
        if (btnCalBL) btnCalBL.addEventListener("click", () => recordCorner("BL"));

        if (btnCalClear) {
            btnCalClear.addEventListener("click", async () => {
                if (confirm("Are you sure you want to clear the calibration?")) {
                    try {
                        const res = await fetch("/api/calibration/clear", { method: "POST" });
                        const data = await res.json();
                        if (data.status === "ok") {
                            calibratedPoints = {};
                            isCalibrated = false;
                            window.updateCalibrationUI();
                            logSystemMessage("Calibration cleared.");
                        }
                    } catch (e) {
                        logSystemMessage(`Failed to clear calibration: ${e}`);
                    }
                }
            });
        }

        if (btnMoveToCenter) {
            btnMoveToCenter.addEventListener("click", async () => {
                try {
                    logSystemMessage("Requesting spindle to move to the coordinate origin (center of the print area)...");
                    const res = await fetch("/api/calibration/move_to_center", { method: "POST" });
                    const data = await res.json();
                    if (data.status === "ok") {
                        logSystemMessage(data.message);
                    } else {
                        logSystemMessage(`Error moving: ${data.message}`);
                    }
                } catch (e) {
                    logSystemMessage(`Network error: ${e}`);
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
}

function jogAxis(axis, direction) {
    if (!isConnected) {
        logSystemMessage("Cannot jog: machine is disconnected.");
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
        
        logSystemMessage(`Adjusting spindle PWM by 10: S${targetSpindleSpeed}`);
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
        logSystemMessage("Cannot jog: machine is disconnected.");
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
    
    logSystemMessage(`Uploading file: ${file.name}...`);
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        if (data.status === "ok") {
            logSystemMessage(`Upload complete. Reading G-code to parse toolpath...`);
            
            // Set file UI info card
            loadedFileName.innerText = file.name;
            loadedFileLines.innerText = `${data.lines_count} lines`;
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
                logSystemMessage(`Parsed ${toolpathPoints.length} motion segments from G-code.`);
            };
            reader.readAsText(file);
            
        } else {
            logSystemMessage(`Upload failed: ${data.message}`);
        }
    } catch (e) {
        logSystemMessage(`Upload network error: ${e}`);
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
    // Canvas coordinate runs Y downwards, CNC coordinate runs Y upwards. Flip Y!
    panX = canvas.width / 2 - (boundingBox.center.x * zoomScale);
    panY = canvas.height / 2 + (boundingBox.center.y * zoomScale);
    
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
            const y1 = panY - p.y1 * zoomScale; // Flip Y for display space
            const x2 = panX + p.x2 * zoomScale;
            const y2 = panY - p.y2 * zoomScale;
            
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
    const screenY = panY - currentWPos.y * zoomScale;
    
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
        logSystemMessage("Cannot execute gesture: machine is disconnected.");
        return;
    }
    
    // Get gesture inputs
    const startX = parseFloat(document.getElementById("gesture-start-x").value) || 0.0;
    const startY = parseFloat(document.getElementById("gesture-start-y").value) || 0.0;
    const endX = parseFloat(document.getElementById("gesture-end-x").value) || 0.0;
    const endY = parseFloat(document.getElementById("gesture-end-y").value) || 0.0;
    
    const feedrate = parseInt(document.getElementById("gesture-feedrate").value) || 2000;
    const dwell = parseFloat(document.getElementById("gesture-dwell").value) || 0.15;
    const distance = parseFloat(document.getElementById("gesture-distance").value) || 40.0;
    
    // Get UP/DOWN command strings from active mode settings
    const penUpValLocal = penUpVal.value;
    const penDownValLocal = penDownVal.value;
    const penDwellLocal = penDwellVal.value; // dwell for physical pen down/up movement
    const isSpindle = (penControlMode.value === "spindle-pwm");
    
    const penUpCmd = isSpindle ? `M3 S${penUpValLocal}` : `G0 Z${penUpValLocal}`;
    const penDownCmd = isSpindle ? `M3 S${penDownValLocal}` : `G0 Z${penDownValLocal}`;
    const penDwellCmd = `G4 P${penDwellLocal}`;
    
    const gcode = [];
    
    // Always start by ensuring absolute coordinates (G90) and millimeters (G21)
    gcode.push("G90 G21");
    
    switch (type) {
        case "tap":
            logSystemMessage(`Simulating Tap at X:${startX}, Y:${startY}`);
            gcode.push(`G0 X${startX} Y${startY}`);
            gcode.push(penDownCmd);
            gcode.push(penDwellCmd);
            if (dwell > 0) {
                gcode.push(`G4 P${dwell}`);
            }
            gcode.push(penUpCmd);
            gcode.push(penDwellCmd);
            break;
            
        case "doubletap":
            logSystemMessage(`Simulating Double Tap at X:${startX}, Y:${startY}`);
            gcode.push(`G0 X${startX} Y${startY}`);
            // First Tap
            gcode.push(penDownCmd);
            gcode.push(penDwellCmd);
            if (dwell > 0) gcode.push(`G4 P${dwell}`);
            gcode.push(penUpCmd);
            gcode.push(penDwellCmd);
            // Wait brief gap between taps
            gcode.push(`G4 P0.15`);
            // Second Tap
            gcode.push(penDownCmd);
            gcode.push(penDwellCmd);
            if (dwell > 0) gcode.push(`G4 P${dwell}`);
            gcode.push(penUpCmd);
            gcode.push(penDwellCmd);
            break;
            
        case "longpress":
            logSystemMessage(`Simulating Long Press (1s) at X:${startX}, Y:${startY}`);
            gcode.push(`G0 X${startX} Y${startY}`);
            gcode.push(penDownCmd);
            gcode.push(penDwellCmd);
            gcode.push(`G4 P1.0`);
            gcode.push(penUpCmd);
            gcode.push(penDwellCmd);
            break;
            
        case "swipe-up":
            logSystemMessage(`Simulating Swipe Up: moving up by ${distance}mm`);
            gcode.push(`G0 X${startX} Y${startY}`);
            gcode.push(penDownCmd);
            gcode.push(penDwellCmd);
            gcode.push(`G1 Y${startY + distance} F${feedrate}`);
            gcode.push(`G4 P0.1`);
            gcode.push(penUpCmd);
            gcode.push(penDwellCmd);
            break;
            
        case "swipe-down":
            logSystemMessage(`Simulating Swipe Down: moving down by ${distance}mm`);
            gcode.push(`G0 X${startX} Y${startY}`);
            gcode.push(penDownCmd);
            gcode.push(penDwellCmd);
            gcode.push(`G1 Y${startY - distance} F${feedrate}`);
            gcode.push(`G4 P0.1`);
            gcode.push(penUpCmd);
            gcode.push(penDwellCmd);
            break;
            
        case "swipe-left":
            logSystemMessage(`Simulating Swipe Left: moving left by ${distance}mm`);
            gcode.push(`G0 X${startX} Y${startY}`);
            gcode.push(penDownCmd);
            gcode.push(penDwellCmd);
            gcode.push(`G1 X${startX - distance} F${feedrate}`);
            gcode.push(`G4 P0.1`);
            gcode.push(penUpCmd);
            gcode.push(penDwellCmd);
            break;
            
        case "swipe-right":
            logSystemMessage(`Simulating Swipe Right: moving right by ${distance}mm`);
            gcode.push(`G0 X${startX} Y${startY}`);
            gcode.push(penDownCmd);
            gcode.push(penDwellCmd);
            gcode.push(`G1 X${startX + distance} F${feedrate}`);
            gcode.push(`G4 P0.1`);
            gcode.push(penUpCmd);
            gcode.push(penDwellCmd);
            break;
            
        case "swipe-custom":
            logSystemMessage(`Simulating Custom Swipe from X:${startX} Y:${startY} to X:${endX} Y:${endY}`);
            gcode.push(`G0 X${startX} Y${startY}`);
            gcode.push(penDownCmd);
            gcode.push(penDwellCmd);
            gcode.push(`G1 X${endX} Y${endY} F${feedrate}`);
            gcode.push(`G4 P0.1`);
            gcode.push(penUpCmd);
            gcode.push(penDwellCmd);
            break;
            
        default:
            console.error("Unknown gesture type: " + type);
            return;
    }
    
    // Send G-code lines to backend
    await sendCommand(gcode.join("\n"));
}
