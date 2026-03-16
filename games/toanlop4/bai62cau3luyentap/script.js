const gameData = {
    step1: {
        num: [3, 1], den: [6, 2], id: 'wrap-step1',
        inputs: ['s1-num', 's1-den'],
        hints: [
            "💡 Bước 1: Tính tổng số nước giặt dùng để giặt chăn và quần áo.",
            "🔍 Em hãy quy đồng mẫu số của 1/3 và 1/6 (mẫu số chung là 6 nhé).",
            "✍️ Ta có: 1/3 = 2/6. Giờ em cộng: 2/6 + 1/6 để ra kết quả tổng số phần đã dùng nhé!"
        ],
        hintLevel: 0
    },
    step2Input: {
        num: [3, 1], den: [6, 2], id: 'wrap-step2-input',
        inputs: ['s2-in-num', 's2-in-den'],
        hints: [
            "💡 Ở bước 2, em lấy số nước giặt ban đầu (7/12) trừ đi số nước giặt **đã dùng** (chính là tổng em vừa tính ở Bước 1).",
            "🔍 Số nước giặt đã dùng là kết quả ở Bước 1. Em hãy điền lại phân số đó vào ô trống nhé!"
        ],
        hintLevel: 0
    },
    step2Res: {
        num: [1], den: [12], id: 'wrap-step2-res',
        inputs: ['s2-res-num', 's2-res-den'],
        hints: [
            "💡 Phép trừ của em là: 7/12 - 3/6 (hoặc 7/12 - 1/2).",
            "🔍 Em cần quy đồng mẫu số chung là 12 để thực hiện phép trừ này.",
            "✍️ Ta quy đồng 3/6 = 6/12. Phép tính trở thành: 7/12 - 6/12. Em thực hiện phép tính và điền kết quả cuối cùng nhé!"
        ],
        hintLevel: 0
    }
};

// Đổi chuỗi text dạng "2/21" thành dạng hiển thị phân số trên web
function renderFrac(n, d) {
    return `<span style="display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;font-size:1.1em;line-height:1.2;margin:0 4px;"><span style="border-bottom:2px solid #533f03;padding:0 3px;">${n}</span><span>${d}</span></span>`;
}

function formatHint(text) {
    return text.replace(/(\d+)\/(\d+)/g, (match, n, d) => renderFrac(n, d));
}

function isCorrect(nVal, dVal, item) {
    for (let i = 0; i < item.num.length; i++) {
        if (nVal === item.num[i] && dVal === item.den[i]) {
            return true;
        }
    }
    return false;
}

let firstErrorKey = null;

function checkAnswers() {
    let allCorrect = true;
    firstErrorKey = null;

    // Xóa class error cũ (nếu có)
    for(let key in gameData) {
        document.getElementById(gameData[key].id).classList.remove('error');
    }

    const keys = ['step1', 'step2Input', 'step2Res'];
    
    // Check flow logic (need pass step 1 first?) No, just check all visible enabled inputs
    for (const key of keys) {
        const item = gameData[key];
        const numInput = document.getElementById(item.inputs[0]);
        const denInput = document.getElementById(item.inputs[1]);
        
        // Chỉ kiểm tra các ô tính chưa bị vô hiệu hóa
        if (!numInput.disabled) {
            const nVal = parseInt(numInput.value);
            const dVal = parseInt(denInput.value);
            
            // Nếu đúng kết quả số
            if (isCorrect(nVal, dVal, item)) {
                const wrap = document.getElementById(item.id);
                wrap.classList.add('correct');
                numInput.disabled = true;
                denInput.disabled = true;
                item.hintLevel = 0; // Đặt lại gợi ý
            } else {
                allCorrect = false;
                
                // Ghi lại lỗi đầu tiên gặp phải để hiện gợi ý ưu tiên
                if (!firstErrorKey) {
                    firstErrorKey = key;
                }
            }
        }
    }

    const feedbackBox = document.getElementById('feedback-box');
    const feedbackText = document.getElementById('feedback-text');

    if (allCorrect) {
        feedbackBox.classList.remove('active');
        showSuccessModal();
    } else {
        if (firstErrorKey) {
            const wrap = document.getElementById(gameData[firstErrorKey].id);
            
            // Xóa animation rồi thêm lại để hiệu ứng rung hoạt động nhiều lần
            wrap.classList.remove('error');
            void wrap.offsetWidth; // trigger DOM reflow
            wrap.classList.add('error');
            
            const item = gameData[firstErrorKey];
            const hint = item.hints[Math.min(item.hintLevel, item.hints.length - 1)];
            
            // Tăng level gợi ý cho lần kiểm tra sai tiếp theo
            if (item.hintLevel < item.hints.length - 1) {
                item.hintLevel++;
            }
            
            feedbackText.innerHTML = formatHint(hint);
            feedbackBox.classList.add('active');
        }
    }
}

function showSuccessModal() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4a69bd', '#78e08f', '#fbd38d', '#f6b93b', '#e55039']
    });
    document.getElementById('success-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('success-modal').classList.remove('active');
}

// Lắng nghe sự kiện click trên nút "Kiểm tra kết quả"
document.getElementById('btn-check').addEventListener('click', checkAnswers);

// Lắng nghe phím Enter trong các ô input
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkAnswers();
        }
    });
});
