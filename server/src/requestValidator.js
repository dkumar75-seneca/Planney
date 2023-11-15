console.log("Request validator functions module imported");

const { collectionNames, collectionFields } = require('../database/collectionNames.js');

function ValidateString(input) { ; }
function ValidateNumber(input) { ; }
function ValidateBoolean(input) { ; }
function ValidateDatetime(input) { ; }

/*

Employees Example Request Format:
request = {
  personName
  employeeTitle
  offeredMassages
    massageIDs
}

*/

exports.CheckRequest = function(collectionNum, inputData) {
  if (collectionNum < 0 || collectionNum >= collectionNames.length) { return false; }
  const keyFields = collectionFields[collectionNum], chosenCollection = collectionNames[collectionNum];

  for (let i = 0; i < keyFields.length; i++) {
    const fieldName = keyFields[i][0], fieldType = keyFields[i][1];
    if (!inputData[fieldName]) { return false; }
    
    if (fieldType === "string" || fieldType === "number" || fieldType === "boolean") {
      let check = false;
      if (!typeof inputData[fieldName] === fieldType) { return false; }
      if (fieldType === "string") { check = ValidateString(inputData[fieldName]); }
      else if (fieldType === "number") { check = ValidateNumber(inputData[fieldName]); }
      else if (fieldType === "boolean") { check = ValidateBoolean(inputData[fieldName]); }
      if (!check) { return false; }
    } else {
      // if (inputData)
      // baseJSON[keyFields[i][0]] = ;
    }
  }

  console.log(chosenCollection); console.log(keyFields);
  console.log(collectionNum, request); return true;
}