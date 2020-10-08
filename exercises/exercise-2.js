const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const assert = require("assert");

const createGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    console.log(req.body);

    await client.connect();

    const db = client.db("exercise_2");

    const r = await db.collection("greetings").insertOne(req.body);
    assert.strictEqual(1, r.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

const getGreeting = async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercise_2");

  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

const getGreetings = async (req, res) => {
  const { start, limit } = req.query;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercise_2");

  let data = await db.collection("greetings").find().toArray();

  let numStart = Number(start);
  console.log(numStart);
  let numLimit = Number(limit);

  let slicedData = [];

  if (numStart < 0) {
    numStart = 0;
    slicedData = data.slice(numStart, numStart + numLimit);
  } else if (numLimit > data.length || numStart > data.length) {
    numStart = data.length - 10;
    slicedData = data.slice(numStart);
  } else {
    slicedData = data.slice(numStart, numStart + numLimit);
  }

  if (data.length === 0) {
    res.status(404).json({ status: 404, data: data });
  } else {
    res.status(200).json({
      status: 200,
      start: numStart,
      limit: numLimit,
      data: slicedData,
    });
  }
  client.close();
};

const deleteGreeting = async (req, res) => {
  const { _id } = req.params;
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("exercise_2");

    const r = await db.collection("greetings").deleteOne({ _id });
    assert.equal(1, r.deletedCount);

    res.status(204).json({ status: 204, message: `${_id} deleted` });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, message: `${_id} not found` });
  }
  client.close();
};

module.exports = { createGreeting, getGreeting, getGreetings, deleteGreeting };
