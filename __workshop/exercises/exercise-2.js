const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();

const { MONGO_URI } = process.env;

console.log("MONGO_URI in exercise 2: ", MONGO_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("exercise_1");
    const r = await database.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
  }
};

const getGreeting = async (req, res) => {
  const _id = req.params.id;
  console.log("_id: ", _id);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("exercise_1");
    const r = await database
      .collection("two")
      .findOne({ _id }, (err, result) => {
        result
          ? res.status(200).json({ status: 200, _id, data: result })
          : res.status(404).json({ status: 404, _id, data: "Data Not Found" });
      });
  } catch (error) {
    console.log("error: ", error);
  }
};

const getGreetings = async (req, res) => {
  start = req.query.start;
  limit = req.query.limit;

  if (start === undefined) {
    start = 1;
  }
  if (limit === undefined) {
    limit = start + 1;
  }

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("exercise_1");
    let r = await database.collection("greetings").find().toArray();
    if (start + limit > r.length) {
      limit = start + limit - r.length;
    }
    r = r.slice(start, start + limit);
    r
      ? res
          .status(200)
          .json({ status: 200, start: start, limit: limit, data: r })
      : res.status(404).json({ status: 404, data: "Data Not Found" });
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const deleteGreeting = async (req, res) => {
  const request = req.params._id;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("exercise_1");
    const r = await database
      .collection("greetings")
      .deleteOne({ _id: request })
      .then((result) => console.log(`Deleted ${result.deletedCount} item.`));
    res.status(204).json({ status: 204, message: r + " was deleted" });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
};
