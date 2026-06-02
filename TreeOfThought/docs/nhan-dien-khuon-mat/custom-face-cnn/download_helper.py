import os
import sys
import zipfile
import urllib.request
import shutil

# Đường dẫn thư mục làm việc
WORKSPACE_DIR = "/work/a.i-assistant-chatbot-telegram-serverles"
DATARAW_DIR = os.path.join(WORKSPACE_DIR, "TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/dataraw")
TEMP_DOWNLOAD_DIR = "./temp_downloads"

def flush_print(msg):
    print(msg)
    sys.stdout.flush()

def setup_dirs():
    os.makedirs(DATARAW_DIR, exist_ok=True)
    os.makedirs(TEMP_DOWNLOAD_DIR, exist_ok=True)

# =====================================================================
# 1. TỰ ĐỘNG TẢI & TÍCH HỢP FG-NET (Độ tuổi)
# =====================================================================
def download_fgnet():
    flush_print("\n🚀 [1/3] Đang tiến hành tải tập dữ liệu FG-NET (Độ tuổi)...")
    fgnet_url = "http://yanweifu.github.io/FG_NET_data/FGNET.zip"
    zip_path = os.path.join(TEMP_DOWNLOAD_DIR, "fgnet.zip")
    extract_path = os.path.join(TEMP_DOWNLOAD_DIR, "fgnet_extracted")
    
    try:
        if not os.path.exists(zip_path):
            flush_print(f"📥 Đang tải FG-NET từ: {fgnet_url}...")
            urllib.request.urlretrieve(fgnet_url, zip_path)
            flush_print("✅ Tải thành công fgnet.zip!")
        else:
            flush_print("💡 Đã tìm thấy tệp fgnet.zip trong bộ nhớ đệm.")

        flush_print("🔄 Đang giải nén và cấu trúc lại FG-NET...")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_path)

        # FG-NET có dạng các ảnh chứa mã ID ở đầu tên file, ví dụ: 001A02.JPG (Người 001, Tuổi 02)
        # Chúng ta cần nhóm các ảnh của cùng một ID vào folder tương ứng
        images_dir = os.path.join(extract_path, "images")
        if not os.path.exists(images_dir):
            nested_dir = os.path.join(extract_path, "FGNET", "images")
            if os.path.exists(nested_dir):
                images_dir = nested_dir
            else:
                images_dir = extract_path # Dự phòng cấu trúc zip phẳng

        moved_count = 0
        for f in os.listdir(images_dir):
            if f.lower().endswith(('.jpg', '.jpeg', '.png')):
                # Lấy 3 chữ số đầu tiên làm ID danh tính (ví dụ: '001')
                uid = f[:3]
                if uid.isdigit():
                    user_folder = os.path.join(DATARAW_DIR, f"fgnet_{uid}")
                    os.makedirs(user_folder, exist_ok=True)
                    shutil.copy2(os.path.join(images_dir, f), os.path.join(user_folder, f))
                    moved_count += 1

        flush_print(f"🎉 Hoàn thành FG-NET! Đã cấu trúc và sao chép {moved_count} ảnh vào '{DATARAW_DIR}'.")
        return True
    except Exception as e:
        flush_print(f"❌ Lỗi khi tải/cấu trúc FG-NET: {e}")
        return False

# =====================================================================
# 2. HƯỚNG DẪN TẢI CASIA-WebFace & CACD QUA KAGGLE API
# =====================================================================
def print_kaggle_instructions():
    flush_print("\n💡 [2/3] Hướng dẫn tải CASIA-WebFace & CACD thông qua Kaggle API:")
    flush_print("----------------------------------------------------------------------")
    flush_print("Các tập dữ liệu này rất lớn (~20GB) và được lưu trữ trên Kaggle.")
    flush_print("Nếu bạn có tài khoản Kaggle, hãy thực hiện các bước sau:")
    flush_print("1. Tải file token 'kaggle.json' từ trang Profile -> Account -> Create New API Token của bạn.")
    flush_print("2. Chạy các lệnh sau trong terminal để tải:")
    flush_print("   $ pip install kaggle")
    flush_print("   $ mkdir -p ~/.kaggle && cp kaggle.json ~/.kaggle/ && chmod 600 ~/.kaggle/kaggle.json")
    flush_print("\n3. Thực hiện tải xuống:")
    flush_print(f"   # Tải CASIA-WebFace:")
    flush_print(f"   $ kaggle datasets download -d sushilyu/casia-webface -p {TEMP_DOWNLOAD_DIR}")
    flush_print(f"   # Tải CACD-Dataset:")
    flush_print(f"   $ kaggle datasets download -d luan0408/cacd-dataset -p {TEMP_DOWNLOAD_DIR}")
    flush_print("\n4. Sau khi tải xong các file `.zip`, hãy chạy script này lần nữa hoặc chạy:")
    flush_print("   $ python download_helper.py --unpack")
    flush_print("----------------------------------------------------------------------")

