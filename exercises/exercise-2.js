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

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("exercise_1");
    console.log("connected to db");

    console.log(_id);

    const r = await db.collection("greetings").findOne({ _id })

    r
      ? res.status(200).json({ status: 200, _id, data: r })
      : res.status(404).json({ status: 404, _id, data: "Not found" });

    client.close();
  } catch (err) {
    console.log(err);
  }

};

const getGreetings = async (req, res) => {

  let startQueryId = 0;
  let limitQuery = 10;

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("exercise_1");
    console.log("connected to db");

    if (req.query.start) {
      startQueryId = Number(req.query.start);
    }

    if (req.query.limit) {
      startQueryId
        ? limitQuery = startQueryId + Number(req.query.limit)
        : limitQuery = Number(req.query.limit);
    }

    let holder = await db.collection("greetings").find().toArray();

    let r = holder.slice(startQueryId, startQueryId + limitQuery);

    r.length
      ? res.status(200).json({ status: 200, data: r })
      : res.status(404).json({ status: 404, data: "Nope" });

    client.close();
  } catch (err) {
    console.log(err);
  }
};

const deleteGreeting = async (req, res) => {
  let _id = req.params._id;

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("exercise_1");
    console.log("connected to db");

    const result = await db.collection("greetings").deleteOne({ _id });

    result
      ? res.status(200).json({ status: 201, _id, })
      : res.status(404).json({ status: 404, _id, data: "Not found" });

    client.close();
  } catch (err) {
    console.log(err);
  }

};

const updateGreeting = async (req, res) => {
  let _id = req.params.id;

  let helloValue;

  // validate if there's a valid hello value

  req.body["hello"]
    ? helloValue = req.body["hello"]
    : res.status(400).json({ status: 404, _id, data: "Not found", message: "No valid data found" });

  let newValue = { $set: { "hello": helloValue } };

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("exercise_1");
    console.log("connected to db");

    let query = { _id };

    let r = await db.collection("greetings").updateOne(query, newValue);
    console.log("doc updated");
    console.log(r);
    client.close();
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    res.status(200).json({ status: 200, _id, })

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, _id, data: req.body, message: err.message });
  }
}

module.exports = { createGreeting, getGreeting, getGreetings, deleteGreeting, updateGreeting };