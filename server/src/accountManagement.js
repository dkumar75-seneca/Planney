console.log("Account management functions module imported");

var crypto = require('crypto');
var nodemailer = require('nodemailer');

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

/*
function GenerateRandomPassword(length) {
  let buffer = new Uint8Array(length);
  crypto.getRandomValues(buffer);
  return btoa(String.fromCharCode.apply(null, buffer));
}
*/
async function GenerateOTP(username) {
  //const oneTimePassword = GenerateRandomPassword(6);
  return null;
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
