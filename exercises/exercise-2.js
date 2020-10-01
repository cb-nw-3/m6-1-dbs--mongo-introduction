"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const assert = require("assert");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  try {
    const { name } = req.body;
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercise_1");
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    console.log(req.body);
    res.status(201).json({ status: 201, data: req.body });
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } catch (err) {
    console.log(err.stack);
  }
};

const getGreeting = async (req, res) => {
  const { _id } = req.params;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercise_1");
  db.collection("greetings").findOne(
    { _id: _id.toUpperCase() },
    (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found" });
      client.close();
    }
  );
};

module.exports = { createGreeting, getGreeting };
