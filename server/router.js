var express = require('express');
var router = express.Router();
var path = require('path');

const planneyModules = require("./index.js");
const { collectionNames } = require('./database/collectionNames.js');

// Client side project code below

const webLocations = [
  "webpages/locations.html", "webpages/massages.html",
  "webpages/employees.html", "webpages/customers.html",
  "webpages/timeslots.html", "webpages/rosters.html",
  "webpages/reminders.html", "webpages/allocations.html",
  "webpages/accounts.html", "webpages/systemlogs.html"
]

router.get("/", function(req, res) { res.render("index.html"); });

const webpages = planneyModules.helpers.copyObject(collectionNames);
for (let i = 0; i < webpages.length; i++) {
  const serviceURI = "/" + webpages[i];
  router.get(serviceURI, function(req, res) {
    res.sendFile(path.join(__dirname, webLocations[i]));
  });
}

// Client side project code above
// ------------------------------
// Server side project code below

const apiEndpoints = planneyModules.helpers.copyObject(collectionNames);

function ValidateAccess(accessRights) { return true }

function ExtractCredentials(userRequest) { return { "username": "first", "password": "last" }; }

async function GetRequestHandler(collectionNum, res) {
  const operationNum = 5, queryDetails = { cNum: collectionNum };
  const returnMessage = "GET Request For /" + apiEndpoints[collectionNum] + " Received";
  const returnData = await planneyModules.databaseConnector.UpdateDatabase(operationNum, queryDetails);
  res.send(JSON.stringify({ "testing": returnMessage, "message": returnData }));
}

async function PostRequestHandler(collectionNum, req, res) {
  const postResponse = JSON.stringify({ "data": req.body , "message": "POST Request Received" });
/*
  const userCredentials = ExtractCredentials(req.body.access);
  const accessLevel = planneyModules.accountValidator.ValidateCredentials(userCredentials);
  if (accessLevel > 0) {
    const accessRights = planneyModules.accountManagement.GetAccessRights(accessLevel);
    if (ValidateAccess(req.body.operation, accessRights)) {
      const validRequest = planneyModules.requestValidator.CheckRequest(collectionNum, req.body.input);
      if (validRequest) {
        const insertRequest = 1, updateRecord = 3, deleteRecord = 4;
        const sanitisedData = planneyModules.requestValidator.FormatRequest(collectionNum, req.body.input);
        if (req.body.operation.type === 0) { planneyModules.databaseConnector.UpdateDatabase(insertRequest, sanitisedData); }
        else if (req.body.operation.type === 1) { planneyModules.databaseConnector.UpdateDatabase(updateRecord, sanitisedData); }
        else if (req.body.operation.type === 2) { planneyModules.databaseConnector.UpdateDatabase(deleteRecord, sanitisedData); }
      } else { res.send(JSON.stringify({ "error": "Failed Input. Recheck Input Data Validity." })); }
    } else { res.send(JSON.stringify({ "error": "Failed Input. Not Enough Authorisation." })); }
  } else { res.send(JSON.stringify({ "error": "Failed Login. Recheck Credentials." })); }
*/
  res.send(postResponse);
}

for (let i = 0; i < apiEndpoints.length; i++) {
  const currentURI = "/api/" + apiEndpoints[i];
  router.get(currentURI, function(_, res) { GetRequestHandler(i, res); });
  router.post(currentURI, function(req, res) { PostRequestHandler(i, req, res); });
}

// Server side project code above
// ------------------------------
// Server side testing code below

// planneyModules.databaseConnectorTest.RunAllDBTests();
// planneyModules.requestValidatorTest.RunAllValidatorTests();

// Server side testing code above

module.exports = router;
