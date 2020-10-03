const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const postGreetings = async (req, res) => {
  try {
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("exercise_2");
    console.log("connected!");

    //once connected, insert one field in database
    const query = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, query.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

module.exports = { postGreetings };
