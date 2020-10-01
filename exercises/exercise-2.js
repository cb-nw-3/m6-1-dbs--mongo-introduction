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

const getGreeting = async (req, res) => {
  let _id = req.params._id;
  console.log(_id);

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("exercise_1");
    console.log("connected to db");

    const r = await db.collection("greetings").findOne({ _id }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not found" });
    });

    client.close();
  } catch (err) {
    console.log(err);
  }

};

const getGreetings = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("exercise_1");
    console.log("connected to db");

    let r = await db.collection("greetings").find().toArray();

    r.length
      ? res.status(200).json({ status: 200, data: r })
      : res.status(404).json({ status: 404, data: "Nope" });

    client.close();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createGreeting, getGreeting, getGreetings };