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
  try {
    const _id = req.params._id;
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(DB2);
    await db.collection('greetings').findOne({ _id }, async (err, result) => {
      if (result) {
        res.status(200).json({ status: 200, _id, data: result });
      } else {
        await db
          .collection('greetings')
          .findOne({ lang: _id }, (err, result) => {
            result
              ? res.status(200).json({ status: 200, lang: _id, data: result })
              : res.status(500).json({ status: 400, message: 'Not found' });
          });
      }
      client.close();
    });
  } catch (err) {
    res.status(500).json({ status: 400, data: _id, message: err.message });
    client.close();
  }
};

// previous version
//   const _id = req.params._id.toUpperCase();
//   try {
//     const client = await MongoClient(MONGO_URI, options);
//     await client.connect();
//     const db = client.db(DB2);

//     await db.collection('greetings').findOne({ _id }, (err, result) => {
//       result
//         ? res.status(200).json({ status: 200, _id, data: result })
//         : res.status(404).json({ status: 404, _id, data: 'Not Found' });
//       client.close();
//     });
//   } catch (err) {
//     res.status(500).json({ status: 400, data: _id, message: err.message });
//     client.close();
//   }
// };

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
          res.status(200).json({
            status: 200,
            start: init,
            limit: end - init,
            data: result.slice(init, end),
          });
          client.close();
        } else {
          res.status(500).json({ status: 400, message: 'Not found' });
        }
      });
  } catch (err) {
    res.status(500).json({ status: 400, message: err.message });
  }
};

//2.5
const deleteGreeting = async (req, res) => {
  const _id = req.params._id.toUpperCase();
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(DB2);

    const r = await db.collection('greetings').deleteOne({ _id });
    assert.strictEqual(1, r.deletedCount);
    client.close();
    res.status(201).json({
      status: 204,
      deletedCount: r.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ status: 500, _id, message: err.message });
    client.close();
  }
};

//2.6
const updateGreeting = async (req, res) => {
  const _id = req.params._id.toUpperCase();
  const value = req.body['hello'];
  if (!!value) {
    try {
      const client = await MongoClient(MONGO_URI, options);
      await client.connect();
      const db = client.db(DB2);

      const r = await db
        .collection('greetings')
        .updateOne({ _id }, { $set: { hello: value } });
      assert.strictEqual(1, r.matchedCount);
      assert.strictEqual(1, r.modifiedCount);
      client.close();
      res.status(201).json({
        status: 204,
        deletedCount: r.deletedCount,
      });
    } catch (err) {
      res.status(500).json({ status: 500, _id, message: err.message });
      client.close();
    }
  } else {
    res.status(500).json({ status: 500, _id, message: 'not valid keys' });
  }
};

module.exports = {
  createGreeting,
  getGreeting,
  getManyGreetings,
  deleteGreeting,
  updateGreeting,
};
