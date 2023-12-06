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
  if (tableChoices[temp] === "Schedules") { headingsCopy = headingsCopy.slice(0, -3); rowsCopy.slice(0, -3); }
  for (let i = 0; i < headingsCopy.length; i += recordsPerRow) {
    for (let j = i; j < Math.min(i + recordsPerRow, headingsCopy.length); j++) {
      const category = headingsCopy[j].replace(/\s+/g, '-').toLowerCase();
      bodyText += '<label for="' + category + '">' + adjustStringLength(headingsCopy[j], 16) + '</label>';
    }; bodyText += '<br>';

    for (let j = i; j < Math.min(i + recordsPerRow, headingsCopy.length); j++) {
      const category = headingsCopy[j].replace(/\s+/g, '-').toLowerCase();
      if (headingsCopy[j] === "Password") {
        bodyText += '<input type="password" class="w-25" id="' + category + '" name="';
      } else { bodyText += '<input type="text" class="w-25" id="' + category + '" name="'; }
      inputFields.push(category);
      if (recordNum >= 0 && recordNum < rowsCopy.length) {
        let tempList = [];
        if (tableChoices[temp] === "Accounts") {
          tempList.push(rowsCopy[recordNum].username); tempList.push(rowsCopy[recordNum].accessLevel);
          tempList.push(rowsCopy[recordNum].first); tempList.push(rowsCopy[recordNum].last);
          tempList.push(rowsCopy[recordNum].phone); tempList.push(rowsCopy[recordNum].email);
        } else {
          tempList.push(rowsCopy[recordNum].location); tempList.push(rowsCopy[recordNum].meetingTime);
          tempList.push(rowsCopy[recordNum].therapistName); tempList.push(rowsCopy[recordNum].offeredMassages);
          tempList.push(rowsCopy[recordNum].status); tempList.push(rowsCopy[recordNum].client);
          tempList.push(rowsCopy[recordNum].reference); 
        }
        bodyText += category + '" value="' + tempList[j] + '">';
      } else { bodyText += category + '">'; }; bodyText += '&nbsp &nbsp';
    }; bodyText += '<br>';
  }

  if (recordNum >= 0 && recordNum < rowsCopy.length) {
    titleText = "Update Record"; modalButton.onclick = function() { updateRecord(recordNum); } 
  } else { titleText = "Add Record"; modalButton.onclick = function() { addRecord(recordNum); } }
  modalTitle.innerHTML = titleText; modalBody.innerHTML = bodyText;
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

async function addRecord(recordNum) { const insert = 1; await submitRecord(insert, recordNum); }
async function updateRecord(recordNum) { const edit = 3; await submitRecord(edit, recordNum); }

async function removeRecord(recordNum) {
  let rData = null; const remove = 4;
  if (selectedCollectionNum === 0) { rData = { username: tableRows[0][recordNum].username } }
  else if (selectedCollectionNum === 1) { rData = { reference: tableRows[1][recordNum].reference } }
  const requestJSON = { categoryNum: selectedCollectionNum, operationNum: remove, requestData: rData };
  const input = { requestType: 3, userDetails: credentials, requestDetails: requestJSON };
  let elem = document.getElementById("NotificationLabel");
  elem.innerHTML = "Request Sent. Kindly wait for server response."; elem.style.color = "green";
  const serverResponse = await SendPostRequest(serverUri, input);
  if (serverResponse.data) { SignIntoApplication(serverResponse.data); }  
  else if (serverResponse.error) { elem.innerHTML = "Request Denied. Recheck Data."; elem.style.color = "red"; }
}

async function submitRecord(operationNum, recordNum) {
  let elem = document.getElementById("NotificationLabel");
  const temp = checkForCompleteness(); inputFields = [];
  if (temp) {
    let rData = { a: 1 };
    if (selectedCollectionNum === 0 && operationNum === 1 && temp.length === 7) {
      rData = {
        username: temp[0].toLowerCase(), accessLevel: temp[1], first: temp[2],
        last: temp[3], phone: temp[4], email: temp[5], password: temp[6]
      };
    } else if (selectedCollectionNum === 0 && operationNum === 3 && temp.length === 6) {
      rData = { accessLevel: temp[1], first: temp[2], last: temp[3], phone: temp[4], email: temp[5] };
      if (!(recordNum === -1)) { rData["username"] = tableRows[0][recordNum].username.toLowerCase(); }
    } else if (selectedCollectionNum === 1 && temp.length === 4) {
      rData = { location: temp[0], meetingTime: temp[1], therapistName: temp[2], offeredMassages: temp[3] };
      if (!(recordNum === -1)) { rData["reference"] = tableRows[1][recordNum].reference; }
    } else { console.log("Something unexpected happened with user interface."); return; }
    const requestJSON = { categoryNum: selectedCollectionNum, operationNum: operationNum, requestData: rData };
    const input = { requestType: 3, userDetails: credentials, requestDetails: requestJSON };
    elem.innerHTML = "Request Sent. Kindly wait for server response."; elem.style.color = "green";
    const serverResponse = await SendPostRequest(serverUri, input);
    if (serverResponse.data) { SignIntoApplication(serverResponse.data); }
    else if (serverResponse.error) { elem.innerHTML = "Request Denied. Recheck Data."; elem.style.color = "red"; }
  } else { elem.innerHTML = "Kindly fill all input fields before sending request."; elem.style.color = "red"; }
}

