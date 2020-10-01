const { MongoClient } = require("mongodb");
const assert = require("assert");
const { MONGO_URI } = process.env;
require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  console.log(req.body);
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
  const _id = req.params._id;
  console.log("The ID is:", _id);

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

const getMoreGreetings = async (req, res) => {
  // const { start, limit } = req.query;
  // console.log("the start is:", start);
  // console.log("the limit is:", limit);

  //Create and connect to client
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  //Access the database
  const db = client.db("exercise_1");

  db.collection("greetings")
    .find()
    .toArray((err, result) => {
      if (result.length) {
        // store the req.query quantities, or set it to a default of 0 and 25
        // Check if the start query is a valid number
        const start = Number(req.query.start) || 0;
        const cleanStart = start > -1 && start < result.length ? start : 0;

        // Check if the end limit is a valid number.
        const end = cleanStart + (Number(req.query.limit) || 25);
        const cleanEnd = end > result.length ? result.length - 1 : end;

        // Return the desired data
        const data = result.slice(cleanStart, cleanEnd);
        res.status(200).json({
          status: 200,
          start: cleanStart,
          limit: cleanEnd - cleanStart,
          data,
        });
      } else {
        res.status(404).json({ status: 404, data: "Not Found" });
      }
      client.close();
    });
};

const deleteGreeting = async (req, res) => {
  const { _id } = req.params;

  console.log("Requested ID is:", _id);

  //Create and connect to client
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  //Access the database
  const db = client.db("exercise_1");
  try {
    //Create a new collection and add the body as an item
    const r = await db
      .collection("greetings")
      .deleteOne({ _id: _id.toUpperCase() });
    assert.strictEqual(1, r.deletedCount);
    res.status(204).json({ status: 204, _id });
  } catch (error) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

const updateGreeting = async (req, res) => {
  // URL param should have the ID to update, and an accompanying body to update
  // the hello prop of the language
  const { _id } = req.params;
  const { hello } = req.body;
  console.log(req.body);

  // exit out if there is no body to update the hello prop
  if (!hello) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: 'Only "hello" may be updated.',
    });
    return;
  }

  //Create and connect to client
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercise_1");

  try {
    const query = { _id };

    //passes a json object that will be updated via the $set call
    const newValues = { $set: { hello } };

    // Update the hello prop of the query ID
    const r = await db.collection("greetings").updateOne(query, newValues);
    assert.strictEqual(1, r.matchedCount);
    assert.strictEqual(1, r.modifiedCount);

    res.status(200).json({ status: 200, _id });
  } catch (error) {
    console.log(error.stack);
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
  }
  client.close();
};

module.exports = {
  createGreeting,
  getGreeting,
  getMoreGreetings,
  deleteGreeting,
  updateGreeting,
};
