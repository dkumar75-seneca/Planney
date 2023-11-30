const { UpdateDatabase } = require("../database/CRUD.js");
const { ValidateCredentials } = require("../src/accountValidator.js");

const dummyAccountOne = {
  accessLevel: 1, userID: "abc", password: "password123",
  username: "bob", phone: "abc", email: "a@b.com"
};

const dummyAccountTwo = {
  accessLevel: 3, userID: "abcd", password: "password1234",
  username: "james", phone: "abcd", email: "c@b.com"
};

async function SetupTestAccount(dummyAccount) {
  const insertRecord = 1, collectionNum = 8;
  const temp = await UpdateDatabase(insertRecord, { cNum: collectionNum, newData: dummyAccount});
  if (temp) { console.log("Test account successfully inserted."); }
  else { console.log("Test account not inserted."); }
}

async function RunValidationTestOne() {
  const exampleCredentials = { username: "bob", password: "password123" };
  const accessLevel = await ValidateCredentials(exampleCredentials);
  console.log("Expected Output: 1, Actual Output: " + accessLevel);
}

async function RunValidationTestTwo() {
  const exampleCredentials = { username: "bob1", password: "password123" };
  const accessLevel = await ValidateCredentials(exampleCredentials);
  console.log("Expected Output: -1, Actual Output: " + accessLevel);
}

async function RunValidationTestThree() {
  const exampleCredentials = { username: "bob", password: "password1234" };
  const accessLevel = await ValidateCredentials(exampleCredentials);
  console.log("Expected Output: -1, Actual Output: " + accessLevel);
}

async function RunValidationTestFour() {
  const exampleCredentials = { username: "james", password: "password1234" };
  const accessLevel = await ValidateCredentials(exampleCredentials);
  console.log("Expected Output: 3, Actual Output: " + accessLevel);
}

async function RunAllAccountValidationTests() {
  // await SetupTestAccount(dummyAccountTwo); // await SetupTestAccount(dummyAccountOne);
  console.log("Running account validation tests (1/4)"); RunValidationTestOne();
  console.log("Running account validation tests (2/4)"); RunValidationTestTwo();
  console.log("Running account validation tests (3/4)"); RunValidationTestThree();
  console.log("Running account validation tests (4/4)"); RunValidationTestFour();
}

console.log("Account validation testing module imported.");

module.exports = { RunAllAccountValidationTests };
  