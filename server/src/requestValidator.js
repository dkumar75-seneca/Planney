console.log("Request validator functions module imported");

// function ValidateNumber(input, collectionName, collectionField) { return true; }

function ValidateString(input) {
  const maxLength = 50, allowedCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@+. ";
  for (let i = 0; i < input.length; i++) { if (!allowedCharacters.includes(input[i])) { return false; } }
  if (input.length > maxLength) { return false; }; return true;
}

function ExtractEmployeeRequest(rDetails) {
  const accountsNum = 0, schedulesNum = 1; let rData = {};
  if (!rDetails || !rDetails.requestData) { return null; }
  if (rDetails.categoryNum === accountsNum) {
    if (rDetails.operationNum === 1) {
      rData = { username: null, accessLevel: null, firstName: null, lastName: null, phone: null, email: null, password: null };
    } else if (rDetails.operationNum === 2) {
      rData = { accessLevel: null, firstName: null, lastName: null, phone: null, email: null };
    } else if (rDetails.operationNum === 3) { rData = { username: null }; } else { return null; }
  } else if (rDetails.categoryNum === schedulesNum) {
    if (rDetails.operationNum === 1 || rDetails.operationNum === 2) {
      rData = { location: null, meetingTime: null, therapistName: null, offeredMassages: null, reference: null, status: null, client: null };
    } else if (rDetails.operationNum === 3) { rData = { reference: null }; } else { return null; }
  } else { return null; }

  Object.keys(rData).forEach(function(key) {
    if (!(rDetails.requestData[key] && ValidateString(rDetails.requestData[key]))) { return null; }
    else { rData[key] = rDetails.requestData[key]; }
  }); return { categoryNum: rDetails.categoryNum, operationNum: rDetails.operationNum, requestData: rData };
}

function ExtractCustomerRequest(rDetails) {
  const cancelBooking = -1, initiateBooking = 1;
  if (!rDetails) { return null; }; if (!(typeof rDetails.scheduleReference === "string")) { return null; }
  if (!(rDetails.bookingAction === initiateBooking || rDetails.bookingAction === cancelBooking)) { return null; }
  return { scheduleReference: rDetails.scheduleReference, bookingAction: rDetails.bookingAction };
}

exports.ExtractRequest = function (reqDetails, employee) {
  if (employee) { return ExtractEmployeeRequest(reqDetails); }
  else { return ExtractCustomerRequest(reqDetails); }
}