# =====================================================================
# 3. GIẢI NÉN & CẤU TRÚC LẠI CASIA-WebFace & CACD NẾU CÓ ZIP TẢI VỀ
# =====================================================================
def unpack_downloads():
    setup_dirs()
    flush_print("\n🔄 Đang kiểm tra các file `.zip` đã tải trong thư mục tạm...")
    
    # Kiểm tra CASIA-WebFace
    casia_zip = os.path.join(TEMP_DOWNLOAD_DIR, "casia-webface.zip")
    if os.path.exists(casia_zip):
        flush_print("📦 Phát hiện casia-webface.zip! Đang giải nén và di chuyển...")
        extract_path = os.path.join(TEMP_DOWNLOAD_DIR, "casia_extracted")
        with zipfile.ZipFile(casia_zip, 'r') as zip_ref:
            zip_ref.extractall(extract_path)
            
        # Tìm thư mục con chứa các thư mục con ID của CASIA
        # Thông thường cấu trúc giải nén sẽ có folder 'CASIA-WebFace' hoặc phẳng
        target_src = extract_path
        for r, d, fs in os.walk(extract_path):
            if any(name.isdigit() for name in d):
                target_src = r
                break
                
        # Di chuyển các thư mục ID vào dataraw
        moved = 0
        for d in os.listdir(target_src):
            src_dir = os.path.join(target_src, d)
            if os.path.isdir(src_dir) and d.isdigit():
                dest_dir = os.path.join(DATARAW_DIR, f"casia_{d}")
                if os.path.exists(dest_dir):
                    shutil.rmtree(dest_dir)
                shutil.move(src_dir, dest_dir)
                moved += 1
        flush_print(f"✅ Đã cấu trúc và di chuyển {moved} danh tính CASIA-WebFace vào dataraw!")
        os.remove(casia_zip)
        shutil.rmtree(extract_path, ignore_errors=True)

    # Kiểm tra CACD
    cacd_zip = os.path.join(TEMP_DOWNLOAD_DIR, "cacd-dataset.zip")
    if os.path.exists(cacd_zip):
        flush_print("📦 Phát hiện cacd-dataset.zip! Đang giải nén và cấu trúc...")
        extract_path = os.path.join(TEMP_DOWNLOAD_DIR, "cacd_extracted")
        with zipfile.ZipFile(cacd_zip, 'r') as zip_ref:
            zip_ref.extractall(extract_path)
            
        # CACD có dạng tên file: age_id_name.jpg (Ví dụ: 16_0001_Jack.jpg)
        # Chúng ta cần nhóm theo ID
        target_src = extract_path
        for r, d, fs in os.walk(extract_path):
            if any('_' in f for f in fs if f.lower().endswith(('.jpg', '.png'))):
                target_src = r
                break
                
        moved_count = 0
        for f in os.listdir(target_src):
            if f.lower().endswith(('.jpg', '.jpeg', '.png')) and '_' in f:
                parts = f.split('_')
                if len(parts) >= 2:
                    uid = parts[1] # Mã ID độc bản của người đó
                    user_folder = os.path.join(DATARAW_DIR, f"cacd_{uid}")
                    os.makedirs(user_folder, exist_ok=True)
                    shutil.copy2(os.path.join(target_src, f), os.path.join(user_folder, f))
                    moved_count += 1
                    
        flush_print(f"✅ Đã cấu trúc và di chuyển {moved_count} ảnh CACD vào dataraw!")
        os.remove(cacd_zip)
        shutil.rmtree(extract_path, ignore_errors=True)

    flush_print("\n🧹 Xong! Thư mục dataraw hiện tại đang chứa:")
    identities = [d for d in os.listdir(DATARAW_DIR) if os.path.isdir(os.path.join(DATARAW_DIR, d))]
    flush_print(f"👉 Tổng cộng: {len(identities)} đối tượng danh tính.")

# =====================================================================
# 4. HƯỚNG DẪN TẢI ND-Twins Dataset
# =====================================================================
def print_ndtwins_instructions():
    flush_print("\n🎓 [3/3] Hướng dẫn đăng ký & tải ND-Twins Dataset (Sinh đôi):")
    flush_print("----------------------------------------------------------------------")
    flush_print("Tập dữ liệu sinh đôi ND-Twins được quản lý nghiêm ngặt bởi Đại học Notre Dame.")
    flush_print("Để có link tải và mật khẩu giải nén, bạn hãy thực hiện:")
    flush_print("1. Truy cập trang web: https://cvrl.nd.edu/projects/data/")
    flush_print("2. Đăng ký thông tin học thuật / nghiên cứu (academic request form).")
    flush_print("3. Nhận link tải qua Email của trường Đại học Notre Dame cấp.")
    flush_print("4. Khi tải về, hãy giải nén và gom ảnh của từng người sinh đôi vào thư mục riêng.")
    flush_print("   Ví dụ: `/dataraw/twin_A_001/` và `/dataraw/twin_B_001/`")
    flush_print("----------------------------------------------------------------------")

if __name__ == "__main__":
    setup_dirs()
    if len(sys.argv) > 1 and sys.argv[1] == "--unpack":
        unpack_downloads()
    else:
        # Bước 1: Tải ngay FG-NET (vì nó miễn phí và nhỏ gọn)
        download_fgnet()
        # Bước 2: Hướng dẫn tải CASIA & CACD
        print_kaggle_instructions()
        # Bước 3: Hướng dẫn tải ND-Twins
        print_ndtwins_instructions()
        
        # Thử unpack luôn phòng trường hợp zip đã có sẵn trong temp
        unpack_downloads()
