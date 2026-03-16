# Các bước thực thi tạo Game Toán Lớp 4 từ Ảnh (Skill toan4)

Khi được yêu cầu sử dụng `skill toan4` với một hình ảnh đầu vào, hệ thống AI sẽ thực hiện các bước sau:

- [ ] **Task 1: Xử lý và phân tích ảnh đầu vào**
  - Đọc hình ảnh được cung cấp.
  - Phân tích và trích xuất nội dung đề toán lớp 4 (các con số, phép tính, câu hỏi).
  - Trích xuất tên file ảnh (ví dụ: `bai1.png` -> tên bài: `bai1`).

- [ ] **Task 2: Lên kịch bản sư phạm cho bài toán**
  - Xác định dạng toán.
  - Xác định đáp án đúng và các bước giải.
  - Phân tích các lỗi sai phổ biến học sinh hay gặp đối với dạng toán này.
  - Soạn sẵn các "Gợi ý suy nghĩ" cho các lỗi sai.
  - Soạn sẵn lời khen ngợi và cách giải mở rộng khi làm đúng.

- [ ] **Task 3: Thiết kế Giao diện và Trải nghiệm (UI/UX)**
  - Xác định các thành phần của minigame HTML5 (Khu vực đọc đề, Khu vực thao tác tương tác, Nhân vật/Cửa sổ gợi ý).
  - Hình dung CSS animation, màu sắc sinh động, font chữ thân thiện.

- [ ] **Task 4: Viết mã nguồn Game (HTML/CSS/JS)**
  - Sinh file `index.html` với cấu trúc DOM phù hợp.
  - Sinh file `style.css` tập trung vào đồ họa cuốn hút, sống động.
  - Sinh file `script.js` với logic:
    - Đoán nhận thao tác của người dùng.
    - Đối chiếu đáp án.
    - Hiển thị gợi ý nếu sai.
    - Hiển thị chúc mừng (pháo hoa, khen ngợi) và cách giải khác nếu đúng.

- [ ] **Task 5: Tạo Thư mục và Lưu File**
  - Xác định thư mục sẽ lưu game (ví dụ tạo 1 folder con bằng tên ảnh ở một nơi xác định).
  - Lưu các file `index.html`, `style.css`, `script.js` vào thư mục này.

- [ ] **Task 6: Bàn giao**
  - Trả về thông báo thành công và cung cấp đường dẫn để người dùng mở file `index.html` trải nghiệm thử ngay.
