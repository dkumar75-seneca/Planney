var express = require('express');
var router = express.Router();
var path = require('path');

planneyModules = require("./index.js");

// Client side project code below

const webpages = [
  "/locations", "/massages", "/employees", "/customers", "/timeslots",
  "/rosters", "/reminders", "/allocations", "/accounts", "/systemlogs"
]

const webLocations = [
  "webpages/locations.html", "webpages/massages.html",
  "webpages/employees.html", "webpages/customers.html",
  "webpages/timeslots.html", "webpages/rosters.html",
  "webpages/reminders.html", "webpages/allocations.html",
  "webpages/accounts.html", "webpages/systemlogs.html"
]

router.get("/", function(req, res) {
  res.render("index.html");
});

for (let i = 0; i < webpages.length; i++) {
  router.get(webpages[i], function(req, res) {
    res.sendFile(path.join(__dirname, webLocations[i]));
  });
}

// Client side project code above
// Server side project code below

const apiEndpoints = [
  "/locations", "/massages", "/employees", "/customers", "/timeslots",
  "/rosters", "/reminders", "/allocations", "/accounts", "/systemlogs"
]

for (let i = 0; i < apiEndpoints.length; i++) {
  let currentURI = "/api" + apiEndpoints[i];
  router.get(currentURI, function(req, res) {
    const operationNum = 5, queryDetails = { cNum: i };
    const returnMessage = "GET Request For " + apiEndpoints[i] + " Received";
    planneyModules.databaseConnector.UpdateDatabase(operationNum, queryDetails, returnMessage, res);
  });
}

router.post("/api/*", function(req, res) {
  const postResponse = JSON.stringify({ "data": req.body , "message": "POST Request Received" });
  res.send(postResponse); console.log(postResponse);
});

// Server side project code above

//planneyModules.databaseConnectorTest.RunAllDBTests();

module.exports = router;
