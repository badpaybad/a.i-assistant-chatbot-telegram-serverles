// Class Point2D đại diện cho tọa độ điểm 2D
class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Class BBox đại diện cho Bounding Box của khuôn mặt
class BBox {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

// Class FaceRecognitionResult lưu kết quả nhận diện
class FaceRecognitionResult {
    constructor(embedding, boundingBox, alignedFaceImage) {
        this.embedding = embedding; // Float32Array (512-D)
        this.boundingBox = boundingBox; // Instance của BBox
        this.alignedFaceImage = alignedFaceImage; // Uint8Array 112x112x3 RGB
    }
}

// Class FaceRecognizer quản lý mô hình ONNX và xử lý suy luận
class FaceRecognizer {
    constructor() {
        this.session = null;
        this.isInitialized = false;
    }

    // Chỉ mục của 26 landmarks được chọn từ 468 landmarks của MediaPipe FaceMesh
    static landmarkIndices = [
        33, 133, 362, 263, 159, 145, 386, 374, 468, 473, 70, 107, 300, 336, 168, 4, 129, 358, 164, 61, 291, 0, 17, 234, 454, 152
    ];

    /**
     * Khởi tạo phiên suy luận ONNX Runtime Web
     * @param {string} modelPathOrUrl Đường dẫn hoặc URL dẫn tới mô hình .onnx đã train
     */
    async initialize(modelPathOrUrl) {
        if (this.isInitialized) return;
        
        // Nạp phiên ONNX Runtime Web.
        // Yêu cầu nạp thư viện `ort` qua thẻ script hoặc npm package: `onnxruntime-web`
        this.session = await ort.InferenceSession.create(modelPathOrUrl, {
            executionProviders: ['webgl', 'wasm'] // Tự động ưu tiên WebGL/WASM tùy trình duyệt hỗ trợ
        });
        this.isInitialized = true;
    }

    /**
     * Hàm xử lý chính: Nhận mảng byte RGB ảnh thô và 468 landmarks, thực hiện căn chỉnh và trích xuất vector đặc trưng.
     * @param {Uint8Array} originalImageRgb Mảng pixel ảnh gốc dạng flat RGB (width * height * 3)
     * @param {number} width Chiều rộng ảnh gốc
     * @param {number} height Chiều cao ảnh gốc
     * @param {Point2D[]} all468Landmarks Mảng 468 điểm tọa độ từ MediaPipe Face Mesh
     * @returns {Promise<FaceRecognitionResult>}
     */
    async processImage(originalImageRgb, width, height, all468Landmarks) {
        if (!this.isInitialized) {
            throw new Error("FaceRecognizer chưa được khởi tạo. Hãy gọi initialize() trước.");
        }
        if (all468Landmarks.length < 468) {
            throw new Error("Bắt buộc phải truyền đủ 468 landmarks từ MediaPipe Face Mesh.");
        }

        // 1. Tính toán Bounding Box từ 26 landmarks trong hệ tọa độ ảnh gốc (có thêm padding)
        const bbox = this._computeBoundingBox(all468Landmarks, width, height);

        // 2. Trích xuất tâm mắt để căn chỉnh
        const pt33 = all468Landmarks[33];
        const pt133 = all468Landmarks[133];
        const eyeLeft = new Point2D((pt33.x + pt133.x) / 2.0, (pt33.y + pt133.y) / 2.0);

        const pt362 = all468Landmarks[362];
        const pt263 = all468Landmarks[263];
        const eyeRight = new Point2D((pt362.x + pt263.x) / 2.0, (pt362.y + pt263.y) / 2.0);

        // 3. Thực hiện căn chỉnh xoay thẳng khuôn mặt và phóng to/thu nhỏ về khung 112x112
        const { alignedImage, transformedLandmarks } = this.alignFace(originalImageRgb, width, height, eyeLeft, eyeRight, all468Landmarks);

        // 4. Lấy 26 landmarks đã được biến đổi sang hệ tọa độ 112x112
        const landmarks26Aligned = FaceRecognizer.landmarkIndices.map(idx => transformedLandmarks[idx]);

        // 5. Trích xuất vector đặc trưng 512-D L2-Normalized
        return await this.extractEmbeddingFromAligned(alignedImage, landmarks26Aligned, bbox);
    }

