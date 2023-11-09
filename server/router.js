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
  const postResponse = JSON.stringify({ "data": req.body , "message": "POST Request Received" });
  res.send(postResponse); console.log(postResponse);
});

//planneyModules.databaseConnectorTest.RunAllDBTests();

module.exports = router;
