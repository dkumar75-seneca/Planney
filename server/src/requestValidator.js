console.log("Request validator functions module imported");

const { collectionNames, collectionFields } = require('../database/collectionNames.js');

// function ValidateString(input, collectionName, collectionField) { return true; }
// function ValidateNumber(input, collectionName, collectionField) { return true; }

exports.CheckRequest = function(collectionNum, inputData, ignoreID, ignoreFields) {
  if (collectionNum < 0 || collectionNum >= collectionNames.length) { return false; }
  const keyFields = collectionFields[collectionNum];

  // which columns are validated depends on type of data operation 
  let startNum = 0; if (ignoreID === true) { startNum = 1; }
  let endNum = keyFields.length; if (ignoreFields === true) { endNum = 1; }

  for (let i = startNum; i < endNum; i++) {
    const fieldName = keyFields[i][0], fieldType = keyFields[i][1];
    if (!inputData[fieldName]) { return false; }
    if (fieldType === "string" || fieldType === "number") {
      let check = true;
      if (!(typeof inputData[fieldName] === fieldType)) { return false; }
      // if (fieldType === "string") { check = ValidateString(inputData[fieldName], null, null); }
      // else if (fieldType === "number") { check = ValidateNumber(inputData[fieldName], null, null); }
      if (!check) { return false; }
    } else {
      if (Array.isArray(inputData[fieldName])) {
        if (fieldType === "datetime") {
          for (let i = 0; i < inputData[fieldName].length; i++) {
            if (!(typeof inputData[fieldName][i] === "number")) { return false; }
            // if (!ValidateNumber(inputData[fieldName][i], null, null)) { return false; }
          }
        } else {
          for (let i = 0; i < inputData[fieldName].length; i++) {
            if (!(typeof inputData[fieldName][i] === "string")) { return false; }
            // if (!ValidateString(inputData[fieldName][i], null, null)) { return false; }
          }
        }
      } else { return false; }
    }
  }

  return true; // console.log(chosenCollection); console.log(keyFields); console.log(collectionNum, request);
}