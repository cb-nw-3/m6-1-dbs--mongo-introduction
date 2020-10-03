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
  const _id = req.params._id;
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

const client = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(DB2);

    const r = db.collection.find();
    console.log(r);
  } catch (err) {
    res.status(500).json({ status: 400, data: _id, message: err.message });
  }
};

module.exports = { createGreeting, getGreeting };
