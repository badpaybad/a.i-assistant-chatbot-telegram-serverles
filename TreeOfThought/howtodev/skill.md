Khi phát triển 1 nghiệp vụ mới cần tuân thủ các bước sau:
1. Tạo subfolder: {tên nghiệp vụ} trong TreeOfThought/docs  
2. Tạo yeucau.md trong subfolder vừa tạo 
3. khi có yeucau.md tuân thủ hướng dẫn chung ở TreeOfThought/readme.md
    - Người dùng sẽ nhập yêu cầu vào yeucau.md
    - Yêu cầu AI đọc yeucau.md và suy nghĩ viết giải pháp cách làm vào phattrien.md
    - nếu có thay đổi cần thêm vào yeucau.md và yêu cầu AI suy nghĩ viết giải pháp cách làm vào phattrien.md
4. code BE: 
    - tham khảo các base ở TreeOfThought/backend/yeucau.md
    - tự động tạo project c# {tên nghiệp vụ} vào trong folder TreeOfThought/backend
5. code FE
    - tham khảo các base ở TreeOfThought/frontend/yeucau.md
    - tự động tạo folder {tên nghiệp vụ} vào trong folder TreeOfThought/frontend/web/src/modules

**chú ý** đọc kỹ và tôi muốn dựa vào đó để tạo skill tên: new-feature, khi người dùng muốn tạo chức năng nghiệp vụ mới cần tag tên skill rồi ghi tên nghiệp vụ ở chat box. sau đó người dùng mở yeucau.md của nghiệp vụ đó và bắt đầu mô tả yêu cầu nghiệp vụ. và tuân thủ các bước đã mô tả ở trên để tạo chức năng. nếu như có gì sai sót thì user sẽ mở yeucau.md để chỉnh sửa lại.