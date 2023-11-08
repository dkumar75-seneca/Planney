const { MongoClient } = require('mongodb');

// normally you should NOT share credentials (or ANY environment variables) within source code
// but since this is a test database with a restricted user account, its okay for now I guess
const uri = 'mongodb+srv://new-user:Up43nVs3VpvO0Lnk@cluster-dhiraj.xg6us6r.mongodb.net/PlanneyDB';
const client = new MongoClient(uri);

const cNames = [
  "SystemLogs", "Accounts", "Customers", "Employees", "Location", "Roster", "Allocations"
];

const reminderTemplate = {
  title: null, status: null, alertTime: null, description: null
}

const timeslotTemplate = {
  employeeNum: 0, personName: null,
  status: null, roomNumber: 0, slotNumber: 0
}

const massageTemplate = {
  massageNumber: 0, massageName: null, price: 0,
  duration: 0, totalScore: 0, reviewsNumber: 0
}

const cTemplates = [
  { personName: null, actionType: null, description: null, accessTime: null, accountID: null },
  { username: null, password: null, accessLevel: 0, phone: null, email: null, userID: 0 },
  { personName: null, whitelisted: null },
  { personName: null, employeeTitle: null, offeredMassages: [] },
  { state: null, country: null, postalCode: null, streetAddress: null },
  { date: null, branchNum: 0, timeslots: [] },
  { branchNum: 0, rosterNum: 0, slotNumber: 0, customerNum: 0, waitlist: [], reminders: [] }
]

function copyJSON(input) { return JSON.parse(JSON.stringify(input)); }

async function ValidateNewData(newData, cNum) {
  let newDataTemplate = copyJSON(cTemplates[cNum]);
  Object.keys(newDataTemplate).forEach(function(key) {
    if (!newData[key]) { return false; }
    if (isNaN(newDataTemplate[key]) !== isNaN(newData[key])) { return false; }
  });
  return true;
}

async function CreateRecord(collection, newData, cNum) {
  if (ValidateNewData(newData, cNum)) {
    const result = await collection.insertOne(newData);
    console.log(result);
  }
}

async function ReadRecord(collection, recordNum) {
  const query = { _id: { $eq: recordNum } };
  const documents = await collection.findOne(query);
  console.log('Found documents:', documents);
}

async function UpdateRecord(collection, recordNum, newData, cNum) {
  if (ValidateNewData(newData, cNum)) {
    const filter = { _id: { $eq: recordNum } };
    const update = { $set: newData };
    const result = await collection.updateOne(filter, update);
    console.log(result);
  }
}

async function DeleteRecord(collection, recordNum) {
  const query = { _id: { $eq: recordNum } };
  const result = await collection.deleteOne(query);
  if (result.deletedCount === 1) {
    console.log("Successfully deleted one document.");
  } else {
    console.log("No documents matched the query. Deleted 0 documents.");
  }
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
        const collection = client.db().collection(cNames[cNum]);
        if (operationNum === 1 && queryDetails.newData) {
          CreateRecord(collection, queryDetails.newData, cNum);
        } else if (queryDetails.recordNum) {
          if (operationNum === 2) {
            ReadRecord(collection, recordNum);
          } else if (operationNum === 3 && queryDetails.newData, cNum) {
            UpdateRecord(collection, recordNum, newData);
          } else if (operationNum === 4) {
            DeleteRecord(collection, recordNum);
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
