const assert = require('assert');
const { DB2 } = require('./config');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

//2.1
const createGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(DB2);

    const r = await db.collection('greetings').insertOne(req.body);

    assert.strictEqual(1, r.insertedCount);
    client.close();
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    client.close();
  }
};

//2.2 on root batchImport

//2.3

const getGreeting = async (req, res) => {
  const _id = req.params._id.toUpperCase();
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(DB2);

    await db.collection('greetings').findOne({ _id }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: 'Not Found' });
      client.close();
    });
  } catch (err) {
    res.status(500).json({ status: 400, data: _id, message: err.message });
    client.close();
  }
};

//2.4

const getManyGreetings = async (req, res) => {
  const { start = 0, limit = 25 } = req.query;
  const [startInt, limitInt] = Object.values({ start, limit }).map(Number);

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(DB2);

    db.collection('greetings')
      .find()
      .toArray((err, result) => {
        console.log(result);
        if (result.length) {
          const init =
            startInt < 0
              ? 0
              : startInt > result.length
              ? result.length
              : startInt;
          const end =
            startInt + limitInt > result.length
              ? result.length
              : startInt + limitInt;

          console.log('start', start, 'limit', limit, 'init', init, 'end', end);
          res.status(200).json({
            status: 200,
            data: result.slice(init, end),
          });
        } else {
        }
      });
  } catch (err) {
    res.status(500).json({ status: 400, message: err.message });
  }
};

module.exports = { createGreeting, getGreeting, getManyGreetings };
