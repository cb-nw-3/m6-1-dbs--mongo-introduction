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
    console.log('Connecting...');

    // connect to the database named 'exercise_2'
    const db = client.db('exercise_2');
    console.log('Connected!');

    // create a new collection named 'greetings' and insert body from req
    const r = await db.collection('greetings').insertOne(req.body);

    assert.strictEqual(1, r.insertedCount);

    // on success, send
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    // on failure, send
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  // close the connection to the database server
  client.close();
  console.log('Disconnected!');
};

const getGreeting = async (req, res) => {
  const { _id } = req.params;
  console.log('The id is: ', _id);

  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();
  console.log('Connecting...');

  // connect to the database named 'exercise_2'
  const db = client.db('exercise_2');
  console.log('Connected!');

  await db.collection('greetings').findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: 'Not Found' });

    // close the connection to the database server
    client.close();
    console.log('Disconnected!');
  });
};

const getGreetings = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();
  console.log('Connecting...');

  // connect to the database named 'exercise_2'
  const db = client.db('exercise_2');
  console.log('Connected!');

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

        // on success, send
        res
          .status(200)
          .json({ status: 200, start: startNum, limit: endNum, data });
      } else {
        console.log(err.stack);
        // on failure, send
        res.status(404).json({ status: 404, data: 'Not Found' });
      }

      // close the connection to the database server
      client.close();
      console.log('Disconnected!');
    });
};

const deleteGreeting = async (req, res) => {
  const { _id } = req.params;
  console.log('The id is: ', _id);

  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();
    console.log('Connecting...');

    // connect to the database named 'exercise_2'
    const db = client.db('exercise_2');
    console.log('Connected!');

    const r = await db.collection('greetings').deleteOne({ _id });

    assert.strictEqual(1, r.deletedCount);

    // on success, send
    res.status(204).json({ status: 204, data: _id });
  } catch (err) {
    console.log(err.stack);
    // on failure, send
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  // close the connection to the database server
  client.close();
  console.log('Disconnected!');
};

const updateGreeting = async (req, res) => {
  const { _id } = req.params;
  console.log('The id is: ', _id);

  const { hello } = req.body;
  console.log('The query is: ', hello);

  // Add condition to check for "hello" ONLY, else return error
  if (!hello) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: 'Only "hello" can be updated!',
    });
    return;
  }

  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();
    console.log('Connecting...');

    // connect to the database named 'exercise_2'
    const db = client.db('exercise_2');
    console.log('Connected!');

    // we are querying on the _id
    const query = { _id };
    // contains the values that we which to
    const newValues = { $set: { hello } };
    const r = await db.collection('greetings').updateOne(query, newValues);

    // confirm that the database found the document we want to update
    assert.strictEqual(1, r.matchedCount);
    // confirm that the database updated the document
    assert.strictEqual(1, r.modifiedCount);

    // on success, send
    res.status(200).json({ status: 200, _id, ...req.body });
  } catch (err) {
    console.log(err.stack);
    // on failure, send
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  // close the connection to the database server
  client.close();
  console.log('Disconnected!');
};

module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
};
