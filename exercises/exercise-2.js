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

module.exports = { createGreeting };
