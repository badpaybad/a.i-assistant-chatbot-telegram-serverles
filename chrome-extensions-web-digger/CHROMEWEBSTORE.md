# Chrome Web Store Publication Meta & Checklist

Tài liệu này chứa toàn bộ thông tin chuẩn bị để xuất bản Extension lên **Chrome Web Store (CWS)**. Bạn có thể sao chép và dán trực tiếp thông tin này vào Cửa hàng Tiện ích của Chrome (Chrome Developer Dashboard).

---

## 1. Thông Tin Cửa Hàng (Store Listing Details)

### Tên Extension (Extension Name)
`Gemini Web Digger - Trợ lý AI Tương tác DOM`

### Tóm tắt ngắn (Short Description)
*Tối đa 150 ký tự. Vui lòng ghi rõ chức năng, tránh các câu mô tả chung chung.*
`Trợ lý AI Gemini hỗ trợ chat, đọc nội dung và trực tiếp tương tác (click nút, điền form) trên website đang mở thông qua Side Panel.`

### Mô tả chi tiết (Detailed Description)
*Mô tả đầy đủ tính năng, đặc sắc và lợi ích mà người dùng sẽ nhận được.*
```markdown
🔮 Gemini Web Digger - Biến trình duyệt của bạn thành một không gian làm việc thông minh được hỗ trợ bởi AI!

Ứng dụng này mang đến một Trợ lý AI thế hệ mới nằm ngay bên phải màn hình (Right Side Panel), sử dụng sức mạnh tối thượng của Google Gemini API để trực tiếp trò chuyện và điều khiển các thành phần trên website mà bạn đang truy cập.

🚀 CÁC TÍNH NĂNG NỔI BẬT:
1. Trò chuyện & Tóm tắt trang web (Read & Summarize): AI sẽ đọc tiêu đề, đường dẫn URL và nội dung văn bản hiển thị trên trang để trả lời bất kỳ câu hỏi nào của bạn chỉ trong vài giây.
2. Điền Form Tự Động (Auto-fill): Bạn có thể yêu cầu AI nhập liệu vào bất kỳ ô tìm kiếm hay biểu mẫu đăng ký phức tạp nào. AI sẽ tự động phân tích và gõ thông tin chính xác.
3. Click Chuột Thông Minh (Smart Click): Ra lệnh cho AI tự động nhấn nút tìm kiếm, click vào liên kết, gửi biểu mẫu hoặc check các ô kiểm.
4. Giao diện Premium: Thiết kế tối giản, hỗ trợ Glassmorphism Dark Mode tuyệt đẹp, cuộn mượt mà và hiển thị trực quan các bước hành động DOM của AI theo thời gian thực.
5. Bảo mật tuyệt đối: Toàn bộ API Key và lịch sử chat của bạn được lưu trữ 100% cục bộ trong thiết bị cá nhân (chrome.storage.local) và được gửi trực tiếp đến API chính chủ Google Gemini, hoàn toàn không qua bất kỳ máy chủ trung gian nào.

🛠️ HƯỚNG DẪN BẮT ĐẦU:
1. Mở Cấu hình (⚙️) ở góc trên cùng của Sidebar.
2. Nhập API Key Gemini của bạn (Tải miễn phí tại Google AI Studio).
3. Chọn hoặc nhập mô hình ưa thích (mặc định: gemini-2.5-flash).
4. Bấm "Lưu & Khởi tạo" và bắt đầu trò chuyện!
```

---

## 2. Giải Trình Quyền Hạn (Permissions Justification)

*Đội ngũ kiểm duyệt của Google rất khắt khe đối với các quyền can thiệp sâu. Đây là các lý do viết bằng văn bản Plain-English (và Tiếng Việt) giúp vượt qua kiểm duyệt.*

| Quyền hạn | Lý do giải trình (Bản Tiếng Việt) | Justification (Bản Tiếng Anh) |
| :--- | :--- | :--- |
| **`sidePanel`** | Cho phép hiển thị giao diện chat trợ lý độc lập và lâu dài ở thanh bên phải, không làm che khuất nội dung trang web chính của người dùng. | Used to host the chat assistant UI as a persistent right-side panel without blocking the main viewport of the active web page. |
| **`tabs`** | Cho phép truy vấn URL và tiêu đề của active tab để cung cấp ngữ cảnh duyệt trang khi người dùng yêu cầu AI hỗ trợ. | Used to access the active tab's URL and title to provide page context when the user requests AI analysis of the current site. |
| **`scripting`** | Cho phép tiêm (inject) các đoạn code Javascript động để đọc nội dung DOM hoặc thực thi hành động điền form, click chuột theo yêu cầu của người dùng. | Used to programmatically inject DOM interaction utilities (reading text, clicking buttons, filling input fields) based on direct user commands. |
| **`storage`** | Cho phép lưu trữ và ghi nhớ API Key, cấu hình giới hạn số lượng tin nhắn và lịch sử trò chuyện cục bộ để không cần nhập lại. | Used to securely store user-provided API Keys, configuration settings, and the chat messages history locally within the browser. |
| **`debugger`** | Cho phép kết nối và sử dụng Chrome DevTools Protocol để tương tác trực tiếp với DOM trang web đang mở một cách nhanh chóng và tối ưu nhất (giống như F12 Console). | Used to attach to the active tab via Chrome DevTools Protocol (CDP) to natively interact with the page's DOM (evaluate expressions, trigger events) like F12 Developer Tools. |
| **`<all_urls>`** (Host Permissions) | Cho phép thực thi tiêm script điều khiển DOM trên bất kỳ trang web nào đang hoạt động mà người dùng mong muốn AI hỗ trợ. | Used to allow DOM interaction scripting on arbitrary active web pages that the user explicitly instructs the AI to interact with. |

