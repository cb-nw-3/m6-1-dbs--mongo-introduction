const { MongoClient } = require("mongodb");
const assert = require("assert");
const { MONGO_URI } = process.env;
require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  // temporary content... for testing purposes...
  //   console.log(req.body);
  //   res.status(200).json("ok");

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

const getGreeting = async (req, res) => {
  // res.status(200).json("bacon");

  // Variale created to insert in "get" METHOD in "server.js"

  const _id = req.params._id;
  console.log("The language ID is:", _id);

  // Connect to client database
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  // Access the database
  const db = client.db("exercise_1");

  // Returns the language we asked for in the collection.
  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

module.exports = { createGreeting, getGreeting };
