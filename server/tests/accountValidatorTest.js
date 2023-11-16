const { UpdateDatabase } = require("../database/CRUD.js");
const { ValidateCredentials } = require("../src/accountValidator.js");

async function SetupTestAccountDetails() {
  const insertRecord = 1, collectionNum = 8;
  const dummyAccount = {
    accessLevel: 1, userID: "abc", password: "password123",
    username: "bob", phone: "abc", email: "a@b.com"
  };

  const temp = await UpdateDatabase(insertRecord, { cNum: collectionNum, newData: dummyAccount});
  if (temp) { console.log("Test account successfully inserted."); }
  else { console.log("Test account not inserted."); }
}

async function RunValidationTestOne() {
  const exampleCredentials = { username: "bob", password: "password123" };
  const accessLevel = await ValidateCredentials(exampleCredentials);
  console.log("Expected Output: ???, Actual Output: " + accessLevel);
}

async function RunAllAccountValidationTests() {
  //await SetupTestAccountDetails();
  console.log("Running account validation tests (1/1)"); RunValidationTestOne();
}

console.log("Account validation testing module imported.");

module.exports = { RunAllAccountValidationTests };
  