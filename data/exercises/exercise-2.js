const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const createGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db("exercise_1");
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json("ok");
    client.close();
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getGreeting = async (req, res) => {
  res.status(200).json("bacon");
  const { _id } = req.param;
  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db("exercise_1");
  db.collection("two").find().toArray();
  client.close();
};
module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
};
