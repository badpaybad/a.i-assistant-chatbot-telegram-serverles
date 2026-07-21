tạo nghiệp vụ mới backend vào folder TreeOfThought/backend cấp api để dùng trong TreeOfThought/backend/Core.Web.Api/Core.Web.Api.csproj 
xem code /work/ekycwebapi/InsightFaceHelper.cs để tham khảo và lấy mode code xử lý về model onnx , cấp các đầu api detect face , extract face embedding, compare face . Không dùng OpenCvSharp4 dùng SkiaSharp để xử lý ảnh , model onnx lấy tại folder /work/ekycwebapi/aimodels

hiện tại chưa cần tạo UI FE chỉ ần api restful, ảnh đưa lên cần dạng post form multipart data 
