const { ObjectId } = require("mongodb");
const { copyObject } = require("../src/helpers.js");
const { UpdateDatabase } = require("./CRUD.js");

const newRecord = 1, getRecord = 2, changeRecord = 3, deleteRecord = 4;
const massageExample = { price: 150, duration: 4, massageName: "Great Massage", reference: "gMassage1" }
const newMassageExample = { price: 50, duration: 2, massageName: "Average Massage", reference: "aMassage1" }

const employeeExample = {
  reference: "FLast1", personName: "First Last",
  personPhone: "15234", employeeTitle: "Therapist",
  offeredMassages: [ "greatMassage", "averageMassage" ]
}

const newEmployeeExample = {
  reference: "LFirst1", personName: "Last First",
  personPhone: "15234", employeeTitle: "Therapist",
  offeredMassages: [ "greatMassage", "averageMassage" ]
}

async function UpdateDatabaseTestOne() {
  console.log("Running First Database Test (0/2)");
  const testA = { cNum: 1, newData: copyObject(massageExample) }
  await UpdateDatabase(newRecord, testA);
  console.log("Running First Database Test (1/2)");
  const testB = { cNum: 2, newData: copyObject(employeeExample) }
  await UpdateDatabase(newRecord, testB);
  console.log("Completed First Database Test (2/2)");
}

async function UpdateDatabaseTestTwo() {
  console.log("Running Second Database Test (0/2)");
  const testA = { cNum: 1, recordID: massageExample.reference }
  await UpdateDatabase(getRecord, testA);
  console.log("Running Second Database Test (1/2)");
  const testB = { cNum: 2, recordID: employeeExample.reference }
  await UpdateDatabase(getRecord, testB);
  console.log("Completed Second Database Test (2/2)");
}

async function UpdateDatabaseTestThree() {
  console.log("Running Third Database Test (0/2)");
  const testA = { cNum: 1, recordNum: massageExample.reference, newData: copyObject(newMassageExample) }
  await UpdateDatabase(changeRecord, testA);
  console.log("Running Third Database Test (1/2)");
  const testB = { cNum: 2, recordNum: employeeExample.reference, newData: copyObject(newEmployeeExample) }
  await UpdateDatabase(changeRecord, testB);
  console.log("Completed Third Database Test (2/2)");
}

async function UpdateDatabaseTestFour() {
  console.log("Running Fourth Database Test (0/2)");
  const testA = { cNum: 1, recordID: newMassageExample.reference }
  await UpdateDatabase(deleteRecord, testA);
  console.log("Running Fourth Database Test (1/2)");
  const testB = { cNum: 2, recordID: newEmployeeExample.reference }
  await UpdateDatabase(deleteRecord, testB);
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
