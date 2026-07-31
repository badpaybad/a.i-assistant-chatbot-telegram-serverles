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
    let canvasScale = 20.0; // 1 px = 0.05 mm (20 px = 1 mm)
    let canvasOffsetX = 0;
    let canvasOffsetY = 0;
    let axisDirX = 1; // 1: trái sang (+X sang phải), -1: phải sang (+X sang trái)
    let axisDirY = 1; // 1: trên xuống (+Y xuống dưới - DEFAULT), -1: dưới lên (+Y lên trên)
    let isDraggingCanvas = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let penTrajectory = [];

    // Simulation state
    let simAnimFrame = null;
    let simPathSegments = []; // [{type, points:[{x,y}], penDown, stepLabel}]
    let simCurrentSegIdx = 0;
    let simCurrentPtIdx = 0;
    let simHeadPos = { x: 0, y: 0 };
    let simIsRunning = false;

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
        await loadSystemSettings();
        connectWebSocket();
        await fetchPorts();
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
        document.getElementById('pen-up-val')?.addEventListener('change', savePenSettings);
        document.getElementById('pen-down-val')?.addEventListener('change', savePenSettings);
        document.getElementById('pen-up-val')?.addEventListener('input', savePenSettings);
        document.getElementById('pen-down-val')?.addEventListener('input', savePenSettings);

        document.getElementById('btn-pen-up')?.addEventListener('click', () => sendPenCommand('up'));
        document.getElementById('btn-pen-down')?.addEventListener('click', () => sendPenCommand('down'));
        document.getElementById('btn-save-settings')?.addEventListener('click', saveSystemSettings);
        document.getElementById('btn-load-settings')?.addEventListener('click', () => {
            document.getElementById('input-load-settings')?.click();
        });
        document.getElementById('input-load-settings')?.addEventListener('change', loadSystemSettingsFile);

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
        document.getElementById('select-axis-x')?.addEventListener('change', (e) => {
            axisDirX = parseInt(e.target.value);
            drawCanvas();
        });
        document.getElementById('select-axis-y')?.addEventListener('change', (e) => {
            axisDirY = parseInt(e.target.value);
            drawCanvas();
        });
        document.getElementById('sys-mm-per-px')?.addEventListener('change', (e) => {
            const val = parseFloat(e.target.value) || 0.05;
            canvasScale = 1.0 / val;
            drawCanvas();
        });
        document.getElementById('sys-mm-per-px')?.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value) || 0.05;
            canvasScale = 1.0 / val;
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
        await loadSystemSettings();
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
            } else if (msg.status === 'completed' || msg.status === 'stopped' || msg.status === 'failed') {
                telemetry.streaming = false;
                document.querySelectorAll('#scenario-items-list .step-item').forEach(el => el.classList.remove('sim-active'));
                drawCanvas();
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
                Math.hypot(currentWPos.x - penTrajectory[penTrajectory.length - 1].x, currentWPos.y - penTrajectory[penTrajectory.length - 1].y) > 0.3) {
                penTrajectory.push(currentWPos);
                if (penTrajectory.length > 1000) penTrajectory.shift();
            }
        }

        // Highlight active step in scenario list when running real CNC
        if (telemetry.streaming && activeScenario.actions && activeScenario.actions.length > 0) {
            const currentWPos = telemetry.wpos ? { x: telemetry.wpos[0], y: telemetry.wpos[1] } : { x: 0, y: 0 };
            let closestStepIdx = -1;
            let minDist = Infinity;
            activeScenario.actions.forEach((act, idx) => {
                if (act.x !== undefined && act.y !== undefined) {
                    const dist = Math.hypot(currentWPos.x - act.x, currentWPos.y - act.y);
                    if (dist < minDist) {
                        minDist = dist;
                        closestStepIdx = idx;
                    }
                }
            });
            if (minDist < 20 && closestStepIdx !== -1) {
                document.querySelectorAll('#scenario-items-list .step-item').forEach((el, i) => {
                    el.classList.toggle('sim-active', i === closestStepIdx);
                });
            }
        } else if (!isSimulating && !telemetry.streaming) {
            document.querySelectorAll('#scenario-items-list .step-item').forEach(el => el.classList.remove('sim-active'));
        }

        drawCanvas();
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

    function getSystemConfig() {
        const feed = parseFloat(
            document.getElementById('sys-feedrate')?.value ||
            document.getElementById('jog-feedrate-input')?.value ||
            document.getElementById('gesture-feedrate')?.value ||
            '4000'
        );
        const swipeFeed = parseFloat(
            document.getElementById('sys-swipe-feedrate')?.value ||
            '10000'
        );
        const step = parseFloat(
            document.getElementById('sys-step-distance')?.value ||
            document.getElementById('select-step-preset')?.value ||
            document.getElementById('gesture-step')?.value ||
            '10'
        );
        const tapDwell = parseFloat(
            document.getElementById('sys-tap-dwell')?.value ||
            document.getElementById('gesture-tap-dwell')?.value ||
            '0.05'
        );
        const swipeDist = parseFloat(
            document.getElementById('sys-swipe-distance')?.value ||
            document.getElementById('gesture-swipe-distance')?.value ||
            '40'
        );
        return { feed, swipeFeed, step, tapDwell, swipeDist };
    }

    // Machine Jogging Functions
    function bindJogKey(id, dx, dy, dz) {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('click', () => {
            const { feed, step } = getSystemConfig();
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
        const { feed } = getSystemConfig();
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

        const { feed, swipeFeed, tapDwell, swipeDist } = getSystemConfig();

        const startX = parseFloat(document.getElementById('gesture-start-x')?.value || '0');
        const startY = parseFloat(document.getElementById('gesture-start-y')?.value || '0');
        const endX = parseFloat(document.getElementById('gesture-end-x')?.value || '0');
        const endY = parseFloat(document.getElementById('gesture-end-y')?.value || '0');

        let gcode = [];
        const isSpindle = penMode === 'spindle-pwm';
        const pDown = isSpindle ? `M3 S${penDownPwm}` : `G0 Z${penDownZ}`;
        const pUp = isSpindle ? `M3 S${penUpPwm}` : `G0 Z${penUpZ}`;

        if (type === 'tap') {
            gcode.push(pDown);
            gcode.push(`G4 P${tapDwell}`);
            gcode.push(pUp);
        } else if (type === 'double_tap') {
            gcode.push(pDown);
            gcode.push(`G4 P${tapDwell}`);
            gcode.push(pUp);
            gcode.push(`G4 P${tapDwell}`);
            gcode.push(pDown);
            gcode.push(`G4 P${tapDwell}`);
            gcode.push(pUp);
        } else if (type === 'long_press') {
            gcode.push(pDown);
            gcode.push(`G4 P1.0`);
            gcode.push(pUp);
        } else if (type === 'swipe_custom') {
            gcode.push(`G90`);
            gcode.push(pUp);
            gcode.push(`G0 X${startX.toFixed(2)} Y${startY.toFixed(2)} F${feed}`);
            gcode.push(pDown);
            gcode.push(`G4 P0.02`);
            gcode.push(`G1 X${endX.toFixed(2)} Y${endY.toFixed(2)} F${swipeFeed}`);
            gcode.push(pUp);
        } else if (type === 'swipe_left') {
            gcode.push(pDown);
            gcode.push(`G4 P0.02`);
            gcode.push(`G91`);
            gcode.push(`G1 X-${swipeDist} F${swipeFeed}`);
            gcode.push(`G90`);
            gcode.push(pUp);
        } else if (type === 'swipe_right') {
            gcode.push(pDown);
            gcode.push(`G4 P0.02`);
            gcode.push(`G91`);
            gcode.push(`G1 X${swipeDist} F${swipeFeed}`);
            gcode.push(`G90`);
            gcode.push(pUp);
        } else if (type === 'swipe_up') {
            gcode.push(pDown);
            gcode.push(`G4 P0.02`);
            gcode.push(`G91`);
            gcode.push(`G1 Y${swipeDist} F${swipeFeed}`);
            gcode.push(`G90`);
            gcode.push(pUp);
        } else if (type === 'swipe_down') {
            gcode.push(pDown);
            gcode.push(`G4 P0.02`);
            gcode.push(`G91`);
            gcode.push(`G1 Y-${swipeDist} F${swipeFeed}`);
            gcode.push(`G90`);
            gcode.push(pUp);
        }

        sendCommand(gcode.join('\n'));
    }

    let isMouseDown = false;
    let mouseDownX = 0;
    let mouseDownY = 0;
    let mouseHoverPos = null;

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

        // Mouse Pan & Click to Move
        canvas.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return; // Left click only
            isMouseDown = true;
            isDraggingCanvas = false;
            mouseDownX = e.clientX;
            mouseDownY = e.clientY;
            dragStartX = e.clientX - canvasOffsetX;
            dragStartY = e.clientY - canvasOffsetY;
        });

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;
                mouseHoverPos = {
                    x: (e.clientX - rect.left) * scaleX,
                    y: (e.clientY - rect.top) * scaleY
                };
            } else {
                mouseHoverPos = null;
            }

            if (isMouseDown) {
                if (Math.hypot(e.clientX - mouseDownX, e.clientY - mouseDownY) > 4) {
                    isDraggingCanvas = true;
                    canvasOffsetX = e.clientX - dragStartX;
                    canvasOffsetY = e.clientY - dragStartY;
                }
            }
            drawCanvas();
        });

        window.addEventListener('mouseup', (e) => {
            if (isMouseDown && !isDraggingCanvas) {
                // Click event! Convert canvas (x, y) to Work Coordinates
                const rect = canvas.getBoundingClientRect();
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;
                const clickX = (e.clientX - rect.left) * scaleX;
                const clickY = (e.clientY - rect.top) * scaleY;

                const originX = canvas.width / 2 + canvasOffsetX;
                const originY = canvas.height / 2 + canvasOffsetY;

                const targetWorkX = (clickX - originX) / (axisDirX * canvasScale);
                const targetWorkY = (clickY - originY) / (axisDirY * canvasScale);

                if (!isConnected) {
                    alert(t('Vui lòng Kết Nối CNC trước khi di chuyển!'));
                } else if (!isHomeSet) {
                    alert(t('Cần đặt gốc tọa độ làm việc trước!'));
                } else {
                    const { feed } = getSystemConfig();
                    sendCommand(`G90\nG0 X${targetWorkX.toFixed(2)} Y${targetWorkY.toFixed(2)} F${feed}`);
                }
            }
            isMouseDown = false;
            isDraggingCanvas = false;
        });

        canvas.addEventListener('mouseleave', () => {
            mouseHoverPos = null;
            drawCanvas();
        });

        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
            canvasScale *= zoomFactor;
            canvasScale = Math.max(0.2, Math.min(canvasScale, 20.0));
            drawCanvas();
        });
    }

    function resetCanvasView() {
        const mmPerPx = parseFloat(document.getElementById('sys-mm-per-px')?.value || '0.05');
        canvasScale = 1.0 / (mmPerPx > 0 ? mmPerPx : 0.05);
        canvasOffsetX = 0;
        canvasOffsetY = 0;
        drawCanvas();
    }

    /**
     * Tính toán tất cả segment đường đi của kịch bản để vẽ lên canvas.
     * Trả về mảng segments: [{type, pts:[{x,y}], penDown, stepIndex, actionType}]
     * chiều Y đảo ngược.
     */
    function computeScenarioPathSegments() {
        const { feed, swipeDist } = getSystemConfig();
        const segments = [];
        let curX = 0, curY = 0;
        let penDown = false;

        activeScenario.actions.forEach((act, idx) => {
            const stepLabel = idx + 1;
            if (act.type === 'set_begin' || act.type === 'set_end' || act.type === 'go_to_here') {
                // Rapid move pen up to position
                segments.push({ type: 'rapid', pts: [{x: curX, y: curY}, {x: act.x, y: act.y}], penDown: false, stepIndex: stepLabel, actionType: act.type });
                curX = act.x; curY = act.y;
                penDown = false;
            } else if (act.type === 'go_to_keep_state') {
                segments.push({ type: penDown ? 'cut' : 'rapid', pts: [{x: curX, y: curY}, {x: act.x, y: act.y}], penDown, stepIndex: stepLabel, actionType: act.type });
                curX = act.x; curY = act.y;
            } else if (act.type === 'pen_down') {
                penDown = true;
                segments.push({ type: 'pendown', pts: [{x: curX, y: curY}], penDown: true, stepIndex: stepLabel, actionType: act.type });
            } else if (act.type === 'pen_up') {
                penDown = false;
                segments.push({ type: 'penup', pts: [{x: curX, y: curY}], penDown: false, stepIndex: stepLabel, actionType: act.type });
            } else if (act.type === 'tap') {
                segments.push({ type: 'rapid', pts: [{x: curX, y: curY}, {x: act.x, y: act.y}], penDown: false, stepIndex: stepLabel, actionType: act.type });
                segments.push({ type: 'tap', pts: [{x: act.x, y: act.y}], penDown: true, stepIndex: stepLabel, actionType: act.type });
                curX = act.x; curY = act.y; penDown = false;
            } else if (act.type === 'double_tap') {
                segments.push({ type: 'rapid', pts: [{x: curX, y: curY}, {x: act.x, y: act.y}], penDown: false, stepIndex: stepLabel, actionType: act.type });
                segments.push({ type: 'doubletap', pts: [{x: act.x, y: act.y}], penDown: true, stepIndex: stepLabel, actionType: act.type });
                curX = act.x; curY = act.y; penDown = false;
            } else if (act.type === 'long_press') {
                segments.push({ type: 'rapid', pts: [{x: curX, y: curY}, {x: act.x, y: act.y}], penDown: false, stepIndex: stepLabel, actionType: act.type });
                segments.push({ type: 'longpress', pts: [{x: act.x, y: act.y}], penDown: true, stepIndex: stepLabel, actionType: act.type });
                curX = act.x; curY = act.y; penDown = false;
            } else if (act.type === 'swipe_down') {
                const endY = act.y - swipeDist;
                segments.push({ type: 'rapid', pts: [{x: curX, y: curY}, {x: act.x, y: act.y}], penDown: false, stepIndex: stepLabel, actionType: act.type });
                segments.push({ type: 'swipe', pts: [{x: act.x, y: act.y}, {x: act.x, y: endY}], penDown: true, stepIndex: stepLabel, actionType: act.type });
                curX = act.x; curY = endY; penDown = false;
            } else if (act.type === 'swipe_up') {
                const endY = act.y + swipeDist;
                segments.push({ type: 'rapid', pts: [{x: curX, y: curY}, {x: act.x, y: act.y}], penDown: false, stepIndex: stepLabel, actionType: act.type });
                segments.push({ type: 'swipe', pts: [{x: act.x, y: act.y}, {x: act.x, y: endY}], penDown: true, stepIndex: stepLabel, actionType: act.type });
                curX = act.x; curY = endY; penDown = false;
            } else if (act.type === 'swipe_left') {
                const endX = act.x - swipeDist;
                segments.push({ type: 'rapid', pts: [{x: curX, y: curY}, {x: act.x, y: act.y}], penDown: false, stepIndex: stepLabel, actionType: act.type });
                segments.push({ type: 'swipe', pts: [{x: act.x, y: act.y}, {x: endX, y: act.y}], penDown: true, stepIndex: stepLabel, actionType: act.type });
                curX = endX; curY = act.y; penDown = false;
            } else if (act.type === 'swipe_right') {
                const endX = act.x + swipeDist;
                segments.push({ type: 'rapid', pts: [{x: curX, y: curY}, {x: act.x, y: act.y}], penDown: false, stepIndex: stepLabel, actionType: act.type });
                segments.push({ type: 'swipe', pts: [{x: act.x, y: act.y}, {x: endX, y: act.y}], penDown: true, stepIndex: stepLabel, actionType: act.type });
                curX = endX; curY = act.y; penDown = false;
            } else if (act.type.startsWith('dwell-') || act.type === 'dwell') {
                segments.push({ type: 'dwell', pts: [{x: curX, y: curY}], penDown, stepIndex: stepLabel, actionType: act.type });
            }
        });
        return segments;
    }

    function drawCanvas() {
        if (!canvas || !ctx) return;
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // Origin at center of canvas + pan offset
        const originX = w / 2 + canvasOffsetX;
        const originY = h / 2 + canvasOffsetY;

        // ---- GRID ----
        ctx.strokeStyle = 'rgba(30,41,59,0.8)';
        ctx.lineWidth = 1;
        const gridMm = 10;
        const gridPx = gridMm * canvasScale;

        // minor grid
        ctx.strokeStyle = 'rgba(51,65,85,0.5)';
        const startGX = originX % gridPx;
        const startGY = originY % gridPx;
        for (let x = startGX; x < w; x += gridPx) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = startGY; y < h; y += gridPx) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // major grid (50mm)
        const majorGridPx = 50 * canvasScale;
        ctx.strokeStyle = 'rgba(71,85,105,0.6)';
        ctx.lineWidth = 1;
        const startMX = originX % majorGridPx;
        const startMY = originY % majorGridPx;
        for (let x = startMX; x < w; x += majorGridPx) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = startMY; y < h; y += majorGridPx) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Draw coordinate numbers on major grid lines (50mm steps)
        ctx.font = '9px Outfit, sans-serif';
        ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
        
        // X grid numbers
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const minMmX = Math.floor((-originX) / (axisDirX * canvasScale) / 50) * 50;
        const maxMmX = Math.ceil((w - originX) / (axisDirX * canvasScale) / 50) * 50;
        const startXmm = Math.min(minMmX, maxMmX);
        const endXmm = Math.max(minMmX, maxMmX);
        for (let mm = startXmm; mm <= endXmm; mm += 50) {
            if (mm === 0) continue;
            const px = originX + mm * axisDirX * canvasScale;
            if (px >= 0 && px <= w) {
                const labelY = Math.min(Math.max(originY + 4, 4), h - 14);
                ctx.fillText(`${mm}`, px, labelY);
            }
        }

        // Y grid numbers
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const minMmY = Math.floor((-originY) / (axisDirY * canvasScale) / 50) * 50;
        const maxMmY = Math.ceil((h - originY) / (axisDirY * canvasScale) / 50) * 50;
        const startYmm = Math.min(minMmY, maxMmY);
        const endYmm = Math.max(minMmY, maxMmY);
        for (let mm = startYmm; mm <= endYmm; mm += 50) {
            if (mm === 0) continue;
            const py = originY + mm * axisDirY * canvasScale;
            if (py >= 0 && py <= h) {
                const labelX = Math.min(Math.max(originX - 6, 24), w - 4);
                ctx.fillText(`${mm}`, labelX, py);
            }
        }

        // ---- COORDINATE AXES ----
        ctx.lineWidth = 2.5;
        const axisLen = 60;
        // X Axis (Red)
        const endXx = originX + axisDirX * axisLen;
        ctx.strokeStyle = '#ef4444';
        ctx.beginPath(); ctx.moveTo(originX, originY); ctx.lineTo(endXx, originY); ctx.stroke();
        // arrowhead X
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(endXx, originY);
        ctx.lineTo(endXx - axisDirX * 8, originY - 4);
        ctx.lineTo(endXx - axisDirX * 8, originY + 4);
        ctx.fill();
        ctx.font = 'bold 11px Outfit, sans-serif';
        ctx.fillText('X', endXx + axisDirX * 4, originY + 4);

        // Y Axis (Green)
        const endYy = originY + axisDirY * axisLen;
        ctx.strokeStyle = '#22c55e';
        ctx.beginPath(); ctx.moveTo(originX, originY); ctx.lineTo(originX, endYy); ctx.stroke();
        // arrowhead Y
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.moveTo(originX, endYy);
        ctx.lineTo(originX - 4, endYy - axisDirY * 8);
        ctx.lineTo(originX + 4, endYy - axisDirY * 8);
        ctx.fill();
        ctx.fillText('Y', originX - 14, endYy + axisDirY * 4);

        // Work Origin dot
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath(); ctx.arc(originX, originY, 6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = 'rgba(56,189,248,0.9)';
        ctx.font = '10px Outfit, sans-serif';
        ctx.fillText('(0,0)', originX + 8, originY + 14);

        // ---- HELPER: world → canvas ----
        function wx(x) { return originX + x * axisDirX * canvasScale; }
        function wy(y) { return originY + y * axisDirY * canvasScale; }

        // ---- DRAW SCENARIO PATH SEGMENTS ----
        const segs = computeScenarioPathSegments();
        const isRunningOrSimulating = simIsRunning || isSimulating || telemetry.streaming || isScenarioLooping;

        // Determine range of steps between set_begin and set_end
        let beginStepIdx = 1;
        let endStepIdx = activeScenario.actions.length;

        const firstBegin = activeScenario.actions.findIndex(a => a.type === 'set_begin');
        if (firstBegin !== -1) {
            beginStepIdx = firstBegin + 1;
            const firstEnd = activeScenario.actions.findIndex((a, i) => i >= firstBegin && a.type === 'set_end');
            if (firstEnd !== -1) {
                endStepIdx = firstEnd + 1;
            }
        } else {
            const firstEnd = activeScenario.actions.findIndex(a => a.type === 'set_end');
            if (firstEnd !== -1) {
                endStepIdx = firstEnd + 1;
            }
        }

        // Pass 1: Draw scenario lines ONLY when running or simulating
        if (isRunningOrSimulating) {
            segs.forEach(seg => {
                if (seg.pts.length < 2) return;
                // Only draw line if segment is within set_begin and set_end range
                if (seg.stepIndex < beginStepIdx || seg.stepIndex > endStepIdx) return;

                ctx.beginPath();
                ctx.moveTo(wx(seg.pts[0].x), wy(seg.pts[0].y));
                for (let i = 1; i < seg.pts.length; i++) {
                    ctx.lineTo(wx(seg.pts[i].x), wy(seg.pts[i].y));
                }
                if (seg.type === 'rapid') {
                    ctx.strokeStyle = 'rgba(148, 163, 184, 0.9)'; // Vivid rapid line
                    ctx.lineWidth = 2;
                    ctx.setLineDash([6, 4]);
                } else if (seg.type === 'cut') {
                    ctx.strokeStyle = '#f97316'; // Clear vivid orange line
                    ctx.lineWidth = 3.5;
                    ctx.setLineDash([]);
                } else if (seg.type === 'swipe') {
                    ctx.strokeStyle = '#eab308'; // Clear vivid yellow line
                    ctx.lineWidth = 4;
                    ctx.setLineDash([]);
                    // Arrowhead at end
                    const p0 = seg.pts[seg.pts.length - 2];
                    const p1 = seg.pts[seg.pts.length - 1];
                    const angle = Math.atan2(-(p1.y - p0.y), p1.x - p0.x);
                    const ex = wx(p1.x), ey = wy(p1.y);
                    ctx.fillStyle = '#eab308';
                    ctx.save();
                    ctx.translate(ex, ey);
                    ctx.rotate(-angle);
                    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-16, -6); ctx.lineTo(-16, 6); ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                } else {
                    ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([3, 3]);
                }
                ctx.stroke();
                ctx.setLineDash([]);
            });
        }

        // Pass 2: Draw action nodes with labels (Always drawn)
        const drawnPoints = new Map(); // track label positions
        segs.forEach(seg => {
            const pt = seg.pts[seg.pts.length - 1];
            const pxX = wx(pt.x), pxY = wy(pt.y);
            const key = `${Math.round(pt.x * 10)}_${Math.round(pt.y * 10)}`;

            let dotColor = '#64748b';
            let dotRadius = 6;
            if (seg.actionType === 'set_begin') { dotColor = '#22c55e'; dotRadius = 9; }
            else if (seg.actionType === 'set_end') { dotColor = '#ef4444'; dotRadius = 9; }
            else if (seg.type === 'tap') { dotColor = '#38bdf8'; dotRadius = 7; }
            else if (seg.type === 'doubletap') { dotColor = '#818cf8'; dotRadius = 7; }
            else if (seg.type === 'longpress') { dotColor = '#f472b6'; dotRadius = 8; }
            else if (seg.type === 'swipe') { dotColor = '#fbbf24'; dotRadius = 7; }
            else if (seg.type === 'pendown') { dotColor = '#f97316'; dotRadius = 6; }
            else if (seg.type === 'penup') { dotColor = '#34d399'; dotRadius = 6; }
            else if (seg.type === 'dwell') { dotColor = '#a78bfa'; dotRadius = 6; }
            else if (seg.type === 'rapid') { dotColor = '#64748b'; dotRadius = 5; }
            else if (seg.type === 'cut') { dotColor = '#fb923c'; dotRadius = 6; }

            // Draw node dot
            ctx.fillStyle = dotColor;
            ctx.beginPath(); ctx.arc(pxX, pxY, dotRadius, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Draw step number label
            if (!drawnPoints.has(key)) {
                drawnPoints.set(key, true);
                const labelX = pxX + dotRadius + 3;
                const labelY = pxY - dotRadius - 2;
                ctx.fillStyle = 'rgba(15,23,42,0.85)';
                ctx.fillRect(labelX - 2, labelY - 10, 24, 13);
                ctx.fillStyle = (seg.actionType === 'set_begin') ? '#4ade80' : ((seg.actionType === 'set_end') ? '#f87171' : '#e2e8f0');
                ctx.font = 'bold 9px Outfit, sans-serif';
                ctx.fillText(`#${seg.stepIndex}`, labelX, labelY);
            }
        });

        // ---- DRAW LIVE PEN TRAJECTORY (Mờ nhạt / Faint line) ----
        if (penTrajectory.length > 1) {
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)'; // Faint dim tracking line
            ctx.lineWidth = 1;
            ctx.setLineDash([]);
            ctx.beginPath();
            penTrajectory.forEach((pt, i) => {
                const px = wx(pt.x);
                const py = wy(pt.y);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.stroke();
        }

        // ---- DRAW PEN HEAD POSITION ----
        let headX, headY;
        if (simIsRunning) {
            headX = wx(simHeadPos.x);
            headY = wy(simHeadPos.y);
        } else if (telemetry.wpos) {
            headX = wx(telemetry.wpos[0]);
            headY = wy(telemetry.wpos[1]);
        }
        if (headX !== undefined) {
            // Outer glow
            const grad = ctx.createRadialGradient(headX, headY, 2, headX, headY, 12);
            grad.addColorStop(0, 'rgba(245,158,11,0.9)');
            grad.addColorStop(1, 'rgba(245,158,11,0)');
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(headX, headY, 12, 0, Math.PI * 2); ctx.fill();
            // Core dot
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath(); ctx.arc(headX, headY, 6, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            // Cross-hair
            ctx.strokeStyle = 'rgba(255,255,255,0.7)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(headX - 12, headY); ctx.lineTo(headX + 12, headY);
            ctx.moveTo(headX, headY - 12); ctx.lineTo(headX, headY + 12);
            ctx.stroke();
            // Coordinate label
            const lx = simIsRunning ? simHeadPos.x : (telemetry.wpos ? telemetry.wpos[0] : 0);
            const ly = simIsRunning ? simHeadPos.y : (telemetry.wpos ? telemetry.wpos[1] : 0);
            ctx.fillStyle = 'rgba(15,23,42,0.85)';
            const labelStr = `${lx.toFixed(1)}, ${ly.toFixed(1)}`;
            const lw = ctx.measureText(labelStr).width + 8;
            ctx.fillRect(headX + 10, headY - 22, lw, 15);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 10px Outfit, sans-serif';
            ctx.fillText(labelStr, headX + 14, headY - 11);
        }

        // Update pixel scale ratio overlay text (1 px = X mm)
        const mmPerPx = 1.0 / canvasScale;
        const scaleRatioEl = document.getElementById('canvas-scale-ratio');
        if (scaleRatioEl) {
            const scaleStr = mmPerPx < 0.1 ? mmPerPx.toFixed(3) : mmPerPx.toFixed(2);
            scaleRatioEl.innerText = `Tỷ lệ: 1 px = ${scaleStr} mm (${canvasScale.toFixed(1)} px = 1 mm)`;
        }

        // Draw hover target cursor & coordinates if hovering
        if (mouseHoverPos && !isDraggingCanvas && !simIsRunning) {
            const hx = mouseHoverPos.x;
            const hy = mouseHoverPos.y;
            const targetX = (hx - originX) / (axisDirX * canvasScale);
            const targetY = (hy - originY) / (axisDirY * canvasScale);

            ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(hx, 0); ctx.lineTo(hx, h);
            ctx.moveTo(0, hy); ctx.lineTo(w, hy);
            ctx.stroke();
            ctx.setLineDash([]);

            // Hover info pill
            const hoverStr = `🎯 Click đến X: ${targetX.toFixed(2)}, Y: ${targetY.toFixed(2)}`;
            ctx.font = '10px Outfit, sans-serif';
            const tw = ctx.measureText(hoverStr).width + 12;
            const boxX = (hx + tw + 10 < w) ? hx + 10 : hx - tw - 10;
            const boxY = (hy - 25 > 0) ? hy - 25 : hy + 15;
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
            ctx.fillRect(boxX, boxY, tw, 20);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1;
            ctx.strokeRect(boxX, boxY, tw, 20);
            ctx.fillStyle = '#38bdf8';
            ctx.fillText(hoverStr, boxX + 6, boxY + 14);
        }

        // ---- LEGEND ----
        const legendX = 10, legendY = h - 90;
        const legendItems = [
            { color: 'rgba(100,116,139,0.7)', dash: true, label: 'Rapid (Pen Up)' },
            { color: 'rgba(251,146,60,0.95)', dash: false, label: 'Cutting (Pen Down)' },
            { color: 'rgba(250,204,21,0.95)', dash: false, label: 'Swipe' },
            { color: '#38bdf8', dash: false, label: 'Đường thực tế' },
        ];
        ctx.font = '9px Outfit, sans-serif';
        legendItems.forEach((item, i) => {
            const ly2 = legendY + i * 18;
            ctx.strokeStyle = item.color;
            ctx.lineWidth = 2;
            if (item.dash) ctx.setLineDash([4, 4]); else ctx.setLineDash([]);
            ctx.beginPath(); ctx.moveTo(legendX, ly2); ctx.lineTo(legendX + 20, ly2); ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(item.label, legendX + 26, ly2 + 4);
        });
    }

    // Scenario Builder & Execution
    // Scenario Builder & Execution
    function createNewScenario() {
        if (!isHomeSet) {
            alert(t('Cần đặt gốc tọa độ làm việc trước!'));
            return;
        }
        activeScenario = {
            name: document.getElementById('scenario-name')?.value || '',
            actions: []
        };
        if (!activeScenario.name || activeScenario.name=='') {
            alert(t('Cần nhập tên kịch bản trước!'));
            return;
        }
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
        const { feed, swipeFeed, tapDwell, swipeDist } = getSystemConfig();

        let gcode = [];
        gcode.push('G90 G54');
        
        const isSpindle = penMode === 'spindle-pwm';
        const pDown = isSpindle ? `M3 S${penDownPwm}` : `G0 Z${penDownZ}`;
        const pUp = isSpindle ? `M3 S${penUpPwm}` : `G0 Z${penUpZ}`;

        activeScenario.actions.forEach(act => {
            if (act.type === 'set_begin' || act.type === 'set_end' || act.type === 'go_to_here') {
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
                gcode.push(`G4 P0.02`);
                gcode.push(`G1 Y${(act.y - swipeDist).toFixed(2)} F${swipeFeed}`);
                gcode.push(pUp);
            } else if (act.type === 'swipe_up') {
                gcode.push(`G0 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
                gcode.push(pDown);
                gcode.push(`G4 P0.02`);
                gcode.push(`G1 Y${(act.y + swipeDist).toFixed(2)} F${swipeFeed}`);
                gcode.push(pUp);
            } else if (act.type === 'swipe_left') {
                gcode.push(`G0 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
                gcode.push(pDown);
                gcode.push(`G4 P0.02`);
                gcode.push(`G1 X${(act.x - swipeDist).toFixed(2)} F${swipeFeed}`);
                gcode.push(pUp);
            } else if (act.type === 'swipe_right') {
                gcode.push(`G0 X${act.x.toFixed(2)} Y${act.y.toFixed(2)} F${feed}`);
                gcode.push(pDown);
                gcode.push(`G4 P0.02`);
                gcode.push(`G1 X${(act.x + swipeDist).toFixed(2)} F${swipeFeed}`);
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

        if (activeScenario.actions.length === 0) {
            alert(t('Kịch bản trống! Vui lòng thêm các bước trước.'));
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
        if (activeScenario.actions.length === 0) {
            alert(t('Kịch bản trống! Vui lòng thêm các bước trước.'));
            return;
        }

        // Stop any running simulation
        if (simAnimFrame) { cancelAnimationFrame(simAnimFrame); simAnimFrame = null; }
        simIsRunning = true;
        isSimulating = true;

        // Build flat list of interpolated path points from segments
        const segs = computeScenarioPathSegments();

        // Convert segments to list of waypoints for animation
        // Each waypoint: {x, y, segType, stepIndex}
        const waypoints = [];
        waypoints.push({ x: 0, y: 0, segType: 'start', stepIndex: 0 });

        segs.forEach(seg => {
            if (seg.pts.length >= 2) {
                // Interpolate between pts
                for (let i = 1; i < seg.pts.length; i++) {
                    const p0 = seg.pts[i - 1], p1 = seg.pts[i];
                    const dist = Math.hypot(p1.x - p0.x, p1.y - p0.y);
                    const steps = Math.max(2, Math.round(dist / 2)); // 1 pt per 2mm
                    for (let s = 1; s <= steps; s++) {
                        const t = s / steps;
                        waypoints.push({
                            x: p0.x + (p1.x - p0.x) * t,
                            y: p0.y + (p1.y - p0.y) * t,
                            segType: seg.type,
                            stepIndex: seg.stepIndex
                        });
                    }
                }
            } else if (seg.pts.length === 1) {
                // Single point action (tap, dwell, etc)
                for (let r = 0; r < 8; r++) {
                    waypoints.push({ x: seg.pts[0].x, y: seg.pts[0].y, segType: seg.type, stepIndex: seg.stepIndex });
                }
            }
        });

        if (waypoints.length === 0) { simIsRunning = false; isSimulating = false; return; }

        let wpIdx = 0;
        // Speed: rapid = faster, cut/swipe = slower
        const RAPID_SPEED = 3; // waypoints per frame
        const CUT_SPEED = 1;

        // Highlight active step in scenario list
        let lastHighlightStep = -1;
        function highlightStep(idx) {
            if (idx === lastHighlightStep) return;
            lastHighlightStep = idx;
            document.querySelectorAll('#scenario-items-list .step-item').forEach((el, i) => {
                el.classList.toggle('sim-active', i === idx - 1);
            });
        }

        function animFrame() {
            if (!simIsRunning || wpIdx >= waypoints.length) {
                simIsRunning = false;
                isSimulating = false;
                // Remove sim highlights
                document.querySelectorAll('#scenario-items-list .step-item').forEach(el => el.classList.remove('sim-active'));
                drawCanvas();
                return;
            }

            const wp = waypoints[wpIdx];
            simHeadPos.x = wp.x;
            simHeadPos.y = wp.y;
            highlightStep(wp.stepIndex);

            const speed = (wp.segType === 'rapid') ? RAPID_SPEED : CUT_SPEED;
            wpIdx += speed;
            if (wpIdx >= waypoints.length) wpIdx = waypoints.length - 1;

            drawCanvas();
            simAnimFrame = requestAnimationFrame(animFrame);
        }

        simAnimFrame = requestAnimationFrame(animFrame);
    }

    function stopScenario() {
        isScenarioLooping = false;
        isSimulating = false;
        simIsRunning = false;
        if (simAnimFrame) { cancelAnimationFrame(simAnimFrame); simAnimFrame = null; }
        document.querySelectorAll('#scenario-items-list .step-item').forEach(el => el.classList.remove('sim-active'));
        const btn = document.getElementById('btn-run-loop-scenario');
        if (btn) {
            btn.className = 'btn btn-warning btn-small';
            btn.innerText = t('Chạy Lặp');
        }
        drawCanvas();
        stopCNC();
    }

    async function saveSystemSettings() {
        const upInput = document.getElementById('pen-up-val');
        const downInput = document.getElementById('pen-down-val');
        if (upInput && downInput) {
            const valUp = parseFloat(upInput.value) || 0;
            const valDown = parseFloat(downInput.value) || 0;
            if (penMode === 'spindle-pwm') {
                penUpPwm = valUp;
                penDownPwm = valDown;
            } else {
                penUpZ = valUp;
                penDownZ = valDown;
            }
        }

        const payload = {
            port: document.getElementById('port-select')?.value || '',
            baudrate: parseInt(document.getElementById('baudrate-select')?.value || '115200'),
            feedrate: parseFloat(document.getElementById('sys-feedrate')?.value || '4000'),
            swipe_feedrate: parseFloat(document.getElementById('sys-swipe-feedrate')?.value || '10000'),
            step_distance: parseFloat(document.getElementById('sys-step-distance')?.value || '10'),
            tap_dwell: parseFloat(document.getElementById('sys-tap-dwell')?.value || '0.05'),
            swipe_distance: parseFloat(document.getElementById('sys-swipe-distance')?.value || '40'),
            pen_mode: penMode,
            pen_up_z: penUpZ,
            pen_down_z: penDownZ,
            pen_up_pwm: penUpPwm,
            pen_down_pwm: penDownPwm,
            axis_dir_x: parseInt(document.getElementById('select-axis-x')?.value || '1'),
            axis_dir_y: parseInt(document.getElementById('select-axis-y')?.value || '1'),
            mm_per_px: parseFloat(document.getElementById('sys-mm-per-px')?.value || '0.05'),
        };

        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.status === 'success') {
                // Download json config file to computer
                const jsonStr = JSON.stringify(payload, null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'cnc_settings.json';
                a.click();
                URL.revokeObjectURL(url);

                alert(t('Đã lưu cấu hình vào hệ thống và tải file cnc_settings.json về máy tính!'));
            } else {
                alert(t('Lỗi lưu cấu hình: ') + (data.message || 'Error'));
            }
        } catch (e) {
            console.error('Error saving settings:', e);
            alert(t('Không thể kết nối API lưu cấu hình'));
        }
    }

    function applySettingsPayload(data) {
        if (!data) return;
        if (data.port && document.getElementById('port-select')) {
            document.getElementById('port-select').value = data.port;
        }
        if (data.baudrate && document.getElementById('baudrate-select')) {
            document.getElementById('baudrate-select').value = data.baudrate;
        }
        if (data.feedrate !== undefined && document.getElementById('sys-feedrate')) {
            document.getElementById('sys-feedrate').value = data.feedrate;
        }
        if (data.swipe_feedrate !== undefined && document.getElementById('sys-swipe-feedrate')) {
            document.getElementById('sys-swipe-feedrate').value = data.swipe_feedrate;
        }
        if (data.step_distance !== undefined && document.getElementById('sys-step-distance')) {
            document.getElementById('sys-step-distance').value = data.step_distance;
        }
        if (data.tap_dwell !== undefined && document.getElementById('sys-tap-dwell')) {
            document.getElementById('sys-tap-dwell').value = data.tap_dwell;
        }
        if (data.swipe_distance !== undefined && document.getElementById('sys-swipe-distance')) {
            document.getElementById('sys-swipe-distance').value = data.swipe_distance;
        }
        if (data.pen_mode) {
            penMode = data.pen_mode;
            if (document.getElementById('pen-control-mode')) {
                document.getElementById('pen-control-mode').value = penMode;
            }
        }
        if (data.pen_up_z !== undefined) penUpZ = data.pen_up_z;
        if (data.pen_down_z !== undefined) penDownZ = data.pen_down_z;
        if (data.pen_up_pwm !== undefined) penUpPwm = data.pen_up_pwm;
        if (data.pen_down_pwm !== undefined) penDownPwm = data.pen_down_pwm;

        updatePenInputs();

        if (data.axis_dir_x !== undefined && document.getElementById('select-axis-x')) {
            document.getElementById('select-axis-x').value = data.axis_dir_x;
            axisDirX = parseInt(data.axis_dir_x);
        }
        if (data.axis_dir_y !== undefined && document.getElementById('select-axis-y')) {
            document.getElementById('select-axis-y').value = data.axis_dir_y;
            axisDirY = parseInt(data.axis_dir_y);
        }
        if (data.mm_per_px !== undefined) {
            const val = parseFloat(data.mm_per_px) || 0.05;
            if (document.getElementById('sys-mm-per-px')) {
                document.getElementById('sys-mm-per-px').value = val;
            }
            canvasScale = 1.0 / val;
        }

        if (data.workpiece_origin) telemetry.workpiece_origin = data.workpiece_origin;
        if (data.work_origin) {
            telemetry.work_origin = data.work_origin;
            isHomeSet = true;
        }
        if (data.parking_point) telemetry.parking_point = data.parking_point;
        updateInfoDisplays();
        drawCanvas();
    }

    async function loadSystemSettingsFile(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const payload = JSON.parse(event.target.result);
                applySettingsPayload(payload);
                await fetch('/api/settings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                alert(t('Đã nạp file cấu hình thành công!'));
            } catch (err) {
                alert(t('File cấu hình không hợp lệ!'));
            }
        };
        reader.readAsText(file);
    }

    async function loadSystemSettings() {
        try {
            const res = await fetch('/api/settings');
            const data = await res.json();
            applySettingsPayload(data);
        } catch (e) {
            console.error('Error loading settings:', e);
        }
    }

})();
