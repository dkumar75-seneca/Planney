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

function ValidateAccess(accessRights) { return true; }

function ExtractCredentials(userRequest) { return { "username": "first", "password": "last" }; }

const accountsIndex = 8;
async function PostRequestHandler(collectionNum, req, res) {
  const postResponse = JSON.stringify({ "data": req.body , "message": "POST Request Received" }); res.send(postResponse);
  const requestType = req.body.requestType, signup = 1, login = 2, resetPassword = 3;
/*
  if (collectionNum === accountsIndex && requestType === signup) {
    ;
  } else if (collectionNum === accountsIndex && requestType === resetPassword) {
    ;
  } else {
    const userCredentials = ExtractCredentials(req.body.access);
    const accessLevel = planneyModules.accountValidator.ValidateCredentials(userCredentials);
    if (accessLevel > 0) {
      if (requestType === login) { res.send(JSON.stringify({ "login": 1 })); }
      const accessRights = planneyModules.accountManagement.ValidateAccessRights(accessLevel);
      if (ValidateAccess(req.body.operation, accessRights)) {
        const validRequest = planneyModules.requestValidator.ValidateRequest(collectionNum, req.body.input);
        if (validRequest) {
          const insertRequest = 1, updateRecord = 3, deleteRecord = 4;
          const sanitisedData = planneyModules.requestFormatter.FormatRequest(collectionNum, req.body.input);
          if (req.body.operation.type === 0) { planneyModules.databaseConnector.UpdateDatabase(insertRequest, sanitisedData); }
          else if (req.body.operation.type === 1) { planneyModules.databaseConnector.UpdateDatabase(updateRecord, sanitisedData); }
          else if (req.body.operation.type === 2) { planneyModules.databaseConnector.UpdateDatabase(deleteRecord, sanitisedData); }
        } else { res.send(JSON.stringify({ "error": "Failed Input. Recheck Input Data Validity." })); }
      } else { res.send(JSON.stringify({ "error": "Failed Input. Not Enough Authorisation." })); }
    } else { res.send(JSON.stringify({ "error": "Failed Login. Recheck Credentials." })); }
  }
*/
}

// Server side project code above
// ------------------------------
// Server side testing code below

// planneyModules.databaseConnectorTest.RunAllDBTests();
// planneyModules.accountValidatorTest.RunAllAccountValidationTests();
// planneyModules.accountManagementTest.RunAllAccountManagementTests();
// planneyModules.requestValidatorTest.RunAllRequestValidationTests();
// planneyModules.requestFormatterTest.RunAllRequestFormattingTests();

module.exports = router;
