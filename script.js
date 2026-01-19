cat << 'EOF' > script.js
let azkar = JSON.parse(localStorage.getItem('azkarData')) || [
    { text: "سبحان الله", count: 33 },
    { text: "الحمد لله", count: 33 },
    { text: "الله أكبر", count: 34 }
];

function displayAzkar() {
    const container = document.getElementById('azkar-list-container');
    if (!container) return;
    container.innerHTML = '';
    azkar.forEach((item, index) => {
        container.innerHTML += `
            <div class="zekr-item">
                <div class="zekr-info">
                    <span class="zekr-count">${item.count} مرة</span>
                    <span>${item.text}</span>
                </div>
                <button class="btn-delete" onclick="deleteZekr(${index})">حذف</button>
            </div>`;
    });
    localStorage.setItem('azkarData', JSON.stringify(azkar));
}

function addZekr() {
    const textInput = document.getElementById('zekr-input');
    const countInput = document.getElementById('count-input');
    if (textInput.value.trim() === "") {
        alert("يرجى كتابة الذكر أولاً");
        return;
    }
    azkar.push({ text: textInput.value, count: parseInt(countInput.value) || 1 });
    textInput.value = '';
    displayAzkar();
}

function deleteZekr(index) {
    if (confirm("هل أنت متأكد من حذف هذا الذكر؟")) {
        azkar.splice(index, 1);
        displayAzkar();
    }
}
window.onload = displayAzkar;
EOF
