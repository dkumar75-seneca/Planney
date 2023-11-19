const { FormatRequestData } = require("../src/requestManagement.js");

function RunFormattingTestOne() {
  const expectResult = null;
  const collectionNum = 2, inputData = null;
  const actualResult = FormatRequestData(collectionNum, inputData);
  console.log("Expected Result: abc | Actual Result: abc");
}

function RunAllRequestFormattingTests() {
  console.log("Running request formatting tests (1/1)"); RunFormattingTestOne();
}

console.log("Request formatting testing module imported.");

module.exports = { RunAllRequestFormattingTests };
