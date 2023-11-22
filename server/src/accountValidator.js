console.log("Account validation functions module imported");

const { GetAccountDetails } = require("./accountManagement.js");

var bcrypt = require('bcrypt');

exports.ValidateCredentials = async function(userCredentials) {
	const accountData = await GetAccountDetails(userCredentials.username);
	if (!accountData) { return -1; } else {
    const passwordMatch = await bcrypt.compare(userCredentials.password, accountData.password);
    if (passwordMatch) { return accountData.accessLevel; } else { return -1; }
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
