const { MongoClient } = require('mongodb');

const { copyObject } = require("../src/helpers.js");

// normally you should NOT share credentials (or ANY environment variables) within source code
// but since this is a test database with a restricted user account, its okay for now I guess
const uri = 'mongodb+srv://new-user:Up43nVs3VpvO0Lnk@cluster-dhiraj.xg6us6r.mongodb.net/PlanneyDB';
const client = new MongoClient(uri);

// Note: cNames and cTemplates list order affect system functionality, think twice before changing order.
// ------------------------------------------------------------------------
const cNames = [
  "Locations", "Massages", "Employees", "Customers", "Timeslots",
  "Rosters", "Reminders", "Allocations", "Accounts", "SystemLogs"
];

const cTemplates = [
  { state: null, country: null, postalCode: null, streetAddress: null },
  { massageName: null, price: 0, duration: 0, massageNumber: 0, totalScore: 0, reviewsNumber: 0 },
  { personName: null, employeeTitle: null, offeredMassages: [] },
  { personName: null, whitelisted: null },
  { status: null, personName: null, employeeNum: 0, roomNumber: 0, slotNumber: 0 },
  { date: null, branchNum: 0, timeslots: [] },
  { title: null, status: null, alertTime: null, description: null },
  { branchNum: 0, rosterNum: 0, slotNumber: 0, customerNum: 0, waitlist: [], reminders: [] },
  { accessLevel: 0, userID: 0, password: null, username: null, phone: null, email: null },
  { personName: null, actionType: null, description: null, accessTime: null, accountID: null }
]
// ------------------------------------------------------------------------
// Note: cNames and cTemplates list order affect system functionality, think twice before changing order.

async function ValidateNewData(newData, cNum) {
  let newDataTemplate = copyObject(cTemplates[cNum]);
  Object.keys(newDataTemplate).forEach(function(key) {
    if (!newData[key]) { return false; }
    if (isNaN(newDataTemplate[key]) !== isNaN(newData[key])) { return false; }
  });
  return true;
}

async function CreateRecord(collection, newData, cNum) {
  if (ValidateNewData(newData, cNum)) {
    const result = await collection.insertOne(newData);
    console.log("Insert Record Result: ", result);
  }
}

async function ReadAllRecords(collection) {
  try {
    let testArray = [];
    const cursor = await collection.find({}, { _id: 0 });
    for await (const doc of cursor) { testArray.push(doc); }
    return testArray;
  } catch (e) { console.log(e); return []; }
}


async function ReadRecord(collection, recordID) {
  const query = { _id: recordID };
  const result = await collection.findOne(query);
  console.log("Read Record Result: ", result);
}

async function UpdateRecord(collection, recordID, newData, cNum) {
  if (ValidateNewData(newData, cNum)) {
    const filter = { _id: recordID };
    const update = { $set: newData };
    const result = await collection.updateOne(filter, update);
    console.log("Update Record Result: ", result);
  }
}

async function DeleteRecord(collection, recordID) {
  const query = { _id: recordID };
  const result = await collection.deleteOne(query);
  if (result.deletedCount === 1) {
    console.log("Successfully deleted one document.");
  } else {
    console.log("No documents matched the query. Deleted 0 documents.");
  }
}

async function UpdateDatabase(operationNum, queryDetails) {
  try {
    if (queryDetails.cNum || queryDetails.cNum === 0) {
      const cNum = queryDetails.cNum;
      let numChecks = !isNaN(cNum) && cNum >= 0;
      numChecks = numChecks && cNum < cNames.length;
      
      if (numChecks) {
        const collection = client.db().collection(cNames[cNum]);
        if (operationNum === 1 && queryDetails.newData) {
          await CreateRecord(collection, queryDetails.newData, cNum);
        } else if (queryDetails.recordID) {
          const recordID = queryDetails.recordID;
          if (operationNum === 2) {
            await ReadRecord(collection, recordID);
          } else if (operationNum === 3 && queryDetails.newData) {
            const newData = queryDetails.newData;
            await UpdateRecord(collection, recordID, newData, cNum);
          } else if (operationNum === 4) {
            await DeleteRecord(collection, recordID);
          } else {
            console.error("Invalid database operation has been given.");
          }
        } else if (operationNum === 5) {
          return await ReadAllRecords(collection);
        }
        else { console.error("Incomplete database query has been given."); }
      } else { console.error("Invalid collection number has been given."); }
    } else { console.error("No collection number has been given."); }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error); return [];
  }
}

async function ListAllCollectionItems() {
  console.log("test 123");
  try {
    await client.connect(); console.log('Connected to MongoDB');
    for(const cName of cNames) {
      try {
        const c = await client.db().collection(cName).distinct('_id', {}, {});
        console.log(c);
      } catch (e) { console.error(e); } }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close(); console.log('Disconnected from MongoDB');
  }
}

async function SetupDatabase() {
  try {
    await client.connect(); console.log('Connected to MongoDB');
    for(const cName of cNames) { try { await client.db().createCollection(cName); } catch (e) { ; } }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close(); console.log('Disconnected from MongoDB');
  }
}

StartDatabase(); console.log("Database module Imported");
async function StartDatabase() { await client.connect(); console.log('Connected to MongoDB'); }
async function StopDatabase() { await client.close(); console.log('Disconnected from MongoDB'); }
async function ExitProgram() { await StopDatabase(); console.log("Server Exiting."); process.exit(); }

process.on('SIGINT', function() { ExitProgram(); });

module.exports = { UpdateDatabase };
