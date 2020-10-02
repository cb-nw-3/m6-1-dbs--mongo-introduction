const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("exercise_2");

    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
};

const getGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    const { _id } = req.params;

    await client.connect();

    const db = client.db("exercise_2");

    if (_id.length > 2) {
      db.collection("greetings").findOne(
        { lang: _id.charAt(0).toUpperCase() + _id.slice(1) },
        (err, result) => {
          result
            ? res.status(200).json({ status: 200, lang: _id, data: result })
            : res.status(404).json({ status: 404, data: "Not Found" });
        }
      );
    } else {
      db.collection("greetings").findOne(
        { _id: _id.toUpperCase() },
        (err, result) => {
          result
            ? res.status(200).json({ status: 200, _id, data: result })
            : res.status(404).json({ status: 404, _id, data: "Not Found" });
        }
      );
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("exercise_2");

    const data = await db.collection("greetings").find().toArray();

    let start = parseInt(req.query.start);
    let end = parseInt(req.query.limit);

    if (!start || !end) {
      start = 0;
      end = 25;
    } else {
      end + start > data.length ? (end = data.length) : (end = end + start);
    }

    const newData = data.slice(start, end);

    if (data.length === 0) {
      res.status(404).json({ status: 404, message: "No data" });
    } else {
      res
        .status(200)
        .json({ status: 200, start: start, limit: end, data: newData });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const deleteGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    const { _id } = req.params;

    await client.connect();

    const db = client.db("exercise_2");

    const data = await db
      .collection("greetings")
      .deleteOne({ _id: _id.toUpperCase() });

    assert.equal(1, data.deletedCount);

    res.status(204).json({ status: 204, _id });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const updateGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    // look at query and take id
    const { _id } = req.params;
    // look if request body contains hello property
    if (!req.body.hello) {
      // send error if not
      res.status(404), json({ status: 404, message: "Hello key not found" });
    } else {
      // grab hello key from body
      let helloKey = req.body.hello;
      // updateOne params
      const query = { _id };
      const newValues = { $set: { hello: helloKey } };
      //connect client
      await client.connect();
      // look up database name
      const db = client.db("exercise_2");
      // find id object in database
      const currentData = await db
        .collection("greetings")
        .findOne({ _id: _id.toUpperCase() });
      // if object already has hello return error
      if (currentData.hello) {
        res.status(404).json({ status: 404, message: "Already an hello key" });
      }
      // update object if no hello property
      const data = await db.collection("greetings").updateOne(query, newValues);
      assert.equal(1, data.matchedCount);
      assert.equal(1, data.modifiedCount);
      // send result
      res.status(204).json({ status: 204, data: req.body });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
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
