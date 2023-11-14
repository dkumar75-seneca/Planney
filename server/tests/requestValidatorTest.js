const { copyJSON } = require("../src/helpers.js");
const { CheckRequest } = require("../src/requestValidator.js");

async function RunAllValidatorTests() {
  const operationNum = 1, queryDetails = 1;
  const returnResult = CheckRequest(operationNum, queryDetails);
  if (returnResult) { console.log(1); } else { console.log(0); }
}

console.log("Request validation testing module Imported");

module.exports = { RunAllValidatorTests };
