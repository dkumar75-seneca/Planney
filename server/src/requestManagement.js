console.log("Request formatting functions module imported");

const { CallDatabase } = require('./CRUD.js');

async function GetBookingDetails(reference) {
	const readRecord = 2, collectionNum = 1;
  const temp = {cNum: collectionNum, recordID: reference, recordField: "reference" };
  const returnData = await CallDatabase(readRecord, temp);
  return returnData;
}

exports.GetBookingDetails = GetBookingDetails;
