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

module.exports = { createGreeting, getGreeting };
