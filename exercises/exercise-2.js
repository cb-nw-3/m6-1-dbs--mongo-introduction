const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  console.log(req.body);
  try {
    // TODO: connect...
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    // TODO: declare 'db'
    // We are using the 'exercises' database
    const db = client.db("exercise_1");

    // and creating a new collection 'greetings'
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);

    res.status(201).json({
      status: 201,
      data: req.body,
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = { createGreeting };
