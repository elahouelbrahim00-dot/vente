const tbody = document.querySelector("#paymentTable tbody");
const addButton = document.getElementById("addCustomer");

// تاريخ اليوم
document.getElementById("today").value =
new Date().toISOString().split("T")[0];

// زر إضافة عميل
addButton.addEventListener("click", addRow);

// إنشاء صف جديد
function addRow() {

    const row = document.createElement("tr");

    row.innerHTML = `

        <td class="number"></td>

        <td>
            <input type="text" class="customer">
        </td>

        <td>
            <input type="number" class="purchase" value="0">
        </td>

        <td>
            <input type="number" class="box" value="0">
        </td>

        <td>
            <input type="number" class="safe" value="0">
        </td>

        <td>
            <input type="number" class="reserve" value="0">
        </td>

        <td class="total">0</td>

        <td class="difference">0</td>

        <td class="status">-</td>

        <td>
            <input type="text" class="note">
        </td>

        <td>
            <button class="delete">🗑</button>
        </td>

    `;

    tbody.appendChild(row);

    updateNumbers();

}
// تحديث ترقيم الصفوف

function updateNumbers(){

    const rows = tbody.querySelectorAll("tr");

    rows.forEach((row,index)=>{

        row.querySelector(".number").textContent = index + 1;

    });

}
// حذف صف

tbody.addEventListener("click",function(e){

    if(e.target.classList.contains("delete")){

        e.target.closest("tr").remove();

        updateNumbers();

    }

});
tbody.addEventListener("input", function(e){

    if(
        e.target.classList.contains("purchase") ||
        e.target.classList.contains("box") ||
        e.target.classList.contains("safe") ||
        e.target.classList.contains("reserve")
    ){
        calculateRow(e.target.closest("tr"));
    }

});
function calculateRow(row){

    let purchase = Number(row.querySelector(".purchase").value) || 0;
    let box = Number(row.querySelector(".box").value) || 0;
    let safe = Number(row.querySelector(".safe").value) || 0;
    let reserve = Number(row.querySelector(".reserve").value) || 0;

    let totalPaid = box + safe + reserve;
    let diff = totalPaid - purchase;

    row.querySelector(".total").textContent = totalPaid;
    row.querySelector(".difference").textContent = diff;

    let statusCell = row.querySelector(".status");

    statusCell.className = "status";

    if(diff === 0){
        statusCell.textContent = "✔ متطابق";
        statusCell.classList.add("ok");
    }
    else if(diff < 0){
        statusCell.textContent = "❌ ناقص " + Math.abs(diff);
        statusCell.classList.add("less");
    }
    else{
        statusCell.textContent = "⚠ زيادة " + diff;
        statusCell.classList.add("more");
    }

    updateTotals();
    saveData();
}
function updateTotals(){

    let purchaseTotal = 0;
    let boxTotal = 0;
    let safeTotal = 0;
    let reserveTotal = 0;
    let grandTotal = 0;

    tbody.querySelectorAll("tr").forEach(row=>{

        purchaseTotal += Number(row.querySelector(".purchase").value) || 0;
        boxTotal += Number(row.querySelector(".box").value) || 0;
        safeTotal += Number(row.querySelector(".safe").value) || 0;
        reserveTotal += Number(row.querySelector(".reserve").value) || 0;
        grandTotal += Number(row.querySelector(".total").textContent) || 0;

    });

    document.getElementById("totalPurchases").textContent = purchaseTotal;
    document.getElementById("totalBox").textContent = boxTotal;
    document.getElementById("totalSafe").textContent = safeTotal;
    document.getElementById("totalReserve").textContent = reserveTotal;
    document.getElementById("grandTotal").textContent = grandTotal;

}
// =============================
// حفظ البيانات
// =============================

function saveData(){

    let data = [];

    tbody.querySelectorAll("tr").forEach(row=>{

        data.push({

            customer : row.querySelector(".customer").value,

            purchase : row.querySelector(".purchase").value,

            box : row.querySelector(".box").value,

            safe : row.querySelector(".safe").value,

            reserve : row.querySelector(".reserve").value,

            note : row.querySelector(".note").value

        });

    });

    localStorage.setItem("payments",JSON.stringify(data));

    localStorage.setItem("date",document.getElementById("today").value);

}
// =============================
// استرجاع البيانات
// =============================

function loadData(){

    let savedDate = localStorage.getItem("date");

    if(savedDate){

        document.getElementById("today").value = savedDate;

    }

    let data = JSON.parse(localStorage.getItem("payments") || "[]");

    data.forEach(item=>{

        addRow();

        let row = tbody.lastElementChild;

        row.querySelector(".customer").value = item.customer;
        row.querySelector(".purchase").value = item.purchase;
        row.querySelector(".box").value = item.box;
        row.querySelector(".safe").value = item.safe;
        row.querySelector(".reserve").value = item.reserve;
        row.querySelector(".note").value = item.note;

        calculateRow(row);

    });

}
loadData();
document.getElementById("today").addEventListener("change",saveData);
