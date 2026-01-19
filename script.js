async function getAzkar() {
    const res = await fetch(FB_URL);
    const data = await res.json();

    if (!data) return [];

    // تحويل Object إلى Array
    return Object.values(data).map(item => ({
        zekr: item.text,
        count: item.count
    }));
}
async function saveAzkar(azkar) {
    const obj = {};
    azkar.forEach((item, i) => {
        obj["id_" + i] = {
            text: item.zekr,
            count: item.count
        };
    });

    await fetch(FB_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    });
}
        return;
    }

    const azkar = await getAzkar();
    azkar.push({ zekr, count });
    await saveAzkar(azkar);

    document.getElementById("zekr-input").value = "";
    renderAzkar();
}

// حذف ذكر
async function deleteZekr(index) {
    const azkar = await getAzkar();
    azkar.splice(index, 1);
    await saveAzkar(azkar);
    renderAzkar();
}

// عرض الأذكار
async function renderAzkar() {
    const container = document.getElementById("azkar-list-container");
    if (!container) return;

    container.innerHTML = "";
    const azkar = await getAzkar();

    azkar.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${item.zekr} (${item.count})</p>
            <button onclick="deleteZekr(${index})">حذف</button>
        `;
        container.appendChild(div);
    });
}

window.onload = renderAzkar;
const FB_URL = "https://azkarglobal-default-rtdb.firebaseio.com/azkar.json";

// جلب الأذكار
async function getAzkar() {
    const res = await fetch(FB_URL);
    const data = await res.json();
    return data || [];
}

// حفظ الأذكار
async function saveAzkar(azkar) {
    await fetch(FB_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(azkar)
    });
}

// إضافة ذكر
async function addZekr() {
    const zekr = document.getElementById("zekr-input").value;
    const count = parseInt(document.getElementById("count-input").value);

    if (!zekr) {
        alert("اكتب الذكر");
        return;
    }

    const azkar = await getAzkar();
    azkar.push({ zekr, count });

    await saveAzkar(azkar);
    document.getElementById("zekr-input").value = "";
    renderAzkar();
}

// حذف ذكر
async function deleteZekr(index) {
    if (!confirm("هل تريد الحذف؟")) return;

    const azkar = await getAzkar();
    azkar.splice(index, 1);
    await saveAzkar(azkar);
    renderAzkar();
}

// عرض الأذكار
async function renderAzkar() {
    const container = document.getElementById("azkar-list-container");
    container.innerHTML = "";

    const azkar = await getAzkar();

    if (azkar.length === 0) {
        container.innerHTML = "<p>لا توجد أذكار</p>";
        return;
    }

    azkar.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>${item.zekr}</strong> (${item.count})
            <button onclick="deleteZekr(${index})">حذف</button>
        `;
        container.appendChild(div);
    });
}

window.onload = renderAzkar;
async function getAzkar() {
    const response = await fetch(FB_URL);
    const data = await response.json();
    return data ? data : [];
}

async function saveAzkar(azkar) {
    await fetch(FB_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(azkar)
    });
}
async function addZekr() {
    const zekr = document.getElementById('zekr-input').value;
    const count = parseInt(document.getElementById('count-input').value);
    if (!zekr) return alert("يرجى كتابة الذكر");

    const azkar = await getAzkar();
    azkar.push({ zekr, count });
    await saveAzkar(azkar);
    document.getElementById('zekr-input').value = '';
    renderAzkar();
}

