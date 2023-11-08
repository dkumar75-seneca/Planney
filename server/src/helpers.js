console.log("Helper functions module imported");

exports.copyJSON = function(input) { return JSON.parse(JSON.stringify(input)); };
