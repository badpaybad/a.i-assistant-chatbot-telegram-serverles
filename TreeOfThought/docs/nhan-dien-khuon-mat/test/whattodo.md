Folder làm việc là TreeOfThought/docs/nhan-dien-khuon-mat/test tạo project c# để kiểm tra file .onnx được fine tune với onnx trained 
Ảnh dùng để nhận dạng và so sánh khuôn mặt:
    ảnh gốc: TreeOfThought/backend/Core.Web.Api/aimodels/11.jpg
    các ảnh cần test: [TreeOfThought/backend/Core.Web.Api/aimodels/1.jpg,TreeOfThought/backend/Core.Web.Api/aimodels/2026-07-17_09-42.png, TreeOfThought/backend/Core.Web.Api/aimodels/du1.jpeg,TreeOfThought/backend/Core.Web.Api/aimodels/IMG_20230110_141005_504.jpg]

dùng TreeOfThought/backend/onnx-computer-vision/Services/InsightFaceSkiaService.cs ở project TreeOfThought/backend/onnx-computer-vision/Core.Infra.OnnxComputerVision.csproj và model ở TreeOfThought/backend/Core.Web.Api/aimodels để nhận dạng và so sánh khuôn mặt 

    model onnx trained dùng để lấy face embeding TreeOfThought/backend/Core.Web.Api/aimodels/weights/models/updated_resnet100.onnx 
        detect và so sánh ảnh gốc với các ảnh test cần ghi ra file updated_resnet100.onnx.csv kết quả so sánh 

    model onnx finetune dùng để lấy face embeding TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/arcface_model_best.onnx
        detect và so sánh ảnh gốc với các ảnh test cần ghi ra file arcface_model_best.onnx.csv kết quả so sánh 

Tạo thêm resultsidebyside.csv để đưa kết quả updated_resnet100.onnx.csv và file arcface_model_best.onnx.csv vào 1 chỗ
    image gốc, image test, similarity của model updated_resnet100.onnx, similarity của model arcface_model_best.onnx , đánh giá finetune model arcface_model_best.onnx 
        đánh giá 
            ảnh sai TreeOfThought/backend/Core.Web.Api/aimodels/2026-07-17_09-42.png so với ảnh gốc không cùng 1 người. nếu similarity cao tức là quá trình finetune có vấn đề cần xem thêm TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/main.py để suggest 
            nếu mà similarity lớn hơn (similarity của model updated_resnet100.onnx) và (similarity của model arcface_model_best.onnx) có giá trị thấp có nghĩa là finetune cho kết quả tốt 
            có thể đọc thêm log finetune để đưa ra nhận xét TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/training_log_test.csv
