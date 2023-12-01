var express = require('express');
var router = express.Router();

const planneyModules = require('./index.js');

function copyObject(input) { return JSON.parse(JSON.stringify(input)); };

function RaiseDataError(res) { res.send(JSON.stringify({ "error": "Failed Input. Recheck Input Data Validity." })); }

async function GetAccessLevel(userDetails) {
  const userCredentials = planneyModules.accountValidator.ExtractCredentials(userDetails);
  return await planneyModules.accountValidator.ValidateCredentials(userCredentials);
}

async function SendUserData(res, accessLevel) {
  const aIndex = 0, sIndex = 1, operationNum = 5;
  let serverResponse = {}, queryDetails = { cNum: null, exclusions: null };
  if (accessLevel === 1) {
    queryDetails.cNum = sIndex; queryDetails.exclusions = ["_id", "waitlist"];
    const filteredData = await planneyModules.databaseConnector.CallDatabase(operationNum, queryDetails);
    serverResponse["categories"] = ["Schedules"]; serverResponse["readOnly"] = true;
    serverResponse["headings"] = [["Location", "Meeting Time", "Therapist", "Offered Massages", "Status", "Client", "Reference"]];
    serverResponse["listings"] = [filteredData];
  } else if (accessLevel === 2) {
    queryDetails.cNum = sIndex; queryDetails.exclusions = ["_id", "waitlist"];
    const schedules = await planneyModules.databaseConnector.CallDatabase(operationNum, queryDetails);
    queryDetails.cNum = aIndex; queryDetails.exclusions = ["_id", "password"];
    const accounts = await planneyModules.databaseConnector.CallDatabase(operationNum, queryDetails);
    serverResponse["readOnly"] = false;
    serverResponse["listings"] = [accounts, schedules];
    serverResponse["categories"] = ["Accounts", "Schedules"];
    serverResponse["headings"] = [
      ["Username", "Access Level", "First Name", "Last Name", "Phone", "Email"],
      ["Location", "Meeting Time", "Therapist", "Offered Massages", "Status", "Client", "Reference"]
    ];
  }; res.send(JSON.stringify({ "data": serverResponse }));
}

async function LoginUser(res, userDetails) {
  const userCredentials = planneyModules.accountValidator.ExtractCredentials(userDetails);
  const accessLevel = await planneyModules.accountValidator.ValidateCredentials(userCredentials);
  if (accessLevel > 0) { await SendUserData(res, accessLevel); }
  else { res.send(JSON.stringify({ "error": "Login Failed. Recheck Credentials." })); }
}

async function SignUpUser(res, userDetails, aL1, aL2) {
  if (!userDetails) { RaiseDataError(res); }
  const userInformation = await planneyModules.accountManagement.FormatUserInfo(userDetails, aL1);
  if (userInformation) { const collectionNum = 0;
    const newRecord = 1, reqQuery = { cNum: collectionNum, newData: userInformation };
    const accountCheck = await planneyModules.accountManagement.GetAccountDetails(userInformation.username);
    if (!accountCheck) {
      await planneyModules.databaseConnector.CallDatabase(newRecord, reqQuery); await SendUserData(res, aL2);
    } else { res.send(JSON.stringify({ "error": "Failed Registration. Account Already Exists." })); }
  } else { RaiseDataError(res); }
}

async function GetBookingDetails(reference) {
	const readRecord = 2, collectionNum = 1;
  const temp = {cNum: collectionNum, recordID: reference, recordField: "reference" };
  const returnData = await planneyModules.databaseConnector.CallDatabase(readRecord, temp);
  return returnData;
}

