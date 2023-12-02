// The purpose of this file is to import all modules from src and tests
// into router.js for use by program without cluttering the code in other files.

exports.databaseConnector = require("./src/CRUD.js");
exports.requestValidator = require("./src/requestValidator.js");
exports.accountValidator = require("./src/accountValidator.js");
exports.requestManagement = require("./src/requestManagement.js");
exports.accountManagement = require("./src/accountManagement.js");

/*

exports.databaseConnectorTest = require("./database/CRUDTest.js");
exports.requestValidatorTest = require("./tests/requestValidatorTest.js");
exports.accountValidatorTest = require("./tests/accountValidatorTest.js");
exports.requestManagementTest = require("./tests/requestManagementTest.js");
exports.accountManagementTest = require("./tests/accountManagementTest.js");

*/
