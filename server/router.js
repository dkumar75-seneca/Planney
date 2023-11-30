var express = require('express');
var router = express.Router();

const planneyModules = require('./index.js');

function copyObject(input) { return JSON.parse(JSON.stringify(input)); };

function RaiseDataError(res) { res.send(JSON.stringify({ "error": "Failed Input. Recheck Input Data Validity." })); }

async function SendUserData(res, accessLevel) {
  const aIndex = 0, sIndex = 1, operationNum = 5;
  let serverResponse = {}, queryDetails = { cNum: null, exclusions: null };
  if (accessLevel === 1) {
    queryDetails.cNum = sIndex; queryDetails.exclusions = ["_id", "client", "waitlist"];
    const filteredData = await planneyModules.databaseConnector.CallDatabase(operationNum, queryDetails);
    serverResponse["categories"] = ["Schedules"]; serverResponse["readOnly"] = true;
    serverResponse["headings"] = [["Entry Number", "Address", "Meeting Time", "Therapist", "Offered Massages", "Status"]];
    serverResponse["listings"] = [filteredData];
  } else if (accessLevel === 2) {
    queryDetails.cNum = sIndex; queryDetails.exclusions = ["waitlist"];
    const schedules = await planneyModules.databaseConnector.CallDatabase(operationNum, queryDetails);
    queryDetails.cNum = aIndex; queryDetails.exclusions = ["password"];
    const accounts = await planneyModules.databaseConnector.CallDatabase(operationNum, queryDetails);
    serverResponse["readOnly"] = false;
    serverResponse["listings"] = [accounts, schedules];
    serverResponse["categories"] = ["Accounts", "Schedules"];
    serverResponse["headings"] = [
      ["Account Number", "Access Level", "First Name", "Last Name", "Username", "Email", "Phone"],
      ["Entry Number", "Address", "Meeting Time", "Therapist", "Offered Massages", "Status", "Client"]
    ]; //console.log(serverResponse);
  }; res.send(JSON.stringify({ "data": serverResponse }));
}

async function LoginUser(res, userDetails) {
  const userCredentials = planneyModules.accountValidator.ExtractCredentials(userDetails);
  const accessLevel = await planneyModules.accountValidator.ValidateCredentials(userCredentials);
  if (accessLevel >= 0) { await SendUserData(res, accessLevel); }
  else { res.send(JSON.stringify({ "error": "Login Failed. Recheck Credentials." })); }
}

async function SignUpUser(res, userDetails) {
  if (!userDetails) { RaiseDataError(res); }
  const userInformation = await planneyModules.accountManagement.FormatUserInfo(userDetails);
  if (userInformation) { const collectionNum = 0;
    const newRecord = 1, reqQuery = { cNum: collectionNum, newData: userInformation };
    const accountCheck = await planneyModules.accountManagement.GetAccountDetails(userInformation.username);
    if (!accountCheck) {
      // const postResponse = JSON.stringify({ "data": 1 }); res.send(postResponse);
      await planneyModules.databaseConnector.CallDatabase(newRecord, reqQuery); await SendUserData(res, 1);
    } else { res.send(JSON.stringify({ "error": "Failed Registration. Account Already Exists." })); }
  } else { RaiseDataError(res); }
}

async function ProcessViewerRequest(res, userDetails) { RaiseDataError(res); }
async function ProcessCustomerRequest(res, userDetails) { RaiseDataError(res); }
async function ProcessEmployeeRequest(res, userDetails) { RaiseDataError(res); }

router.post("/api", function(req, res) {
  const postResponse = JSON.stringify({ "data": req.body , "message": "POST Request Received" });
  if (!(req || req === 0) || !(req.body || req.body === 0)) { RaiseDataError(res); }
  const requestType = req.body.requestType, signup = 1, login = 2, employee = 3, customer = 4;
  if (requestType === signup) { SignUpUser(res, req.body.userDetails); }
  else if (requestType === login) { LoginUser(res, req.body.userDetails); }
  else if (requestType === employee) { ProcessEmployeeRequest(res, req.body.userDetails); }
  else if (requestType === customer) { ProcessCustomerRequest(res, req.body.userDetails); }
  else { res.send(postResponse); console.log(req.body); } // RaiseDataError(res);
});

router.get("/", function(_, res) { res.render("index.html"); });

module.exports = router;