async function ProcessCustomerRequest(res, userDetails, requestDetails) {
  const submitBooking = 1, cancelBooking = -1;
  const accessLevel = await GetAccessLevel(userDetails);
  if (accessLevel === 1) {
    const validUserRequest = planneyModules.requestValidator.ExtractRequest(requestDetails, false);
    if (!validUserRequest) { RaiseDataError(res); } else {
      let bookingDetails = await GetBookingDetails(validUserRequest.scheduleReference);
      if (!bookingDetails) { RaiseDataError(res); } else {
        const checkOne = bookingDetails.status === "Booked";
        const checkTwo = bookingDetails.client === userDetails.username;
        const checkThree = validUserRequest.bookingAction === cancelBooking
        if (bookingDetails.status === "Vacant" && validUserRequest.bookingAction === submitBooking) {
          bookingDetails["status"] = "Booked"; bookingDetails["client"] = userDetails.username;
          const update = 3, reqQuery = {
            cNum: 1, newData: bookingDetails, recordID: validUserRequest.scheduleReference, recordField: "reference" 
          }; await planneyModules.databaseConnector.CallDatabase(update, reqQuery);
          await SendUserData(res, 1);
        } else if (checkOne && checkTwo && checkThree) {
            bookingDetails["status"] = "Vacant"; bookingDetails["client"] = "";
            const update = 3, reqQuery = {
              cNum: 1, newData: bookingDetails, recordID: validUserRequest.scheduleReference, recordField: "reference" 
            }; await planneyModules.databaseConnector.CallDatabase(update, reqQuery);
          await SendUserData(res, 1);
        } else { RaiseDataError(res); }
      }
    }
  } else { res.send(JSON.stringify({ "error": "Login Failed. Recheck Credentials." })); }
}

async function ProcessEmployeeRequest(res, userDetails, requestDetails) {
  const accessLevel = await GetAccessLevel(userDetails);
  if (accessLevel === 2) {
    const validUserRequest = planneyModules.requestValidator.ExtractRequest(requestDetails, true);
    if (!validUserRequest) { RaiseDataError(res); } else {
      if (validUserRequest.operationNum === 1 && validUserRequest.categoryNum === 0) {
        const temp = validUserRequest.requestData.accessLevel;
        await SignUpUser(res, validUserRequest.requestData, temp, 2);
      } else if (validUserRequest.operationNum === 1 && validUserRequest.categoryNum === 1) {
        const newRecord = 1, reqQuery = { cNum: 1, newData: validUserRequest.requestData };
        await planneyModules.databaseConnector.CallDatabase(newRecord, reqQuery); await SendUserData(res, 2);
      } else if (validUserRequest.operationNum === 3 && validUserRequest.categoryNum === 0) {
        const reqQuery = {
          cNum: validUserRequest.categoryNum, newData: validUserRequest.requestData,
          recordID: validUserRequest.requestData.username, recordField: "username" 
        }; await planneyModules.databaseConnector.CallDatabase(validUserRequest.operationNum, reqQuery);
        await SendUserData(res, 2);
      } else if (validUserRequest.operationNum === 3 && validUserRequest.categoryNum === 1) {
        const reqQuery = {
          cNum: validUserRequest.categoryNum, newData: validUserRequest.requestData,
          recordID: validUserRequest.requestData.reference, recordField: "reference" 
        }; await planneyModules.databaseConnector.CallDatabase(validUserRequest.operationNum, reqQuery);
        await SendUserData(res, 2);
      } else if (validUserRequest.operationNum === 4 && validUserRequest.categoryNum === 0) {
        const reqQuery = {
          cNum: validUserRequest.categoryNum, recordID: validUserRequest.requestData.username, recordField: "username" 
        }; await planneyModules.databaseConnector.CallDatabase(validUserRequest.operationNum, reqQuery);
        await SendUserData(res, 2);
      } else if (validUserRequest.operationNum === 4 && validUserRequest.categoryNum === 1) {
        const reqQuery = {
          cNum: validUserRequest.categoryNum, recordID: validUserRequest.requestData.reference, recordField: "reference" 
        }; await planneyModules.databaseConnector.CallDatabase(validUserRequest.operationNum, reqQuery);
        await SendUserData(res, 2);
      } else { RaiseDataError(res); }      
    }
  } else { res.send(JSON.stringify({ "error": "Login Failed. Recheck Credentials." })); }
}

router.post("/api", function(req, res) {
  if (!(req || req === 0) || !(req.body || req.body === 0)) { RaiseDataError(res); }
  const requestType = req.body.requestType, signup = 1, login = 2, employee = 3, customer = 4;
  if (requestType === signup) { SignUpUser(res, req.body.userDetails, 1, 1); }
  else if (requestType === login) { LoginUser(res, req.body.userDetails); }
  else if (requestType === employee) { ProcessEmployeeRequest(res, req.body.userDetails, req.body.requestDetails); }
  else if (requestType === customer) { ProcessCustomerRequest(res, req.body.userDetails, req.body.requestDetails); }
  else { RaiseDataError(res); } 
});

router.get("/", function(_, res) { res.render("index.html"); });

module.exports = router;
