const { MongoClient } = require('mongodb');

const uri = null; // since this repository is public now, I'll keep the uri separately for testing and demo purposes.
const client = new MongoClient(uri);

function copyObject(input) { return JSON.parse(JSON.stringify(input)); };

const cNames = ["Accounts", "Schedules"];
async function CreateRecord(collection, newData) {
  const result = await collection.insertOne(newData);
  return "Insert request successfully processed.";
}

async function count() {
  const count1 = await database.collection("blogCollection").find({"author":id}).count();
  console.log(count1);
}

async function GetBookingsCount(username) {
  const collection = client.db().collection("Schedules");
  const count = await collection.countDocuments({"client":username});
  return count;
}

async function ReadAllRecords(collection, exclusions) {
  try {
    let testArray = [], temp = {};
    if (exclusions) { for (let i = 0; i < exclusions.length; i++) { temp[exclusions[i]] = 0; } }
    const cursor = await collection.find({}, { projection: temp });
    for await (const doc of cursor) { testArray.push(doc); }
    return testArray;
  } catch (e) { console.log(e); return []; }
}

async function ReadRecord(collection, recordID, recordField) {
  let query = {}; query[recordField] = recordID;
  const result = await collection.findOne(query);
  return result;
}

async function UpdateRecord(collection, recordID, recordField, newData) {
  let filter = {}; filter[recordField] = recordID;
  const update = { $set: newData };
  await collection.updateOne(filter, update);
  return "Update request successfully processed.";
}

async function DeleteRecord(collection, recordID, recordField) {
  let query = {}; query[recordField] = recordID;
  const result = await collection.deleteOne(query);
  if (result.deletedCount === 1) { console.log("Successfully deleted one document."); }
  else { console.log("No documents matched the query. Deleted 0 documents."); };
  return "Delete request successfully processed.";
}

async function CallDatabase(operationNum, queryDetails) {
  try {
    if (queryDetails.cNum || queryDetails.cNum === 0) {
      const cNum = queryDetails.cNum;
      const numChecks = !isNaN(cNum) && cNum >= 0 && cNum <= 1;
      if (numChecks) {
        const newData = queryDetails.newData;
        const collection = client.db().collection(cNames[cNum]);
        if (operationNum === 1 && newData) {
          return await CreateRecord(collection, newData);
        } else if (queryDetails.recordID && queryDetails.recordField) {
          const recordID = queryDetails.recordID;
          const recordField = queryDetails.recordField;
          if (operationNum === 2) {
            return await ReadRecord(collection, recordID, recordField);
          } else if (operationNum === 3 && newData) {
            return await UpdateRecord(collection, recordID, recordField, newData);
          } else if (operationNum === 4) {
            return await DeleteRecord(collection, recordID, recordField);
          } else { console.error("Invalid database operation has been given."); }
        } else if (operationNum === 5) { return await ReadAllRecords(collection, queryDetails.exclusions); }
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

module.exports = { CallDatabase, GetBookingsCount };
