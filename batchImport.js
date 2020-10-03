const assert = require('assert');
const { DB2 } = require('./exercises/config');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const fs = require('file-system');
const greetings = JSON.parse(fs.readFileSync('data/greetings.json'));

async function batchImport() {
  //   console.log(greetings);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(DB2);

    const r = await db.collection('greetings').insertMany(greetings);
    // assert won't be executed since insert many validates data a throw an error before
    console.log('===>', r.insertedCount, greetings.length);
    assert.strictEqual(greetings.length, r.insertedCount);
  } catch (err) {
    console.log({ status: 500, data: greetings, message: err.message });
  }
}

batchImport();
