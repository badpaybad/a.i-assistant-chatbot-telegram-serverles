# Kế hoạch phát triển Skill toan4 (Toán Lớp 4)

## Mục tiêu
Tạo ra một quy trình (skill) tự động nhận diện bài toán lớp 4 từ ảnh chụp, sau đó sinh ra một minigame HTML5 tương tác cho học sinh thực hành và giải bài toán đó, đặt trong một thư mục mang tên của bức ảnh.

## Ý tưởng cốt lõi
1. **Phân tích hình ảnh (Image Analysis / Vision):**
   - Đọc và trích xuất nội dung văn bản, các số liệu, phép tính, và ý nghĩa của bài toán từ bức ảnh mà người dùng cung cấp.
   - Phân loại dạng toán lớp 4 (ví dụ: phân số, chu vi diện tích, toán đố chữ, v.v.).

2. **Thiết kế Game (Game Design):**
   - **Giao diện:** Xây dựng bằng HTML5, CSS với màu sắc tươi sáng, hình ảnh sinh động, phù hợp độ tuổi học sinh lớp 4, gây hứng thú học tập.
   - **Tương tác:** Kéo thả, điền số, chọn đáp án đúng, hoặc click chọn đối tượng.
   - **Gợi ý và Hướng dẫn (Hints & Instructions):** Tích hợp nội dung gợi ý, hướng dẫn chi tiết từng bước để học sinh có thể tự hoàn thành bài tập, đồng thời giải thích rõ ràng ý nghĩa thực tế hoặc bản chất toán học của bài tập đó.
   - **Cơ chế phản hồi học tập (Feedback Mechanism):**
     - *Khi làm sai:* Không báo lỗi một cách tiêu cực. Hệ thống sẽ có nhân vật hoặc hộp thoại đưa ra các "Gợi ý suy nghĩ" (ví dụ: "Con hãy thử đọc kỹ lại xem đề bài hỏi gì nhé?", "Nhớ lại công thức tính diện tích hình chữ nhật nào!").
     - *Khi làm đúng:* Có báo động hiệu ứng chúc mừng sinh động (pháo hoa, âm thanh), khen ngợi ("Giỏi quá!", "Tuyệt vời!") và đặc biệt là gợi ý thêm cách giải thông minh/ngắn gọn hơn nếu có.

3. **Cấu trúc lưu trữ Game:**
   - Mỗi lần thực thi AI nhận được bức ảnh và yêu cầu dùng `skill toan4`, hệ thống sẽ tạo ra một folder mới có tên trùng với tên file bức ảnh (không bao gồm phần mở rộng).
   - Folder này chứa các file `index.html`, `style.css`, và `script.js` cấu thành ứng dụng web hoàn chỉnh, có thể chạy trực tiếp trên trình duyệt.

## Quy trình làm việc của Hệ thống với Skill này
- **Bước 1:** Lấy URL/Path của ảnh truyền vào từ người dùng.
- **Bước 2:** AI phân tích đề toán, lập kịch bản sư phạm cho đề đó (Đâu là đáp án? Đâu là các lỗi dễ mắc? Lời khuyên là gì? Có gợi ý hướng dẫn hoàn thành và giải thích ý nghĩa bài tập không?).
- **Bước 3:** AI sinh mã nguồn HTML/CSS/JS cho game tương ứng với kịch bản sư phạm.
- **Bước 4:** Lưu toàn bộ mã nguồn vào một folder độc lập dành riêng cho minh họa của bức ảnh đó.
- **Bước 5:** Thông báo cho người dùng đường dẫn để mở chơi thử.
