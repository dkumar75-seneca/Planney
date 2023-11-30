console.log("Account validation functions module imported");

const { GetAccountDetails } = require("./accountManagement.js");

var bcrypt = require('bcrypt');

function ValidateString(input) {
  const maxLength = 50, allowedCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@+. ";
  for (let i = 0; i < input.length; i++) { if (!allowedCharacters.includes(input[i])) { return false; } }
  if (input.length > maxLength) { return false; }; return true;
}

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

exports.ValidateCredentials = async function(userCredentials) {
	const accountData = await GetAccountDetails(userCredentials.username);
	if (!accountData || !accountData.password.length > 0) { return -1; } else {
    const passwordMatch = await bcrypt.compare(userCredentials.password, accountData.password);
    if (passwordMatch) { return accountData.accessLevel || -1; } else { return -1; }
	}
}
