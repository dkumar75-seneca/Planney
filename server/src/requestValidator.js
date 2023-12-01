console.log("Request validator functions module imported");

const { randomInt } = require('crypto');

function GenerateRandomOTP(length) {
  let randomPassword = '';
  for (let i = 0; i < length; i++) { const number = randomInt(0, 9); randomPassword += number }
  return randomPassword;
}

// function ValidateNumber(input, collectionName, collectionField) { return true; }

function ValidateString(input) {
  const maxLength = 50, allowedCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789|@+-. ";
  for (let i = 0; i < input.length; i++) { if (!allowedCharacters.includes(input[i])) { return false; } }
  if (input.length > maxLength) { return false; }; return true;
}

function ExtractEmployeeRequest(rDetails) {
  let returnFlag = true, rData = {};
  const accountsNum = 0, schedulesNum = 1, insert = 1, update = 3, remove = 4;
  if (!rDetails || !rDetails.requestData) { return null; }
  if (rDetails.categoryNum === accountsNum) {
    if (rDetails.operationNum === insert) {
      rData = { username: null, accessLevel: null, first: null, last: null, phone: null, email: null, password: null };
    } else if (rDetails.operationNum === update) {
      rData = { accessLevel: null, first: null, last: null, phone: null, email: null, username: null };
    } else if (rDetails.operationNum === remove) { rData = { username: null }; } else { return null; }
  } else if (rDetails.categoryNum === schedulesNum) {
    if (rDetails.operationNum === insert) {
      rData = { location: null, meetingTime: null, therapistName: null, offeredMassages: null };
    } else if (rDetails.operationNum === update) {
      rData = { location: null, meetingTime: null, therapistName: null, offeredMassages: null, reference: null };
    } else if (rDetails.operationNum === remove) { rData = { reference: null }; } else { return null; }
  } else { return null; }

  Object.keys(rData).forEach(function(key) {
    if (key === "accessLevel") {
      if (rDetails.requestData[key] === "1" || rDetails.requestData[key] === 1) { rData[key] = 1; }
      else if (rDetails.requestData[key] === "2" || rDetails.requestData[key] === 2) { rData[key] = 2; }
      else { returnFlag = false; }
    } else if (!(rDetails.requestData[key] && ValidateString(rDetails.requestData[key]))) { returnFlag = false; }
    else { rData[key] = rDetails.requestData[key]; }
  }); 

  if (returnFlag) { 
    if (rDetails.categoryNum === schedulesNum && rDetails.operationNum === insert) {
      rData["reference"] = GenerateRandomOTP(6); rData["status"] = "Vacant"; rData["client"] = "";
    }; return { categoryNum: rDetails.categoryNum, operationNum: rDetails.operationNum, requestData: rData };
  }; return null;
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
