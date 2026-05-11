***folder làm việc chính cho solution*** TreeOfThought

Dùng làm template để phát triển phần mềm, dựa trên MVC, FE, BE và dùng A.I IDE (vd google antigravity)

Dùng spec driven và chia ra để trị.

nguyên tắc và các yêu cầu cần tuân thủ:
 
                - Chia folder cấp cha con
                - Từng folder cần có yeucau.md và phattrien.md
                    - người viết vào yeucau.md
                    - yêu cầu A.I đọc yeucau.md và suy nghĩ viết giải pháp, cách làm, kế hoạch làm vào phattrien.md
                    - nếu có thay đổi cần thêm vào yeucau.md và yêu cầu A.I suy nghĩ cập nhật giải pháp cách làm, kế hoạch làm vào phattrien.md
                    - đợi người dùng duyệt phattrien.md rồi mới tiến hành làm
                        - lúc duyệt có thể chat trực tiếp hoặc sửa bổ xung cập nhật ở file yeucau.md cho đến khi người dùng duyệt phattrien.md thì hỏi để tiến hành làm

phattrien.md là tài liệu dùng để phát triển code lập trình cần phải suy nghĩ cẩn thận kỹ lưỡng, có thể đưa ra các phương án để người dùng lựa chọn, khi người dùng duyệt phattrien.md rồi mới tiến hành làm

**khi yeucau.md thay đổi bắt buộc cập nhật phattrien.md có thể cần đọc source code được đề cập ở yeucau.md để cập nhật phattrien.md**

**luôn đảm bảo khi có yeucau.md và phatrien.md dù source code có mất vẫn có thể viết lại một cách chính xác theo như mô tả stable và ready to run**

**chú ý khi thực hiện code xong** cần kiểm tra lỗi BE code project .net hãy dùng lệnh dotnet run xem lỗi ở console log và sửa. khi cần kiểm tra lỗi FE cần chạy lênh ng build xem lỗi ở console log và sửa. sau khi chạy xong cần close các process để tránh xung đột port, vd port 5000, 4200 (fuser -k 4200/tcp 5000/tcp). ưu tiên việc viết tài liệu bằng tiếng Việt Nam, kể cả những code sinh ra ở FE, BE là text cần là tiếng Việt trước