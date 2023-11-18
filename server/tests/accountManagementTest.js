const { ValidateAccessRights } = require("../src/accountManagement.js");

/*
exports.collectionAccessRequirements = [
  { insert: 1, read: 1, update: 1, delete: 1 }, { insert: 1, read: 1, update: 1, delete: 1 },
  { insert: 1, read: 1, update: 1, delete: 1 }, { insert: 1, read: 1, update: 1, delete: 1 },
  { insert: 1, read: 1, update: 1, delete: 1 }, { insert: 1, read: 1, update: 1, delete: 1 },
  { insert: 1, read: 1, update: 1, delete: 1 }, { insert: 1, read: 1, update: 1, delete: 1 },
  { insert: 1, read: 1, update: 1, delete: 1 }, { insert: 1, read: 1, update: 1, delete: 1 }
];
*/

function RunAllAccessValidationTests() {
  // Note: this array's accuracy depends upon collectionNames.js values.
  // Thus, attached above is a copy of the collectionNames.js array upon
  // which the expectedResults array values are based upon.
  const expectedResults = [
    { insert: false, read: false, update: false, delete: false },
    { insert: true, read: true, update: true, delete: true },
    { insert: true, read: true, update: true, delete: true },
    { insert: true, read: true, update: true, delete: true },
    { insert: true, read: true, update: true, delete: true },
    { insert: true, read: true, update: true, delete: true }
  ];

  const collectionNum = 4, numAccessLevels = 5;
  for (let i = 0; i <= numAccessLevels; i++) {
    const temp = (i + 1) + "/" + (numAccessLevels + 1);
    console.log("Running access validation tests (" + temp + ")");
    const actualResult = ValidateAccessRights(i, collectionNum);
    let tempNew = "Expected Result: " + JSON.stringify(expectedResults[i]);
    tempNew += " | Actual Result: " + JSON.stringify(actualResult); console.log(tempNew);
  }
}

function RunAllAccountManagementTests() { RunAllAccessValidationTests(); }

console.log("Account management testing module imported.");

module.exports = { RunAllAccountManagementTests };