---

## 3. Tuyên Bố Quyền Riêng Tư & Dữ Liệu (Privacy & Data Use)

### Công bố sử dụng dữ liệu (Data Use Disclosures):
Chúng tôi cam kết tuân thủ chính sách bảo mật dữ liệu của Google CWS:
1. **Không thu thập dữ liệu người dùng:** Tiện ích này không thu thập, theo dõi, lưu trữ trên cloud hoặc chia sẻ bất kỳ thông tin cá nhân, thông tin đăng nhập hoặc lịch sử duyệt web nào của người dùng.
2. **Lưu trữ cục bộ (Local Storage):** API Key và lịch sử hội thoại chỉ được ghi nhớ trên máy tính của người dùng thông qua bộ nhớ cục bộ an toàn (`chrome.storage.local`).
3. **Truyền tải trực tiếp:** Toàn bộ yêu cầu và ngữ cảnh được gửi trực tiếp từ trình duyệt của người dùng đến API của Google Gemini (`https://generativelanguage.googleapis.com`) mà không thông qua bất kỳ server trung gian nào.

---

## 4. Dự Thảo Chính Sách Bảo Mật (Privacy Policy Draft)

*Bạn có thể copy đoạn này và đưa lên GitHub Pages hoặc trang web cá nhân để lấy đường dẫn liên kết bắt buộc khi khai báo trên Dashboard.*

```markdown
# Privacy Policy for Gemini Web Digger

Last updated: May 29, 2026

At Gemini Web Digger, we respect your privacy and are committed to protecting the personal data of our users.

## 1. Information Collection and Use
Gemini Web Digger does NOT collect, track, store, or transmit any personal data, user credentials, browsing history, or analytical data to any server owned by the developers.

All interactions, settings, API Keys, and chat histories are stored strictly locally on your own device using Chrome's secure local storage API (chrome.storage.local).

## 2. API Communication
To function as an AI browser assistant, the extension communicates directly with Google's Gemini API endpoints (https://generativelanguage.googleapis.com). This communication occurs directly from your browser to Google, with no intermediate servers. Your API Key is used solely for authenticating your requests with Google's servers.

For information on how Google manages your data, please refer to Google's Privacy Policy and Google AI Studio Terms of Service.

## 3. Changes to This Privacy Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

## 4. Contact Us
If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at: support@example.com
```

---

## 5. Danh Sách Kiểm Tra Trước Khi Gửi Duyệt (Pre-Publish Checklist)

- [ ] **Tạo chính sách bảo mật:** Đăng tải Dự thảo Chính sách bảo mật ở Mục 4 lên một trang web công khai (ví dụ: GitHub Pages) để có một URL hợp lệ.
- [ ] **Chuẩn bị hình ảnh mô tả (Screenshots):**
  - Chụp ít nhất 1 ảnh chụp màn hình độ phân giải **1280x800** hoặc **640x400**.
  - Nên chụp ảnh Side Panel trượt ra bên cạnh một trang web lớn (như google.com hoặc wikipedia.org) để minh họa rõ tính năng tương tác DOM.
- [ ] **Kiểm tra file code:**
  - Chắc chắn rằng không có file rác như `.git/`, `.env`, `CHROMEWEBSTORE.md`, `whattodo.md`, hoặc `howtodo.md` lọt vào file zip đóng gói.
  - Các file icon trong thư mục `icons/` phải tồn tại thực tế và có kích thước chính xác (16x16px, 48x48px, 128x128px) nếu bạn khai báo chúng trong `manifest.json`.
- [ ] **Cách nén file ZIP nộp duyệt:**
  Chạy lệnh nén zip loại bỏ các file tài liệu trong thư mục dự án:
  ```bash
  zip -r gemini-web-digger.zip . -x "*.git*" "*CHROMEWEBSTORE.md*" "*whattodo.md*" "*howtodo.md*" "*gemini_web_digger.zip*"
  ```
