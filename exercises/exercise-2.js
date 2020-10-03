const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  //   console.log(req.body);
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
      //   body: {
      //     lang: "English",
      //     _id: "EN",
      //     hello: "Hello",
      //   },
      //   body2: {
      //     lang: "French",
      //     _id: "FR",
      //     hello: "Bonjour",
      //   },
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

const getGreeting = async (req, res) => {
  //   res.status(200).json("bacon"); success
  const _id = req.params._id;
  console.log("ID:", _id);

  //Create and connect to client
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  //Access the database
  const db = client.db("exercise_1");

  //if the id search result exists then it should return data.
  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};
module.exports = { createGreeting, getGreeting };
