var express = require('express');
var router = express.Router();

planneyModules = require("./index.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/api/*', function(req, res, next) {
  res.send(JSON.stringify({ "message": "GET Request Received" }));
});

router.post('/api/*', function(req, res, next) {
  res.send(req.body);
  console.log(req.body);
});

planneyModules.helpers.testFunction();

//planneyModules.databaseConnector.CreateRecord(1);

module.exports = router;
