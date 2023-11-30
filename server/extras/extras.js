async function EmailOTP(emailDetails) {
  return new Promise((resolve) => {
    // Again, this is NOT good practise but since this a dummy account
    // and we are in localhost so far, should update code for Azure deployment.
    const dummyEmail = { address: "@gmail.com", password: "" };
    let transporter = nodemailer.createTransport({
      service: 'gmail', auth: { user: dummyEmail.address, pass: dummyEmail.password }
    });

    let mailOptions = {
      to: emailDetails.Receiver, text: emailDetails.Message,
      from: dummyEmail.address, subject: 'Planney OTP code for password reset'
    };

    transporter.sendMail(mailOptions, function(error, info) {
      try {
        if (error) { console.error(error); resolve("OTP could not be setup and / or emailed."); }
        else { console.log('Email sent: ' + info.response); resolve("OTP is setup and emailed."); }
      } catch (e) { console.error(e); resolve("OTP could not be setup and / or emailed."); }
    });
  })
}

const operation = 3, accountsIndex = 8;
exports.UpdatePassword = async function(username, requestedPass) {
  const accountData = await GetAccountDetails(username);
	if (!accountData) { return "Password Not Updated."; } else {
    let newAccountData = copyObject(accountData);
    newAccountData.password = await GenerateStringHash(requestedPass);
    if (!newAccountData.password) { return "Password Not Updated."; } else {
      const reqData = { cNum: accountsIndex, newData: newAccountData, recordID: username };
      const passwordUpdated = await planneyModules.databaseConnector.CallDatabase(operation, reqData);
      if (passwordUpdated) { return "Password Updated." } else { return "Password Not Updated."; }
    }
	}
}

exports.SetupOTP = async function(username) {
  const messageOne = "OTP generated. Please check email to proceed.";
  const messageTwo = "OTP could not be setup. Please try again later.";
  const accountData = await GetAccountDetails(username);
	if (!accountData) { return messageTwo; } else {
    const otpLength = 6, oneTimePassword = GenerateRandomOTP(otpLength);
    let emailMessage = "Here is your Planney one time password: " + oneTimePassword;
    emailMessage += ". If you didn't make such an otp request, kindly disregard this email.";
    const emailDetails = { "Receiver": accountData.email, "Message": emailMessage };
    const otpEmailed = await EmailOTP(emailDetails);
    if (!otpEmailed) { return messageTwo; } else {
      const allocatedMinutes = 5, secondsInMin = 60, msInSecond = 1000;
      let newAccountData = copyObject(accountData);
      newAccountData.otp = oneTimePassword; newAccountData.remainingAttempts = 3;
      newAccountData.otpExpiry = new Date(Date.now() + (allocatedMinutes * secondsInMin * msInSecond));
      const reqData = { cNum: accountsIndex, newData: newAccountData, recordID: username };
      const otpSetup = await planneyModules.databaseConnector.CallDatabase(operation, reqData);
      if (otpSetup) { return messageOne; } else { return messageTwo; }
    } 
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
      const otpSetup = await planneyModules.databaseConnector.CallDatabase(operation, reqData);
      if (otpSetup) { return messageOne; } else { return messageTwo; }
    }; return otpChecks;
	}
}

async function ResetPassword(res, oneTimePass, requestedPass) {
  // Verify whether correct OTP is provided and update password to provided one if OTPs match within 5 attempts.
  if (typeof oneTimePass === "string") {
    const otpStatus = await planneyModules.accountValidator.ValidateOTP(username);
    if (otpStatus && typeof requestedPass === "string") {
      const passStatus = await planneyModules.accountManagement.UpdatePassword(username, requestedPass);
      return; // res.send(JSON.stringify({ "data": passStatus }));
    } else { return; } // res.send(JSON.stringify({ "error": "Password Not Provided." }));
  } else {
    const otpStatus = await planneyModules.accountManagement.SetupOTP(username);
    return; // res.send(JSON.stringify({ "data": otpStatus }));
  } // Generate temporary One-Time Password (OTP) and save to database with 5 minute expiry time.
}
  
async function RunServerTests() {
/*
  const inputData = {"personName" : "John", "employeeTitle": "Therapist", "offeredMassages": [ "Swiss", "Swedish" ] };
  const dummyAccountOne = { accessLevel: 1, userID: "abc", password: "password123", username: "bob", phone: "abc", email: "a@b.com" };
  const dummyAccountTwo = { accessLevel: 3, userID: "abcd", password: "password1234", username: "james", phone: "abcd", email: "c@b.com" };
  const dummyRequest = { body: { operation: 3, access: dummyAccountOne, input: inputData, reference: "abc" } };
  PostRequestHandler(2, dummyRequest, null);
*/
  console.log("Starting Server Tests.");
  // planneyModules.databaseConnectorTest.RunAllDBTests();
  // planneyModules.accountValidatorTest.RunAllAccountValidationTests();
  // planneyModules.accountManagementTest.RunAllAccountManagementTests();
  // planneyModules.requestValidatorTest.RunAllRequestValidationTests();
  // planneyModules.requestManagementTest.RunAllRequestFormattingTests();
  console.log("Finishing Server Tests.");
}
  