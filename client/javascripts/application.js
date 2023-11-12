console.log("Application script module imported");

// Needs to be same order drop down menu
const tableChoices = [
  "Locations", "Massages", "Employees", "Customers", "Timeslots",
  "Rosters", "Reminders", "Allocations", "Accounts", "SystemLogs"
];

var tableHeadings = ["Company", "Contact", "Country"];

var tableRows = [
  ["Alfreds Futterkiste", "Maria Anders", "Germany"],
  ["Centro comercial Moctezuma", "Francisco Chang", "Mexico"],
];

function showForm(recordNum) {
  if (recordNum >= 0 && recordNum < tableRows.length) {
    console.log("Update record button is pressed.");
  } else {
    console.log("Add record button is pressed.");
  }
}

function sortTable(colNum) {
  console.log("Table was sorted based on " + tableHeadings[colNum] + ".");
}

function updateTable(optionNum) {
  const elem = document.getElementById("myButton");
  elem.innerHTML = tableChoices[optionNum].toString();
  console.log(tableChoices[optionNum] + " was called.");
  renderTable();
}

updateTable(0);

function updateRecord(recordNum) { showForm(recordNum); }

function removeRecord(recordNum) { console.log(recordNum); }

function renderTable() {
  const elem = document.getElementById("viewTable");

  elem.innerHTML = "";
  let tableContent = "";
  if (tableHeadings.length > 0) {
    tableContent += "<tr>";
    for (let i = 0; i < tableHeadings.length; i++) {
      tableContent += '<th onclick="sortTable(' + i;
      tableContent += ')">' + tableHeadings[i] + '</th>';
    }

    tableContent += "<th></th></tr>";
    for (let i = 0; i < tableRows.length; i++) {
      const temp = Math.min(tableRows[i].length, tableHeadings.length);
      tableContent += '<tr>';
      for (let j = 0; j < temp; j++) {
        tableContent += "<td>" + tableRows[i][j] + "</td>";
      }
      
      tableContent += '<td style="text-align: center; width: 200px; ">';
      tableContent += '&nbsp &nbsp <button class="btn btn-secondary" ';
      tableContent += 'data-bs-toggle="modal" data-bs-target="#exampleModal" ';
      tableContent += 'onclick="updateRecord(' + i + ')">Edit</button> &nbsp &nbsp';
      tableContent += '<button class="btn btn-danger" onclick="removeRecord(' + i;
      tableContent += ')">Delete</button> &nbsp &nbsp </td></tr>';
    }
  }

  elem.innerHTML = tableContent;
}
