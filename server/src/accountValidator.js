console.log("Account validation functions module imported");

const { UpdateDatabase } = require("../database/CRUD.js");

// NOTE: passwords are intended to be stored as hashes (NOT plaintext),
// it's just I haven't implemented that part in account management module.
// So, that's why current testing is happening in plaintext. Will update this
// to use bcrypt of built in crypto module once that functionality is implemented.

async function GetAccountDetails(username) {
	const readRecord = 2, collectionNum = 8;
  const returnData = await UpdateDatabase(readRecord, {cNum: collectionNum, recordID: username });
	return returnData;
}

exports.ValidateCredentials = async function(userCredentials) {
	const accountData = await GetAccountDetails(userCredentials.username);
	if (!accountData) { return -1; } else {
		if (userCredentials.password === accountData.password) { return accountData.accessLevel; } else { return -1; }
	}
}

exports.ValidateOTP = async function(userCredentials) {
	const accountData = await GetAccountDetails(userCredentials.username);
	if (!accountData) { return false; } else {
    let otpChecks = userCredentials.otp === accountData.otp;
    otpChecks = otpChecks && Date.now() < Date.parse(accountData.otpExpiry);
    otpChecks = otpChecks && accountData.remainingAttempts > 0; return otpChecks;
	}
}
