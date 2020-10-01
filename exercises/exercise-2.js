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
    console.log(_id)
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
    console.log(err);
  }
  client.close();
};

module.exports = { createGreeting, getGreeting };
