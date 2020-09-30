const assert = require("assert");
const { MongoClient } = require("mongodb");

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

    const db = client.db("exercise_1");
    console.log("connected!");

    const r = await db.collection("greetings").insertOne(req.body);
    assert.strictEqual(1, r.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

module.exports = { createGreeting };
