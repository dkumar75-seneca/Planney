console.log("Account management functions module imported");

const { collectionNames, collectionFields } = require('../database/collectionNames.js');

exports.ValidateAccessRights = function(accessLevel) { return 1; }
