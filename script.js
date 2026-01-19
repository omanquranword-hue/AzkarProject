// دالة لجلب الأذكار مع ضمان عدم العودة للافتراضية إذا كانت المحفظة موجودة
function getAzkar() {
    const azkarString = localStorage.getItem('azkarList');
    if (azkarString) {
        return JSON.parse(azkarString);
    }
    // هذه الأذكار تظهر فقط "أول مرة في العمر" عند فتح التطبيق
    return [
        {"zekr": "سبحان الله وبحمده", "count": 33},
        {"zekr": "أستغفر الله", "count": 100}
    ];
}

function saveAzkar(azkarList) {
    localStorage.setItem('azkarList', JSON.stringify(azkarList));
}

// دالة الصوت الإلكتروني
function playClickSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) { console.log("Audio not supported"); }
}

// دالة التحقق من كلمة المرور
function checkAdminAccess() {
    const password = prompt("الرجاء إدخال كلمة المرور للوصول للإدارة:");
    if (password === "1234") {
        window.location.href = "admin.html";
    } else {
        alert("كلمة المرور خاطئة!");
    }
}

// كود الصفحة الرئيسية
if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    function renderMainList() {
        const container = document.getElementById('main-list');
        if (!container) return;
        container.innerHTML = '';
        const azkar = getAzkar();
        
        azkar.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'zekr-card' + (index === 0 ? ' active' : '');
            card.id = `card-${index}`;
            let remaining = item.count;

            card.innerHTML = `
                <span class="zekr-text">${item.zekr}</span>
                <div class="counter-circle" id="count-${index}">${remaining}</div>
                <div class="completed-mark">✓</div>
            `;

            card.onclick = function() {
                if (remaining > 0) {
                    remaining--;
                    document.getElementById(`count-${index}`).textContent = remaining;
                    playClickSound();
                    if (navigator.vibrate) navigator.vibrate(50);
                    if (remaining === 0) {
                        card.classList.replace('active', 'completed');
                        const next = document.getElementById(`card-${index + 1}`);
                        if (next) {
                            next.classList.add('active');
                            next.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                }
            };
            container.appendChild(card);
        });
    }
    window.onload = renderMainList;
}
