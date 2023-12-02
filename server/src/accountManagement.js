console.log("Account management functions module imported");

var bcrypt = require('bcrypt');

const { CallDatabase } = require('./CRUD.js');

function ValidateString(input) {
  const maxLength = 50, allowedCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789|@+-. ";
  for (let i = 0; i < input.length; i++) { if (!allowedCharacters.includes(input[i])) { return false; } }
  if (input.length > maxLength) { return false; }; return true;
}

function copyObject(input) { return JSON.parse(JSON.stringify(input)); };

async function GenerateStringHash(input) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(input, saltRounds);
    return hashedPassword;
  } catch (error) { return null; }
}

async function GetAccountDetails(username) {
	const readRecord = 2, collectionNum = 0;
  const temp = {cNum: collectionNum, recordID: username, recordField: "username" };
  const returnData = await CallDatabase(readRecord, temp);
	return returnData;
}

exports.GetAccountDetails = GetAccountDetails;

exports.FormatUserInfo = async function(userDetails, accessLevel) {
  let signUpTemplate = { "first": null, "last": null, "phone": null, "email": null, "username": null };

  Object.keys(signUpTemplate).forEach(function(key) {
    if (!(userDetails[key] && ValidateString(userDetails[key]))) { return null; }
    else if (key === "username") { signUpTemplate[key] = userDetails[key].toLowerCase(); }
    else { signUpTemplate[key] = userDetails[key]; }
  });

  const minPassLength = 6; signUpTemplate["accessLevel"] = accessLevel;
  if (typeof userDetails.password === "string" && userDetails.password.length >= minPassLength) {
    signUpTemplate["password"] = await GenerateStringHash(userDetails.password);
  } else { return null; }; return signUpTemplate;
}


