var express = require('express');
var router = express.Router();
var path = require('path');

planneyModules = require("./index.js");

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

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index.html");
});

for (let i = 0; i < webpages.length; i++) {
  router.get(webpages[i], function(req, res, next) {
    res.sendFile(path.join(__dirname, webLocations[i]));
  });
}

router.get("/api/*", function(req, res, next) {
  res.send(JSON.stringify({ "message": "GET Request Received" }));
});

router.post("/api/*", function(req, res, next) {
  const postResponse = JSON.stringify({ "data": req.body , "message": "POST Request Received" });
  res.send(postResponse); console.log(postResponse);
});

//planneyModules.databaseConnectorTest.RunAllDBTests();

module.exports = router;
