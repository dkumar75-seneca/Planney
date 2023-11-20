console.log("Account management functions module imported");

const { ValidateString } = require("./requestValidator.js");
const { collectionNames, collectionFields, collectionAccessRequirements } = require('../database/collectionNames.js');


function GenerateStringHash(input) { return 1; }

exports.GetAccessRights = function(accessLevel, collectionNum) {
  const temp = collectionAccessRequirements[collectionNum];
  let returnValue = { insert: false, read: false, update: false, delete: false };
  Object.keys(temp).forEach(function(key) { if (accessLevel >= temp[key]) { returnValue[key] = true; } });
  return returnValue;
}

exports.FormatUserInfo = function(userDetails) {
  let signUpTemplate = { "first": null, "last": null, "phone": null, "email": null, "username": null };

  Object.keys(signUpTemplate).forEach(function(key) {
    if (!(userDetails[key] && ValidateString(userDetails[key]))) { return null; }
    else { signUpTemplate[key] = userDetails[key]; }
  });

  if (typeof userDetails.password === "string") {
    signUpTemplate["password"] = GenerateStringHash(userDetails.password);
  } else { return null; }; return signUpTemplate;
}

exports.UpdatePassword = async function(username, requestedPass) { return 1; }

exports.SetupOTP = async function(username) { return 1; }

async function GenerateOTP(username) { return 1; }

async function EmailOTP(username) { return 1; }
