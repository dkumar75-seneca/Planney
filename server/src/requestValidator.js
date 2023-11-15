console.log("Request validator functions module imported");

const { collectionNames, collectionFields } = require('../database/collectionNames.js');

function ValidateString(input) { return true; }
function ValidateNumber(input) { return true; }

exports.CheckRequest = function(collectionNum, inputData) {
  if (collectionNum < 0 || collectionNum >= collectionNames.length) { return false; }
  const keyFields = collectionFields[collectionNum];

  for (let i = 0; i < keyFields.length; i++) {
    const fieldName = keyFields[i][0], fieldType = keyFields[i][1];
    if (!inputData[fieldName]) { return false; }
    
    if (fieldType === "string" || fieldType === "number") {
      let check = false;
      if (!typeof inputData[fieldName] === fieldType) { return false; }
      if (fieldType === "string") { check = ValidateString(inputData[fieldName]); }
      else if (fieldType === "number") { check = ValidateNumber(inputData[fieldName]); }
      if (!check) { return false; }
    } else {
      if (Array.isArray(inputData[fieldName])) {
        if (fieldType === "datetime") {
          for (let i = 0; i < inputData[fieldName].length; i++) {
            if (!ValidateNumber(inputData[fieldName][i])) { return false; }
          }
        } else {
          for (let i = 0; i < inputData[fieldName].length; i++) {
            if (!ValidateString(inputData[fieldName][i])) { return false; }
          }
        }
      } else { return false; }
    }
  }

  return true; // console.log(chosenCollection); console.log(keyFields); console.log(collectionNum, request);
}