var express = require('express');
var router = express.Router();

const planneyModules = require("./index.js");
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

function ExtractCredentials(userRequest) {
  let credentials = { "username": null, "password": null };
  if (!userRequest) { return credentials; }
  if (!userRequest.username || !userRequest.password) { return credentials; }
  if (!(typeof userRequest.username === "string")) { return credentials; }
  if (!(typeof userRequest.password === "string")) { return credentials; }
  if (!planneyModules.requestValidator.ValidateString(userRequest.username)) { return credentials; }
  if (!planneyModules.requestValidator.ValidateString(userRequest.password)) { return credentials; }
  return { "username": userRequest.username, "password": userRequest.password }
}

const accountsIndex = 8;
async function PostRequestHandler(collectionNum, req, res) {
  const postResponse = JSON.stringify({ "data": req.body , "message": "POST Request Received" });
  if (!(req || req === 0) || !(req.body || req.body === 0)) { return; }
  // { res.send(JSON.stringify({ "error": "Failed Input. Recheck Input Data Validity." })); }
  const requestType = req.body.requestType, signup = 1, login = 2, resetPassword = 3; // res.send(postResponse);
  if (collectionNum === accountsIndex && requestType === signup) {
    console.log("Signup functionality still to be implemented.");
  } else if (collectionNum === accountsIndex && requestType === resetPassword) {
    console.log("Reset password functionality still to be implemented.");
  } else {
    const userCredentials = ExtractCredentials(req.body.access);
    const accessLevel = await planneyModules.accountValidator.ValidateCredentials(userCredentials);
    if (accessLevel > 0) {
      if (requestType === login) { res.send(JSON.stringify({ "login": 1 })); return; }
      const accessRights = planneyModules.accountManagement.ValidateAccessRights(accessLevel, collectionNum);
      if (!(req.body.operation || req.body.operation === 0)) { return; }
      // { res.send(JSON.stringify({ "error": "Failed Input. Recheck Input Data Validity." })); }
      let accessChecks = req.body.operation === 1 && accessRights.insert;
      accessChecks = accessChecks || req.body.operation === 3 && accessRights.update;
      accessChecks = accessChecks || req.body.operation === 4 && accessRights.delete;
      if (accessChecks) { console.log(accessChecks); console.log(1); return; }
      else { console.log(2); } // { res.send(JSON.stringify({ "error": "Failed Input. Not Enough Authorisation." })); }
    } else { console.log(3); } // { res.send(JSON.stringify({ "error": "Failed Login. Recheck Credentials." })); }
  }
}

/*
const dummyAccountOne = { accessLevel: 1, userID: "abc", password: "password123", username: "bob", phone: "abc", email: "a@b.com" };
const dummyAccountTwo = { accessLevel: 3, userID: "abcd", password: "password1234", username: "james", phone: "abcd", email: "c@b.com" };
const dummyRequest = { body: { operation: 1, access: dummyAccountOne, data: dummyAccountTwo } };
PostRequestHandler(1, dummyRequest, null);
*/

/*
        if (planneyModules.requestValidator.ValidateRequest(collectionNum, req.body.input)) {
          const sanitisedData = planneyModules.requestFormatter.FormatRequest(collectionNum, req.body.input);
          await planneyModules.databaseConnector.UpdateDatabase(req.body.operation.type, sanitisedData);
        } else { res.send(JSON.stringify({ "error": "Failed Input. Recheck Input Data Validity." })); }
*/

// Server side project code above
// ------------------------------
// Server side testing code below

// planneyModules.databaseConnectorTest.RunAllDBTests();
// planneyModules.accountValidatorTest.RunAllAccountValidationTests();
// planneyModules.accountManagementTest.RunAllAccountManagementTests();
// planneyModules.requestValidatorTest.RunAllRequestValidationTests();
// planneyModules.requestFormatterTest.RunAllRequestFormattingTests();

module.exports = router;
