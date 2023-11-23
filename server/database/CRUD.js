const { MongoClient } = require('mongodb');

const { copyObject } = require("../src/helpers.js");
const { collectionNames, collectionTemplates } = require('./collectionNames.js');

// normally you should NOT share credentials (or ANY environment variables) within source code
// but since this is a test database with a restricted user account, its okay for now I guess
const uri = 'mongodb+srv://new-user:Up43nVs3VpvO0Lnk@cluster-dhiraj.xg6us6r.mongodb.net/PlanneyDB';
const client = new MongoClient(uri);

// Note: cNames and cTemplates list order synchronisation affect system functionality.
// ------------------------------------------------------------------------
const cNames = copyObject(collectionNames);
const cTemplates = copyObject(collectionTemplates);
// ------------------------------------------------------------------------
// Note: cNames and cTemplates list order synchronisation affect system functionality.

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
    return "Insert request successfully processed.";
  } else { return "Invalid data type provided, insert request rejected."; }
}

async function ReadAllRecords(collection) {
  try {
    let testArray = [];
    const cursor = await collection.find({}, { projection: {_id:0} });
    for await (const doc of cursor) { console.log(doc); testArray.push(doc); }
    return testArray;
  } catch (e) { console.log(e); return []; }
}

async function ReadRecord(collection, recordID) {
  const query = { reference: recordID };
  const result = await collection.findOne(query);
  return result;
}

async function UpdateRecord(collection, recordID, newData, cNum) {
  if (ValidateNewData(newData, cNum)) {
    const filter = { reference: recordID };
    const update = { $set: newData };
    const result = await collection.updateOne(filter, update);
    return "Update request successfully processed.";
  } else { return "Invalid data type provided, update request rejected."; }
}

async function DeleteRecord(collection, recordID) {
  const query = { reference: recordID };
  const result = await collection.deleteOne(query);
  if (result.deletedCount === 1) { console.log("Successfully deleted one document."); }
  else { console.log("No documents matched the query. Deleted 0 documents."); };
  return "Delete request successfully processed.";
}

async function UpdateDatabase(operationNum, queryDetails) {
  try {
    if (queryDetails.cNum || queryDetails.cNum === 0) {
      const cNum = queryDetails.cNum;
      let numChecks = !isNaN(cNum) && cNum >= 0;
      numChecks = numChecks && cNum < cNames.length;
      
      if (numChecks) {
        const newData = queryDetails.newData;
        const collection = client.db().collection(cNames[cNum]);
        if (operationNum === 1 && newData) {
          return await CreateRecord(collection, newData, cNum);
        } else if (queryDetails.recordID) {
          const recordID = queryDetails.recordID;
          if (operationNum === 2) {
            return await ReadRecord(collection, recordID);
          } else if (operationNum === 3 && newData) {
            return await UpdateRecord(collection, recordID, newData, cNum);
          } else if (operationNum === 4) {
            return await DeleteRecord(collection, recordID);
          } else { console.error("Invalid database operation has been given."); }
        } else if (operationNum === 5) { return await ReadAllRecords(collection); }
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