async function bookAppointment(recordNum) {
  if (selectedCollectionNum === 0) {
    const test = tableRows[0][recordNum].status;
    let elem = document.getElementById("NotificationLabel");
    if (test === "Vacant") { let ref = null;
      try { ref = tableRows[0][recordNum].reference } catch (e) { ref = null; }
      if (ref) {
        const requestJSON = { scheduleReference: ref, bookingAction: 1 };
        const input = { requestType: 4, userDetails: credentials, requestDetails: requestJSON };
        const serverResponse = await SendPostRequest(serverUri, input);
        if (serverResponse.data) { SignIntoApplication(serverResponse.data); }
        else if (serverResponse.error) { elem.innerHTML = "Request Denied. Recheck Request."; elem.style.color = "red"; }
        else if (serverResponse.quota) { elem.innerHTML = "Maximum bookings made. Try cancelling some."; elem.style.color = "red"; }
      } else { console.log("Something unexpected happened with booking."); }
    } else { elem.innerHTML = "This slot is already booked. Kindly choose a vacant one."; elem.style.color = "red"; return; }
  }
}

async function cancelAppointment(recordNum) {
  if (selectedCollectionNum === 0) {
    const testOne = tableRows[0][recordNum].status, testTwo = tableRows[0][recordNum].client;
    let elem = document.getElementById("NotificationLabel");
    if (testOne === "Booked" && testTwo === credentials.username) { let ref = null;
      try { ref = tableRows[0][recordNum].reference } catch (e) { ref = null; }
      if (ref) {
        const requestJSON = { scheduleReference: ref, bookingAction: -1 };
        const input = { requestType: 4, userDetails: credentials, requestDetails: requestJSON };
        const serverResponse = await SendPostRequest(serverUri, input);
        if (serverResponse.data) { SignIntoApplication(serverResponse.data); }
        else if (serverResponse.error) { elem.innerHTML = "Request Denied. Recheck Request."; elem.style.color = "red"; }
      } else { console.log("Something unexpected happened with booking cancellation."); }
    } else { elem.innerHTML = "You do not have this slot booked. Kindly choose another one."; elem.style.color = "red"; return; }
  }
}

function renderTable() {
  const elem = document.getElementById("viewTable");
  let tableContent = ""; elem.innerHTML = "";
  const temp = selectedCollectionNum;
  if (tableHeadings[temp].length > 0) {
    tableContent += "<tr>";
    for (let i = 0; i < tableHeadings[temp].length; i++) {
      tableContent += '<th onclick="sortTable(' + i;
      tableContent += ')">' + tableHeadings[temp][i] + '</th>';
    }; tableContent += "<th></th></tr>";

    for (let i = 0; i < tableRows[temp].length; i++) {
      let tempList = [];
      if (tableChoices[temp] === "Accounts") {
        tempList.push(tableRows[temp][i].username); tempList.push(tableRows[temp][i].accessLevel);
        tempList.push(tableRows[temp][i].first); tempList.push(tableRows[temp][i].last);
        tempList.push(tableRows[temp][i].phone); tempList.push(tableRows[temp][i].email);
      } else {
        tempList.push(tableRows[temp][i].location); tempList.push(tableRows[temp][i].meetingTime);
        tempList.push(tableRows[temp][i].therapistName); tempList.push(tableRows[temp][i].offeredMassages);
        tempList.push(tableRows[temp][i].status); tempList.push(tableRows[temp][i].client);
        tempList.push(tableRows[temp][i].reference); 
      }
      const tempNew = Math.min(tempList.length, tableHeadings[temp].length);
      tableContent += '<tr>';
      for (let j = 0; j < tempNew; j++) { tableContent += "<td>" + tempList[j] + "</td>"; }
      for (let j = tempNew; j < tableHeadings[temp].length; j++) { tableContent += "<td></td>"; }
      if (!readOnly) {
        tableContent += '<td style="text-align: center; width: 200px; ">';
        tableContent += '&nbsp &nbsp <button class="btn btn-secondary" ';
        tableContent += 'data-bs-toggle="modal" data-bs-target="#exampleModal" ';
        tableContent += 'onclick="updateRecordNum(' + i + ')">Edit</button> &nbsp &nbsp';
        tableContent += '<button class="btn btn-danger" onclick="removeRecord(' + i;
        tableContent += ')">Delete</button> &nbsp &nbsp </td>';
      } else {
        tableContent += '<br><td style="text-align: center; width: 200px; ">';
        tableContent += '&nbsp &nbsp <button class="btn btn-success" ';
        tableContent += 'onclick="bookAppointment(' + i + ')">Book</button> &nbsp &nbsp';
        tableContent += '<button class="btn btn-danger" onclick="cancelAppointment(' + i;
        tableContent += ')">Cancel</button> &nbsp &nbsp </td>';
      }; tableContent += '</tr>';
    }
  }; elem.innerHTML = tableContent;
}
