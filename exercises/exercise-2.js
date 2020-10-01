const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const createGreeting = async (req, res) => {
  console.log(req.body);
  res.status(200).json("ok");

  try {
    // connect...
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    // TODO: declare 'db'

    const db = client.db("exercise_1");
    console.log("connected to db");

    // We are using the 'exercises' database
    // and creating a new collection 'greetings'

    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  // TODO: close...

};

module.exports = { createGreeting };