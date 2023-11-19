console.log("Request formatting functions module imported");

const { collectionNames, collectionFields } = require('../database/collectionNames.js');

// queryDetails = { cNum: 0, newData: 0, recordID: 0 };
exports.FormatRequest = function(collectionNum, inputData) {
  let reqData = { cNum: collectionNum, newData: null, recordID: null };
  console.log(collectionNum, inputData); return reqData;
}
