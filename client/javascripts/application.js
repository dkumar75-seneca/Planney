console.log("Application script module imported");

// Needs to be same order drop down menu
const tableChoices = [
  "Location", "Massages", "Employees", "Customers", "Timeslots",
  "Rosters", "Reminders", "Allocations", "Accounts", "SystemLogs"
];

var tableHeadings = ["Company", "Contact", "Country"];

var tableRows = [
  ["Alfreds Futterkiste", "Maria Anders", "Germany"],
  ["Centro comercial Moctezuma", "Francisco Chang", "Mexico"],
];

function sortTable(colNum) {
  console.log(colHeadings[colNum] + " was sorted.");
}

function renderTable() {
  const elem = document.getElementById("viewTable");

  elem.innerHTML = "";
  let tableContent = "";
  if (tableHeadings.length > 0) {
    tableContent += "<tr>";
    for (let i = 0; i < tableHeadings.length; i++) {
      tableContent += "<td><b>" + tableHeadings[i] + "</b></td>";
    }
    tableContent += "</tr>";
    
    for (let i = 0; i < tableRows.length; i++) {
      tableContent += "<tr>";
      for (let j = 0; j < tableRows[i].length; j++) {
        tableContent += "<td>" + tableRows[i][j] + "</td>";
      }
      tableContent += "</tr>";
    }
  }

  elem.innerHTML = tableContent;
}

function updateTable(optionNum) {
  const elem = document.getElementById("myButton");
  elem.innerHTML = tableChoices[optionNum].toString();
  console.log(tableChoices[optionNum] + " was called.");
  renderTable();
}
