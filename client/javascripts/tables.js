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

  inputFields = [];
  const recordsPerRow = 2, temp = selectedCollectionNum; selectedRecordNum = recordNum;
  let headingsCopy = copyObject(tableHeadings[temp]), rowsCopy = copyObject(tableRows[temp]);
  if (tableChoices[temp] === "Accounts" && recordNum === -1) { headingsCopy.push("Password"); rowsCopy.push(""); }
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

function checkForCompleteness() {
  let result = [];
  for (let i = 0; i < inputFields.length; i++) {
    const elem = document.getElementById(inputFields[i]);
    const temp = elem.value.toString();
    if (temp === "") { return false; } else { result.push(temp); }
  }; return result;
}

function sortTable(colNum) { console.log("Table was sorted based on " + tableHeadings[colNum] + "."); }

// await SendPostRequest(serverUri, exampleJSON);
async function addRecord(recordNum) { const insert = 1; await submitRecord(insert); }
async function updateRecord(recordNum) { const edit = 3; await submitRecord(edit); }

async function removeRecord(recordNum) {
  let rData = null; const remove = 4;
  if (selectedCollectionNum === 0) { rData = { username: tableRows[0][recordNum].username } }
  else if (selectedCollectionNum === 1) { rData = { reference: tableRows[1][recordNum].reference } }
  const requestJSON = { categoryNum: selectedCollectionNum, operationNum: remove, requestData: rData };
  const input = { requestType: 3, userDetails: credentials, requestDetails: requestJSON };
  let elem = document.getElementById("NotificationLabel");
  elem.innerHTML = "Request Sent. Kindly wait for server response."; elem.style.color = "green";
  const serverResponse = await SendPostRequest(serverUri, input);
  if (serverResponse.data) { console.log(serverResponse.data); } // SignIntoApplication(serverResponse.data); }
  else if (serverResponse.error) { elem.innerHTML = "Request Denied. Recheck Data."; elem.style.color = "red"; }
}

/*

  if (rDetails.categoryNum === accountsNum) {
    if (rDetails.operationNum === insert) {
      rData = { username: null, accessLevel: null, firstName: null, lastName: null, phone: null, email: null, password: null };
    } else if (rDetails.operationNum === update) {
      rData = { accessLevel: null, firstName: null, lastName: null, phone: null, email: null };
    } else if (rDetails.operationNum === remove) { rData = { username: null }; } else { return null; }
  } else if (rDetails.categoryNum === schedulesNum) {
    if (rDetails.operationNum === insert || rDetails.operationNum === update) {
      rData = { location: null, meetingTime: null, therapistName: null, offeredMassages: null, reference: null, status: null, client: null };
    } else if (rDetails.operationNum === remove) { rData = { reference: null }; } else { return null; }

*/

async function submitRecord(operationNum) {
  let elem = document.getElementById("NotificationLabel");
  const temp = checkForCompleteness(); inputFields = [];
  if (temp) {
    let rData = { a: 1 };
    if (selectedCollectionNum === 0 && operationNum === 1 && temp.length === 7) {
      rData = {
        username: temp[0], accessLevel: temp[1], first: temp[2],
        last: temp[3], phone: temp[4], email: temp[5], password: temp[6]
      };
    } else if (selectedCollectionNum === 0 && operationNum === 3 && temp.length === 6) {
      rData = { accessLevel: temp[1], first: temp[2], last: temp[3], phone: temp[4], email: temp[5] };
    } else if (selectedCollectionNum === 1 && temp.length === 7) {
      rData = {
        location: temp[0], meetingTime: temp[1], therapistName: temp[2],
        offeredMassages: temp[3], status: temp[4], client: temp[5], reference: temp[6] };
    } else { console.log("Something unexpected happened with user interface."); return; }

    const requestJSON = { categoryNum: selectedCollectionNum, operationNum: operationNum, requestData: rData };
    const input = { requestType: 3, userDetails: credentials, requestDetails: requestJSON };
    elem.innerHTML = "Request Sent. Kindly wait for server response."; elem.style.color = "green";
    const serverResponse = await SendPostRequest(serverUri, input); console.log(serverResponse);
    if (serverResponse.data) { console.log(serverResponse.data); } // SignIntoApplication(serverResponse.data); }
    else if (serverResponse.error) { elem.innerHTML = "Request Denied. Recheck Data."; elem.style.color = "red"; }
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
