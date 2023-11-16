const { CheckRequest } = require("../src/requestValidator.js");

function RunValidatorTestOne() {
  const collectionNum = 2;
  const inputData = {"personName" : "John", "employeeTitle": "Therapist", "offeredMassages": [ "Swiss", "Swedish" ] };
  const returnResult = CheckRequest(collectionNum, inputData, true, false);
  console.log("Expected Value: true | Actual Value: " + returnResult);
}

function RunValidatorTestTwo() {
  const collectionNum = 2;
  const inputData = {"employeeTitle": "Therapist", "offeredMassages": [ "Swiss", "Swedish" ] };
  const returnResult = CheckRequest(collectionNum, inputData, true, false);
  console.log("Expected Value: false | Actual Value: " + returnResult);
}

function RunValidatorTestThree() {
  const collectionNum = 2;
  const inputData = {"personName" : "John", "employeeTitle": "Therapist", "offeredMassages": [ "Swiss", 5 ] };
  const returnResult = CheckRequest(collectionNum, inputData, true, false);
  console.log("Expected Value: false | Actual Value: " + returnResult);
}

function RunValidatorTestFour() {
  const collectionNum = 5;
  const inputData = { "rosterID": "aqwvct567" };
  const returnResult = CheckRequest(collectionNum, inputData, false, true);
  console.log("Expected Value: true | Actual Value: " + returnResult);
}

function RunValidatorTestFive() {
  const collectionNum = 5;
  const inputData = { "rosterID": 168 };
  const returnResult = CheckRequest(collectionNum, inputData, false, true);
  console.log("Expected Value: false | Actual Value: " + returnResult);
}

function RunAllValidatorTests() {
  console.log("Running validatior tests (1/5)"); RunValidatorTestOne();
  console.log("Running validatior tests (2/5)"); RunValidatorTestTwo();
  console.log("Running validatior tests (3/5)"); RunValidatorTestThree();
  console.log("Running validatior tests (4/5)"); RunValidatorTestFour();
  console.log("Running validatior tests (5/5)"); RunValidatorTestFive();
}

console.log("Request validation testing module imported.");

module.exports = { RunAllValidatorTests };
