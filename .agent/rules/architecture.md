---
trigger: always_on
---

---
name: architecture-rules
description: Các quy tắc về kiến trúc hệ thống và cấu trúc folder.
---

# Cấu trúc thư mục của source code

folder gốc là folder chứa file program.py

```
/program.py
/data # chứa database và các file dữ liệu khi chạy thật, không được sửa file trong thư mục này
/test # chứa các file sinh ra tự động theo planing của AI 
```
# Test Generation Rules

Khi AI tự lên plan để test thì cần tuân theo các quy tắc sau:

## Quy tắc sinh file để test

- Các file sinh ra test cần **bắt buộc** nằm trong folder test
- Tên file sinh ra để test là **bắt buộc** phải có dạng test_{tên module class và hàm cần test}.py
- Các file sinh ra để lưu kết quả test hoặc file phục vụ làm data cho test **bắt buộc** nằm trong folder test 
- Ví du: có file cần test knowledgebase/dbconnect.py để test hàm inserts thì cần sinh ra /test/test_dbconnect_SQLiteDB_inserts.py. 
- Không xóa file sinh ra để test nhằm phục vụ chạy test cho tương lai khi cần

## Cấu hình tham số (Arguments)
- Mọi script test khi thực thi qua command line **bắt buộc** phải đi kèm tham số cấu hình: `config_dunp`.
- **Cấu trúc lệnh mẫu:** `python <path_to_test_file_tính từ gốc> config_dunp`
Ví dụ: `python test/test_dbconnect_SQLiteDB_inserts.py config_dunp`