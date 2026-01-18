function getAzkar() {
    const azkarString = localStorage.getItem('azkarList');
    return azkarString ? JSON.parse(azkarString) : [
        {"zekr": "سبحان الله وبحمده", "count": 1},
        {"zekr": "أستغفر الله", "count": 3}
    ];
}

function saveAzkar(azkarList) {
    localStorage.setItem('azkarList', JSON.stringify(azkarList));
}

// دالة لتوليد صوت نقرة إلكترونية مجانية
function playClickSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // تردد الصوت
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    let azkarList = getAzkar();
    let currentZekrIndex = 0;
    let currentCount = 0;

    function displayCurrentZekr() {
        const zekrDisplay = document.getElementById('zekr-display');
        const countDisplay = document.getElementById('count-display');
        if (azkarList.length === 0) {
            zekrDisplay.textContent = "يرجى إضافة أذكار من صفحة الإدارة";
            countDisplay.textContent = "";
            return;
        }
        const currentZekrData = azkarList[currentZekrIndex];
        zekrDisplay.textContent = currentZekrData.zekr;
        currentCount = currentCount || currentZekrData.count;
        countDisplay.textContent = `المتبقي: ${currentCount}`;
    }

    function handleZekrClick() {
        playClickSound(); // تشغيل الصوت
        if (navigator.vibrate) navigator.vibrate(40); // اهتزاز

        if (currentCount > 1) {
            currentCount--;
            document.getElementById('count-display').textContent = `المتبقي: ${currentCount}`;
        } else {
            currentZekrIndex = (currentZekrIndex + 1) % azkarList.length;
            currentCount = azkarList[currentZekrIndex].count;
            displayCurrentZekr();
        }
    }

    window.onload = displayCurrentZekr;
    window.handleZekrClick = handleZekrClick;
}

function checkAdminAccess() {
    const password = prompt("الرجاء إدخال كلمة المرور للوصول للإدارة:");
    if (password === "1234") { // يمكنك تغيير 1234 لأي كلمة تريدها
        window.location.href = "admin.html";
    } else {
        alert("كلمة المرور خاطئة!");
    }
}
