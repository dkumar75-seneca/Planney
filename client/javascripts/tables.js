// Needs to be same order as drop down menu
let tableChoices = [
  "Locations", "Massages", "Employees", "Customers", "Timeslots",
  "Rosters", "Reminders", "Allocations", "Accounts", "SystemLogs"
];

var inputFields = [];
var readOnly = true, authority = true;
var selectedCollectionNum = 0, selectedRecordNum = -1;
var tableHeadings = ["Company", "Contact", "Country"];
var tableRows = [
  ["Alfreds Futterkiste", "Maria Anders", "Germany"],
  ["Centro comercial Moctezuma", "Francisco Chang", "Mexico"],
];

function adjustStringLength(input, desiredLength) {
  const inputLength = input.length, desiredDifference = desiredLength - inputLength;
  if (desiredDifference <= 2) { return input.substring(0, desiredLength) + ":"; } else {
    let output = ""; paddingLength = Math.floor(desiredDifference / 1);
    for (let i = 0; i < paddingLength; i++) { output += "&nbsp"; }; output += input + ":";
    for (let i = 0; i < paddingLength; i++) { output += "&nbsp"; }; return output;
  }
}

function updateRecordNum(recordNum) {
  let titleText = "", bodyText = "";
  let modalBody = document.getElementById("MyModalBody");
  let modalTitle = document.getElementById("MyModalTitle");
  let modalButton = document.getElementById("MyModalButton");

  const recordsPerRow = 2, temp = selectedCollectionNum; selectedRecordNum = recordNum;
  let headingsCopy = copyObject(tableHeadings[temp]), rowsCopy = copyObject(tableRows[temp]);
  if (tableChoices[temp] === "Accounts") { headingsCopy.push("Password"); rowsCopy.push(""); }
  for (let i = 0; i < headingsCopy.length; i += recordsPerRow) {
    for (let j = i; j < Math.min(i + recordsPerRow, headingsCopy.length); j++) {
      const category = headingsCopy[j].replace(/\s+/g, '-').toLowerCase();
      bodyText += '<label for="' + category + '">' + adjustStringLength(headingsCopy[j], 16) + '</label>';
    }; bodyText += '<br>';

    for (let j = i; j < Math.min(i + recordsPerRow, headingsCopy.length); j++) {
      const category = headingsCopy[j].replace(/\s+/g, '-').toLowerCase();
      bodyText += '<input type="text" class="w-25" id="' + category + '" name="';
      inputFields.push(category);
      if (recordNum >= 0 && recordNum < rowsCopy.length) {
        const tempList = Object.values(rowsCopy[recordNum]);
        bodyText += category + '" value="' + tempList[j] + '">';
      } else { bodyText += category + '">'; }; bodyText += '&nbsp &nbsp';
    }; bodyText += '<br>';
  }

  if (recordNum >= 0 && recordNum < rowsCopy.length) {
    titleText = "Update Record"; modalButton.onclick = function() { updateRecord(recordNum); } // .onclick = updateRecord(recordNum);
  } else { titleText = "Add Record"; modalButton.onclick = function() { addRecord(recordNum); } } // .onclick = addRecord(recordNum); }
  modalTitle.innerHTML = titleText; modalBody.innerHTML = bodyText; // console.log(titleText, bodyText);
}

function updateTable(optionNum) {
  let elem = document.getElementById("myButton");
  elem.innerHTML = tableChoices[optionNum].toString();
  elem = document.getElementById("NotificationLabel"); elem.style.color = "green"; 
  elem.innerHTML = tableChoices[optionNum].toString() + " data has been loaded.";
  selectedCollectionNum = optionNum; renderTable();
}

/*
const input = {
  requestType: 1, userDetails: {
    username: user, password: pass, "first": fname, "last": lname, "phone": phone, "email": email
  }
};
*/

function checkForCompleteness() {
  let result = [];
  for (let i = 0; i < inputFields.length; i++) {
    const elem = document.getElementById(inputFields[i]);
    const temp = elem.value.toString();
    if (temp === "") { return false; } else { console.log(1); result.push(temp); }
  }; return result;
}

// await SendPostRequest(serverUri, exampleJSON);
function sortTable(colNum) { console.log("Table was sorted based on " + tableHeadings[colNum] + "."); }
async function removeRecord(recordNum) { console.log("Delete Button has been pressed. Record Number: " + recordNum); }

async function addRecord(recordNum) {
  console.log("Add Button has been pressed. Record Number: " + recordNum);
  let elem = document.getElementById("NotificationLabel");
  const temp = checkForCompleteness(); inputFields = [];
  if (temp) {
    const requestJSON = { credentials: null, requestType: 5, userData: temp };
    elem.innerHTML = "Request Sent. Kindly wait for server response."; elem.style.color = "green";
    const serverResponse = await SendPostRequest(serverUri, requestJSON); console.log(serverResponse);
  } else { elem.innerHTML = "Kindly fill all input fields before sending request."; elem.style.color = "red"; }
}

async function updateRecord(recordNum) {
  console.log("Update Button has been pressed. Record Number: " + recordNum);
  let elem = document.getElementById("NotificationLabel");
  const temp = checkForCompleteness(); inputFields = [];
  if (temp) {
    const requestJSON = { credentials: null, requestType: 6, userData: temp };
    elem.innerHTML = "Request Sent. Kindly wait for server response."; elem.style.color = "green";
    const serverResponse = await SendPostRequest(serverUri, requestJSON); console.log(serverResponse);
  } else { elem.innerHTML = "Kindly fill all input fields before sending request."; elem.style.color = "red"; }
}

function renderTable() {
  const elem = document.getElementById("viewTable");
  let tableContent = ""; elem.innerHTML = "";
  const temp = selectedCollectionNum;
  if (tableHeadings[temp].length > 0) {
    tableContent += "<tr>"; // if (!readOnly) { tableContent += "<th></th>"; }
    for (let i = 0; i < tableHeadings[temp].length; i++) {
      tableContent += '<th onclick="sortTable(' + i;
      tableContent += ')">' + tableHeadings[temp][i] + '</th>';
    }; tableContent += "<th></th></tr>";

    for (let i = 0; i < tableRows[temp].length; i++) {
      const tempList = Object.values(tableRows[temp][i]);
      const tempNew = Math.min(tempList.length, tableHeadings[temp].length);

      tableContent += '<tr>';
      for (let j = 0; j < tempNew; j++) { tableContent += "<td>" + tempList[j] + "</td>"; }
      for (let j = tempNew; j < tableHeadings[temp].length; j++) { tableContent += "<td></td>"; }
      tableContent += '<td style="text-align: center; width: 200px; ">';
      tableContent += '&nbsp &nbsp <button class="btn btn-secondary" ';
      tableContent += 'data-bs-toggle="modal" data-bs-target="#exampleModal" ';
      if (!readOnly) {
        tableContent += 'onclick="updateRecordNum(' + i + ')">Edit</button> &nbsp &nbsp';
        tableContent += '<button class="btn btn-danger" onclick="removeRecord(' + i;
        tableContent += ')">Delete</button> &nbsp &nbsp </td>';
      } else {
        tableContent += 'onclick="updateRecordNum(' + i + ')">Book</button> &nbsp &nbsp';
        tableContent += '<button class="btn btn-danger" onclick="removeRecord(' + i;
        tableContent += ')">Cancel</button> &nbsp &nbsp </td>';
      }; tableContent += '</tr>';
    }
  }; elem.innerHTML = tableContent;
}
