console.log("Account validation functions module imported");

const { UpdateDatabase } = require("../database/CRUD.js");
const { collectionNames, collectionFields } = require('../database/collectionNames.js');

var accountDetails = null;

async function GetAccountDetails(username) {
	const readRecord = 2, collectionNum = 8;
  const returnData = await UpdateDatabase(readRecord, {cNum: collectionNum, recordID: username });
	console.log(returnData); return 1;
}

exports.ValidateCredentials = async function(userCredentials) {
	const accountData = await GetAccountDetails(userCredentials.username);
	console.log(accountData);
	return 1;
}
