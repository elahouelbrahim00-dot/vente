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
