const { MongoClient } = require('mongodb');
const assert = require('assert');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    // connect to the database named 'exercise_1'
    const db = client.db('exercise_1');

    // create a new collection named 'greetings' and insert body from req
    const r = await db.collection('greetings').insertOne(req.body);
    assert.strictEqual(1, r.insertedCount);

    // on success, send
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    // add console error
    console.log(err.stack);
    // on failure, send
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = { createGreeting };
