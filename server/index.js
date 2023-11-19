// The purpose of this file is to import all modules from src and tests
// into router.js for use by program without cluttering the code in other files.

exports.helpers = require("./src/helpers.js");

exports.accountValidator = require("./src/accountValidator.js");
exports.accountValidatorTest = require("./tests/accountValidatorTest.js");

exports.accountManagement = require("./src/accountManagement.js");
exports.accountManagementTest = require("./tests/accountManagementTest.js");

exports.requestValidator = require("./src/requestValidator.js");
exports.requestValidatorTest = require("./tests/requestValidatorTest.js");

exports.requestManagement = require("./src/requestManagement.js");
exports.requestManagementTest = require("./tests/requestManagementTest.js");

exports.databaseConnector = require("./database/CRUD.js");
exports.databaseConnectorTest = require("./database/CRUDTest.js");
