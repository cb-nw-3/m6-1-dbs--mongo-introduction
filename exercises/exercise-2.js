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

    // connect to the database named 'exercise_2'
    const db = client.db('exercise_2');

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

const getGreeting = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);
  console.log('Start');

  const { _id } = req.params;

  // connect to the client
  await client.connect();
  console.log('The id is: ', _id);

  // connect to the database named 'exercise_2'
  const db = client.db('exercise_2');

  await db.collection('greetings').findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: 'Not Found' });
    client.close();
  });
};

module.exports = { createGreeting, getGreeting };
