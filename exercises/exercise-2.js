const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  console.log(req.body);
  const greeting = req.body;

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercise_1");
    console.log("connected!");

    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
  console.log("disconnected!");
};

const getGreeting = async (req, res) => {
  const _id = req.params._id;
  console.log("id", _id);

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");

  const greeting = await db
    .collection("greetings")
    .findOne({ _id }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found" });
      client.close();
    });
  console.log("disconnected!");
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");

  const greetings = await db
    .collection("greetings")
    .find()
    .toArray((err, result) => {
      if (result.length > 0) {
        const start = Number(req.query.start) || 0;
        let limit = start + Number(req.query.limit) || 25;
        limit <= result.length ? limit : (limit = result.length);

        const data = result.slice(start, limit);
        console.log("limit", limit);
        console.log("data", data);
        res.status(200).json({ status: 200, start, limit, data: data });
      } else {
        res.status(404).json({ status: 404, data: "Not Found" });
      }
      client.close();
    });

  console.log("disconnected!");
};

const deleteGreeting = async (req, res) => {
  const _id = req.params._id;
  console.log("id", _id);

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercise_1");
    console.log("connected!");

    const d = await db.collection("greetings").deleteOne({ _id });
    assert.strictEqual(1, d.deletedCount);

    res.status(204).json({ status: 204, message: "item deleted" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

const updateGreeting = async (req, res) => {
  console.log("req.body", req.body);
  const body = req.body;
  const _id = req.params._id;
  const query = { _id };

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");

  if (body["hello"]) {
    const validInput = body["hello"];
    console.log("validInput", validInput);
    const newValues = { $set: { hello: validInput } };

    const r = await db.collection("greetings").updateOne(query, newValues);

    assert.strictEqual(1, r.matchedCount);
    assert.strictEqual(1, r.modifiedCount);

    res
      .status(200)
      .json({
        status: 200,
        _id,
        ...req.body,
        matchedCount: r.matchedCount,
        modifiedCount: r.modifiedCount,
      });
  } else {
    res.status(500).json({ status: 500, message: "wrong input" });
    return;
  }
  client.close();
  console.log("disconnected!");
};

module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
};
