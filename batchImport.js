const { MongoClient } = require('mongodb');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const assert = require('assert');
const fs = require('file-system');
const greetings = JSON.parse(fs.readFileSync('data/greetings.json'));

const batchImport = async (greetings) => {
  console.log(greetings);
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    // connect to the database named 'exercise_1'
    const db = client.db('exercise_1');

    // create a new collection named 'greetings' and insert body from req
    const r = await db.collection('greetings').insertMany(greetings);
    assert.strictEqual(134, r.insertedCount);

    // on success, send
    console.log('Success!');
  } catch (err) {
    // add console error (tested using diff vpn IP address :-))
    console.log('Error: ', err.stack);
  }
  client.close();
};

batchImport(greetings);
