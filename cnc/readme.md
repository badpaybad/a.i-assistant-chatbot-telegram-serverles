# GRBL CNC Web Controller

A premium, web-based control panel for GRBL CNC machines connected via USB. Features real-time state telemetry, interactive jogging, coordinate systems adjustments, G-code uploads, an interactive 2D toolpath canvas visualizer (with panning/zooming), and a real-time console log.

## Features

- **Digital Read Out (DRO)**: Displays real-time WPos coordinates, machine feed rate, spindle speed, and buffer availability.
- **2D Toolpath Canvas**: Automatically parses G-code files on the client and renders cuts (linear/arc feeds in blue) vs rapid relocations (dashed orange). Supports interactive click-and-drag panning and scroll-to-zoom.
- **Interactive Jogger**: High-precision keypad control, custom steps sizes (0.1, 1.0, 10, 100 mm), feed rates controls, homing ($H), and unlock ($X).
- **Console Feed**: Real-time incoming serial data logs and output logs. Supports typing custom G-code directly.
- **Robust Serial Streaming**: Standard GRBL character-counting protocol (using a 127-byte window limit) to avoid buffer stuttering or hardware crashes.

## Quick Start

1. **Activate the Virtual Environment**:
   ```bash
   cd /work/a.i-assistant-chatbot-telegram-serverles
   source venv/bin/activate
   ```

2. **Navigate to the CNC folder & Start the Server**:
   ```bash
   cd cnc
   python3 -m uvicorn main:app --host 0.0.0.0 --port 8088
   ```

3. **Open the Web Interface**:
   Open [http://localhost:8088](http://localhost:8088) in your web browser.

---

## Troubleshooting

### Port Occupied Warning
If `/dev/ttyACM0` is busy (e.g., in use by `LightBurn` or other applications), the web interface will display a clear warning message showing the command name and process ID (PID) holding the port:
```
Port /dev/ttyACM0 is busy. Opened by: LightBurn (PID 15007, User dunp). Please close it and retry.
```

To resolve it, shut down LightBurn (or terminate the process) and click the **Retry/Connect** button on the web interface.
