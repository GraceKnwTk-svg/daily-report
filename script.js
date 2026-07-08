function generateReport() {
    const hub = document.getElementById('hub').value || '-';
    const dateInput = document.getElementById('date').value;
    const time = document.getElementById('time').value || '--:--';
    const inHub = document.getElementById('inHub').value || '0';
    const assign = document.getElementById('assign').value || '0';
    const delivered = document.getElementById('delivered').value || '0';
    const actual2w = document.getElementById('actual2w').value || '0';
    const actual4w = document.getElementById('actual4w').value || '0';
    const issue = document.getElementById('issue').value || '';
    const action = document.getElementById('action').value || '';
    let formattedDate = '-';
    if(dateInput) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const d = new Date(dateInput);
        formattedDate = `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }
    let deliveryRate = 0;
    if (parseInt(assign) > 0) { deliveryRate = ((parseInt(delivered) / parseInt(assign)) * 100).toFixed(0); }
    const textOutput = `Daily Report : ${formattedDate} (${time})\nHub : ${hub}\n\nIn Hub : ${inHub} Pcs.\nAssign : ${assign} Pcs.\nNo Assign : 0 Pcs.\nNormal : 0\n\nHC Active : 0 คน\n• 2W : ${actual2w}\n• 4W : ${actual4w}\n\nDelivered To Buyer : ${delivered} Pcs. (${deliveryRate}%)\n\nWL เฉลี่ย 70:30\n• 2W : 0\n• 4W : 0\n\n%2W (โดยประมาณ)\n• 2W : 70%\n• 4W : 30%\n\nSLA : 96.50%\nPDTY. Assign : 0 (Target: 186)\n\nIssue หน้างาน : ${issue}\nAction : ${action}`;
    document.getElementById('resultBox').value = textOutput;
}
function copyReport() {
    const resultBox = document.getElementById('resultBox');
    if(!resultBox.value) { alert("กรุณากด Generate Report ก่อนคัดลอกครับ"); return; }
    resultBox.select();
    navigator.clipboard.writeText(resultBox.value).then(() => { alert("คัดลอกรายงานเรียบร้อยแล้ว!"); });
}
function clearReport() {
    if(confirm("คุณต้องการล้างข้อมูลทั้งหมดเพื่อเริ่มรายงานใหม่ใช่หรือไม่?")) {
        document.getElementById('inHub').value = ''; document.getElementById('assign').value = ''; document.getElementById('delivered').value = ''; document.getElementById('actual2w').value = ''; document.getElementById('actual4w').value = ''; document.getElementById('issue').value = ''; document.getElementById('action').value = ''; document.getElementById('resultBox').value = '';
    }
}
