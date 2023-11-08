const { MongoClient } = require('mongodb');

// normally you should NOT share credentials (or ANY environment variables) within source code
// but since this is a test database with a restricted user account, its okay for now I guess
const uri = 'mongodb+srv://new-user:Up43nVs3VpvO0Lnk@cluster-dhiraj.xg6us6r.mongodb.net/PlanneyDB';
const client = new MongoClient(uri);

const cNames = [
  "SystemLogs", "Accounts", "Customers", "Employees", "Location", "Roster", "Allocations"
];

async function ValidateNewData(newData) {
  ;
}

async function CreateRecord(cName, newData) {
  if (ValidateNewData(newData)) {
    //await client;
  }
}

async function ReadRecord(cName, recordNum) {
  const collection = client.db().collection(cName);
  const query = { _id: { $eq: recordNum } };
  const documents = await collection.findOne(query);
  console.log('Found documents:', documents);
}

async function UpdateRecord(cName, recordNum, newData) {
  if (ValidateNewData(newData)) {
    //await client;
  }
}

async function DeleteRecord(cName, recordNum) {
  ;
}

async function UpdateDatabase(operationNum, queryDetails) {
  try {
    await client.connect(); console.log('Connected to MongoDB');

    let invalidReq = false;
    if (queryDetails.cNum) {
      const cNum = queryDetails.cNum;
      let numChecks = !isNaN(cNum) && cNum >= 0;
      numChecks = numChecks && cNum < cNames.length;

      if (numChecks) {
        if (operationNum === 1 && queryDetails.newData) {
          CreateRecord(cNames[cNum], queryDetails.newData);
        } else if (queryDetails.recordNum) {
          if (operationNum === 2) {
            ReadRecord(cNames[cNum], recordNum);
          } else if (operationNum === 3 && queryDetails.newData) {
            UpdateRecord(cNames[cNum], recordNum, newData);
          } else if (operationNum === 4) {
            DeleteRecord(cNames[cNum], recordNum);
          }
        }
      }
    }

    if (invalidReq) { console.error("Incomplete data request."); }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close(); console.log('Disconnected from MongoDB');
  }
}

module.exports = { UpdateDatabase };

/*

async function insertDocument() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const collection = client.db().collection('THIS-IS-JUST-A-TEST');

  const documentToInsert = { name: 'John', age: 30, email: 'john@example.com' };
  const result = await collection.insertOne(documentToInsert);
  console.log('Inserted document:');
  client.close();
}

async function updateDocument() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const collection = client.db().collection('your_collection_name');

  const filter = { name: 'John' };
  const update = { $set: { age: 31 } }; // Update John's age to 31
  const result = await collection.updateOne(filter, update);
  console.log('Updated document:', result);
  client.close();
}

async function deleteDocument() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const collection = client.db().collection('THIS-IS-JUST-A-TEST');

  const filter = { name: 'John' };
  const result = await collection.deleteOne(filter);
  console.log('Deleted document:', result);
  client.close();
}

*/
