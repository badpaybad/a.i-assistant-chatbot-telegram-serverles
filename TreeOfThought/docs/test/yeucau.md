modeule test 
xem file TreeOfThought/frontend/web/yeucau.md

folder FE: TreeOfThought/frontend/web/src/app/modules/test

## Test CKEditor Shared Component
- Truy cập `/modules/test/editor`
- Kiểm tra hiển thị CKEditor 5
- Kiểm tra các chức năng cơ bản (bold, italic, list, table)
- Kiểm tra upload ảnh:
    - Kéo thả ảnh vào editor
    - Chọn ảnh từ máy tính (nếu có plugin insertImage)
    - Kiểm tra ảnh hiển thị trong editor và có URL từ Google Cloud Storage
- Kiểm tra Plugin "Chèn từ Files":
    - Click nút "Chèn từ Files" trên toolbar
    - Tìm kiếm file trong modal
    - Chọn file ảnh -> hiển thị dạng ảnh trong editor
    - Chọn file khác -> hiển thị dạng link kèm tên file
- Kiểm tra Media Embed:
    - Chèn link YouTube và kiểm tra video được nhúng thành công