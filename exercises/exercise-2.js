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

  const greeting = req.body;

  try {
    await client.connect();
    const db = client.db("exercise_2");

    const r = await db.collection("greetings").insertOne(greeting);
    assert.equal(1, r.insertedCount);

    res.status(201).send({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).send({ status: 500, data: req.body, message: err.message });
  }

  client.close();
};

const getGreeting = async (req, res) => {
  const _id = req.params._id;

  let query = { _id };

  if (_id.length > 2) {
    query = { lang: capitalizeFirst(_id) };
  }
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_2");

  const r = await db.collection("greetings").findOne(query);

  if (r) {
    res.status(200).json({ status: 200, query: _id, data: r });
  } else {
    res.status(404).json({ status: 404, query: _id, data: "Not Found" });
  }

  client.close();
};

const getGreetings = async (req, res) => {
  //params
  let startIndex = Number(req.query.start) || 0;
  let limit = Number(req.query.limit) || 25;

  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = await client.db("exercise_2");
    const greetings = await db.collection("greetings").find().toArray();

    const slicedArray = greetings.slice(startIndex, startIndex + limit);

    if (greetings.length !== 0) {
      res.status(201).json({
        status: 201,
        start: startIndex,
        limit: slicedArray.length,
        data: slicedArray,
      });
    } else {
      throw new Error({ message: "not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 404, data: err.message });
  }

  client.close();
};

const deleteGreeting = async (req, res) => {
  const client = MongoClient(MONGO_URI, options);

  const _id = req.params._id.toUpperCase();

  try {
    await client.connect();

    const db = client.db("exercise_2");
    const r = await db.collection("greetings").deleteOne({ _id });

    assert.equal(1, r.deletedCount);
    res.status(205).json({ status: 204, deleted: _id });
  } catch (err) {
    res.status(500).json({ status: 500, message: "not found" });
  }
};

const capitalizeFirst = (string) => {
  const stringArr = string.split("");

  for (let i = 0; i < stringArr.length; i++) {
    if (i === 0) {
      stringArr[i] = stringArr[i].toUpperCase();
    } else {
      stringArr[i] = stringArr[i].toLowerCase();
    }
  }

  return stringArr.join("");
};

module.exports = { createGreeting, getGreeting, getGreetings, deleteGreeting };
