/**
 * CNC Web Controller - Touch & Script Controller (3-Row Layout)
 * Handles UI interactions, WebSocket telemetry, 2D Tool Path View,
 * machine jogging, touch & swipe gestures, and relative scenario execution.
 */

(function () {
    'use strict';

    // State Variables
    let translations = {};
    let currentLang = 'vi';
    
    let ws = null;
    let isConnected = false;
    let isHomeSet = false;
    let scenarioInsertIndex = -1;

    // Telemetry State
    let telemetry = {
        state: 'NGOẠI TUYẾN',
        mpos: [0, 0, 0],
        wpos: [0, 0, 0],
        workpiece_origin: { x: 0, y: 0, z: 0 },
        work_origin: { x: 0, y: 0, z: 0 },
        parking_point: { x: 0, y: 0, z: 10 },
        pen_rel_workpiece: { x: 0, y: 0, z: 0 },
        pen_rel_work: { x: 0, y: 0, z: 0 },
        feedrate: 0,
        spindle_speed: 0,
        buffer_rx: 127,
        streaming: false
    };

    // Movement & Pen Settings Defaults
    let stepDistance = 10.0;
    let jogFeedrate = 1000.0;
    let penMode = 'z-axis';
    let penUpZ = 3.0;
    let penDownZ = 0.0;
    let penUpPwm = 30.0;
    let penDownPwm = 90.0;
    let penDwell = 0.25;

    // Scenario State
    let activeScenario = {
        name: 'kich_ban_1',
        actions: []
    };
    let isScenarioLooping = false;
    let isSimulating = false;

    // Tool Path View Canvas State
    let canvas = null;
    let ctx = null;
    let canvasScale = 2.0; // pixels per mm
    let canvasOffsetX = 0;
    let canvasOffsetY = 0;
    let isDraggingCanvas = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let penTrajectory = [];

    // Helper: i18n translation
    function t(key, vars = {}) {
        let text = translations[key] || key;
        for (const [k, v] of Object.entries(vars)) {
            text = text.replace(`{${k}}`, v);
        }
        return text;
    }

    async function loadTranslations(lang) {
        currentLang = lang;
        try {
            const res = await fetch(`/static/lang/${lang}.json`);
            if (res.ok) {
                translations = await res.json();
            }
        } catch (e) {
            console.warn(`Could not load translation for ${lang}:`, e);
        }
        updateUINodes();
    }

    function updateUINodes() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n-key') || el.innerText.trim();
            if (!el.getAttribute('data-i18n-key')) {
                el.setAttribute('data-i18n-key', key);
            }
            if (translations[key]) {
                el.innerText = translations[key];
            }
        });
    }

    // Initialize Application
    document.addEventListener('DOMContentLoaded', async () => {
        initDOM();
        initCanvas();
        loadTranslations('vi');
        connectWebSocket();
        await fetchPorts();
        await fetchInitialSettings();
        await checkCurrentState();
    });

    function initDOM() {
        // Language switcher
        const langSelect = document.getElementById('lang-switcher');
        if (langSelect) {
            langSelect.addEventListener('change', (e) => {
                loadTranslations(e.target.value);
            });
        }

        // Connection buttons
        document.getElementById('connect-btn')?.addEventListener('click', toggleConnection);
        document.getElementById('btn-list-ports')?.addEventListener('click', fetchPorts);

        // Pen Mode & Controls
        document.getElementById('pen-control-mode')?.addEventListener('change', (e) => {
            penMode = e.target.value;
            updatePenInputs();
            savePenSettings();
        });

        document.getElementById('btn-pen-up')?.addEventListener('click', () => sendPenCommand('up'));
        document.getElementById('btn-pen-down')?.addEventListener('click', () => sendPenCommand('down'));

        // Origins
        document.getElementById('btn-set-work-origin')?.addEventListener('click', setWorkOriginCurrent);
        document.getElementById('btn-goto-work-origin')?.addEventListener('click', gotoWorkOrigin);
        document.getElementById('btn-goto-parking')?.addEventListener('click', gotoParkingPoint);
        document.getElementById('btn-stop-cnc')?.addEventListener('click', stopCNC);

        // Jogging Keypad
        bindJogKey('jog-y-minus', 0, 1, 0); // Y+
        bindJogKey('jog-y-plus', 0, -1, 0); // Y-
        bindJogKey('jog-x-minus', -1, 0, 0); // X-
        bindJogKey('jog-x-plus', 1, 0, 0); // X+
        bindJogKey('jog-y-minus-x-minus', -1, -1, 0);
        bindJogKey('jog-y-minus-x-plus', 1, -1, 0);
        bindJogKey('jog-y-plus-x-minus', -1, 1, 0);
        bindJogKey('jog-y-plus-x-plus', 1, 1, 0);
        bindJogKey('jog-z-plus', 0, 0, 1);
        bindJogKey('jog-z-minus', 0, 0, -1);

        document.getElementById('jog-home')?.addEventListener('click', () => sendCommand('$H'));
        document.getElementById('jog-unlock')?.addEventListener('click', () => sendCommand('$X'));

        // Gesture Action Setup
        document.getElementById('btn-set-start')?.addEventListener('click', () => {
            document.getElementById('gesture-start-x').value = telemetry.pen_rel_work.x.toFixed(2);
            document.getElementById('gesture-start-y').value = telemetry.pen_rel_work.y.toFixed(2);
        });
        document.getElementById('btn-set-end')?.addEventListener('click', () => {
            document.getElementById('gesture-end-x').value = telemetry.pen_rel_work.x.toFixed(2);
            document.getElementById('gesture-end-y').value = telemetry.pen_rel_work.y.toFixed(2);
        });

        document.getElementById('btn-gesture-tap')?.addEventListener('click', () => executeGesture('tap'));
        document.getElementById('btn-gesture-doubletap')?.addEventListener('click', () => executeGesture('double_tap'));
        document.getElementById('btn-gesture-longpress')?.addEventListener('click', () => executeGesture('long_press'));
        document.getElementById('btn-gesture-swipe-custom')?.addEventListener('click', () => executeGesture('swipe_custom'));
        document.getElementById('btn-gesture-swipe-left')?.addEventListener('click', () => executeGesture('swipe_left'));
        document.getElementById('btn-gesture-swipe-right')?.addEventListener('click', () => executeGesture('swipe_right'));
        document.getElementById('btn-gesture-swipe-up')?.addEventListener('click', () => executeGesture('swipe_up'));
        document.getElementById('btn-gesture-swipe-down')?.addEventListener('click', () => executeGesture('swipe_down'));

        // Scenario Operations
        document.getElementById('btn-create-scenario')?.addEventListener('click', createNewScenario);
        document.getElementById('btn-save-scenario')?.addEventListener('click', saveScenarioJSON);
        document.getElementById('btn-load-scenario')?.addEventListener('click', () => document.getElementById('input-load-scenario')?.click());
        document.getElementById('input-load-scenario')?.addEventListener('change', loadScenarioJSON);
        document.getElementById('btn-run-scenario')?.addEventListener('click', runScenario);
        document.getElementById('btn-run-loop-scenario')?.addEventListener('click', toggleRunLoopScenario);
        document.getElementById('btn-sim-scenario')?.addEventListener('click', runScenarioSimulation);
        document.getElementById('btn-stop-scenario')?.addEventListener('click', stopScenario);
        document.getElementById('btn-clear-scenario-steps')?.addEventListener('click', clearScenarioSteps);

        // Scenario Action Keys
        document.querySelectorAll('.btn-scenario-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!isHomeSet) {
                    alert(t('Cần đặt gốc tọa độ làm việc trước!'));
                    return;
                }
                const actionType = e.currentTarget.getAttribute('data-action');
                addScenarioAction(actionType);
            });
        });

        // Console Input
        document.getElementById('console-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('console-input');
            if (input && input.value.trim()) {
                sendCommand(input.value.trim());
                input.value = '';
            }
        });
        document.getElementById('btn-clear-console')?.addEventListener('click', () => {
            const out = document.getElementById('console-output');
            if (out) out.innerHTML = '';
        });

        // Visualizer Controls
        document.getElementById('btn-reset-view')?.addEventListener('click', resetCanvasView);
        document.getElementById('btn-clear-path')?.addEventListener('click', () => {
            penTrajectory = [];
            drawCanvas();
        });
    }

    // Serial & Settings API Calls
    async function fetchPorts() {
        try {
            const res = await fetch('/api/devices/ports');
            const data = await res.json();
            const datalist = document.getElementById('ports-datalist');
            if (datalist && data.ports) {
                datalist.innerHTML = '<option value="dummy">dummy (Chế độ giả lập)</option>';
                data.ports.forEach(p => {
                    const opt = document.createElement('option');
                    opt.value = p;
                    datalist.appendChild(opt);
                });
            }
        } catch (e) {
            console.error('Error fetching ports:', e);
        }
    }

    async function fetchInitialSettings() {
        try {
            const res = await fetch('/api/pen_settings');
            const data = await res.json();
            penMode = data.pen_mode || 'z-axis';
            penUpZ = data.pen_up_z || 3.0;
            penDownZ = data.pen_down_z || 0.0;
            penUpPwm = data.pen_up_pwm || 30.0;
            penDownPwm = data.pen_down_pwm || 90.0;
            penDwell = data.pen_dwell || 0.25;

            const modeSelect = document.getElementById('pen-control-mode');
            if (modeSelect) modeSelect.value = penMode;

            updatePenInputs();

            if (data.workpiece_origin) telemetry.workpiece_origin = data.workpiece_origin;
            if (data.work_origin) telemetry.work_origin = data.work_origin;
            if (data.parking_point) telemetry.parking_point = data.parking_point;
            updateInfoDisplays();
        } catch (e) {
            console.error('Error fetching initial settings:', e);
        }
    }

    function updatePenInputs() {
        const upInput = document.getElementById('pen-up-val');
        const downInput = document.getElementById('pen-down-val');
        if (!upInput || !downInput) return;
        if (penMode === 'spindle-pwm') {
            upInput.value = penUpPwm;
            downInput.value = penDownPwm;
            upInput.step = "5";
            downInput.step = "5";
        } else {
            upInput.value = penUpZ;
            downInput.value = penDownZ;
            upInput.step = "0.5";
            downInput.step = "0.5";
        }
    }

    async function savePenSettings() {
        const upInput = document.getElementById('pen-up-val');
        const downInput = document.getElementById('pen-down-val');
        if (upInput && downInput) {
            const valUp = parseFloat(upInput.value);
            const valDown = parseFloat(downInput.value);
            if (penMode === 'spindle-pwm') {
                penUpPwm = valUp;
                penDownPwm = valDown;
            } else {
                penUpZ = valUp;
                penDownZ = valDown;
            }
        }

        try {
            await fetch('/api/pen_settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pen_mode: penMode,
                    pen_up_z: penUpZ,
                    pen_down_z: penDownZ,
                    pen_up_pwm: penUpPwm,
                    pen_down_pwm: penDownPwm,
                    pen_dwell: penDwell
                })
            });
        } catch (e) {
            console.error('Error saving pen settings:', e);
        }
    }

    async function toggleConnection() {
        const portInput = document.getElementById('port-input');
        const baudrateSelect = document.getElementById('baudrate-input');
        const btn = document.getElementById('connect-btn');

        if (isConnected) {
            try {
                await fetch('/api/disconnect', { method: 'POST' });
            } catch (e) {
                console.error('Disconnect error:', e);
            }
        } else {
            const port = portInput ? portInput.value : '/dev/ttyACM0';
            const baudrate = baudrateSelect ? parseInt(baudrateSelect.value) : 115200;
            if (btn) btn.innerText = t('Đang kết nối...');
            try {
                const res = await fetch('/api/connect', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ port, baudrate })
                });
                const data = await res.json();
                if (data.status === 'error') {
                    alert(data.message);
                }
            } catch (e) {
                console.error('Connect error:', e);
            }
        }
    }

    async function checkCurrentState() {
        try {
            const res = await fetch('/api/state');
            const data = await res.json();
            isConnected = data.connected;
            isHomeSet = data.home_set || false;
            updateConnectionUI();
            
            const portInput = document.getElementById('port-input');
            const baudrateSelect = document.getElementById('baudrate-input');
            
            if (isConnected) {
                if (portInput && data.port) portInput.value = data.port;
                if (baudrateSelect && data.baudrate) baudrateSelect.value = data.baudrate;
            } else {
                await toggleConnection();
            }
        } catch (e) {
            console.error('Error checking state on load:', e);
        }
    }

    function connectWebSocket() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        ws = new WebSocket(`${protocol}//${window.location.host}/ws`);

        ws.onopen = () => console.log('WebSocket connected');
        ws.onclose = () => {
            console.log('WebSocket disconnected. Reconnecting in 2s...');
            setTimeout(connectWebSocket, 2000);
        };
        ws.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);
                handleWSMessage(msg);
            } catch (e) {
                console.error('WS parse error:', e);
            }
        };
    }

    function handleWSMessage(msg) {
        if (msg.type === 'telemetry') {
            telemetry = { ...telemetry, ...msg };
            if (msg.home_set !== undefined) {
                isHomeSet = msg.home_set;
            }
            updateTelemetryUI();
        } else if (msg.type === 'connection') {
            isConnected = msg.connected;
            updateConnectionUI();
        } else if (msg.type === 'log') {
            appendConsoleLog(msg.direction, msg.content);
        } else if (msg.type === 'stream_status') {
            if (msg.status === 'completed' && isScenarioLooping) {
                setTimeout(runScenario, 500);
            }
        }
    }

    function updateConnectionUI() {
        const connBadge = document.getElementById('connection-status');
        const stateBadge = document.getElementById('machine-state');
        const btn = document.getElementById('connect-btn');

        if (isConnected) {
            if (connBadge) {
                connBadge.className = 'status-badge connected';
                connBadge.innerText = t('ĐÃ KẾT NỐI');
            }
            if (btn) {
                btn.className = 'btn btn-danger-soft';
                btn.innerText = t('Ngắt Kết Nối');
            }
        } else {
            if (connBadge) {
                connBadge.className = 'status-badge disconnected';
                connBadge.innerText = t('MẤT KẾT NỐI');
            }
            if (stateBadge) {
                stateBadge.className = 'state-badge disconnected';
                stateBadge.innerText = t('NGOẠI TUYẾN');
            }
            if (btn) {
                btn.className = 'btn btn-primary';
                btn.innerText = t('Kết Nối');
            }
        }
    }

    function updateTelemetryUI() {
        const stateBadge = document.getElementById('machine-state');
        if (stateBadge && isConnected) {
            stateBadge.className = 'state-badge connected';
            stateBadge.innerText = telemetry.state || 'IDLE';
        }

        document.getElementById('tel-feedrate').innerText = Math.round(telemetry.feedrate || 0);
        document.getElementById('tel-spindle').innerText = Math.round(telemetry.spindle_speed || 0);
        document.getElementById('tel-buffer').innerText = telemetry.buffer_rx || 127;

        updateInfoDisplays();

        // Track pen trajectory on tool path view
        if (telemetry.wpos) {
            const currentWPos = { x: telemetry.wpos[0], y: telemetry.wpos[1] };
            if (penTrajectory.length === 0 || 
                Math.hypot(currentWPos.x - penTrajectory[penTrajectory.length - 1].x, currentWPos.y - penTrajectory[penTrajectory.length - 1].y) > 0.5) {
                penTrajectory.push(currentWPos);
                if (penTrajectory.length > 1000) penTrajectory.shift();
                drawCanvas();
            }
        }
    }

    function updateInfoDisplays() {
        const wo = telemetry.workpiece_origin || { x: 0, y: 0, z: 0 };
        const prw = telemetry.pen_rel_workpiece || { x: 0, y: 0, z: 0 };
        const wr = telemetry.work_origin || { x: 0, y: 0, z: 0 };
        const pr = telemetry.pen_rel_work || { x: 0, y: 0, z: 0 };
        const pk = telemetry.parking_point || { x: 0, y: 0, z: 10 };

        document.getElementById('val-workpiece-orig').innerText = `X: ${wo.x.toFixed(2)} | Y: ${wo.y.toFixed(2)} | Z: ${wo.z.toFixed(2)}`;
        document.getElementById('val-pen-rel-workpiece').innerText = `X: ${prw.x.toFixed(2)} | Y: ${prw.y.toFixed(2)} | Z: ${prw.z.toFixed(2)}`;
        document.getElementById('val-work-orig').innerText = `X: ${wr.x.toFixed(2)} | Y: ${wr.y.toFixed(2)} | Z: ${wr.z.toFixed(2)}`;
        document.getElementById('val-pen-rel-work').innerText = `X: ${pr.x.toFixed(2)} | Y: ${pr.y.toFixed(2)} | Z: ${pr.z.toFixed(2)}`;
        document.getElementById('val-parking-point').innerText = `X: ${pk.x.toFixed(2)} | Y: ${pk.y.toFixed(2)} | Z: ${pk.z.toFixed(2)}`;
    }

    function appendConsoleLog(dir, text) {
        const out = document.getElementById('console-output');
        if (!out) return;
        const line = document.createElement('div');
        line.className = `log-line ${dir}`;
        const prefix = dir === 'out' ? '>' : '<';
        line.innerText = `${prefix} ${text}`;
        out.appendChild(line);
        out.scrollTop = out.scrollHeight;
    }

    async function sendCommand(gcode) {
        if (!isConnected) {
            alert(t('Vui lòng Kết Nối CNC (hoặc chọn cổng dummy) trước khi điều khiển!'));
            return;
        }
        try {
            const res = await fetch('/api/command', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command: gcode })
            });
            const data = await res.json();
            if (data.detail) {
                alert(data.detail);
            }
        } catch (e) {
            console.error('Send command error:', e);
        }
    }

    function sendPenCommand(stateType) {
        savePenSettings();
        if (stateType === 'up') {
            if (penMode === 'spindle-pwm') {
                sendCommand(`M3 S${penUpPwm}`);
            } else {
                sendCommand(`G0 Z${penUpZ}`);
            }
        } else {
            if (penMode === 'spindle-pwm') {
                sendCommand(`M3 S${penDownPwm}`);
            } else {
                sendCommand(`G0 Z${penDownZ}`);
            }
        }
    }

    // Machine Jogging Functions
    function bindJogKey(id, dx, dy, dz) {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('click', () => {
            const stepSelect = document.getElementById('select-step-preset');
            const feedInput = document.getElementById('jog-feedrate-input');
            const step = stepSelect ? parseFloat(stepSelect.value) : stepDistance;
            const feed = feedInput ? parseFloat(feedInput.value) : jogFeedrate;
            const moveX = dx * step;
            const moveY = dy * step;
            const moveZ = dz * step;

            let lines = ['G91'];
            let moveCmd = 'G0';
            if (dx !== 0) moveCmd += ` X${moveX.toFixed(2)}`;
            if (dy !== 0) moveCmd += ` Y${moveY.toFixed(2)}`;
            if (dz !== 0) moveCmd += ` Z${moveZ.toFixed(2)}`;
            moveCmd += ` F${feed}`;
            lines.push(moveCmd);
            lines.push('G90');

            sendCommand(lines.join('\n'));
        });
    }

    async function setWorkOriginCurrent() {
        const currentWPos = telemetry.wpos || [0, 0, 0];
        try {
            await fetch('/api/origins/work', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ x: 0.0, y: 0.0, z: 0.0 })
            });
            isHomeSet = true;
            alert(t('Đã thiết lập gốc tọa độ làm việc (0,0,0) tại vị trí hiện tại.'));
        } catch (e) {
            console.error('Error setting work origin:', e);
        }
    }

    function gotoWorkOrigin() {
        const feedInput = document.getElementById('jog-feedrate-input');
        const feed = feedInput ? parseFloat(feedInput.value) : jogFeedrate;
        sendCommand(`G90\nG0 X0 Y0 F${feed}`);
    }

    async function gotoParkingPoint() {
        try {
            await fetch('/api/origins/goto_parking', { method: 'POST' });
        } catch (e) {
            console.error('Error going to parking point:', e);
        }
    }

    async function stopCNC() {
        try {
            await fetch('/api/stop', { method: 'POST' });
        } catch (e) {
            console.error('Error stopping CNC:', e);
        }
    }

    // Touch & Swipe Gestures
    function executeGesture(type) {
        if (!isHomeSet) {
            alert(t('Cần đặt gốc tọa độ làm việc trước!'));
            return;
        }

        const feed = parseFloat(document.getElementById('gesture-feedrate')?.value || '4000');
        const step = parseFloat(document.getElementById('gesture-step')?.value || '10');
        const tapDwell = parseFloat(document.getElementById('gesture-tap-dwell')?.value || '0.05');
        const swipeDist = parseFloat(document.getElementById('gesture-swipe-distance')?.value || '40');

        const startX = parseFloat(document.getElementById('gesture-start-x')?.value || '0');
        const startY = parseFloat(document.getElementById('gesture-start-y')?.value || '0');
        const endX = parseFloat(document.getElementById('gesture-end-x')?.value || '0');
        const endY = parseFloat(document.getElementById('gesture-end-y')?.value || '0');

        let gcode = [];
        gcode.push(`G90`);

        const isSpindle = penMode === 'spindle-pwm';
        const pDown = isSpindle ? `M3 S${penDownPwm}` : `G0 Z${penDownZ}`;
        const pUp = isSpindle ? `M3 S${penUpPwm}` : `G0 Z${penUpZ}`;

        if (type === 'tap') {
            gcode.push(`G0 X${startX.toFixed(2)} Y${startY.toFixed(2)} F${feed}`);
            gcode.push(pDown);
            gcode.push(`G4 P${tapDwell}`);
            gcode.push(pUp);
        } else if (type === 'double_tap') {
            gcode.push(`G0 X${startX.toFixed(2)} Y${startY.toFixed(2)} F${feed}`);
            gcode.push(pDown);
            gcode.push(`G4 P${tapDwell}`);
            gcode.push(pUp);
            gcode.push(`G4 P${tapDwell}`);
            gcode.push(pDown);
            gcode.push(`G4 P${tapDwell}`);
            gcode.push(pUp);
        } else if (type === 'long_press') {
            gcode.push(`G0 X${startX.toFixed(2)} Y${startY.toFixed(2)} F${feed}`);
            gcode.push(pDown);
            gcode.push(`G4 P1.0`);
            gcode.push(pUp);
        } else if (type === 'swipe_custom') {
            gcode.push(pUp);
            gcode.push(`G0 X${startX.toFixed(2)} Y${startY.toFixed(2)} F${feed}`);
            gcode.push(pDown);
            gcode.push(`G4 P${penDwell}`);
            gcode.push(`G1 X${endX.toFixed(2)} Y${endY.toFixed(2)} F${feed}`);
            gcode.push(pUp);
        } else if (type === 'swipe_left') {
            gcode.push(pDown);
            gcode.push(`G4 P${penDwell}`);
            gcode.push(`G91`);
            gcode.push(`G1 X-${swipeDist} F${feed}`);
            gcode.push(`G90`);
            gcode.push(pUp);
        } else if (type === 'swipe_right') {
            gcode.push(pDown);
            gcode.push(`G4 P${penDwell}`);
            gcode.push(`G91`);
            gcode.push(`G1 X${swipeDist} F${feed}`);
            gcode.push(`G90`);
            gcode.push(pUp);
        } else if (type === 'swipe_up') {
            gcode.push(pDown);
            gcode.push(`G4 P${penDwell}`);
            gcode.push(`G91`);
            gcode.push(`G1 Y${swipeDist} F${feed}`);
            gcode.push(`G90`);
            gcode.push(pUp);
        } else if (type === 'swipe_down') {
            gcode.push(pDown);
            gcode.push(`G4 P${penDwell}`);
            gcode.push(`G91`);
            gcode.push(`G1 Y-${swipeDist} F${feed}`);
            gcode.push(`G90`);
            gcode.push(pUp);
        }

        sendCommand(gcode.join('\n'));
    }

    // Tool Path View Canvas (Visualizer)
    function initCanvas() {
        canvas = document.getElementById('toolpath-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            drawCanvas();
        }

        window.addEventListener('resize', resize);
        resize();

        // Mouse Pan & Zoom
        canvas.addEventListener('mousedown', (e) => {
            isDraggingCanvas = true;
            dragStartX = e.clientX - canvasOffsetX;
            dragStartY = e.clientY - canvasOffsetY;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDraggingCanvas) return;
            canvasOffsetX = e.clientX - dragStartX;
            canvasOffsetY = e.clientY - dragStartY;
            drawCanvas();
        });

        window.addEventListener('mouseup', () => isDraggingCanvas = false);

        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
            canvasScale *= zoomFactor;
            canvasScale = Math.max(0.2, Math.min(canvasScale, 20.0));
            drawCanvas();
        });
    }

    function resetCanvasView() {
        canvasScale = 2.0;
        canvasOffsetX = 0;
        canvasOffsetY = 0;
        drawCanvas();
    }

    function drawCanvas() {
        if (!canvas || !ctx) return;
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        const centerX = 0;//w / 2 + canvasOffsetX;
        const centerY = 0;//h / 2 + canvasOffsetY;

        // Draw Grid
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        const gridSize = 20 * canvasScale; // 20mm grid

        for (let x = centerX % gridSize; x < w; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = centerY % gridSize; y < h; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Draw Work Origin Axes (0,0)
        ctx.lineWidth = 2;
        // X Axis (Red)
        ctx.strokeStyle = '#ef4444';
        ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.lineTo(centerX + 60, centerY); ctx.stroke();
        // Y Axis (Green) - inverted direction
        ctx.strokeStyle = '#22c55e';
        ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.lineTo(centerX, centerY - 60); ctx.stroke();

        // Work Origin dot
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath(); ctx.arc(centerX, centerY, 5, 0, Math.PI * 2); ctx.fill();

        // Draw Scenario Preview Path (Y inverted)
        if (activeScenario.actions && activeScenario.actions.length > 0) {
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            let started = false;
            activeScenario.actions.forEach(action => {
                if (action.x !== undefined && action.y !== undefined) {
                    const px = centerX + action.x * canvasScale;
                    const py = centerY - action.y * canvasScale; // Inverted Y direction
                    if (!started) {
                        ctx.moveTo(px, py);
                        started = true;
                    } else {
                        ctx.lineTo(px, py);
                    }
                }
            });
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Draw Live Pen Trajectory (Y inverted)
        if (penTrajectory.length > 1) {
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            ctx.beginPath();
            penTrajectory.forEach((pt, i) => {
                const px = centerX + pt.x * canvasScale;
                const py = centerY - pt.y * canvasScale;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.stroke();
        }

        // Draw Pen Head Position (Y inverted)
        if (telemetry.wpos) {
            const headPx = centerX + telemetry.wpos[0] * canvasScale;
            const headPy = centerY - telemetry.wpos[1] * canvasScale;
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath(); ctx.arc(headPx, headPy, 6, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }

    // Scenario Builder & Execution
    // Scenario Builder & Execution
    function createNewScenario() {
        if (!isHomeSet) {
            alert(t('Cần đặt gốc tọa độ làm việc trước!'));
            return;
        }
        activeScenario = {
            name: document.getElementById('scenario-name')?.value || 'kich_ban_1',
            actions: []
        };
        scenarioInsertIndex = -1;
        renderScenarioSteps();
        drawCanvas();
    }

    function addScenarioAction(actionType) {
        const relPos = telemetry.pen_rel_work || { x: 0, y: 0 };
        const action = {
            type: actionType,
            x: parseFloat(relPos.x.toFixed(2)),
            y: parseFloat(relPos.y.toFixed(2)),
            z: parseFloat((telemetry.wpos ? telemetry.wpos[2] : 0).toFixed(2))
        };
        if (scenarioInsertIndex !== -1) {
            activeScenario.actions.splice(scenarioInsertIndex + 1, 0, action);
            scenarioInsertIndex++;
        } else {
            activeScenario.actions.push(action);
        }
        renderScenarioSteps();
        drawCanvas();
    }

    function renderScenarioSteps() {
        const container = document.getElementById('scenario-items-list');
        const countSpan = document.getElementById('scenario-steps-count');
        const insertInfo = document.getElementById('scenario-insert-info');
        const insertIndexLabel = document.getElementById('scenario-insert-index-label');
        if (!container) return;

        if (countSpan) countSpan.innerText = activeScenario.actions.length;

        if (insertInfo && insertIndexLabel) {
            if (scenarioInsertIndex !== -1 && scenarioInsertIndex < activeScenario.actions.length) {
                insertInfo.style.display = 'inline';
                insertIndexLabel.innerText = scenarioInsertIndex + 1;
            } else {
                insertInfo.style.display = 'none';
                scenarioInsertIndex = -1;
            }
        }

        if (activeScenario.actions.length === 0) {
            container.innerHTML = `<div class="empty-steps-hint">${t('Chưa có bước nào trong kịch bản. Nhấn các phím phía trên để thêm bước.')}</div>`;
            return;
        }

        container.innerHTML = '';
        activeScenario.actions.forEach((act, idx) => {
            const item = document.createElement('div');
            item.className = 'step-item' + (scenarioInsertIndex === idx ? ' insert-active' : '');
            
            let label = act.type.toUpperCase().replace(/_/g, ' ');
            let details = '';
            if (act.type.startsWith('dwell-')) {
                details = `${act.type.split('-')[1]}s`;
            } else if (act.type === 'dwell') {
                details = `${act.duration ?? 0.25}s`;
            } else if (act.x !== undefined && act.y !== undefined) {
                details = `${act.x.toFixed(1)}, ${act.y.toFixed(1)}`;
            }
            
            item.innerHTML = `
                <span>#${idx + 1} <strong>${label}</strong> ${details ? `(${details})` : ''}</span>
                <div class="step-item-actions">
                    <button class="step-btn pin-btn ${scenarioInsertIndex === idx ? 'active' : ''}" title="${t('Đặt vị trí chèn sau bước này')}">📌</button>
                    <button class="step-btn move-up-btn" title="${t('Di chuyển lên')}">▲</button>
                    <button class="step-btn move-down-btn" title="${t('Di chuyển xuống')}">▼</button>
                    <button class="step-btn delete" title="${t('Xóa bước này')}">✕</button>
                </div>
            `;
            
            const btnPin = item.querySelector('.pin-btn');
            const btnUp = item.querySelector('.move-up-btn');
            const btnDown = item.querySelector('.move-down-btn');
            const btnDel = item.querySelector('.delete');
            
            btnPin.addEventListener('click', () => {
                if (scenarioInsertIndex === idx) {
                    scenarioInsertIndex = -1;
                } else {
                    scenarioInsertIndex = idx;
                }
                renderScenarioSteps();
                drawCanvas();
            });
            
            btnUp.addEventListener('click', () => {
                if (idx > 0) {
                    const temp = activeScenario.actions[idx];
                    activeScenario.actions[idx] = activeScenario.actions[idx - 1];
                    activeScenario.actions[idx - 1] = temp;
                    if (scenarioInsertIndex === idx) {
                        scenarioInsertIndex = idx - 1;
                    } else if (scenarioInsertIndex === idx - 1) {
                        scenarioInsertIndex = idx;
                    }
                    renderScenarioSteps();
                    drawCanvas();
                }
            });
            
            btnDown.addEventListener('click', () => {
                if (idx < activeScenario.actions.length - 1) {
                    const temp = activeScenario.actions[idx];
                    activeScenario.actions[idx] = activeScenario.actions[idx + 1];
                    activeScenario.actions[idx + 1] = temp;
                    if (scenarioInsertIndex === idx) {
                        scenarioInsertIndex = idx + 1;
                    } else if (scenarioInsertIndex === idx + 1) {
                        scenarioInsertIndex = idx;
                    }
                    renderScenarioSteps();
                    drawCanvas();
                }
            });
            
            btnDel.addEventListener('click', () => {
                activeScenario.actions.splice(idx, 1);
                if (scenarioInsertIndex === idx) {
                    scenarioInsertIndex = -1;
                } else if (scenarioInsertIndex > idx) {
                    scenarioInsertIndex--;
                }
                renderScenarioSteps();
                drawCanvas();
            });
            
            container.appendChild(item);
        });
    }

    function clearScenarioSteps() {
        activeScenario.actions = [];
        scenarioInsertIndex = -1;
        renderScenarioSteps();
        drawCanvas();
    }

    function saveScenarioJSON() {
        const nameInput = document.getElementById('scenario-name');
        if (nameInput) activeScenario.name = nameInput.value;
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(activeScenario, null, 2));
        const anchor = document.createElement('a');
        anchor.setAttribute('href', dataStr);
        anchor.setAttribute('download', `${activeScenario.name}.json`);
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
    }

    function loadScenarioJSON(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                activeScenario = JSON.parse(event.target.result);
                scenarioInsertIndex = -1;
                const nameInput = document.getElementById('scenario-name');
                if (nameInput && activeScenario.name) nameInput.value = activeScenario.name;
                renderScenarioSteps();
                drawCanvas();
            } catch (err) {
                alert(t('Lỗi đọc file JSON kịch bản!'));
            }
        };
        reader.readAsText(file);
    }

    function generateScenarioGCode() {
        const feed = parseFloat(document.getElementById('gesture-feedrate')?.value || '4000');
        const tapDwell = parseFloat(document.getElementById('gesture-tap-dwell')?.value || '0.05');
        const swipeDist = parseFloat(document.getElementById('gesture-swipe-distance')?.value || '40');

        let gcode = [];
        gcode.push('G90 G54');
        
        const isSpindle = penMode === 'spindle-pwm';
        const pDown = isSpindle ? `M3 S${penDownPwm}` : `G0 Z${penDownZ}`;
        const pUp = isSpindle ? `M3 S${penUpPwm}` : `G0 Z${penUpZ}`;

        activeScenario.actions.forEach(act => {
            if (act.type === 'set_begin' || act.type === 'go_to_here') {
                gcode.push(pUp);
                gcode.push(`G0 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
                gcode.push(`G4 P0.25`);
            } else if (act.type === 'go_to_keep_state') {
                gcode.push(`G1 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
            } else if (act.type === 'pen_down') {
                gcode.push(pDown);
                gcode.push(`G4 P${penDwell}`);
            } else if (act.type === 'pen_up') {
                gcode.push(pUp);
                gcode.push(`G4 P${penDwell}`);
            } else if (act.type === 'tap') {
                gcode.push(`G0 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
                gcode.push(pDown);
                gcode.push(`G4 P${tapDwell}`);
                gcode.push(pUp);
            } else if (act.type === 'double_tap') {
                gcode.push(`G0 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
                gcode.push(pDown);
                gcode.push(`G4 P${tapDwell}`);
                gcode.push(pUp);
                gcode.push(`G4 P${tapDwell}`);
                gcode.push(pDown);
                gcode.push(`G4 P${tapDwell}`);
                gcode.push(pUp);
            } else if (act.type === 'long_press') {
                gcode.push(`G0 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
                gcode.push(pDown);
                gcode.push(`G4 P1.0`);
                gcode.push(pUp);
            } else if (act.type === 'swipe_down') {
                gcode.push(`G0 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
                gcode.push(pDown);
                gcode.push(`G4 P${penDwell}`);
                gcode.push(`G1 Y${(act.y - swipeDist).toFixed(2)} F${feed}`);
                gcode.push(pUp);
            } else if (act.type === 'swipe_up') {
                gcode.push(`G0 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
                gcode.push(pDown);
                gcode.push(`G4 P${penDwell}`);
                gcode.push(`G1 Y${(act.y + swipeDist).toFixed(2)} F${feed}`);
                gcode.push(pUp);
            } else if (act.type === 'swipe_left') {
                gcode.push(`G0 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
                gcode.push(pDown);
                gcode.push(`G4 P${penDwell}`);
                gcode.push(`G1 X${(act.x - swipeDist).toFixed(2)} F${feed}`);
                gcode.push(pUp);
            } else if (act.type === 'swipe_right') {
                gcode.push(`G0 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
                gcode.push(pDown);
                gcode.push(`G4 P${penDwell}`);
                gcode.push(`G1 X${(act.x + swipeDist).toFixed(2)} F${feed}`);
                gcode.push(pUp);
            } else if (act.type.startsWith('dwell-')) {
                const duration = act.type.split('-')[1];
                gcode.push(`G4 P${duration}`);
            } else if (act.type === 'dwell') {
                gcode.push(`G4 P${(act.duration ?? 0.25).toFixed(2)}`);
            } else {
                gcode.push(`G0 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
            }
        });
        
        gcode.push(pUp);
        return gcode.join('\n');
    }

    async function runScenario() {
        if (!isHomeSet) {
            alert(t('Cần đặt gốc tọa độ làm việc trước!'));
            return;
        }
        if (activeScenario.actions.length === 0) {
            alert(t('Kịch bản trống! Vui lòng thêm các bước trước.'));
            return;
        }
        const gcodeStr = generateScenarioGCode();
        try {
            await fetch('/api/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gcode: gcodeStr })
            });
        } catch (e) {
            console.error('Error starting scenario:', e);
        }
    }

    function toggleRunLoopScenario() {
        if (!isHomeSet) {
            alert(t('Cần đặt gốc tọa độ làm việc trước!'));
            return;
        }
        isScenarioLooping = !isScenarioLooping;
        const btn = document.getElementById('btn-run-loop-scenario');
        if (btn) {
            btn.className = isScenarioLooping ? 'btn btn-danger-soft btn-small' : 'btn btn-warning btn-small';
            btn.innerText = isScenarioLooping ? t('Dừng Lặp') : t('Chạy Lặp');
        }
        if (isScenarioLooping) runScenario();
    }

    function runScenarioSimulation() {
        if (!isHomeSet) {
            alert(t('Cần đặt gốc tọa độ làm việc trước!'));
            return;
        }
        if (activeScenario.actions.length === 0) return;
        isSimulating = true;
        let step = 0;

        const interval = setInterval(() => {
            if (step >= activeScenario.actions.length || !isSimulating) {
                clearInterval(interval);
                isSimulating = false;
                return;
            }
            const act = activeScenario.actions[step];
            telemetry.wpos = [act.x, act.y, act.z || 0];
            updateTelemetryUI();
            step++;
        }, 300);
    }

    function stopScenario() {
        isScenarioLooping = false;
        isSimulating = false;
        const btn = document.getElementById('btn-run-loop-scenario');
        if (btn) {
            btn.className = 'btn btn-warning btn-small';
            btn.innerText = t('Chạy Lặp');
        }
        stopCNC();
    }


})();
