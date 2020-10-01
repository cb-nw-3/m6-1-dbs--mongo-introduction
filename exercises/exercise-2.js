"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  try {
    //   const { name } = req.body;
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercise_1");

    const r = await db.collection("greetings").insertOne(req.body);
    assert.strictEqual(1, r.insertedCount);

    console.log(req.body);
    res.status(201).json({ status: 201, data: req.body });

    // close the connection to the database server
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercise_1");
    const _id = req.params._id;

    await db.collection("greetings").findOne({ _id }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found!" });
      client.close();
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercise_1");
  console.log(db);

  await db
    .collection("greetings")
    .find()
    .toArray((err, result) => {
      if (result.length) {
        const start = Number(req.query.start) || 0;
        const cleanStart = start > -1 && start < result.length ? start : 0;
        const end = cleanStart + (Number(req.query.limit) || 25);
        const cleanEnd = end > result.length ? result.length - 1 : end;

        const data = result.slice(cleanStart, cleanEnd);
        res.status(200).json({ status: 200, data });
      } else {
        res.status(404).json({ status: 404, data: "Not Found" });
      }
      client.close();
    });
};

const deleteGreeting = async (req, res) => {
  const { _id } = req.params;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercise_1");
    const r = await db
      .collection("greetings")
      .deleteOne({ _id: _id.toUpperCase() });
    assert.strictEqual(1, r.deletedCount);
    res.status(204).json({ status: 204, _id });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const updateGreeting = async (req, res) => {
  const { _id } = req.params;
  const { hello } = req.body;
  if (!hello) {
    res
      .status(400)
      .json({
        status: 400,
        data: req.body,
        message: "Only 'Hello' can be updated!",
      });
    return;
  }
  try {
    const query = { _id };
    const newValues = { $set: { ...req.body } };
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercise_1");
    const r = await db.collection("greetings").updateOne(query, newValues);
    assert.strictEqual(1, r.matchedCount);
    assert.strictEqual(1, r.modifiedCount);
    res.status(200).json({ status: 200, _id });
    client.close();

  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

};

module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
};
