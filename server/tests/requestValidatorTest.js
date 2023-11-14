const { copyObject } = require("../src/helpers.js");
const { CheckRequest } = require("../src/requestValidator.js");

async function RunAllValidatorTests() {
  const collectionNum = 1, queryDetails = { cNum: 1 };
  const returnResult = CheckRequest(collectionNum, queryDetails);
  if (returnResult) { console.log(1); } else { console.log(0); }
}

console.log("Request validation testing module Imported");

module.exports = { RunAllValidatorTests };
