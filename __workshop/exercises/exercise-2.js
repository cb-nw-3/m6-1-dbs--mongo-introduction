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
      .collection("greetings")
      .findOne({ _id }, (err, result) => {
        result
          ? res.status(200).json({ status: 200, _id, data: result })
          : res.status(404).json({ status: 404, _id, data: "Data Not Found" });
      });
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = {
  createGreeting,
  getGreeting,
};
