// Needs to be same order as drop down menu
const tableChoices = [
  "Locations", "Massages", "Employees", "Customers", "Timeslots",
  "Rosters", "Reminders", "Allocations", "Accounts", "SystemLogs"
];

var selectedRecordNum = -1, readOnly = false;
var tableHeadings = ["Company", "Contact", "Country"];
var tableRows = [
  ["Alfreds Futterkiste", "Maria Anders", "Germany"],
  ["Centro comercial Moctezuma", "Francisco Chang", "Mexico"],
];

function updateRecordNum(recordNum) {
  let titleText = "", bodyText = "";
  let modalBody = document.getElementById("MyModalBody");
  let modalTitle = document.getElementById("MyModalTitle");
  let modalButton = document.getElementById("MyModalButton");

  const recordsPerRow = 2; selectedRecordNum = recordNum;
  for (let i = 0; i < tableHeadings.length; i += recordsPerRow) {
    for (let j = i; j < Math.min(i + recordsPerRow, tableHeadings.length); j++) {
      bodyText += '<label for="' + tableHeadings[j].toLowerCase() + '">';
      bodyText += tableHeadings[j] + ':</label>';
      for (let k = 0; k < 5; k++) { bodyText += '&nbsp &nbsp &nbsp &nbsp'; }
    }
    bodyText += '<br>';
    for (let j = i; j < Math.min(i + recordsPerRow, tableHeadings.length); j++) {
      const category = tableHeadings[j].toLowerCase();
      bodyText += '<input type="text" id="My' + tableHeadings[j] + '" name="';
      if (recordNum < 0 || recordNum >= tableRows.length) { bodyText += category + '">'; }
      else { bodyText += category + '" value="' + tableRows[recordNum][j] + '">'; }
      bodyText += '&nbsp &nbsp &nbsp &nbsp';
    }
    bodyText += '<br>';
  }

  if (recordNum >= 0 && recordNum < tableRows.length) {
    titleText = "Update Record"; modalButton.onclick = function() { updateRecord(recordNum); } // .onclick = updateRecord(recordNum);
  } else { titleText = "Add Record"; modalButton.onclick = function() { addRecord(recordNum); } } // .onclick = addRecord(recordNum); }
  modalTitle.innerHTML = titleText; modalBody.innerHTML = bodyText;
}

async function updateTable(optionNum) {
  let elem = document.getElementById("myButton");
  elem.innerHTML = tableChoices[optionNum].toString();
  elem = document.getElementById("NotificationLabel"); 
  elem.innerHTML = tableChoices[optionNum].toString() + " records loaded.";
  elem.style.color = "green"; // await SendPostRequest(serverUri, exampleJSON);
  const serverData = await SendGetRequest(serverUri + "/" + tableChoices[optionNum]);
  if (serverData.data) {
    for (let i = 0; i < serverData.data.length; i++) {
      console.log(serverData.data[i]);
      for (var key of Object.keys(serverData.data[i])) {
        console.log(key + " -> " + serverData.data[i][key]);
      }
    }
  } // tableRows = serverData.data;
  renderTable();
}

function checkForCompleteness() {
  for (let i = 0; i < tableHeadings.length; i++) {
    const elemID = "My" + tableHeadings[i];
    const elem = document.getElementById(elemID);
    if (elem.value.toString() === "") { return false; }
  }
  return true;
}

// await SendPostRequest(serverUri, exampleJSON);
updateTable(0); console.log("Application script module imported");
function sortTable(colNum) { console.log("Table was sorted based on " + tableHeadings[colNum] + "."); }
async function removeRecord(recordNum) { console.log("Delete Button has been pressed. Record Number: " + recordNum); } // await SendPostRequest(serverUri, exampleJSON); }

async function addRecord(recordNum) {
  console.log("Add Button has been pressed. Record Number: " + recordNum);
  let elem = document.getElementById("NotificationLabel");
  if (checkForCompleteness()) {
    elem.innerHTML = "Request Sent. Kindly wait for server response.";
    elem.style.color = "green"; // await SendPostRequest(serverUri, exampleJSON);
  } else { elem.innerHTML = "Kindly fill all input fields before sending request."; elem.style.color = "red"; }
}

async function updateRecord(recordNum) {
  console.log("Add Button has been pressed. Record Number: " + recordNum);
  let elem = document.getElementById("NotificationLabel");
  if (checkForCompleteness()) {
    elem.innerHTML = "Request Sent. Kindly wait for server response.";
    elem.style.color = "green"; // await SendPostRequest(serverUri, exampleJSON);
  } else { elem.innerHTML = "Kindly fill all input fields before sending request."; elem.style.color = "red"; }
}

function renderTable() {
  const elem = document.getElementById("viewTable");
  if (readOnly) { document.getElementById("MyAddButton").style.visibility = "hidden"; }
  else { document.getElementById("MyAddButton").style.visibility = "visible"; }
  
  let tableContent = ""; elem.innerHTML = "";
  if (tableHeadings.length > 0) {
    tableContent += "<tr>";
    for (let i = 0; i < tableHeadings.length; i++) {
      tableContent += '<th onclick="sortTable(' + i;
      tableContent += ')">' + tableHeadings[i] + '</th>';
    }

    if (!readOnly) { tableContent += "<th></th>"; }
    tableContent += "</tr>";
    for (let i = 0; i < tableRows.length; i++) {
      const temp = Math.min(tableRows[i].length, tableHeadings.length);
      tableContent += '<tr>';
      for (let j = 0; j < temp; j++) { tableContent += "<td>" + tableRows[i][j] + "</td>"; }
      if (!readOnly) {
        tableContent += '<td style="text-align: center; width: 200px; ">';
        tableContent += '&nbsp &nbsp <button class="btn btn-secondary" ';
        tableContent += 'data-bs-toggle="modal" data-bs-target="#exampleModal" ';
        tableContent += 'onclick="updateRecordNum(' + i + ')">Edit</button> &nbsp &nbsp';
        tableContent += '<button class="btn btn-danger" onclick="removeRecord(' + i;
        tableContent += ')">Delete</button> &nbsp &nbsp </td>';
      }
      tableContent += '</tr>';
    }
  }

  elem.innerHTML = tableContent;
}
