const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  console.log(req.body);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db("exercise_1");

    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);

    res.status(201).json({
      status: 201,
      data: req.body,
    });
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

  await client.connect();

  const db = client.db("exercise_1");
  db.collection("greetings").findOne({ _id: _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

const getMultipleGreetings = async () => {
  const client = await MongoClient(MONGO_URI, options);
  console.log("connected");
  await client.connect();
  const db = client.db("exercise_1");
  await db
    .collection("greetings")
    .find()
    .toArray((err, result) => {
      console.log(result);
      result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: "Not Found" });
      client.close();
      console.log("disconnected");
    });
};

module.exports = { createGreeting, getGreeting, getMultipleGreetings };
