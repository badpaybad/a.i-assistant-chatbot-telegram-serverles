#!/usr/bin/env python3
import os
import sys
import subprocess
import csv
import argparse
from flask import Flask, jsonify, render_template, request, send_from_directory

app = Flask(__name__)

# Paths
script_dir = os.path.dirname(os.path.abspath(__file__))
workspace_dir = os.path.abspath(os.path.join(script_dir, '..', '..'))
log_path = os.path.join(script_dir, 'train.log')
results_csv_path = os.path.join(script_dir, 'runs', 'detect', 'train', 'results.csv')

# Global process tracking
training_process = None
current_config = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/status', methods=['GET'])
def get_status():
    global training_process
    if training_process is None:
        # Check if previous results exist to determine if it was successful
        if os.path.exists(results_csv_path):
            status = "Idle (Completed)"
        else:
            status = "Idle"
        return jsonify({"status": status, "running": False, "config": current_config})
    
    poll = training_process.poll()
    if poll is None:
        return jsonify({"status": "Training", "running": True, "config": current_config})
    elif poll == 0:
        training_process = None
        return jsonify({"status": "Success", "running": False, "config": current_config})
    else:
        training_process = None
        return jsonify({"status": "Failed", "running": False, "config": current_config})

@app.route('/api/start', methods=['POST'])
def start_training():
    global training_process, current_config
    
    if training_process is not None and training_process.poll() is None:
        return jsonify({"error": "Training is already in progress."}), 400
        
    data = request.json or {}
    epochs = int(data.get('epochs', 10))
    batch = int(data.get('batch', 8))
    imgsz = int(data.get('imgsz', 640))
    model = data.get('model', 'yolov8m.pt')
    device = data.get('device', 'cpu')
    
    script_mode = data.get('scriptMode', 'standard')
    
    # Tiny object specialized parameters
    p2 = data.get('p2', False)
    fl_gamma = float(data.get('fl_gamma', 1.5))
    freeze = int(data.get('freeze', 10))
    optimizer = data.get('optimizer', 'AdamW')
    lr0 = float(data.get('lr0', 0.001))
    box = float(data.get('box', 7.5))
    cls = float(data.get('cls', 1.0))
    dfl = float(data.get('dfl', 1.5))
    mosaic = float(data.get('mosaic', 0.5))
    scale = float(data.get('scale', 0.5))
    
    current_config = {
        "epochs": epochs,
        "batch": batch,
        "imgsz": imgsz,
        "model": model,
        "device": device,
        "scriptMode": script_mode,
        "p2": p2,
        "fl_gamma": fl_gamma,
        "freeze": freeze,
        "optimizer": optimizer,
        "lr0": lr0,
        "box": box,
        "cls": cls,
        "dfl": dfl,
        "mosaic": mosaic,
        "scale": scale
    }
    
    # Paths to config and dataset
    dataset_yaml = os.path.join(script_dir, 'data', 'dataset.yaml')
    
    # Reset log and results files
    if os.path.exists(log_path):
        try:
            os.remove(log_path)
        except Exception as e:
            print(f"Error removing log: {e}")
            
    if os.path.exists(results_csv_path):
        try:
            os.remove(results_csv_path)
        except Exception as e:
            print(f"Error removing results CSV: {e}")
            
    # Subprocess command
    python_bin = os.path.join(workspace_dir, 'venv', 'bin', 'python')
    if not os.path.exists(python_bin):
        python_bin = 'python3' # Fallback
        
    script_file = 'train_yolo_tiny.py' if script_mode == 'tiny' else 'train_yolo.py'
    
    cmd = [
        python_bin,
        '-u', # Unbuffered output
        os.path.join(script_dir, script_file),
        '--data', dataset_yaml,
        '--model', model,
        '--epochs', str(epochs),
        '--batch', str(batch),
        '--imgsz', str(imgsz),
        '--device', device,
        '--name', 'train'  # Always write to 'train' directory so dashboard can monitor it
    ]
    
    if script_mode == 'tiny':
        if p2:
            cmd.append('--p2')
        cmd.extend([
            '--fl-gamma', str(fl_gamma),
            '--freeze', str(freeze),
            '--optimizer', optimizer,
            '--lr0', str(lr0),
            '--box', str(box),
            '--cls', str(cls),
            '--dfl', str(dfl),
            '--mosaic', str(mosaic),
            '--scale', str(scale)
        ])
    
    print(f"Launching command: {' '.join(cmd)}")
    
    try:
        log_file = open(log_path, 'w')
        log_file.write(f"=== Starting YOLO Training ({script_mode} mode): {model} ===\n")
        log_file.flush()
        
        training_process = subprocess.Popen(
            cmd,
            stdout=log_file,
            stderr=subprocess.STDOUT,
            text=True,
            cwd=workspace_dir
        )
        
        log_file.close() # Child process retains the copy of file descriptor
        
        return jsonify({"message": "Training started.", "config": current_config})
    except Exception as e:
        return jsonify({"error": f"Failed to start training: {str(e)}"}), 500

