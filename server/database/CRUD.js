const { MongoClient } = require('mongodb');

// normally you should NOT share credentials (or ANY environment variables) within source code
// but since this is a test database with a restricted user account, its okay for now I guess
const uri = 'mongodb+srv://new-user:Up43nVs3VpvO0Lnk@cluster-dhiraj.xg6us6r.mongodb.net/PlanneyDB';
const client = new MongoClient(uri);

const collectionNames = [
  "SystemLogs", "Accounts", "Customers", "Employees", "Location", "Roster", "Allocations"
];

async function CreateRecord(collectionNum, newData) {
  ;
}

async function ReadRecord(collectionNum, recordNum) {
  ;
}

async function UpdateRecord(collectionNum, recordNum, newData) {
  ;
}

async function DeleteRecord(collectionNum, recordNum) {
  ;
}

async function UpdateDatabase(operationNum, queryDetails) {
  try {
    await client.connect(); console.log('Connected to MongoDB');
    if (queryDetails.collectionNum) {
      const collectionNum = queryDetails.collectionNum;
      if (operationNum === 1 && queryDetails.newData) {
        CreateRecord(collectionNum, queryDetails.newData);
      }
      
      if (queryDetails.recordNum) {
        if (operationNum === 2) {
          ReadRecord(collectionNum, recordNum);
        } else if (operationNum === 3 && queryDetails.newData) {
          UpdateRecord(collectionNum, recordNum, newData);
        } else if (operationNum === 4) {
          DeleteRecord(collectionNum, recordNum);
        }
      } else { console.error("No record number provided."); }
    } else { console.error("No collection number provided."); }
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

async function findDocuments() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const collection = client.db().collection('your_collection_name');

  const query = { age: { $gte: 25 } }; // Find documents where age is greater than or equal to 25
  const documents = await collection.find(query).toArray();
  console.log('Found documents:', documents);
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
