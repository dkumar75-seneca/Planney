const { MongoClient } = require('mongodb');

const uri = "mongodb://dkumar75:omo11KsggCzwMHUWiZUFAOUhHe0xUL0XhcbPO8DTDYoexJ8qW8HhkLmkio0zycG5DgqF34ChkatTACDb0OLYMw==@dkumar75.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@dkumar75@";

async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');

    // You can now perform database operations here
    insertDocument();
    findDocuments();
    updateDocument();
    deleteDocument();

    // Example: List all the collections in the database
    const collections = await client.db().listCollections().toArray();
    console.log('Collections:', collections);

    // Close the database connection when you're done
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

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
