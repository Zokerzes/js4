
let myTable = document.getElementById("my-table");
let button = document.getElementById("add-button");

let tableData = JSON.parse(localStorage.getItem('tableData')) || [];

for (let i = 0; i < tableData.length; i++) {
  addRow(tableData[i]);
}

function addRow(text) {
  let row = myTable.insertRow();
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);

  let textNode = document.createTextNode(text);
  cell1.appendChild(textNode);

  cell2.innerHTML = '<button class="delete-button" onclick="removeRow(this)">Удалить строку</button>';
}

function removeRow(button) {
  let rowToRemove = button.parentNode.parentNode;

  if (rowToRemove) {
    myTable.deleteRow(rowToRemove.rowIndex);
    let updatedTableData = [];

    for (let i = 1; i < myTable.rows.length; i++) {
      let cellText = myTable.rows[i].cells[0].textContent;
      updatedTableData.push(cellText);
    }

    localStorage.setItem('tableData', JSON.stringify(updatedTableData));
  }
}

button.addEventListener("click", function () {
  let firstColumnInput = document.getElementById("first-column-input");

  if (firstColumnInput && firstColumnInput.value !== "") {
    addRow(firstColumnInput.value);
    tableData.push(firstColumnInput.value);
    localStorage.setItem('tableData', JSON.stringify(tableData));
    firstColumnInput.value = "";
  }
});