@app.route('/api/stop', methods=['POST'])
def stop_training():
    global training_process
    if training_process is None or training_process.poll() is not None:
        return jsonify({"message": "No training process is running."})
        
    try:
        training_process.terminate()
        try:
            training_process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            training_process.kill()
            training_process.wait()
            
        training_process = None
        # Append termination note to logs
        with open(log_path, 'a') as f:
            f.write("\n=== Training Terminated by User ===\n")
            
        return jsonify({"message": "Training process terminated."})
    except Exception as e:
        return jsonify({"error": f"Failed to stop training: {str(e)}"}), 500

@app.route('/api/logs', methods=['GET'])
def get_logs():
    if not os.path.exists(log_path):
        return jsonify({"logs": "No logs found yet. Start training to generate logs."})
        
    try:
        # Read the last N lines or entire file if small
        with open(log_path, 'r') as f:
            lines = f.readlines()
            # Return last 500 lines
            log_text = "".join(lines[-500:])
        return jsonify({"logs": log_text})
    except Exception as e:
        return jsonify({"error": f"Failed to read logs: {str(e)}"}), 500

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    if not os.path.exists(results_csv_path):
        return jsonify({"metrics": []})
        
    metrics = []
    try:
        with open(results_csv_path, 'r') as f:
            reader = csv.DictReader(f)
            # Clean headers
            reader.fieldnames = [h.strip() for h in reader.fieldnames]
            for row in reader:
                try:
                    metrics.append({
                        "epoch": int(row.get("epoch", 0)),
                        "train_box_loss": float(row.get("train/box_loss", 0)),
                        "train_cls_loss": float(row.get("train/cls_loss", 0)),
                        "val_box_loss": float(row.get("val/box_loss", 0)),
                        "val_cls_loss": float(row.get("val/cls_loss", 0)),
                        "mAP50": float(row.get("metrics/mAP50(B)", 0)),
                        "mAP50_95": float(row.get("metrics/mAP50-95(B)", 0))
                    })
                except ValueError:
                    # Skip rows that are incomplete or corrupt
                    continue
        return jsonify({"metrics": metrics})
    except Exception as e:
        return jsonify({"error": f"Failed to parse CSV: {str(e)}"}), 500

@app.route('/api/runs_files', methods=['GET'])
def get_runs_files():
    target_dir = os.path.join(script_dir, 'runs', 'detect', 'train')
    if not os.path.exists(target_dir):
        return jsonify({"files": []})
        
    files = []
    # Check for known YOLO output files we want to display
    known_files = [
        'results.png',
        'confusion_matrix.png',
        'val_batch0_labels.jpg',
        'val_batch0_pred.jpg',
        'labels.jpg'
    ]
    for kf in known_files:
        if os.path.exists(os.path.join(target_dir, kf)):
            files.append(kf)
            
    return jsonify({"files": files})

@app.route('/runs/<path:filename>')
def serve_runs(filename):
    runs_dir = os.path.join(script_dir, 'runs')
    return send_from_directory(runs_dir, filename)

@app.route('/output/<path:filename>')
def serve_output(filename):
    return send_from_directory(script_dir, filename)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=5000)
    args = parser.parse_args()
    
    # Ensure templates folder exists
    os.makedirs(os.path.join(script_dir, 'templates'), exist_ok=True)
    
    app.run(host='0.0.0.0', port=args.port, debug=True)
