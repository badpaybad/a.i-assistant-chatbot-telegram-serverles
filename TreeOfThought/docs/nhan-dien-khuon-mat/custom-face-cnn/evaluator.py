import os
import sys
import csv
from datetime import datetime

# Nạp cấu hình Gemini từ config_dunp ở thư mục cha
sys.path.append("/work/a.i-assistant-chatbot-telegram-serverles")
try:
    from config_dunp import GEMINI_APIKEY, GEMINI_MODEL
except ImportError:
    GEMINI_APIKEY = None
    GEMINI_MODEL = "gemini-2.5-flash"

def evaluate_epoch(epoch, epochs, csv_path="train_log.csv", eval_txt_path="train_evaluations.txt", freeze_epochs=0):
    """
    Đọc lịch sử huấn luyện từ CSV, gọi Gemini API đánh giá và lưu kết quả.
    freeze_epochs: số epoch warmup mà backbone bị freeze – Gemini sẽ không được gọi trong giai đoạn này.
    """
    if not os.path.exists(csv_path):
        print(f"⚠️ Cảnh báo: Không tìm thấy file {csv_path} để đánh giá.")
        return
        
    epoch_history = []
    
    # 1. Đọc dữ liệu từ file CSV để lấy lịch sử
    try:
        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            epoch_data = {}
            for row in reader:
                phase = row.get("phase")
                ep_val = row.get("epoch")
                if not ep_val:
                    continue
                ep_num = int(ep_val)
                
                if phase in ("train_epoch", "val_epoch"):
                    if ep_num not in epoch_data:
                        epoch_data[ep_num] = {}
                    loss_val = float(row.get("loss", 0.0))
                    acc_val = float(row.get("accuracy", 0.0))
                    if phase == "train_epoch":
                        epoch_data[ep_num]["train_loss"] = loss_val
                        epoch_data[ep_num]["train_acc"] = acc_val
                    elif phase == "val_epoch":
                        epoch_data[ep_num]["val_loss"] = loss_val
                        epoch_data[ep_num]["val_acc"] = acc_val

            sorted_epochs = sorted(epoch_data.keys())
            for ep in sorted_epochs:
                data_dict = epoch_data[ep]
                epoch_history.append({
                    "epoch": ep,
                    "train_loss": data_dict.get("train_loss", 0.0),
                    "val_loss": data_dict.get("val_loss", 0.0),
                    "train_acc": data_dict.get("train_acc", 0.0),
                    "val_acc": data_dict.get("val_acc", 0.0)
                })
    except Exception as e:
        print(f"⚠️ Cảnh báo: Lỗi khi đọc file CSV log: {e}")
        return

    # Lấy thông số của epoch hiện tại
    current_stats = None
    for h in epoch_history:
        if h["epoch"] == epoch:
            current_stats = h
            break
            
    if not current_stats:
        print(f"⚠️ Cảnh báo: Không tìm thấy thông số của Epoch {epoch} trong CSV.")
        return

    epoch_train_loss = current_stats["train_loss"]
    epoch_val_loss = current_stats["val_loss"]
    epoch_train_acc = current_stats["train_acc"]
    epoch_val_acc = current_stats["val_acc"]

    # -------------------------------------------------------------------------
    # Nếu đang trong giai đoạn freeze warmup: Bỏ qua Gemini API
    # (Train Acc = 0% là bình thường khi backbone bị freeze, không phải lỗi)
    # -------------------------------------------------------------------------
    if freeze_epochs > 0 and epoch <= freeze_epochs:
        warmup_note = (
            f"[⏸️ WARMUP] Backbone đang bị freeze (epoch {epoch}/{freeze_epochs}). "
            f"Train Acc = {epoch_train_acc:.2f}% là bình thường trong giai đoạn này. "
            f"Gemini sẽ được gọi đánh giá sau khi unfreeze (từ epoch {freeze_epochs + 1})."
        )
        print(f"[GEMINI_EVAL] Epoch: {epoch} | Đánh giá: {warmup_note}")
        sys.stdout.flush()
        try:
            now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            with open(eval_txt_path, "a", encoding="utf-8") as f:
                f.write(f"=== Epoch {epoch} ({now_str}) ===\n")
                f.write(f"Train Loss: {epoch_train_loss:.4f} | Val Loss: {epoch_val_loss:.4f}\n")
                f.write(f"Train Acc: {epoch_train_acc:.2f}% | Val Acc: {epoch_val_acc:.2f}%\n")
                f.write(f"Đánh giá: {warmup_note}\n\n")
        except Exception:
            pass
        return  # Dừng tại đây, không gọi Gemini

    gemini_eval = "Chưa có đánh giá."
    if GEMINI_APIKEY:
        try:
            import requests
            # Chỉ đưa vào lịch sử SAU giai đoạn freeze để tránh Gemini thấy acc=0% gây hiểu lầm
            post_freeze_history = [h for h in epoch_history if h["epoch"] > freeze_epochs]
            hist_lines = []
            for h in post_freeze_history[-10:]:
                hist_lines.append(f"Epoch {h['epoch']}: Train Loss={h['train_loss']:.4f}, Val Loss={h['val_loss']:.4f}, Train Acc={h['train_acc']:.2f}%, Val Acc={h['val_acc']:.2f}%")
            history_str = "\n".join(hist_lines) if hist_lines else "(Chưa có lịch sử sau freeze)"

            # Thêm cảnh báo ngữ cảnh về freeze cho Gemini hiểu
            freeze_context = ""
            if freeze_epochs > 0:
                freeze_context = (
                    f"Lưu ý: {freeze_epochs} epoch đầu tiên (đã qua rồi) là giai đoạn WARMUP – backbone bị freeze nên "
                    f"Train Acc = 0% là BÌNH THƯỜNG. Hãy chỉ đánh giá dựa vào dữ liệu từ epoch {freeze_epochs + 1} trở đi.\n\n"
                )

            prompt = (
                f"{freeze_context}"
                f"Bạn là chuyên gia Deep Learning. Hãy đánh giá ngắn gọn (3-4 câu) quá trình huấn luyện mô hình nhận diện khuôn mặt.\n"
                f"Thông số hiện tại (Epoch {epoch}/{epochs}):\n"
                f"- Train Loss: {epoch_train_loss:.4f}\n"
                f"- Val Loss: {epoch_val_loss:.4f}\n"
                f"- Train Acc: {epoch_train_acc:.2f}%\n"
                f"- Val Acc: {epoch_val_acc:.2f}%\n\n"
                f"Lịch sử các epoch sau freeze:\n{history_str}\n\n"
                f"Hãy đưa ra nhận định về độ hội tụ, hiện tượng quá khớp (overfitting) và lời khuyên (nếu có)."
            )
            
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_APIKEY}"
            headers = {"Content-Type": "application/json"}
            payload = {
                "contents": [{
                    "parts": [{"text": prompt}]
                }]
            }
            
            res = requests.post(url, headers=headers, json=payload, timeout=10)
            if res.status_code == 200:
                res_json = res.json()
                gemini_eval = res_json['candidates'][0]['content']['parts'][0]['text']
            else:
                gemini_eval = f"Lỗi Gemini API (Status code: {res.status_code})"
        except Exception as e:
            gemini_eval = f"Lỗi kết nối Gemini API: {str(e)}"
    else:
        gemini_eval = "Không tìm thấy GEMINI_APIKEY trong config_dunp.py"
        
    # In ra console dạng đặc biệt
    print(f"[GEMINI_EVAL] Epoch: {epoch} | Đánh giá: {gemini_eval}")
    sys.stdout.flush()
    
    # Đồng thời ghi vào train.log thông qua console output
    try:
        with open("train.log", "a", encoding="utf-8") as f:
            f.write(f"[GEMINI_EVAL] Epoch: {epoch} | Đánh giá: {gemini_eval}\n")
    except Exception:
        pass

    # Ghi đánh giá xuống tệp tin riêng biệt để đọc lại sau này
    try:
        now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(eval_txt_path, "a", encoding="utf-8") as f:
            f.write(f"=== Epoch {epoch} ({now_str}) ===\n")
            f.write(f"Train Loss: {epoch_train_loss:.4f} | Val Loss: {epoch_val_loss:.4f}\n")
            f.write(f"Train Acc: {epoch_train_acc:.2f}% | Val Acc: {epoch_val_acc:.2f}%\n")
            f.write(f"Đánh giá: {gemini_eval}\n\n")
    except Exception as e:
        print(f"⚠️ Cảnh báo: Lỗi khi ghi file evaluations: {e}")

if __name__ == '__main__':
    # Hỗ trợ chạy trực tiếp như command-line script nếu cần
    import argparse
    parser = argparse.ArgumentParser(description="Gemini Deep Learning Training Evaluator")
    parser.add_argument("--epoch", type=int, required=True, help="Current epoch")
    parser.add_argument("--epochs", type=int, required=True, help="Total epochs")
    parser.add_argument("--csv", type=str, default="train_log.csv", help="Path to csv training log")
    parser.add_argument("--txt", type=str, default="train_evaluations.txt", help="Path to evaluations txt file")
    args = parser.parse_args()
    
    evaluate_epoch(args.epoch, args.epochs, args.csv, args.txt)
