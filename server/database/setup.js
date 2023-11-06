const { MongoClient } = require('mongodb');

// normally you should NOT share credentials (or ANY environment variables) within source code
// but since this is a test database with a restricted user account, its okay for now I guess
const uri = 'mongodb+srv://new-user:Up43nVs3VpvO0Lnk@cluster-dhiraj.xg6us6r.mongodb.net/PlanneyDB';

async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');

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
