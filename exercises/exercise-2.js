const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("exercises");
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

const getGreeting = async (req, res) => {
  const { _id } = req.params;
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("exercises");
  db.collection("greetings").findOne({ _id: _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

const findMultiple = async (req, res) => {
  let { start, limit } = req.query;
  if (start === undefined) {
    start = 10;
  }
  if (limit === undefined) {
    limit = 10;
  }
  console.log(start);
  console.log(limit);
  let lastIndex = parseInt(start) + parseInt(limit);
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("exercises");
  let foundItems = await db.collection("greetings").find().toArray();

  let slice;
  if (lastIndex > foundItems.length - 1) {
    slice = foundItems.slice(start);
    limit = foundItems.length - parseInt(start);
  } else {
    console.log("inside else");
    slice = foundItems.slice(start, lastIndex);
  }
  if (foundItems.length >= 1) {
    res
      .status(200)
      .json({ status: 200, start: start, limit: limit, data: slice });
  } else {
    res.status(404).json({ status: 404, message: "could not find data" });
  }
};

const deleteGreeting = async (req, res) => {
  const { _id } = req.params;
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("exercises");
    const r = await db.collection("greetings").deleteOne({ _id });
    assert.equal(1, r.deletedCount);
    res.status(204).json({ status: 204, deletedItemId: _id });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const updateGreeting = async (req, res) => {
  const { _id } = req.params;
  const { hello } = req.body;
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("exercises");
    if (hello === undefined) {
      res
        .status(400)
        .json({ status: 400, message: "hello key not present in body" });
      return;
    }
    const newValue = { $set: { hello } };
    const r = await db.collection("greetings").updateOne({ _id }, newValue);

    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    res.status(200).json({ status: 200, _id, ...req.body });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  createGreeting,
  getGreeting,
  findMultiple,
  deleteGreeting,
  updateGreeting,
};
