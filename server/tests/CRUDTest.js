
const { CallDatabase } = require("../src/CRUD.js");

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

async function CallDatabaseTestOne() {
  console.log("Running First Database Test (0/2)");
  const testA = { cNum: 2, newData: copyObject(massageExample) }
  await CallDatabase(newRecord, testA);
  console.log("Running First Database Test (1/2)");
  const testB = { cNum: 2, newData: copyObject(employeeExample) }
  await CallDatabase(newRecord, testB);
  console.log("Completed First Database Test (2/2)");
}

async function CallDatabaseTestTwo() {
  console.log("Running Second Database Test (0/2)");
  const testA = { cNum: 2, recordID: massageExample.reference, recordField: "reference" }
  await CallDatabase(getRecord, testA);
  console.log("Running Second Database Test (1/2)");
  const testB = { cNum: 2, recordID: employeeExample.reference, recordField: "reference" }
  await CallDatabase(getRecord, testB);
  console.log("Completed Second Database Test (2/2)");
}

async function CallDatabaseTestThree() {
  console.log("Running Third Database Test (0/2)");
  const testA = { cNum: 2, recordID: massageExample.reference, recordField: "reference", newData: copyObject(newMassageExample) }
  await CallDatabase(changeRecord, testA);
  console.log("Running Third Database Test (1/2)");
  const testB = { cNum: 2, recordID: employeeExample.reference, recordField: "reference", newData: copyObject(newEmployeeExample) }
  await CallDatabase(changeRecord, testB);
  console.log("Completed Third Database Test (2/2)");
}

async function CallDatabaseTestFour() {
  console.log("Running Fourth Database Test (0/2)");
  const testA = { cNum: 2, recordID: newMassageExample.reference, recordField: "reference" }
  await CallDatabase(deleteRecord, testA);
  console.log("Running Fourth Database Test (1/2)");
  const testB = { cNum: 2, recordID: newEmployeeExample.reference, recordField: "reference" }
  await CallDatabase(deleteRecord, testB);
  console.log("Completed Fourth Database Test (2/2)");
}

async function RunAllDBTests() {
  await CallDatabaseTestOne();
  await CallDatabaseTestTwo();
  await CallDatabaseTestThree();
  await CallDatabaseTestFour();
}

console.log("Database testing module Imported");

module.exports = { RunAllDBTests };
