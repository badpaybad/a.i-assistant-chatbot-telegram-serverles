import fasttext
import os
import requests
import gzip
import shutil

FASTTEXT_VI_BIN_URL = "https://dl.fbaipublicfiles.com/fasttext/vectors-crawl/cc.vi.300.bin.gz"
FASTTEXT_VI_VEC_URL = "https://dl.fbaipublicfiles.com/fasttext/vectors-crawl/cc.vi.300.vec.gz"

MODEL_DIR = 'fasttext'
BIN_FILE = os.path.join(MODEL_DIR, 'cc.vi.300.bin')
VEC_FILE = os.path.join(MODEL_DIR, 'cc.vi.300.vec')

def download_and_extract(url, target_path):
    gz_path = target_path + ".gz"
    print(f"--- Đang tải {url} ---")
    response = requests.get(url, stream=True, timeout=30)
    if response.status_code == 200:
        with open(gz_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"--- Đang giải nén {gz_path} ---")
        with gzip.open(gz_path, 'rb') as f_in:
            with open(target_path, 'wb') as f_out:
                shutil.copyfileobj(f_in, f_out)
        
        os.remove(gz_path)
        print(f"--- Đã xong: {target_path} ---")
    else:
        print(f"Lỗi khi tải file: {response.status_code}")

def ensure_fasttext_models():
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)
    
    if not os.path.exists(BIN_FILE):
        download_and_extract(FASTTEXT_VI_BIN_URL, BIN_FILE)
    
    if not os.path.exists(VEC_FILE):
        download_and_extract(FASTTEXT_VI_VEC_URL, VEC_FILE)

# Đảm bảo model đã có sẵn trước khi load
ensure_fasttext_models()

# Load model đã tải về máy
model = fasttext.load_model(BIN_FILE)

def embedding_text(text):
    return model.get_sentence_vector(text)
# # Lấy vector cho một câu (FastText tự động trung bình cộng các vector từ)
sentence_vector = model.get_sentence_vector("Nguyễn Phan Du")

print(sentence_vector) # Mặc định sẽ là vector 300 chiều