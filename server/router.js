var express = require('express');
var router = express.Router();

const planneyModules = require("./index.js");
const { ValidateString } = require('./src/requestValidator.js');
const { collectionNames } = require('./database/collectionNames.js');

router.get("/", function(req, res) { res.render("index.html"); });

const apiEndpoints = planneyModules.helpers.copyObject(collectionNames);
for (let i = 0; i < apiEndpoints.length; i++) {
  const currentURI = "/api/" + apiEndpoints[i];
  router.get(currentURI, function(_, res) { GetRequestHandler(i, res); });
  router.post(currentURI, function(req, res) { PostRequestHandler(i, req, res); });
}

async function GetRequestHandler(collectionNum, res) {
  const operationNum = 5, queryDetails = { cNum: collectionNum };
  const returnMessage = "GET Request For /" + apiEndpoints[collectionNum] + " Received";
  const returnData = await planneyModules.databaseConnector.UpdateDatabase(operationNum, queryDetails);
  res.send(JSON.stringify({ "message": returnMessage, "data": returnData }));
}

function RaiseDataError(res) { res.send(JSON.stringify({ "error": "Failed Input. Recheck Input Data Validity." })); }
async function PostRequestHandler(collectionNum, req, res) {
  const postResponse = JSON.stringify({ "data": req.body , "message": "POST Request Received" }); // res.send(postResponse);
  if (!(req || req === 0) || !(req.body || req.body === 0)) { return; } // { RaiseDataError(res); }
  const requestType = req.body.requestType, signup = 1, login = 2, resetPassword = 3, accountsIndex = 8;
  if (collectionNum === accountsIndex && requestType === signup) {
    if (!req.body.userDetails) { return; } // { RaiseDataError(res); }
    const userInformation = planneyModules.accountManagement.FormatUserInfo(req.body.userDetails);
    if (userInformation) {
      const newRecord = 1, reqQuery = { cNum: collectionNum, newData: userInformation };
      const serverRes = await planneyModules.databaseConnector.UpdateDatabase(newRecord, reqQuery);
    } else { return; } // { RaiseDataError(res); }
  } else if (collectionNum === accountsIndex && requestType === resetPassword) {
    // Verify whether correct OTP is provided and update password to provided one if OTPs match within 5 attempts.
    if (typeof req.body.oneTimePass === "string") {
      const otpStatus = await planneyModules.accountValidator.ValidateOTP(username);
      if (otpStatus && typeof req.body.requestedPass === "string") {
        const passStatus = await planneyModules.accountManagement.UpdatePassword(username, req.body.requestedPass);
        return; // res.send(JSON.stringify({ "data": passStatus }));
      } else { return; } // res.send(JSON.stringify({ "error": "Password Not Provided." }));
    } else {
      const otpStatus = await planneyModules.accountManagement.SetupOTP(username);
      return; // res.send(JSON.stringify({ "data": otpStatus }));
    } // Generate temporary One-Time Password (OTP) and save to database with 5 minute expiry time.
  } else {
    const userCredentials = planneyModules.requestManagement.ExtractCredentials(req.body.access);
    const accessLevel = await planneyModules.accountValidator.ValidateCredentials(userCredentials);
    if (accessLevel > 0) {
      if (requestType === login) { res.send(JSON.stringify({ "data": 1 })); return; }
      const accessRights = planneyModules.accountManagement.GetAccessRights(accessLevel, collectionNum);
      if (!(req.body.operation || req.body.operation === 0)) { return; }; // { RaiseDataError(res); }
      if (planneyModules.requestValidator.ValidateAccessRights(req.body.operation, accessRights)) {
        const x = req.body.operation === 3, y = req.body.operation === 4;
        if (planneyModules.requestValidator.ValidateRequest(collectionNum, req.body.input, x, y)) {
          if (!(typeof req.body.reference === "string")) { return; } // { RaiseDataError(res); }
          if (!planneyModules.requestValidator.ValidateString(req.body.reference)) { return; } // { RaiseDataError(res); }
          const checkedData = planneyModules.requestManagement.FormatRequestData(collectionNum, req.body.input, x, y);
          const reqData = { cNum: collectionNum, newData: checkedData, recordID: req.body.reference };
          const serverRes = await planneyModules.databaseConnector.UpdateDatabase(req.body.operation, reqData);
          // res.send(JSON.stringify({ "data": serverRes }));
        } else { console.log(2); } // { res.send(JSON.stringify({ "error": "Failed Input. Recheck Input Data Validity." })); }
      } else { console.log(3); } // { res.send(JSON.stringify({ "error": "Failed Input. Not Enough Authorisation." })); }
    } else { console.log(4); } // { res.send(JSON.stringify({ "error": "Failed Login. Recheck Credentials." })); }
  }
}

// Server side project code above
// ------------------------------
// Server side testing code below

/*
const inputData = {"personName" : "John", "employeeTitle": "Therapist", "offeredMassages": [ "Swiss", "Swedish" ] };
const dummyAccountOne = { accessLevel: 1, userID: "abc", password: "password123", username: "bob", phone: "abc", email: "a@b.com" };
const dummyAccountTwo = { accessLevel: 3, userID: "abcd", password: "password1234", username: "james", phone: "abcd", email: "c@b.com" };
const dummyRequest = { body: { operation: 3, access: dummyAccountOne, input: inputData, reference: "abc" } };
PostRequestHandler(2, dummyRequest, null);
*/

// planneyModules.databaseConnectorTest.RunAllDBTests();
// planneyModules.accountValidatorTest.RunAllAccountValidationTests();
// planneyModules.accountManagementTest.RunAllAccountManagementTests();
// planneyModules.requestValidatorTest.RunAllRequestValidationTests();
// planneyModules.requestManagementTest.RunAllRequestFormattingTests();

module.exports = router;
