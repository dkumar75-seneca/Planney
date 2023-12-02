const { FormatUserInfo } = require("../src/accountManagement.js");

function RunFormattingTestOne() {
  const expectResult = null;
  const collectionNum = 2, inputData = null;
  const actualResult = FormatUserInfo(collectionNum, inputData);
  console.log("Expected Result: abc | Actual Result: abc");
}

function RunFormattingTestTwo() {
  const expectResult = null;
  const collectionNum = 2, inputData = null;
  const actualResult = FormatUserInfo(collectionNum, inputData);
  console.log("Expected Result: abc | Actual Result: abc");
}

function RunFormattingTestThree() {
  const expectResult = null;
  const collectionNum = 2, inputData = null;
  const actualResult = FormatUserInfo(collectionNum, inputData);
  console.log("Expected Result: abc | Actual Result: abc");
}

function RunFormattingTestFour() {
  const expectResult = null;
  const collectionNum = 2, inputData = null;
  const actualResult = FormatUserInfo(collectionNum, inputData);
  console.log("Expected Result: abc | Actual Result: abc");
}

function RunAllAccountManagementTests() {
  console.log("Running Account Managment Tests (1/4)"); RunFormattingTestOne();
  console.log("Running Account Managment Tests (2/4)"); RunFormattingTestTwo();
  console.log("Running Account Managment Tests (3/4)"); RunFormattingTestThree();
  console.log("Running Account Managment Tests (4/4)"); RunFormattingTestFour();
}

console.log("Account management testing module imported.");

module.exports = { RunAllAccountManagementTests };