    /**
     * Căn chỉnh ảnh dựa trên tâm hai mắt, trả về ảnh 112x112x3 RGB và danh sách landmarks biến đổi.
     */
    alignFace(srcRgb, srcW, srcH, eyeLeft, eyeRight, allLandmarks) {
        const cx = (eyeLeft.x + eyeRight.x) / 2.0;
        const cy = (eyeLeft.y + eyeRight.y) / 2.0;
        const dx = eyeRight.x - eyeLeft.x;
        const dy = eyeRight.y - eyeLeft.y;
        let currentDist = Math.sqrt(dx * dx + dy * dy);
        if (currentDist === 0) currentDist = 1.0;

        const angleRad = Math.atan2(dy, dx);
        const targetDist = 35.2372;
        const scale = targetDist / currentDist;

        // Warp ảnh sử dụng bilinear interpolation
        const alignedImage = this._warpAffineBilinear(srcRgb, srcW, srcH, cx, cy, angleRad, scale);

        // Biến đổi hệ tọa độ landmarks
        const transformedLandmarks = allLandmarks.map(pt => this._transformPoint(pt, cx, cy, angleRad, scale));

        return { alignedImage, transformedLandmarks };
    }

    /**
     * Trích xuất embedding từ ảnh 112x112 đã aligned và 26 landmarks
     */
    async extractEmbeddingFromAligned(alignedFaceRgb, landmarks26Aligned, bbox) {
        // 1. Tiền xử lý các luồng ảnh đầu vào dạng Tensor NCHW [1, 3, H, W]
        const globalTensorData = this._preprocessImage(alignedFaceRgb, 112, 112);
        
        const eyeRgb = this._cropSubRegion(alignedFaceRgb, 20, 76, 0, 112);
        const eyeTensorData = this._preprocessImage(eyeRgb, 56, 112);

        const noseRgb = this._cropSubRegion(alignedFaceRgb, 45, 101, 28, 84);
        const noseTensorData = this._preprocessImage(noseRgb, 56, 56);

        // 2. Tiền xử lý hình học x_geom [1, 26, 2]
        const geomTensorData = this._preprocessGeometry(landmarks26Aligned, 112, 112);

        // 3. Khởi tạo Ort Tensor
        const x_global = new ort.Tensor('float32', globalTensorData, [1, 3, 112, 112]);
        const x_eye = new ort.Tensor('float32', eyeTensorData, [1, 3, 56, 112]);
        const x_nose = new ort.Tensor('float32', noseTensorData, [1, 3, 56, 56]);
        const x_geom = new ort.Tensor('float32', geomTensorData, [1, 26, 2]);

        // 4. Chạy suy luận mô hình
        const inputs = { x_global, x_eye, x_nose, x_geom };
        const outputs = await this.session.run(inputs);
        
        const rawEmbedding = outputs.face_embedding.data; // Float32Array
        const normalized = this._l2Normalize(rawEmbedding);

        return new FaceRecognitionResult(normalized, bbox, alignedFaceRgb);
    }

    _warpAffineBilinear(srcRgb, srcW, srcH, cx, cy, angleRad, scale) {
        const destRgb = new Uint8Array(112 * 112 * 3);
        const cosVal = Math.cos(angleRad);
        const sinVal = Math.sin(angleRad);
        
        // Điểm neo mắt mục tiêu trên khung 112x112
        const tx = 55.9132;
        const ty = 51.59885;

        for (let dy = 0; dy < 112; dy++) {
            for (let dx = 0; dx < 112; dx++) {
                const x1 = dx - tx;
                const y1 = dy - ty;

                const x2 = (x1 * cosVal + y1 * sinVal) / scale;
                const y2 = (-x1 * sinVal + y1 * cosVal) / scale;

                const srcX = x2 + cx;
                const srcY = y2 + cy;

                if (srcX >= 0 && srcX < srcW - 1 && srcY >= 0 && srcY < srcH - 1) {
                    const x0 = Math.floor(srcX);
                    const x1Coord = x0 + 1;
                    const y0 = Math.floor(srcY);
                    const y1Coord = y0 + 1;

                    const wx = srcX - x0;
                    const wy = srcY - y0;

                    for (let c = 0; c < 3; c++) {
                        const p00 = srcRgb[(y0 * srcW + x0) * 3 + c];
                        const p10 = srcRgb[(y0 * srcW + x1Coord) * 3 + c];
                        const p01 = srcRgb[(y1Coord * srcW + x0) * 3 + c];
                        const p11 = srcRgb[(y1Coord * srcW + x1Coord) * 3 + c];

                        const val = (1 - wy) * ((1 - wx) * p00 + wx * p10) + wy * ((1 - wx) * p01 + wx * p11);
                        destRgb[(dy * 112 + dx) * 3 + c] = Math.max(0, Math.min(255, Math.round(val)));
                    }
                } else {
                    destRgb[(dy * 112 + dx) * 3] = 0;
                    destRgb[(dy * 112 + dx) * 3 + 1] = 0;
                    destRgb[(dy * 112 + dx) * 3 + 2] = 0;
                }
            }
        }
        return destRgb;
    }

