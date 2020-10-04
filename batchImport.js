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
  // declare a variable called `client`, and assign it the `MongoClient()
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();
    console.log('Connecting...');

    // connect to the database named 'exercise_2'
    const db = client.db('exercise_2');
    console.log('Connected!');

    // create a new collection named 'greetings' and insert body from req
    const r = await db.collection('greetings').insertMany(greetings);
    console.log('Greetings length is: ', greetings.length);

    assert.strictEqual(greetings.length, r.insertedCount);

    // on success, send
    console.log('Success!', '\n', { status: 201 });
  } catch (err) {
    // on failure, send
    console.log(
      'Error: ',
      '\n',
      { status: 500, message: err.message },
      '\n',
      `Stack error: ${err.stack}`
    );
  }

  // close the connection to the database server
  client.close();
  console.log('Disconnected!');
};

batchImport(greetings);
