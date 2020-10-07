require("dotenv").config();
const { MongoClient } = require("mongodb");
const assert = require("assert");

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
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (error) {
    console.log(error.stack);
    res.json({ status: 500, data: req.body, message: error.message });
  }
  client.close();
};

const getGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { _id } = req.params;
  await client.connect();
  const db = client.db("exercise_1");
  db.collection("greetings").findOne(
    { _id: _id.toUppercase() },
    (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, result })
        : res.status(404).json({ status: 404 });
    }
  );
  client.close();
};

module.exports = { createGreeting, getGreeting };
