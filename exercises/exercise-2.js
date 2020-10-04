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

const getGreetings = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);
  console.log('Start');

  // connect to the client
  await client.connect();
  console.log('Connecting...');

  // connect to the database named 'exercise_2'
  const db = client.db('exercise_2');

  await db
    .collection('greetings')
    .find()
    .toArray((err, result) => {
      if (result.length) {
        // create a start number
        const startNum = Number(req.query.start) || 0;
        console.log(`Start number is: ${startNum}`);
        // create an end number
        const endNum = startNum + (Number(req.query.limit) || 25);
        console.log(`End number is: ${endNum}`);
        // slice startNum & endNum from result to get data between
        const data = result.slice(startNum, endNum);
        console.log('Final data:', data);

        res
          .status(200)
          .json({ status: 200, start: startNum, limit: endNum, data });
      } else {
        res.status(404).json({ status: 404, data: 'Not Found' });
      }

      client.close();
    });
};

const deleteGreeting = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  const { _id } = req.params;
  console.log('The id is: ', _id);

  try {
    // connect to the client
    await client.connect();

    // connect to the database named 'exercise_2'
    const db = client.db('exercise_2');
    const r = await db.collection('greetings').deleteOne({ _id });
    assert.strictEqual(1, r.deletedCount);

    // on success, send
    res.status(204).json({ status: 204, data: _id });
  } catch (err) {
    // on failure, send
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = { createGreeting, getGreeting, getGreetings, deleteGreeting };
