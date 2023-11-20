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

  const minPassLength = 6;
  if (typeof userDetails.password === "string" && userDetails.password.length >= minPassLength) {
    signUpTemplate["password"] = GenerateStringHash(userDetails.password);
  } else { return null; }; return signUpTemplate;
}

exports.UpdatePassword = async function(username, requestedPass) { return 1; }

exports.SetupOTP = async function(username) {
  const otpDetails = await GenerateOTP(username);
  if (otpDetails) { return await EmailOTP(username, otpDetails); }
  return "OTP cannot be generated. Please try again later.";
}

async function GenerateOTP(username) { return null; }

async function EmailOTP(username, otpDetails) { return null; }
