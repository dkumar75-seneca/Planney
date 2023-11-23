console.log("Account management functions module imported");

var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

const { randomInt } = require('crypto');
const { CallDatabase } = require('./CRUD.js');
//const { ValidateString } = require("./accountValidator.js");

function ValidateString(input) {
  const maxLength = 50, allowedCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@+. ";
  for (let i = 0; i < input.length; i++) { if (!allowedCharacters.includes(input[i])) { return false; } }
  if (input.length > maxLength) { return false; }; return true;
}

function copyObject(input) { return JSON.parse(JSON.stringify(input)); };

function GenerateRandomOTP(length) {
  let randomPassword = '';
  for (let i = 0; i < length; i++) { const number = randomInt(0, 9); oneTimePassword += number }
  return randomPassword;
}

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

exports.GetAccountDetails = GetAccountDetails;

exports.FormatUserInfo = async function(userDetails) {
  let signUpTemplate = { "first": null, "last": null, "phone": null, "email": null, "username": null };

  Object.keys(signUpTemplate).forEach(function(key) {
    if (!(userDetails[key] && ValidateString(userDetails[key]))) { return null; }
    else { signUpTemplate[key] = userDetails[key]; }
  });

  const minPassLength = 6; signUpTemplate["accessLevel"] = 1;
  if (typeof userDetails.password === "string" && userDetails.password.length >= minPassLength) {
    signUpTemplate["password"] = await GenerateStringHash(userDetails.password);
  } else { return null; }; return signUpTemplate;
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
