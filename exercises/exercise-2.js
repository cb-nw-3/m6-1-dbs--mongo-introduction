const assert = require("assert");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("exercise_1");
    console.log("connected!");

    const r = await db.collection("greetings").insertOne(req.body);
    assert.strictEqual(1, r.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

const getGreeting = async (req, res) => {
  const { _id } = req.params;
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("exercise_1");
    console.log("connected!");

    await db.collection("greetings").findOne({ _id }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found" });
      client.close();
      console.log("disconnected!");
    });
  } catch (err) {
    console.log(err.stack);
  }
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");

  db.collection("greetings")
    .find()
    .toArray((err, result) => {
      if (result.length) {
        const start = Number(req.query.start) || 0;
        const realStart = start > -1 && start < result.length ? start : 0;
        const end = realStart + (Number(req.query.limit) || 25);
        const realEnd = end > result.length ? result.length - 1 : end;
        const data = result.slice(realStart, realEnd);

        res.status(200).json({ status: 200, data });
      } else {
        res.status(404).json({ status: 404, data: "Something's wrong!" });
      }
      client.close();
      console.log("disconnected!");
    });
};

const deleteGreeting = async (req, res) => {
  const { _id } = req.params;
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("exercise_1");
    console.log("connected!");

    const r = await db
      .collection("greetings")
      .deleteOne({ _id: _id.toUpperCase() });
    assert.strictEqual(1, r.deletedCount);
    res.status(204).json({ status: 204, _id });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = { createGreeting, getGreeting, getGreetings, deleteGreeting };