    _transformPoint(pt, cx, cy, angleRad, scale) {
        const cosVal = Math.cos(angleRad);
        const sinVal = Math.sin(angleRad);
        const tx = 55.9132;
        const ty = 51.59885;

        const x1 = pt.x - cx;
        const y1 = pt.y - cy;

        const x2 = scale * (x1 * cosVal - y1 * sinVal);
        const y2 = scale * (x1 * sinVal + y1 * cosVal);

        return new Point2D(x2 + tx, y2 + ty);
    }

    _preprocessImage(rgbBytes, height, width) {
        const floatList = new Float32Array(3 * height * width);
        const planeSize = height * width;

        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                const idx = (h * width + w) * 3;
                // Chuẩn hóa [-1, 1]
                const r = (rgbBytes[idx] - 127.5) / 127.5;
                const g = (rgbBytes[idx + 1] - 127.5) / 127.5;
                const b = (rgbBytes[idx + 2] - 127.5) / 127.5;

                // Transpose sang planar CHW
                floatList[0 * planeSize + h * width + w] = r;
                floatList[1 * planeSize + h * width + w] = g;
                floatList[2 * planeSize + h * width + w] = b;
            }
        }
        return floatList;
    }

    _cropSubRegion(alignedRgb, yStart, yEnd, xStart, xEnd) {
        const height = yEnd - yStart;
        const width = xEnd - xStart;
        const cropped = new Uint8Array(height * width * 3);

        let index = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const origY = yStart + y;
                const origX = xStart + x;
                const origIdx = (origY * 112 + origX) * 3;

                cropped[index++] = alignedRgb[origIdx];
                cropped[index++] = alignedRgb[origIdx + 1];
                cropped[index++] = alignedRgb[origIdx + 2];
            }
        }
        return cropped;
    }

    _preprocessGeometry(landmarks26, width, height) {
        const normPoints = landmarks26.map(pt => new Point2D(pt.x / width, pt.y / height));

        const eyeLeftX = (normPoints[0].x + normPoints[1].x) / 2.0;
        const eyeLeftY = (normPoints[0].y + normPoints[1].y) / 2.0;

        const eyeRightX = (normPoints[2].x + normPoints[3].x) / 2.0;
        const eyeRightY = (normPoints[2].y + normPoints[3].y) / 2.0;

        const eyeMidX = (eyeLeftX + eyeRightX) / 2.0;
        const eyeMidY = (eyeLeftY + eyeRightY) / 2.0;

        const dx = eyeRightX - eyeLeftX;
        const dy = eyeRightY - eyeLeftY;
        let ipd = Math.sqrt(dx * dx + dy * dy);
        if (ipd === 0) ipd = 1.0;

        const geom = new Float32Array(26 * 2);
        for (let i = 0; i < 26; i++) {
            const dispX = normPoints[i].x - eyeMidX;
            const dispY = normPoints[i].y - eyeMidY;

            geom[i * 2] = dispX / ipd;
            geom[i * 2 + 1] = dispY / ipd;
        }
        return geom;
    }

    _computeBoundingBox(allLandmarks, imgW, imgH) {
        let xMin = Infinity, xMax = -Infinity;
        let yMin = Infinity, yMax = -Infinity;

        for (const idx of FaceRecognizer.landmarkIndices) {
            const pt = allLandmarks[idx];
            if (pt.x < xMin) xMin = pt.x;
            if (pt.x > xMax) xMax = pt.x;
            if (pt.y < yMin) yMin = pt.y;
            if (pt.y > yMax) yMax = pt.y;
        }

        const boxW = xMax - xMin;
        const boxH = yMax - yMin;
        const padX = Math.floor(boxW * 0.2);
        const padY = Math.floor(boxH * 0.25);

        const x = Math.max(0, Math.floor(xMin - padX));
        const y = Math.max(0, Math.floor(yMin - padY));
        const w = Math.min(imgW - x, Math.floor(boxW + 2 * padX));
        const h = Math.min(imgH - y, Math.floor(boxH + 2 * padY));

        return new BBox(x, y, w, h);
    }

    _l2Normalize(vector) {
        let sum = 0.0;
        for (let i = 0; i < vector.length; i++) {
            sum += vector[i] * vector[i];
        }
        const norm = Math.sqrt(sum);
        if (norm === 0) return vector;

        const normalized = new Float32Array(vector.length);
        for (let i = 0; i < vector.length; i++) {
            normalized[i] = vector[i] / norm;
        }
        return normalized;
    }

    static calculateCosineSimilarity(vector1, vector2) {
        if (vector1.length !== vector2.length) {
            throw new Error("Hai vector phải có cùng chiều dài.");
        }
        let dotProduct = 0.0;
        for (let i = 0; i < vector1.length; i++) {
            dotProduct += vector1[i] * vector2[i];
        }
        return dotProduct;
    }
}
