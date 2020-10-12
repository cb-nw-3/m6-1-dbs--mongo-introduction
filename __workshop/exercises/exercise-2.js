const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;

const createGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db("exercise_2");
    const r = await db.collection("greeting").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json("ok");
    // GETS REFLECTED IN POSTMAN

    // res.status(201).json({ status: 201, data: req.body });
    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db("exercise_2");
    // const _id = req.params._id;
    const lang = req.params.lang;
    db.collection("greetings").findOne({ lang }, {}, (err, result) => {
      result
        ? res.status(200).json({ status: 200, lang, data: result })
        : res.status(400).json({ status: 200, lang, data: result });
    });

    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getGreetings = async (req, res) => {
  // create a new client
  // where is try?
  //why new client?
  // const client = new MongoClient('mongodb://localhost:27017', {
  //   useUnifiedTopology: true,
  // });
  const client = await MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("exercise_2");
    const array = db
      .collection("greetings")
      .find()
      .toArray((err, result) => {
        if (result.length) {
          res.status(200).json({ status: 200, data: result.slice(0, 25) });
        } else {
          res.status(400).json({ status: 400 });
        }

        client.close();
      });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const deleteGreeting = async (req, res) => {
  const lang = req.params.lang;
  console.log(req.params.lang);
  const client = await MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("exercise_2");
    const r = await db.collection("greetings").deleteOne({ lang: lang });
    assert.equal(1, r.deletedCount);
    // assert as in check that 1 = deletedCount

    res.status(204).json({ status: 201, lang });
    //SENDS THE DATA TO MONGO
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

const updateGreeting = async (req, res) => {
  const _id = req.params._id;

  const client = await MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("exercise_2");
    const query = { _id };
    const { hello } = req.body;

    const newValues = { $set: { hello } };
    const r = await db.collection("greetings").updateOne(query, newValues);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);

    res.status(200).json({ status: 200, _id });
    //SENDS THE DATA TO MONGO
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};
module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
};
