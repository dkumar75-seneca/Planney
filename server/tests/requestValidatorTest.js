const { CheckRequest } = require("../src/requestValidator.js");

function RunValidatiorTestOne() {
  const collectionNum = 2;
  const inputData = {"personName" : "John", "employeeTitle": "Therapist", "offeredMassages": [ "Swiss", "Swedish" ] };
  const returnResult = CheckRequest(collectionNum, inputData, true, false);
  console.log("Expected Value: true | Actual Value: " + returnResult);
}

function RunValidatiorTestTwo() {
  const collectionNum = 2;
  const inputData = {"personName" : "John", "employeeTitle": "Therapist", "offeredMassages": [ "Swiss", 5 ] };
  const returnResult = CheckRequest(collectionNum, inputData, true, false);
  console.log("Expected Value: false | Actual Value: " + returnResult);
}

function RunValidatiorTestThree() {
  const collectionNum = 5;
  const inputData = { "rosterID": "aqwvct567" };
  const returnResult = CheckRequest(collectionNum, inputData, false, true);
  console.log("Expected Value: true | Actual Value: " + returnResult);
}

function RunValidatiorTestFour() {
  const collectionNum = 5;
  const inputData = { "rosterID": 168 };
  const returnResult = CheckRequest(collectionNum, inputData, false, true);
  console.log("Expected Value: false | Actual Value: " + returnResult);
}

function RunAllValidatorTests() {
  console.log("Running validatior tests (1/4)"); RunValidatiorTestOne();
  console.log("Running validatior tests (2/4)"); RunValidatiorTestTwo();
  console.log("Running validatior tests (3/4)"); RunValidatiorTestThree();
  console.log("Running validatior tests (4/4)"); RunValidatiorTestFour();
}

console.log("Request validation testing module imported.");

module.exports = { RunAllValidatorTests };
