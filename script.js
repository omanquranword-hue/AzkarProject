// الحصول على الأذكار من التخزين المحلي
function getAzkar() {
    const data = localStorage.getItem('azkar');
    return data ? JSON.parse(data) : [];
}

// حفظ الأذكار في التخزين المحلي
function saveAzkar(azkar) {
    localStorage.setItem('azkar', JSON.stringify(azkar));
}

// عرض الأذكار
function renderAzkar() {
    const container = document.getElementById('azkar-list-container');
    container.innerHTML = '';
    const azkar = getAzkar();

    if (azkar.length === 0) {
        container.innerHTML = '<p style="text-align:center; color: #999;">القائمة فارغة، قم بإضافة أذكار جديدة.</p>';
        return;
    }

    azkar.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'zekr-item';
        div.innerHTML = `
            <div class="zekr-info">
                <strong>${item.zekr}</strong>
                <span class="zekr-count">التكرار: ${item.count}</span>
            </div>
            <button class="btn-delete" onclick="deleteZekr(${index})">حذف</button>
        `;
        container.appendChild(div);
    });
}

// إضافة ذكر جديد
function addZekr() {
    const zekr = document.getElementById('zekr-input').value.trim();
    const count = parseInt(document.getElementById('count-input').value);
    if (!zekr) return alert("يرجى كتابة الذكر");

    const azkar = getAzkar();
    azkar.push({ zekr, count });
    saveAzkar(azkar);
    document.getElementById('zekr-input').value = '';
    renderAzkar();
}

// حذف ذكر
function deleteZekr(index) {
    if (confirm("هل أنت متأكد من حذف هذا الذكر؟")) {
        const azkar = getAzkar();
        azkar.splice(index, 1);
        saveAzkar(azkar);
        renderAzkar();
    }
}

// تشغيل العرض عند فتح الصفحة
window.onload = renderAzkar;
