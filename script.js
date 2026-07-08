// ฟังก์ชันดึงวันเวลาปัจจุบันมาใส่ในช่อง input ทันที
function setCurrentDateTime() {
    try {
        const now = new Date();
        
        // แปลงเขตเวลาให้ตรงกับประเทศไทย (GMT+7)
        const tzOffset = now.getTimezoneOffset() * 60000;
        const localISODate = new Date(now.getTime() - tzOffset).toISOString();
        
        // ตั้งค่าวันที่ (YYYY-MM-DD)
        const todayDate = localISODate.split('T')[0];
        document.getElementById('date').value = todayDate;
        
        // ตั้งค่าเวลา (HH:MM)
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('time').value = `${hours}:${minutes}`;
    } catch (e) {
        console.log("Error setting date/time:", e);
    }
}

// สั่งให้ระบบทำงานตั้งแต่วินาทีแรกที่หน้าเว็บเปิดขึ้นมา
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setCurrentDateTime);
} else {
    setCurrentDateTime();
}

function generateReport() {
    const hub = document.getElementById('hub').value || '-';
    const dateInput = document.getElementById('date').value;
    const time = document.getElementById('time').value || '--:--';
    
    const inHub = parseInt(document.getElementById('inHub').value) || 0;
    const assign = parseInt(document.getElementById('assign').value) || 0;
    const delivered = parseInt(document.getElementById('delivered').value) || 0;
    const actual2w = parseInt(document.getElementById('actual2w').value) || 0;
    const actual4w = parseInt(document.getElementById('actual4w').value) || 0;
    
    const issue = document.getElementById('issue').value || '-';
    const action = document.getElementById('action').value || '-';

    // คำนวณอัตโนมัติ
    const noAssign = inHub - assign; 
    const hcActive = actual2w + actual4w; 
    
    let deliveryRate = 0;
    if (assign > 0) {
        deliveryRate = ((delivered / assign) * 100).toFixed(1);
    }

    let wl2w = 0;
    let wl4w = 0;
    if (assign > 0) {
        wl2w = Math.round(assign * 0.7);
        wl4w = Math.round(assign * 0.3);
    }

    let pdtyAssign = 0;
    if (hcActive > 0) {
        pdtyAssign = Math.round(assign / hcActive);
    }

    let formattedDate = '-';
    if(dateInput) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const d = new Date(dateInput);
        formattedDate = `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    const textOutput = `Daily Report - ${formattedDate} (${time})
Hub : ${hub}

In Hub : ${inHub.toLocaleString()} Pcs.
Assign : ${assign.toLocaleString()} Pcs.
No Assign : ${noAssign.toLocaleString()} Pcs.
Normal : 0

HC Active : ${hcActive} คน
• 2W : ${actual2w}
• 4W : ${actual4w}

Delivered To Buyer : ${delivered.toLocaleString()} Pcs. (${deliveryRate}%)

WL เฉลี่ย 70:30
• 2W : ${wl2w.toLocaleString()}
• 4W : ${wl4w.toLocaleString()}

%2W (โดยประมาณ)
• 2W : 70%
• 4W : 30%

SLA : 96.00%
PDTY Assign : ${pdtyAssign} (Target: 197)

Issue หน้างาน : ${issue}
Action : ${action}`;

    document.getElementById('resultBox').value = textOutput;
}

function copyReport() {
    const resultBox = document.getElementById('resultBox');
    if(!resultBox.value) {
        alert("กรุณากด Generate Report ก่อนคัดลอกครับ");
        return;
    }
    resultBox.select();
    navigator.clipboard.writeText(resultBox.value).then(() => {
        alert("คัดลอกรายงานเรียบร้อยแล้ว!");
    });
}

function clearReport() {
    if(confirm("คุณต้องการล้างข้อมูลทั้งหมดเพื่อเริ่มรายงานใหม่ใช่หรือไม่?")) {
        document.getElementById('inHub').value = '';
        document.getElementById('assign').value = '';
        document.getElementById('delivered').value = '';
        document.getElementById('actual2w').value = '';
        document.getElementById('actual4w').value = '';
        document.getElementById('issue').value = '';
        document.getElementById('action').value = '';
        document.getElementById('resultBox').value = '';
        
        setCurrentDateTime();
        document.getElementById('hub').value = 'ABYAI-B';
    }
}
