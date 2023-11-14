console.log("Request validator functions module imported");

const { collectionNames } = require('../database/collectionNames.js');

exports.CheckRequest = function(collectionNum, request) {
  console.log(collectionNames);
  console.log(collectionNum, request); return true;
}