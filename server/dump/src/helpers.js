console.log("Helper functions module imported.");

exports.copyObject = function(input) { return JSON.parse(JSON.stringify(input)); };
