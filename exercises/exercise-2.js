const assert = require("assert");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const createGreeting = async (req, res) => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
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
    console.log(err.stack);
  }

  client.close();
};

module.exports = { createGreeting };
