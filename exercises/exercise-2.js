const { MongoClient } = require("mongodb");
const assert = require("assert");
const { MONGO_URI } = process.env;
require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  console.log(req.body);
  try {
    //Create and connect to client
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    //Access the database
    const db = client.db("exercise_1");

    //Create a new collection and add the body as an item
    const r = await db.collection("greetings").insertOne(req.body);
    assert.strictEqual(1, r.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
};

module.exports = { createGreeting };
