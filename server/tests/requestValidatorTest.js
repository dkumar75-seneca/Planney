const { ExtractRequest } = require("../src/requestValidator.js");

function RunValidatorTestOne() {
  const inputData = {
    categoryNum: 1, operationNum: 1,
    requestData: { location: "a", meetingTime: "b", therapistName: "c", offeredMassages: "d" }
  }; const returnResult = ExtractRequest(inputData, true);
  console.log("Expected Value: true | Actual Value: " + returnResult);
}

function RunValidatorTestTwo() {
  const inputData = { scheduleReference: "asd", bookingAction: null };
  const returnResult = ExtractRequest(inputData, false);
  console.log("Expected Value: false | Actual Value: " + returnResult);
}

function RunValidatorTestThree() {
  const inputData = { categoryNum: 1, operationNum: 3, requestData: null };
  const returnResult = ExtractRequest(inputData, true);
  console.log("Expected Value: false | Actual Value: " + returnResult);
}

function RunValidatorTestFour() {
  const inputData = { scheduleReference: "asd", bookingAction: 1 };
  const returnResult = ExtractRequest(inputData, false);
  console.log("Expected Value: true | Actual Value: " + returnResult);
}

function RunValidatorTestFive() {
  const inputData = {
    categoryNum: 1, operationNum: null,
    requestData: { location: "a", meetingTime: "b", therapistName: "c", offeredMassages: "d" }
  }; const returnResult = ExtractRequest(inputData, true);
  console.log("Expected Value: false | Actual Value: " + returnResult);
}

function RunAllRequestValidationTests() {
  console.log("Running request validation tests (1/5)"); RunValidatorTestOne();
  console.log("Running request validation tests (2/5)"); RunValidatorTestTwo();
  console.log("Running request validation tests (3/5)"); RunValidatorTestThree();
  console.log("Running request validation tests (4/5)"); RunValidatorTestFour();
  console.log("Running request validation tests (5/5)"); RunValidatorTestFive();
}

console.log("Request validation testing module imported.");

module.exports = { RunAllRequestValidationTests };
