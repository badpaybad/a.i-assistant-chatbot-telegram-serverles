document.addEventListener('DOMContentLoaded', () => {
    // Data definition mapped from the plan
    const letterData = [
        { id: 'let-d', char: 'Đ', calc: '5/6 + 6/6', ans: '11/6' },
        { id: 'let-i', char: 'I', calc: '15/11 - 3/11', ans: '12/11' },
        { id: 'let-h', char: 'H', calc: '7/6 + 8/6', ans: '15/6' },
        { id: 'let-o', char: 'Ọ', calc: '10/11 - 4/11', ans: '6/11' },
        { id: 'let-c', char: 'C', calc: '8/11 + 9/11', ans: '17/11' }
    ];

    const pool = document.getElementById('letters-pool');
    const dropZones = document.querySelectorAll('.drop-zone');
    const resetBtn = document.getElementById('reset-btn');
    let correctCount = 0;

    // Initialize game
    function initGame() {
        pool.innerHTML = '';
        correctCount = 0;
        resetBtn.style.display = 'none';

        // Shuffle letters to make it fun
        const shuffledLetters = [...letterData].sort(() => Math.random() - 0.5);

        shuffledLetters.forEach(data => {
            const card = document.createElement('div');
            card.classList.add('letter-card');
            card.setAttribute('draggable', 'true');
            card.setAttribute('id', data.id);
            card.dataset.ans = data.ans;
            card.dataset.char = data.char;

            const calcParts = data.calc.split(' ');
            const htmlCalc = `
                <div style="display:inline-flex; align-items:center; gap:2px;">
                    <span style="display:flex; flex-direction:column; align-items:center; font-size:0.9em;">
                        <span>${calcParts[0].split('/')[0]}</span>
                        <span style="width:100%; height:2px; background:#495057; margin:1px 0;"></span>
                        <span>${calcParts[0].split('/')[1]}</span>
                    </span>
                    <span style="margin: 0 4px">${calcParts[1]}</span>
                    <span style="display:flex; flex-direction:column; align-items:center; font-size:0.9em;">
                        <span>${calcParts[2].split('/')[0]}</span>
                        <span style="width:100%; height:2px; background:#495057; margin:1px 0;"></span>
                        <span>${calcParts[2].split('/')[1]}</span>
                    </span>
                </div>
            `;

            card.innerHTML = `
                <div class="letter-char">${data.char}</div>
                <div class="calculation">${htmlCalc}</div>
            `;

            setupDraggable(card);
            pool.appendChild(card);
        });

        dropZones.forEach(zone => {
            zone.innerHTML = '?';
            zone.classList.remove('filled', 'pop-animation');
            zone.dataset.filled = 'false';
        });
    }

    // Drag and Drop Setup
    function setupDraggable(element) {
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', element.id);
            setTimeout(() => element.classList.add('dragging'), 0);
        });

        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
        });
    }

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (zone.dataset.filled !== 'true') {
                zone.classList.add('hovered');
            }
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('hovered');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('hovered');

            if (zone.dataset.filled === 'true') return;

            const id = e.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(id);
            
            if (!draggedElement) return;

            const targetAns = zone.dataset.target;
            const draggedAns = draggedElement.dataset.ans;
            const draggedChar = draggedElement.dataset.char;

            if (targetAns === draggedAns) {
                // Correct match
                zone.innerHTML = draggedChar;
                zone.classList.add('filled', 'pop-animation');
                zone.dataset.filled = 'true';
                draggedElement.classList.add('hidden');
                correctCount++;

                // Sound or simple effect could be added here
                
                checkWin();
            } else {
                // Incorrect match alert
                Swal.fire({
                    icon: 'warning',
                    title: 'Chưa đúng rồi bé ơi!',
                    text: 'Gợi ý: Con hãy tính lại phép tính của chữ cái này cẩn thận nhé. Chú ý cộng/trừ tử số và giữ nguyên mẫu số nha!',
                    confirmButtonText: 'Thử lại',
                    confirmButtonColor: '#ff6b6b'
                });
            }
        });
    });

    function checkWin() {
        if (correctCount === letterData.length) {
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                
                Swal.fire({
                    icon: 'success',
                    title: 'Giỏi quá! Xuất sắc!',
                    html: `
                        <p style="font-size: 1.1rem; color: #495057;">Từ khóa bí mật chính là <strong>"ĐI HỌC"</strong>.</p>
                        <hr style="border-top: 1px dashed #ced4da; margin: 15px 0;">
                        <p style="text-align: left; font-size: 0.95rem; line-height: 1.5; color: #2b2d42;">
                            🌟 <strong>Ý nghĩa bài học:</strong> 🌟<br>
                            Khi con cộng hoặc trừ các phân số <strong>cùng mẫu số</strong>, điều đó giống như con đang nhận thêm hoặc bớt đi các phần bằng nhau của một chiếc bánh vậy.<br>
                            Ví dụ: $\\frac{5}{6}$ chiếc bánh cộng thêm $\\frac{6}{6}$ chiếc bánh (1 chiếc bánh nguyên) sẽ bằng $\\frac{11}{6}$ chiếc bánh (gần 2 chiếc).
                        </p>
                    `,
                    confirmButtonText: 'Tuyệt vời',
                    confirmButtonColor: '#20c997',
                    width: '600px'
                }).then(() => {
                    resetBtn.style.display = 'inline-block';
                });
            }, 500);
        }
    }

    const guideBtn = document.getElementById('guide-btn');
    if (guideBtn) {
        guideBtn.addEventListener('click', () => {
            Swal.fire({
                title: '📖 Sổ Tay Hướng Dẫn',
                html: `
                    <div style="text-align: left; font-size: 1rem; line-height: 1.6; color: #4a4e69;">
                        <h4 style="color: #4263eb; margin-bottom: 10px;">🧠 Mẹo giải bài:</h4>
                        <ol style="padding-left: 20px;">
                            <li>Quan sát phép tính trên <strong>thẻ chữ cái</strong> (màu xanh).</li>
                            <li>Vì các phân số đều có <strong>cùng mẫu số</strong> (ví dụ: mẫu là 6 hoặc 11), con chỉ cần <strong>cộng hoặc trừ các tử số</strong> (số ở trên) và <strong>giữ nguyên mẫu số</strong> (số ở dưới).</li>
                            <li>Tìm ô trống có đáp án tương ứng và <strong>kéo thả</strong> chữ cái vào đó!</li>
                        </ol>
                    </div>
                `,
                icon: 'info',
                confirmButtonText: 'Con hiểu rồi!',
                confirmButtonColor: '#fca311'
            });
        });
    }

    resetBtn.addEventListener('click', initGame);

    // Start game on load
    initGame();
});
