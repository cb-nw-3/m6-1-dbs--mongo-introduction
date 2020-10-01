const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("exercise_2");

    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
};

const getGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    const { _id } = req.params;
    console.log(_id);
    await client.connect();

    const db = client.db("exercise_2");

    db.collection("greetings").findOne(
      { _id: _id.toUpperCase() },
      (err, result) => {
        result
          ? res.status(200).json({ status: 200, _id, data: result })
          : res.status(404).json({ status: 404, _id, data: "Not Found" });
        client.close();
      }
    );
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const getGreetings = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("exercise_2");

    const data = await db.collection("greetings").find().toArray();

    let start = parseInt(req.query.start);
    let end = parseInt(req.query.limit);

    if (!start || !end) {
      start = 0;
      end = 25;
    } else {
      end > data.length ? (end = data.length) : (end = end + start);
    }

    const newData = data.slice(start, end);

    if (data.length === 0) {
      res.status(404).json({ status: 404, message: "No data" });
    } else {
      res.status(200).json({ status: 200, data: newData });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = { createGreeting, getGreeting, getGreetings };
