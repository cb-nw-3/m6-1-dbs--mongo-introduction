const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    // TODO: connect...
    // TODO: declare 'db'
    // We are using the 'exercises' database
    // and creating a new collection 'greetings'

    await client.connect();

    const db = client.db("exercise_1");
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

const getGreeting = async (req, res) => {
  const _id = req.params.id;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("exercise_1");

  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("exercise_1");

  let start = req.query.start;
  start = start ? start : 0;

  let limit = req.query.limit;
  limit = limit ? limit : 10;

  db.collection("greetings")
    .find({})
    .toArray((err, result) => {
      let data = result;
      data.splice(0, start);
      data = data.slice(0, limit);
      if (result && result.length > 0) {
        res.status(200).json({ status: 200, data: data });
      } else {
        res.status(404).json({ status: 404, data: "Not Found" });
      }
      client.close();
    });
};

const deleteGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("exercise_1");
    const r = await db
      .collection("greetings")
      .deleteOne({ _id: req.params._id });
    assert.equal(1, r.deletedCount);

    res.status(204).json({ status: 204 });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
};
