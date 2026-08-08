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
    let cncBounds = { tl: null, tr: null, bl: null, br: null };

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

    // Font Gcode Editor State
    let fontPreviewPaths = [];
    let fontGcode = "";
    let fontStartOffset = { x: 0, y: 0 };
    let fontSimAnimationId = null;

    // Image Gcode Editor State
    let imageSegments = [];
    let imageGcode = "";
    let imageStartOffset = { x: 0, y: 0 };
    let imageSimAnimationId = null;
    let currentImageFile = null;
    let currentImageBase64 = null;

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
        initGcodeFontEditor();
        initGcodeImageEditor();
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
        bindCornerSetButtons();

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
                if (data.details && Array.isArray(data.details)) {
                    data.details.forEach(p => {
                        const opt = document.createElement('option');
                        opt.value = p.device;
                        opt.textContent = (p.description && p.description !== p.device) ? `${p.device} (${p.description})` : p.device;
                        datalist.appendChild(opt);
                    });
                } else {
                    data.ports.forEach(p => {
                        const opt = document.createElement('option');
                        opt.value = p;
                        datalist.appendChild(opt);
                    });
                }
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
            if (msg.scenario_name !== undefined) {
                activeScenario.name = msg.scenario_name;
                const nameInput = document.getElementById('scenario-name');
                if (nameInput && nameInput !== document.activeElement) {
                    nameInput.value = msg.scenario_name;
                }
            }
            if (msg.scenario_actions !== undefined) {
                activeScenario.actions = msg.scenario_actions;
            }
            if (msg.scenario_insert_index !== undefined) {
                scenarioInsertIndex = msg.scenario_insert_index;
            }
            if (msg.scenario_is_looping !== undefined) {
                isScenarioLooping = msg.scenario_is_looping;
                const btn = document.getElementById('btn-run-loop-scenario');
                if (btn) {
                    btn.className = isScenarioLooping ? 'btn btn-danger-soft btn-small' : 'btn btn-warning btn-small';
                    btn.innerText = isScenarioLooping ? t('Dừng Lặp') : t('Chạy Lặp');
                }
            }
            if (msg.cnc_bounds !== undefined) {
                cncBounds = msg.cnc_bounds;
                updateBoundsDisplay();
            } else if (msg.cnc_tl !== undefined || msg.cnc_tr !== undefined || msg.cnc_bl !== undefined || msg.cnc_br !== undefined) {
                cncBounds = {
                    tl: msg.cnc_tl || null,
                    tr: msg.cnc_tr || null,
                    bl: msg.cnc_bl || null,
                    br: msg.cnc_br || null
                };
                updateBoundsDisplay();
            }
            renderScenarioSteps();
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
        const mpos = telemetry.mpos || [0, 0, 0];
        const wr = telemetry.work_origin || { x: 0, y: 0, z: 0 };
        const pr = telemetry.pen_rel_work || { x: 0, y: 0, z: 0 };
        const pk = telemetry.parking_point || { x: 0, y: 0, z: 10 };

        const mposEl = document.getElementById('val-mpos');
        if (mposEl) {
            mposEl.innerText = `X: ${mpos[0].toFixed(2)} | Y: ${mpos[1].toFixed(2)} | Z: ${mpos[2].toFixed(2)}`;
        }
        const wrEl = document.getElementById('val-work-orig');
        if (wrEl) {
            wrEl.innerText = `X: ${wr.x.toFixed(2)} | Y: ${wr.y.toFixed(2)} | Z: ${wr.z.toFixed(2)}`;
        }
        const prEl = document.getElementById('val-pen-rel-work');
        if (prEl) {
            prEl.innerText = `X: ${pr.x.toFixed(2)} | Y: ${pr.y.toFixed(2)} | Z: ${pr.z.toFixed(2)}`;
        }
        const pkEl = document.getElementById('val-parking-point');
        if (pkEl) {
            pkEl.innerText = `X: ${pk.x.toFixed(2)} | Y: ${pk.y.toFixed(2)} | Z: ${pk.z.toFixed(2)}`;
        }
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
        const longPressDwell = parseFloat(
            document.getElementById('sys-long-press-dwell')?.value ||
            '1.5'
        );
        const swipeDist = parseFloat(
            document.getElementById('sys-swipe-distance')?.value ||
            document.getElementById('gesture-swipe-distance')?.value ||
            '40'
        );
        return { feed, swipeFeed, step, tapDwell, longPressDwell, swipeDist };
    }

    // Machine Jogging Functions
    function bindJogKey(id, dx, dy, dz) {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('click', async () => {
            let dir = '';
            if (dx > 0) dir += 'X+';
            else if (dx < 0) dir += 'X-';
            if (dy > 0) dir += 'Y+';
            else if (dy < 0) dir += 'Y-';
            if (dz > 0) dir += 'Z+';
            else if (dz < 0) dir += 'Z-';

            const { feed, step } = getSystemConfig();
            try {
                await fetch('/cncapi/v1/motion/jog', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ direction: dir, step_distance: step, feedrate: feed })
                });
            } catch (e) {
                console.error('Jog error:', e);
            }
        });
    }

    async function setWorkOriginCurrent() {
        try {
            await fetch('/cncapi/v1/origin/set_work', {
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

    async function gotoWorkOrigin() {
        try {
            await fetch('/cncapi/v1/origin/goto_work', { method: 'POST' });
        } catch (e) {
            console.error('Error going to work origin:', e);
        }
    }

    async function gotoParkingPoint() {
        try {
            await fetch('/cncapi/v1/origin/goto_parking', { method: 'POST' });
        } catch (e) {
            console.error('Error going to parking point:', e);
        }
    }

    async function stopCNC() {
        try {
            await fetch('/cncapi/v1/motion/stop', { method: 'POST' });
        } catch (e) {
            console.error('Error stopping CNC:', e);
        }
    }

    // Touch & Swipe Gestures
    async function executeGesture(type) {
        if (!isHomeSet) {
            alert(t('Cần đặt gốc tọa độ làm việc trước!'));
            return;
        }

        const { feed, swipeFeed, tapDwell, longPressDwell, swipeDist } = getSystemConfig();

        const startX = parseFloat(document.getElementById('gesture-start-x')?.value || '0');
        const startY = parseFloat(document.getElementById('gesture-start-y')?.value || '0');
        const endX = parseFloat(document.getElementById('gesture-end-x')?.value || '0');
        const endY = parseFloat(document.getElementById('gesture-end-y')?.value || '0');

        try {
            await fetch('/cncapi/v1/gestures/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: type,
                    start_x: startX,
                    start_y: startY,
                    end_x: endX,
                    end_y: endY,
                    distance: swipeDist,
                    feedrate: feed,
                    swipe_feedrate: swipeFeed,
                    tap_dwell: tapDwell,
                    long_press_dwell: longPressDwell
                })
            });
        } catch (e) {
            console.error('Error executing gesture:', e);
        }
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

        // ---- DRAW PHYSICAL WORK BOUNDS FRAME (If 4 corners are set) ----
        if (cncBounds && cncBounds.tl && cncBounds.tr && cncBounds.br && cncBounds.bl) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(wx(cncBounds.tl.x), wy(cncBounds.tl.y));
            ctx.lineTo(wx(cncBounds.tr.x), wy(cncBounds.tr.y));
            ctx.lineTo(wx(cncBounds.br.x), wy(cncBounds.br.y));
            ctx.lineTo(wx(cncBounds.bl.x), wy(cncBounds.bl.y));
            ctx.closePath();

            // Fill translucent area
            ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
            ctx.fill();

            // Dashed outline
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 1.8;
            ctx.setLineDash([6, 4]);
            ctx.stroke();

            // Corner labels & markers
            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 10px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const corners = [
                { name: 'TL', pt: cncBounds.tl, dx: -12, dy: -8 },
                { name: 'TR', pt: cncBounds.tr, dx: 12, dy: -8 },
                { name: 'BR', pt: cncBounds.br, dx: 12, dy: 8 },
                { name: 'BL', pt: cncBounds.bl, dx: -12, dy: 8 }
            ];

            corners.forEach(c => {
                const cx = wx(c.pt.x);
                const cy = wy(c.pt.y);
                ctx.beginPath();
                ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillText(c.name, cx + c.dx, cy + c.dy);
            });

            ctx.restore();
        }

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

        // ---- DRAW FONT GCODE PREVIEW PATHS ----
        if (fontPreviewPaths && fontPreviewPaths.length > 0) {
            ctx.save();
            ctx.strokeStyle = '#38bdf8'; // Vivid Cyan
            ctx.lineWidth = 2.5;
            ctx.setLineDash([]);
            fontPreviewPaths.forEach(path => {
                if (!path || path.length < 2) return;
                ctx.beginPath();
                ctx.moveTo(wx(path[0][0] + fontStartOffset.x), wy(path[0][1] + fontStartOffset.y));
                for (let i = 1; i < path.length; i++) {
                    ctx.lineTo(wx(path[i][0] + fontStartOffset.x), wy(path[i][1] + fontStartOffset.y));
                }
                ctx.stroke();
            });
            ctx.restore();
        }

        // ---- DRAW IMAGE GCODE PREVIEW SEGMENTS ----
        if (imageSegments && imageSegments.length > 0) {
            ctx.save();
            ctx.strokeStyle = '#f59e0b'; // Amber / Golden Yellow
            ctx.lineWidth = 1.8;
            ctx.setLineDash([]);
            imageSegments.forEach(seg => {
                ctx.beginPath();
                ctx.moveTo(wx(seg.x1 + imageStartOffset.x), wy(seg.y1 + imageStartOffset.y));
                ctx.lineTo(wx(seg.x2 + imageStartOffset.x), wy(seg.y2 + imageStartOffset.y));
                ctx.stroke();
            });
            ctx.restore();
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
            // ctx.fillRect(boxX, boxY, tw, 20);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1;
            // ctx.strokeRect(boxX, boxY, tw, 20);
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
    // Scenario Builder & Execution
    async function createNewScenario() {
        if (!isHomeSet) {
            alert(t('Cần đặt gốc tọa độ làm việc trước!'));
            return;
        }
        const nameInput = document.getElementById('scenario-name');
        const name = nameInput?.value || '';
        if (!name || name.trim() === '') {
            alert(t('Cần nhập tên kịch bản trước!'));
            return;
        }
        try {
            const res = await fetch('/cncapi/v1/scenario/session/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim() })
            });
            const data = await res.json();
            if (data.status === 'success') {
                activeScenario.name = name.trim();
                activeScenario.actions = [];
                scenarioInsertIndex = -1;
                renderScenarioSteps();
                drawCanvas();
            }
        } catch (e) {
            console.error('Error creating scenario:', e);
        }
    }

    async function addScenarioAction(actionType) {
        if (!isHomeSet) {
            alert(t('Cần đặt gốc tọa độ làm việc trước!'));
            return;
        }
        try {
            const res = await fetch('/cncapi/v1/scenario/session/add_step', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: actionType })
            });
            const data = await res.json();
            if (data.status === 'success') {
                renderScenarioSteps();
                drawCanvas();
            }
        } catch (e) {
            console.error('Error adding step:', e);
        }
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
            
            btnPin.addEventListener('click', async () => {
                try {
                    await fetch('/cncapi/v1/scenario/session/pin', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ index: idx })
                    });
                } catch (e) { console.error(e); }
            });
            
            btnUp.addEventListener('click', async () => {
                if (idx > 0) {
                    try {
                        await fetch('/cncapi/v1/scenario/session/reorder', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ from_index: idx, to_index: idx - 1 })
                        });
                    } catch (e) { console.error(e); }
                }
            });
            
            btnDown.addEventListener('click', async () => {
                if (idx < activeScenario.actions.length - 1) {
                    try {
                        await fetch('/cncapi/v1/scenario/session/reorder', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ from_index: idx, to_index: idx + 1 })
                        });
                    } catch (e) { console.error(e); }
                }
            });
            
            btnDel.addEventListener('click', async () => {
                try {
                    await fetch(`/cncapi/v1/scenario/session/steps/${idx}`, {
                        method: 'DELETE'
                    });
                } catch (e) { console.error(e); }
            });
            
            container.appendChild(item);
        });
    }

    async function clearScenarioSteps() {
        try {
            await fetch('/cncapi/v1/scenario/session/steps', { method: 'DELETE' });
        } catch (e) {
            console.error('Error clearing scenario steps:', e);
        }
    }

    function saveScenarioJSON() {
        window.location.href = '/cncapi/v1/scenario/session/export';
    }

    function loadScenarioJSON(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                await fetch('/cncapi/v1/scenario/session/import', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: parsed.name || 'kich_ban_1',
                        actions: parsed.actions || []
                    })
                });
            } catch (err) {
                alert(t('Lỗi đọc file JSON kịch bản!'));
            }
        };
        reader.readAsText(file);
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
        try {
            await fetch('/cncapi/v1/scenario/session/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ loop: false })
            });
        } catch (e) {
            console.error('Error running scenario:', e);
        }
    }

    async function toggleRunLoopScenario() {
        if (!isHomeSet) {
            alert(t('Cần đặt gốc tọa độ làm việc trước!'));
            return;
        }
        if (activeScenario.actions.length === 0) {
            alert(t('Kịch bản trống! Vui lòng thêm các bước trước.'));
            return;
        }
        try {
            await fetch('/cncapi/v1/scenario/session/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ loop: !isScenarioLooping })
            });
        } catch (e) {
            console.error('Error toggling run loop:', e);
        }
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
            long_press_dwell: parseFloat(document.getElementById('sys-long-press-dwell')?.value || '1.5'),
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
            const res = await fetch('/cncapi/v1/settings', {
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
        if ((data.long_press_dwell !== undefined || data.gesture_long_press_dwell !== undefined) && document.getElementById('sys-long-press-dwell')) {
            document.getElementById('sys-long-press-dwell').value = data.long_press_dwell ?? data.gesture_long_press_dwell;
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

        if (data.cnc_bounds) {
            cncBounds = data.cnc_bounds;
        } else if (data.cnc_tl !== undefined || data.cnc_tr !== undefined || data.cnc_bl !== undefined || data.cnc_br !== undefined) {
            cncBounds = {
                tl: data.cnc_tl || null,
                tr: data.cnc_tr || null,
                bl: data.cnc_bl || null,
                br: data.cnc_br || null
            };
        }

        if (data.workpiece_origin) telemetry.workpiece_origin = data.workpiece_origin;
        if (data.work_origin) {
            telemetry.work_origin = data.work_origin;
            isHomeSet = true;
        }
        if (data.parking_point) telemetry.parking_point = data.parking_point;
        updateBoundsDisplay();
        updateInfoDisplays();
        drawCanvas();
    }

    function updateBoundsDisplay() {
        const el = document.getElementById('cnc-bounds-info');
        if (!el) return;
        const parts = [];
        if (cncBounds && cncBounds.tl) parts.push(`TL:(${cncBounds.tl.x},${cncBounds.tl.y})`);
        if (cncBounds && cncBounds.tr) parts.push(`TR:(${cncBounds.tr.x},${cncBounds.tr.y})`);
        if (cncBounds && cncBounds.bl) parts.push(`BL:(${cncBounds.bl.x},${cncBounds.bl.y})`);
        if (cncBounds && cncBounds.br) parts.push(`BR:(${cncBounds.br.x},${cncBounds.br.y})`);
        if (parts.length > 0) {
            el.innerText = parts.join(' ');
        } else {
            el.innerText = t('Chưa định vị 4 góc khung');
        }
    }

    function bindCornerSetButtons() {
        const corners = ['tl', 'tr', 'bl', 'br'];
        corners.forEach(corner => {
            const btn = document.getElementById(`btn-set-cnc-${corner}`);
            if (!btn) return;
            btn.addEventListener('click', async () => {
                if (!isHomeSet) {
                    alert(t('Cần đặt gốc tọa độ làm việc trước!'));
                    return;
                }
                try {
                    const res = await fetch('/cncapi/v1/origin/set_bound_point', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ corner: corner })
                    });
                    const data = await res.json();
                    if (data.status === 'success') {
                        cncBounds = data.bounds;
                        updateBoundsDisplay();
                        drawCanvas();
                    }
                } catch (e) {
                    console.error(`Error setting corner ${corner}:`, e);
                }
            });
        });
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

    // ==================== GCODE WITH FONT EDITOR ====================
    function initGcodeFontEditor() {
        const btnOpen = document.getElementById('btn-open-gcode-font');
        const btnClose = document.getElementById('btn-close-gcode-font-editor');
        const panel = document.getElementById('gcode-font-editor-panel');
        const fontSelect = document.getElementById('font-select');
        const fontSizeInput = document.getElementById('font-size-input');
        const fontSizePills = document.querySelectorAll('.font-size-pill');
        const textInput = document.getElementById('font-text-input');
        const feedRateInput = document.getElementById('font-feed-rate');
        const strokeModeSelect = document.getElementById('font-stroke-mode');
        const btnGenerate = document.getElementById('btn-generate-font-gcode');
        const btnSimulate = document.getElementById('btn-preview-simulate-draw');
        const btnRealDraw = document.getElementById('btn-draw-on-real-cnc');
        const btnStopHomeStart = document.getElementById('btn-stop-font-home-start');
        const btnStopHomeOrigin = document.getElementById('btn-stop-font-home-origin');
        const btnDownload = document.getElementById('btn-download-font-gcode');
        const btnSaveProject = document.getElementById('btn-save-font-project');
        const btnLoadProject = document.getElementById('btn-load-font-project');
        const projectFileInput = document.getElementById('font-project-file-input');
        const fontInfoBox = document.getElementById('font-info-box');

        if (!btnOpen || !panel) return;

        btnOpen.addEventListener('click', () => {
            panel.classList.toggle('hidden');
            if (!panel.classList.contains('hidden')) {
                loadFonts();
                generateFontGcode();
            }
        });

        if (btnClose) {
            btnClose.addEventListener('click', () => {
                panel.classList.add('hidden');
            });
        }

        fontSizePills.forEach(pill => {
            pill.addEventListener('click', () => {
                fontSizePills.forEach(p => p.classList.remove('active', 'btn-primary'));
                fontSizePills.forEach(p => p.classList.add('btn-secondary'));
                pill.classList.remove('btn-secondary');
                pill.classList.add('btn-primary', 'active');
                if (fontSizeInput) fontSizeInput.value = pill.dataset.size;
                generateFontGcode();
            });
        });

        async function loadFonts() {
            try {
                const res = await fetch('/cncapi/v1/fonts');
                const data = await res.json();
                if (data.fonts && data.fonts.length > 0 && fontSelect) {
                    fontSelect.innerHTML = '';
                    data.fonts.forEach(f => {
                        const opt = document.createElement('option');
                        opt.value = f;
                        opt.textContent = f;
                        fontSelect.appendChild(opt);
                    });
                }
            } catch (e) {
                console.error('Lỗi nạp danh sách font:', e);
            }
        }

        const lineSpacingInput = document.getElementById('font-line-spacing');
        const lineSpacingMmInput = document.getElementById('font-line-spacing-mm');

        async function generateFontGcode() {
            const font_name = fontSelect ? fontSelect.value : '';
            const text = textInput ? textInput.value : '';
            if (!text || !text.trim() || !font_name) return;

            const curWpos = telemetry.wpos || [0, 0, 0];
            fontStartOffset = { x: curWpos[0], y: curWpos[1] };

            try {
                const res = await fetch('/cncapi/v1/generate-font-gcode', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        font_name: font_name,
                        text: text,
                        font_size_pt: parseFloat(fontSizeInput.value) || 72.0,
                        line_spacing: parseFloat(lineSpacingInput?.value) || 1.2,
                        line_spacing_mm: parseFloat(lineSpacingMmInput?.value) || 0.0,
                        feed_rate: parseFloat(feedRateInput.value) || 4000.0,
                        z_safe: parseFloat(document.getElementById('font-z-safe')?.value || document.getElementById('pen-up-val')?.value || '0.0'),
                        z_draw: parseFloat(document.getElementById('font-z-draw')?.value || document.getElementById('pen-down-val')?.value || '45.0'),
                        stroke_mode: strokeModeSelect ? strokeModeSelect.value : 'single_line',
                        pen_mode: document.getElementById('font-pen-mode')?.value || penMode || 'spindle-pwm',
                        axis_dir_y: parseInt(document.getElementById('font-axis-dir-y')?.value || (axisDirY !== undefined ? axisDirY : '1')),
                        epsilon: parseFloat(document.getElementById('font-epsilon')?.value || '1.2'),
                        margin_mm: parseFloat(document.getElementById('font-margin-mm')?.value || '5.0'),
                        binary_threshold: parseInt(document.getElementById('font-binary-thresh')?.value || '128'),
                        render_dpi: parseInt(document.getElementById('font-render-dpi')?.value || '600'),
                        min_path_len_mm: parseFloat(document.getElementById('font-min-path-len')?.value || '0.5'),
                        sort_row_height_mm: parseFloat(document.getElementById('font-sort-row-h')?.value || '10.0')
                    })
                });

                const data = await res.json();
                if (data.status === 'ok') {
                    fontGcode = data.gcode;
                    fontPreviewPaths = data.preview_paths || [];
                    if (fontInfoBox) {
                        fontInfoBox.innerText = `Kích thước: ${data.actual_w_mm} x ${data.actual_h_mm} mm | Đường nét: ${data.total_paths} | Dòng G-code: ${data.lines_count}`;
                    }
                    drawCanvas();
                } else {
                    if (fontInfoBox) fontInfoBox.innerText = `Lỗi: ${data.message}`;
                }
            } catch (e) {
                console.error('Lỗi generate font gcode:', e);
            }
        }

        if (btnGenerate) btnGenerate.addEventListener('click', generateFontGcode);
        if (fontSelect) fontSelect.addEventListener('change', generateFontGcode);
        if (fontSizeInput) fontSizeInput.addEventListener('input', generateFontGcode);
        if (lineSpacingInput) {
            lineSpacingInput.addEventListener('input', generateFontGcode);
            lineSpacingInput.addEventListener('change', generateFontGcode);
        }
        if (lineSpacingMmInput) {
            lineSpacingMmInput.addEventListener('input', generateFontGcode);
            lineSpacingMmInput.addEventListener('change', generateFontGcode);
        }
        if (strokeModeSelect) strokeModeSelect.addEventListener('change', generateFontGcode);
        if (textInput) textInput.addEventListener('input', generateFontGcode);

        // Bind all advanced setting inputs for FontGcodeRequest properties
        [
            'font-z-safe', 'font-z-draw', 'font-pen-mode', 'font-axis-dir-y',
            'font-epsilon', 'font-margin-mm', 'font-binary-thresh', 'font-render-dpi',
            'font-min-path-len', 'font-sort-row-h'
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', generateFontGcode);
                el.addEventListener('change', generateFontGcode);
            }
        });

        // Nút "Vẽ xem trước" (Giả lập)
        if (btnSimulate) {
            btnSimulate.addEventListener('click', () => {
                if (!fontPreviewPaths || fontPreviewPaths.length === 0) {
                    alert(t('Chưa có G-code nét chữ. Vui lòng tạo G-code trước!'));
                    return;
                }
                simulateFontDrawAnimation();
            });
        }

        // Nút "Vẽ trên CNC" (Thực tế)
        if (btnRealDraw) {
            btnRealDraw.addEventListener('click', async () => {
                if (!fontGcode) {
                    alert(t('Chưa có G-code nét chữ. Vui lòng tạo G-code trước!'));
                    return;
                }
                if (!isConnected) {
                    alert(t('Vui lòng Kết Nối CNC trước khi thực hiện vẽ!'));
                    return;
                }
                if (confirm(t('Xác nhận gửi mã G-code nét chữ tới máy CNC để bắt đầu vẽ?'))) {
                    try {
                        const curWpos = telemetry.wpos || [0, 0, 0];
                        const offsetX = curWpos[0];
                        const offsetY = curWpos[1];
                        
                        // Tính toán offset tọa độ X/Y từ vị trí WPos hiện tại của đầu CNC
                        const lines = fontGcode.split('\n');
                        const offsetLines = lines.map(line => {
                            let trimmed = line.trim();
                            if (!trimmed || trimmed.startsWith(';')) return line;
                            const parts = line.split(';');
                            parts[0] = parts[0].replace(/([XY])(-?\d+\.?\d*)/g, (match, axis, val) => {
                                const num = parseFloat(val);
                                if (axis === 'X') return `X${(num + offsetX).toFixed(2)}`;
                                if (axis === 'Y') return `Y${(num + offsetY).toFixed(2)}`;
                                return match;
                            });
                            return parts.join(';');
                        });
                        
                        let offsetGcode = `G90\n` + offsetLines.join('\n');
                        const res = await fetch('/cncapi/v1/run-gcode', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ gcode: offsetGcode })
                        });
                        const data = await res.json();
                        if (data.status === 'success') {
                            appendConsoleLog(`[GCODE FONT] Đã gửi ${data.lines_sent} dòng G-code tới CNC (Bắt đầu tại X=${offsetX.toFixed(2)}, Y=${offsetY.toFixed(2)})`, 'system');
                        }
                    } catch (e) {
                        alert(`Lỗi thực thi G-code: ${e.message}`);
                    }
                }
            });
        }

        // 1. Nút 🛑 Dừng & Về gốc ban đầu trước khi vẽ (Font)
        if (btnStopHomeStart) {
            btnStopHomeStart.addEventListener('click', async () => {
                if (fontSimAnimationId) {
                    cancelAnimationFrame(fontSimAnimationId);
                    fontSimAnimationId = null;
                }
                simIsRunning = false;
                simHeadPos = { x: fontStartOffset.x, y: fontStartOffset.y };
                drawCanvas();

                const zSafe = parseFloat(document.getElementById('font-z-safe')?.value || '0.0');
                const penModeVal = document.getElementById('font-pen-mode')?.value || 'spindle-pwm';

                try {
                    const res = await fetch('/cncapi/v1/motion/stop-and-return', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            target_x: fontStartOffset.x,
                            target_y: fontStartOffset.y,
                            z_safe: zSafe,
                            pen_mode: penModeVal
                        })
                    });
                    const data = await res.json();
                    if (data.status === 'success') {
                        appendConsoleLog(`[GCODE FONT] Đã phát lệnh Dừng khẩn cấp, nhấc dao & di chuyển về gốc ban đầu trước khi vẽ (X=${fontStartOffset.x.toFixed(2)}, Y=${fontStartOffset.y.toFixed(2)})`, 'warning');
                        if (fontInfoBox) fontInfoBox.innerText = `🛑 Đã dừng & Về gốc ban đầu (${fontStartOffset.x.toFixed(1)}, ${fontStartOffset.y.toFixed(1)})!`;
                    }
                } catch (e) {
                    alert(`Lỗi thực hiện dừng & về gốc ban đầu: ${e.message}`);
                }
            });
        }

        // 2. Nút 🏠 Dừng & Về gốc WPos (0,0) (Font)
        if (btnStopHomeOrigin) {
            btnStopHomeOrigin.addEventListener('click', async () => {
                if (fontSimAnimationId) {
                    cancelAnimationFrame(fontSimAnimationId);
                    fontSimAnimationId = null;
                }
                simIsRunning = false;
                simHeadPos = { x: 0, y: 0 };
                drawCanvas();

                const zSafe = parseFloat(document.getElementById('font-z-safe')?.value || '0.0');
                const penModeVal = document.getElementById('font-pen-mode')?.value || 'spindle-pwm';

                try {
                    const res = await fetch('/cncapi/v1/motion/stop-and-return', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            target_x: 0.0,
                            target_y: 0.0,
                            z_safe: zSafe,
                            pen_mode: penModeVal
                        })
                    });
                    const data = await res.json();
                    if (data.status === 'success') {
                        appendConsoleLog('[GCODE FONT] Đã phát lệnh Dừng khẩn cấp, nhấc dao & di chuyển về gốc tọa độ làm việc (X0, Y0)', 'info');
                        if (fontInfoBox) fontInfoBox.innerText = '🏠 Đã dừng & Về gốc WPos (0,0)!';
                    }
                } catch (e) {
                    alert(`Lỗi thực hiện dừng & về gốc WPos: ${e.message}`);
                }
            });
        }

        // Nút Tải file .gcode
        if (btnDownload) {
            btnDownload.addEventListener('click', () => {
                if (!fontGcode) return;
                const blob = new Blob([fontGcode], { type: 'text/plain;charset=utf-8' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                const textSlug = (textInput.value || 'text').substring(0, 15).replace(/[^a-zA-Z0-9]/g, '_');
                a.download = `gcode_font_${textSlug}.gcode`;
                a.click();
            });
        }

        // Nút Lưu Project JSON Font
        if (btnSaveProject) {
            btnSaveProject.addEventListener('click', () => {
                if (!fontGcode && (!fontPreviewPaths || fontPreviewPaths.length === 0)) {
                    alert('Chưa có dữ liệu project font để lưu!');
                    return;
                }
                const projectData = {
                    version: '1.0',
                    type: 'font_gcode_project',
                    timestamp: Date.now(),
                    text: textInput?.value || '',
                    font_name: fontSelect?.value || '',
                    font_size_pt: parseFloat(fontSizeInput?.value || '72.0'),
                    line_spacing: parseFloat(lineSpacingInput?.value || '1.2'),
                    line_spacing_mm: parseFloat(lineSpacingMmInput?.value || '0.0'),
                    feed_rate: parseFloat(feedRateInput?.value || '4000.0'),
                    stroke_mode: strokeModeSelect ? strokeModeSelect.value : 'single_line',
                    z_safe: parseFloat(document.getElementById('font-z-safe')?.value || '0.0'),
                    z_draw: parseFloat(document.getElementById('font-z-draw')?.value || '45.0'),
                    pen_mode: document.getElementById('font-pen-mode')?.value || 'spindle-pwm',
                    axis_dir_y: parseInt(document.getElementById('font-axis-dir-y')?.value || '1'),
                    epsilon: parseFloat(document.getElementById('font-epsilon')?.value || '1.2'),
                    margin_mm: parseFloat(document.getElementById('font-margin-mm')?.value || '5.0'),
                    binary_threshold: parseInt(document.getElementById('font-binary-thresh')?.value || '128'),
                    render_dpi: parseInt(document.getElementById('font-render-dpi')?.value || '600'),
                    min_path_len_mm: parseFloat(document.getElementById('font-min-path-len')?.value || '0.5'),
                    sort_row_height_mm: parseFloat(document.getElementById('font-sort-row-h')?.value || '10.0'),
                    gcode: fontGcode,
                    preview_paths: fontPreviewPaths
                };
                const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                const textSlug = (textInput?.value || 'text').substring(0, 15).replace(/[^a-zA-Z0-9]/g, '_');
                a.download = `project_font_${textSlug}_${Date.now()}.json`;
                a.click();
            });
        }

        // Nút Nạp Project JSON Font
        if (btnLoadProject && projectFileInput) {
            btnLoadProject.addEventListener('click', () => {
                projectFileInput.click();
            });

            projectFileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                    try {
                        const data = JSON.parse(evt.target.result);
                        if (data.text !== undefined && textInput) textInput.value = data.text;
                        if (data.font_name && fontSelect) fontSelect.value = data.font_name;
                        if (data.font_size_pt && fontSizeInput) fontSizeInput.value = data.font_size_pt;
                        if (data.line_spacing && lineSpacingInput) lineSpacingInput.value = data.line_spacing;
                        if (data.line_spacing_mm && lineSpacingMmInput) lineSpacingMmInput.value = data.line_spacing_mm;
                        if (data.feed_rate && feedRateInput) feedRateInput.value = data.feed_rate;
                        if (data.stroke_mode && strokeModeSelect) strokeModeSelect.value = data.stroke_mode;

                        if (data.z_safe !== undefined && document.getElementById('font-z-safe')) document.getElementById('font-z-safe').value = data.z_safe;
                        if (data.z_draw !== undefined && document.getElementById('font-z-draw')) document.getElementById('font-z-draw').value = data.z_draw;
                        if (data.pen_mode && document.getElementById('font-pen-mode')) document.getElementById('font-pen-mode').value = data.pen_mode;
                        if (data.axis_dir_y !== undefined && document.getElementById('font-axis-dir-y')) document.getElementById('font-axis-dir-y').value = data.axis_dir_y;
                        if (data.epsilon !== undefined && document.getElementById('font-epsilon')) document.getElementById('font-epsilon').value = data.epsilon;
                        if (data.margin_mm !== undefined && document.getElementById('font-margin-mm')) document.getElementById('font-margin-mm').value = data.margin_mm;
                        if (data.binary_threshold !== undefined && document.getElementById('font-binary-thresh')) document.getElementById('font-binary-thresh').value = data.binary_threshold;
                        if (data.render_dpi !== undefined && document.getElementById('font-render-dpi')) document.getElementById('font-render-dpi').value = data.render_dpi;
                        if (data.min_path_len_mm !== undefined && document.getElementById('font-min-path-len')) document.getElementById('font-min-path-len').value = data.min_path_len_mm;
                        if (data.sort_row_height_mm !== undefined && document.getElementById('font-sort-row-h')) document.getElementById('font-sort-row-h').value = data.sort_row_height_mm;

                        if (data.gcode) fontGcode = data.gcode;
                        if (data.preview_paths) fontPreviewPaths = data.preview_paths;

                        const curWpos = telemetry.wpos || [0, 0, 0];
                        fontStartOffset = { x: curWpos[0], y: curWpos[1] };

                        if (fontInfoBox) {
                            fontInfoBox.innerText = `Đã nạp Project Font! Đường nét: ${fontPreviewPaths ? fontPreviewPaths.length : 0} | Dòng G-code: ${fontGcode ? fontGcode.split('\n').length : 0}`;
                        }
                        drawCanvas();
                    } catch (ex) {
                        alert('Lỗi nạp file JSON project font: ' + ex.message);
                    }
                };
                reader.readAsText(file);
            });
        }
    }

    function simulateFontDrawAnimation() {
        if (!fontPreviewPaths || fontPreviewPaths.length === 0) return;
        if (fontSimAnimationId) cancelAnimationFrame(fontSimAnimationId);

        let flatPoints = [];
        fontPreviewPaths.forEach(path => {
            path.forEach(pt => {
                flatPoints.push({ x: pt[0] + fontStartOffset.x, y: pt[1] + fontStartOffset.y });
            });
        });

        let pointIdx = 0;
        simIsRunning = true;

        function animateStep() {
            if (pointIdx < flatPoints.length) {
                simHeadPos = { x: flatPoints[pointIdx].x, y: flatPoints[pointIdx].y };
                drawCanvas();
                pointIdx++;
                fontSimAnimationId = requestAnimationFrame(() => {
                    setTimeout(animateStep, 15);
                });
            } else {
                simIsRunning = false;
                fontSimAnimationId = null;
                drawCanvas();
            }
        }
        animateStep();
    }

    // ==================== GCODE WITH IMAGE EDITOR ====================
    function initGcodeImageEditor() {
        const btnOpen = document.getElementById('btn-open-gcode-image');
        const btnClose = document.getElementById('btn-close-gcode-image-editor');
        const panel = document.getElementById('gcode-image-editor-panel');
        const fileInput = document.getElementById('image-file-input');
        const previewImg = document.getElementById('image-preview-img');
        const infoLabel = document.getElementById('image-info-label');
        const algoSelect = document.getElementById('image-algorithm-select');
        const scaleInput = document.getElementById('image-scale-input');
        const feedRateInput = document.getElementById('image-feed-rate-input');
        const modeSelect = document.getElementById('image-mode-select');
        const btnGenerate = document.getElementById('btn-generate-image-gcode');
        const btnSimulate = document.getElementById('btn-preview-image-draw');
        const btnRealDraw = document.getElementById('btn-draw-image-on-cnc');
        const btnStopHomeStart = document.getElementById('btn-stop-image-home-start');
        const btnStopHomeOrigin = document.getElementById('btn-stop-image-home-origin');
        const btnDownload = document.getElementById('btn-download-image-gcode');
        const btnSaveProject = document.getElementById('btn-save-image-project');
        const btnLoadProject = document.getElementById('btn-load-image-project');
        const projectFileInput = document.getElementById('image-project-file-input');
        const infoBox = document.getElementById('image-info-box');

        if (!btnOpen || !panel) return;

        btnOpen.addEventListener('click', () => {
            panel.classList.toggle('hidden');
        });

        if (btnClose) {
            btnClose.addEventListener('click', () => {
                panel.classList.add('hidden');
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                currentImageFile = file;

                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        currentImageBase64 = evt.target.result;
                        if (previewImg) {
                            previewImg.src = currentImageBase64;
                            previewImg.style.display = 'block';
                        }
                        const img = new Image();
                        img.onload = () => {
                            if (infoLabel) {
                                infoLabel.innerHTML = `<strong>${file.name}</strong><br/>Kích thước: ${img.width} x ${img.height} px`;
                            }
                        };
                        img.src = currentImageBase64;
                    };
                    reader.readAsDataURL(file);
                } else {
                    if (previewImg) previewImg.style.display = 'none';
                    if (infoLabel) {
                        infoLabel.innerHTML = `<strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)`;
                    }
                }
            });
        }

        if (algoSelect) {
            algoSelect.addEventListener('change', () => {
                if (algoSelect.value === 'sketch_portrait') {
                    if (scaleInput) scaleInput.value = '0.15';
                    if (feedRateInput) feedRateInput.value = '2000';
                    const claheEl = document.getElementById('image-clahe-clip');
                    if (claheEl) claheEl.value = '1.0';
                    const blurEl = document.getElementById('image-blur-size');
                    if (blurEl) blurEl.value = '9';
                    const minLenEl = document.getElementById('image-min-contour-len');
                    if (minLenEl) minLenEl.value = '18';
                    const thinEl = document.getElementById('image-use-thin');
                    if (thinEl) thinEl.checked = false;
                    const claheCheck = document.getElementById('image-use-clahe');
                    if (claheCheck) claheCheck.checked = true;
                    const blurCheck = document.getElementById('image-use-blur');
                    if (blurCheck) blurCheck.checked = true;
                    const connectCheck = document.getElementById('image-use-connect');
                    if (connectCheck) connectCheck.checked = true;
                    const lenCheck = document.getElementById('image-use-len-filter');
                    if (lenCheck) lenCheck.checked = true;
                }
            });
        }

        async function generateImageGcode() {
            if (!currentImageFile) {
                if (infoBox) infoBox.innerText = '⚠️ Vui lòng chọn file ảnh / SVG / G-code trước!';
                return;
            }

            const curWpos = telemetry.wpos || [0, 0, 0];
            imageStartOffset = { x: curWpos[0], y: curWpos[1] };

            const formData = new FormData();
            formData.append('file', currentImageFile);
            formData.append('scale_factor', parseFloat(scaleInput?.value || '0.1'));
            formData.append('feed_rate', parseInt(feedRateInput?.value || '2000'));
            formData.append('mode', modeSelect?.value || 'servo');
            formData.append('algorithm', algoSelect?.value || 'sketch');
            formData.append('active_tab', algoSelect?.value || 'sketch');

            formData.append('clahe_clip_limit', parseFloat(document.getElementById('image-clahe-clip')?.value || '1.5'));
            formData.append('blur_size', parseInt(document.getElementById('image-blur-size')?.value || '3'));
            formData.append('min_contour_len', parseInt(document.getElementById('image-min-contour-len')?.value || '5'));
            formData.append('use_clahe', document.getElementById('image-use-clahe')?.checked ? 'true' : 'false');
            formData.append('use_blur', document.getElementById('image-use-blur')?.checked ? 'true' : 'false');
            formData.append('use_connect', document.getElementById('image-use-connect')?.checked ? 'true' : 'false');
            formData.append('use_thin', document.getElementById('image-use-thin')?.checked ? 'true' : 'false');
            formData.append('use_len_filter', document.getElementById('image-use-len-filter')?.checked ? 'true' : 'false');
            formData.append('handwriting_mode', document.getElementById('image-hw-mode')?.value || 'centerline');

            if (infoBox) infoBox.innerText = '⏳ Đang chuyển đổi ảnh sang G-code...';

            try {
                const res = await fetch('/cncapi/v1/convert-image-gcode', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (data.status === 'ok') {
                    imageGcode = data.gcode || '';
                    imageSegments = data.segments || [];
                    if (infoBox) {
                        infoBox.innerText = `Phân đoạn: ${imageSegments.length} | Dòng G-code: ${imageGcode.split('\n').length}`;
                    }
                    drawCanvas();
                } else {
                    if (infoBox) infoBox.innerText = `Lỗi: ${data.message || 'Không thể chuyển đổi'}`;
                }
            } catch (e) {
                console.error('Lỗi convert image gcode:', e);
                if (infoBox) infoBox.innerText = `Lỗi kết nối: ${e.message}`;
            }
        }

        if (btnGenerate) btnGenerate.addEventListener('click', generateImageGcode);

        // Nút "Vẽ xem trước" (Giả lập)
        if (btnSimulate) {
            btnSimulate.addEventListener('click', () => {
                if (!imageSegments || imageSegments.length === 0) {
                    alert(t('Chưa có G-code nét ảnh. Vui lòng tạo G-code trước!'));
                    return;
                }
                simulateImageDrawAnimation();
            });
        }

        // Nút "Vẽ trên CNC" (Thực tế)
        if (btnRealDraw) {
            btnRealDraw.addEventListener('click', async () => {
                if (!imageGcode) {
                    alert(t('Chưa có G-code nét ảnh. Vui lòng tạo G-code trước!'));
                    return;
                }
                if (!isConnected) {
                    alert(t('Vui lòng Kết Nối CNC trước khi thực hiện vẽ!'));
                    return;
                }
                if (confirm(t('Xác nhận gửi mã G-code nét ảnh tới máy CNC để bắt đầu vẽ?'))) {
                    try {
                        const curWpos = telemetry.wpos || [0, 0, 0];
                        const offsetX = curWpos[0];
                        const offsetY = curWpos[1];

                        const lines = imageGcode.split('\n');
                        const offsetLines = lines.map(line => {
                            let trimmed = line.trim();
                            if (!trimmed || trimmed.startsWith(';')) return line;
                            const parts = line.split(';');
                            parts[0] = parts[0].replace(/([XY])(-?\d+\.?\d*)/g, (match, axis, val) => {
                                const num = parseFloat(val);
                                if (axis === 'X') return `X${(num + offsetX).toFixed(2)}`;
                                if (axis === 'Y') return `Y${(num + offsetY).toFixed(2)}`;
                                return match;
                            });
                            return parts.join(';');
                        });

                        let offsetGcode = `G90\n` + offsetLines.join('\n');
                        const res = await fetch('/cncapi/v1/run-gcode', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ gcode: offsetGcode })
                        });
                        const data = await res.json();
                        if (data.status === 'success') {
                            appendConsoleLog(`[GCODE IMAGE] Đã gửi ${data.lines_sent} dòng G-code tới CNC (Bắt đầu tại X=${offsetX.toFixed(2)}, Y=${offsetY.toFixed(2)})`, 'system');
                        }
                    } catch (e) {
                        alert(`Lỗi thực thi G-code: ${e.message}`);
                    }
                }
            });
        }

        // 1. Nút 🛑 Dừng & Về gốc ban đầu trước khi vẽ (Image)
        if (btnStopHomeStart) {
            btnStopHomeStart.addEventListener('click', async () => {
                if (imageSimAnimationId) {
                    cancelAnimationFrame(imageSimAnimationId);
                    imageSimAnimationId = null;
                }
                simIsRunning = false;
                simHeadPos = { x: imageStartOffset.x, y: imageStartOffset.y };
                drawCanvas();

                const mode = modeSelect?.value || 'servo';
                const penModeVal = mode === 'servo' ? 'spindle-pwm' : 'z-axis';

                try {
                    const res = await fetch('/cncapi/v1/motion/stop-and-return', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            target_x: imageStartOffset.x,
                            target_y: imageStartOffset.y,
                            z_safe: 2.0,
                            pen_mode: penModeVal
                        })
                    });
                    const data = await res.json();
                    if (data.status === 'success') {
                        appendConsoleLog(`[GCODE IMAGE] Đã phát lệnh Dừng khẩn cấp, nhấc dao & di chuyển về gốc ban đầu trước khi vẽ (X=${imageStartOffset.x.toFixed(2)}, Y=${imageStartOffset.y.toFixed(2)})`, 'warning');
                        if (infoBox) infoBox.innerText = `🛑 Đã dừng & Về gốc ban đầu (${imageStartOffset.x.toFixed(1)}, ${imageStartOffset.y.toFixed(1)})!`;
                    }
                } catch (e) {
                    alert(`Lỗi thực hiện dừng & về gốc ban đầu: ${e.message}`);
                }
            });
        }

        // 2. Nút 🏠 Dừng & Về gốc WPos (0,0) (Image)
        if (btnStopHomeOrigin) {
            btnStopHomeOrigin.addEventListener('click', async () => {
                if (imageSimAnimationId) {
                    cancelAnimationFrame(imageSimAnimationId);
                    imageSimAnimationId = null;
                }
                simIsRunning = false;
                simHeadPos = { x: 0, y: 0 };
                drawCanvas();

                const mode = modeSelect?.value || 'servo';
                const penModeVal = mode === 'servo' ? 'spindle-pwm' : 'z-axis';

                try {
                    const res = await fetch('/cncapi/v1/motion/stop-and-return', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            target_x: 0.0,
                            target_y: 0.0,
                            z_safe: 2.0,
                            pen_mode: penModeVal
                        })
                    });
                    const data = await res.json();
                    if (data.status === 'success') {
                        appendConsoleLog('[GCODE IMAGE] Đã phát lệnh Dừng khẩn cấp, nhấc dao & di chuyển về gốc tọa độ làm việc (X0, Y0)', 'info');
                        if (infoBox) infoBox.innerText = '🏠 Đã dừng & Về gốc WPos (0,0)!';
                    }
                } catch (e) {
                    alert(`Lỗi thực hiện dừng & về gốc WPos: ${e.message}`);
                }
            });
        }

        // Nút Tải file .gcode
        if (btnDownload) {
            btnDownload.addEventListener('click', () => {
                if (!imageGcode) return;
                const blob = new Blob([imageGcode], { type: 'text/plain;charset=utf-8' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                const filename = (currentImageFile ? currentImageFile.name : 'image').replace(/\.[^/.]+$/, '');
                a.download = `gcode_image_${filename}.gcode`;
                a.click();
            });
        }

        // Nút Lưu Project JSON
        if (btnSaveProject) {
            btnSaveProject.addEventListener('click', () => {
                if (!imageGcode && !currentImageBase64) {
                    alert('Chưa có dữ liệu project để lưu!');
                    return;
                }
                const projectData = {
                    version: '1.0',
                    timestamp: Date.now(),
                    filename: currentImageFile ? currentImageFile.name : 'image.png',
                    image_base64: currentImageBase64,
                    settings: {
                        scale_factor: parseFloat(scaleInput?.value || '0.1'),
                        feed_rate: parseInt(feedRateInput?.value || '2000'),
                        mode: modeSelect?.value || 'servo',
                        algorithm: algoSelect?.value || 'sketch'
                    },
                    gcode: imageGcode,
                    segments: imageSegments
                };
                const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `project_${Date.now()}.json`;
                a.click();
            });
        }

        // Nút Nạp Project JSON
        if (btnLoadProject && projectFileInput) {
            btnLoadProject.addEventListener('click', () => {
                projectFileInput.click();
            });

            projectFileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                    try {
                        const data = JSON.parse(evt.target.result);
                        if (data.image_base64) {
                            currentImageBase64 = data.image_base64;
                            if (previewImg) {
                                previewImg.src = currentImageBase64;
                                previewImg.style.display = 'block';
                            }
                        }
                        if (data.settings) {
                            if (scaleInput) scaleInput.value = data.settings.scale_factor || 0.1;
                            if (feedRateInput) feedRateInput.value = data.settings.feed_rate || 2000;
                            if (modeSelect) modeSelect.value = data.settings.mode || 'servo';
                            if (algoSelect) algoSelect.value = data.settings.algorithm || 'sketch';
                        }
                        if (data.gcode) imageGcode = data.gcode;
                        if (data.segments) imageSegments = data.segments;

                        const curWpos = telemetry.wpos || [0, 0, 0];
                        imageStartOffset = { x: curWpos[0], y: curWpos[1] };

                        if (infoBox) {
                            infoBox.innerText = `Đã nạp Project! Phân đoạn: ${imageSegments.length} | Dòng G-code: ${imageGcode.split('\n').length}`;
                        }
                        drawCanvas();
                    } catch (ex) {
                        alert('Lỗi nạp file JSON project: ' + ex.message);
                    }
                };
                reader.readAsText(file);
            });
        }
    }

    function simulateImageDrawAnimation() {
        if (!imageSegments || imageSegments.length === 0) return;
        if (imageSimAnimationId) cancelAnimationFrame(imageSimAnimationId);

        let flatPoints = [];
        imageSegments.forEach(seg => {
            flatPoints.push({ x: seg.x1 + imageStartOffset.x, y: seg.y1 + imageStartOffset.y });
            flatPoints.push({ x: seg.x2 + imageStartOffset.x, y: seg.y2 + imageStartOffset.y });
        });

        let pointIdx = 0;
        simIsRunning = true;

        function animateStep() {
            if (pointIdx < flatPoints.length) {
                simHeadPos = { x: flatPoints[pointIdx].x, y: flatPoints[pointIdx].y };
                drawCanvas();
                pointIdx++;
                imageSimAnimationId = requestAnimationFrame(() => {
                    setTimeout(animateStep, 10);
                });
            } else {
                simIsRunning = false;
                imageSimAnimationId = null;
                drawCanvas();
            }
        }
        animateStep();
    }

})();

