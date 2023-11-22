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
    otpChecks = otpChecks && accountData.remainingAttempts > 0;
    if (accountData.remainingAttempts > 0) {
      const operation = 3, accountsIndex = 8;
      let newAccountData = copyObject(accountData); newAccountData.remainingAttempts -= 1;
      const reqData = { cNum: accountsIndex, newData: newAccountData, recordID: username };
      const otpSetup = await planneyModules.databaseConnector.UpdateDatabase(operation, reqData);
      if (otpSetup) { return messageOne; } else { return messageTwo; }
    }; return otpChecks;
	}
}
