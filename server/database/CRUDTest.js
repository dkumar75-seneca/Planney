const { ObjectId } = require("mongodb");
const { copyObject } = require("../src/helpers.js");
const { UpdateDatabase } = require("./CRUD.js");

const NEW_RECORD = 1, GET_RECORD = 2, CHANGE_RECORD = 3, DELETE_RECORD = 4;

const massageExample = {
  massageName: "GreatMassage", price: 150, duration: 4,
  massageNumber: 2, totalScore: 46, reviewsNumber: 9
}

const newMassageExample = {
  massageName: "AverageMassage", price: 50, duration: 2,
  massageNumber: 2, totalScore: 23, reviewsNumber: 6
}

const employeeExample = {
  personName: "First Last", employeeTitle: "Therapist",
  offeredMassages: [ 1, 2, 3 ]
}

const newEmployeeExample = {
  personName: "Last First", employeeTitle: "Therapist",
  offeredMassages: [ 3, 4, 5 ]
}

async function UpdateDatabaseTestOne() {
  console.log("Running First Database Test (0/2)");
  const testA = { cNum: 1, newData: copyObject(massageExample) }
  await UpdateDatabase(NEW_RECORD, testA);
  console.log("Running First Database Test (1/2)");
  const testB = { cNum: 2, newData: copyObject(employeeExample) }
  await UpdateDatabase(NEW_RECORD, testB);
  console.log("Completed First Database Test (2/2)");
}

async function UpdateDatabaseTestTwo() {
  console.log("Running Second Database Test (0/2)");
  const testA = { cNum: 1, recordID: new ObjectId('654bcf2487cdd920b92d709a') }
  await UpdateDatabase(GET_RECORD, testA);
  console.log("Running Second Database Test (1/2)");
  const testB = { cNum: 2, recordID: new ObjectId('654bd2ffe58c3d09fe330081') }
  await UpdateDatabase(GET_RECORD, testB);
  console.log("Completed Second Database Test (2/2)");
}

async function UpdateDatabaseTestThree() {
  console.log("Running Third Database Test (0/2)");
  const testA = { cNum: 1, recordNum: new ObjectId('654bd3184dede324d020c131'), newData: copyObject(newMassageExample) }
  await UpdateDatabase(CHANGE_RECORD, testA);
  console.log("Running Third Database Test (1/2)");
  const testB = { cNum: 2, recordNum: new ObjectId('654bd34aa30c037d439f27be'), newData: copyObject(newEmployeeExample) }
  await UpdateDatabase(CHANGE_RECORD, testB);
  console.log("Completed Third Database Test (2/2)");
}

async function UpdateDatabaseTestFour() {
  console.log("Running Fourth Database Test (0/2)");
  const testA = { cNum: 1, recordID: new ObjectId('654bd3184dede324d020c131') }
  await UpdateDatabase(DELETE_RECORD, testA);
  console.log("Running Fourth Database Test (1/2)");
  const testB = { cNum: 2, recordID: new ObjectId('654bd34aa30c037d439f27be') }
  await UpdateDatabase(DELETE_RECORD, testB);
  console.log("Completed Fourth Database Test (2/2)");
}

async function RunAllDBTests() {
  await UpdateDatabaseTestOne();
  await UpdateDatabaseTestTwo();
  await UpdateDatabaseTestThree();
  await UpdateDatabaseTestFour();
}

console.log("Database testing module Imported");

module.exports = { RunAllDBTests };
