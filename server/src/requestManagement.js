console.log("Request formatting functions module imported");

const { ValidateString } = require('./requestValidator.js');
const { collectionNames, collectionFields } = require('../database/collectionNames.js');

exports.ExtractCredentials = function(userRequest) {
  let credentials = { "username": null, "password": null };
  if (!userRequest) { return credentials; }
  if (!userRequest.username || !userRequest.password) { return credentials; }
  if (!(typeof userRequest.username === "string")) { return credentials; }
  if (!(typeof userRequest.password === "string")) { return credentials; }
  if (!ValidateString(userRequest.username)) { return credentials; }
  if (!ValidateString(userRequest.password)) { return credentials; }
  return { "username": userRequest.username, "password": userRequest.password }
}

exports.FormatRequestData = function(collectionNum, inputData, ignoreID, ignoreFields) { 
  let startNum = 0; if (ignoreID === true) { startNum = 1; };
  let checkedData = {}; const keyFields = collectionFields[collectionNum];
  let endNum = keyFields.length; if (ignoreFields === true) { endNum = 1; }
  for (let i = startNum; i < endNum; i++) { const fieldName = keyFields[i][0]; checkedData[fieldName] = inputData[fieldName]; }
  return checkedData; // which columns are added to request depends on type of data operation
}
