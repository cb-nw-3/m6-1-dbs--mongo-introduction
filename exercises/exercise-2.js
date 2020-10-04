const assert = require("assert");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  // temporary content... for testing purposes.
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("exercise_1");

    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (error) {
    console.log(error.stack);
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
  }
  console.log(req.body);
};

const deleteGreeting = async (req, res) => {
  // temporary content... for testing purposes.
  const client = await MongoClient(MONGO_URI, options);

  let _id = req.params._id;
  console.log(_id);

  try {
    await client.connect();
    const db = client.db("exercise_1");

    let deleted = await db.collection("greetings").deleteOne({ _id });

    console.log({ deleted });

    let deleted_count = deleted.deletedCount;

    if (deleted.deletedCount === 1) {
      res.status(200).json({
        status: 200,
        deleted_count,
        _id,
      });
    } else {
      res.status(500).json({
        status: 500,
        deleted_count,
        _id,
      });
    }
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ status: 500, data: _id, message: error.message });
  }
};

const getGreeting = async (req, res) => {
  // temporary content... for testing purposes.
  const client = await MongoClient(MONGO_URI, options);
  //   res.status(200).json("bacon");
  let _id = req.params._id;
  console.log(_id);

  await client.connect();
  const db = client.db("exercise_1");

  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

const getSeveralGreetings = async (req, res) => {
  // temporary content... for testing purposes.
  const client = await MongoClient(MONGO_URI, options);
  //   res.status(200).json("bacon");
  let start = req.params.start;
  let limit = req.params.limit;

  let end = parseInt(start) + parseInt(limit);

  if (limit === undefined) {
    console.log("limit undefined");
    // let's treat it as
  }
  //http://localhost:8000/getSeveralGreetings/10/limit/10

  console.log(req.params);

  try {
    await client.connect();
    const db = client.db("exercise_1");

    const dataFromDB = await db.collection("greetings").find().toArray();
    console.log(dataFromDB);
    let sliced_data;

    if (limit === undefined) {
      data = dataFromDB.slice(parseInt(0), start);
      console.log(data);

      console.log("limit undefined");
      data.unshift({
        Message:
          "No entry given for limit, so using the single value to represent the number of array elements you want starting from zero",
      });

      // let's treat it as
    }
    if (start === undefined && limit == undefined) {
      data = dataFromDB.slice(parseInt(0), start);
      console.log(data);

      console.log("limit undefined");
      data.unshift({
        Message:
          "No entry given for start or for limit, so you're getting all the values",
      });
    } else {
      data = dataFromDB.slice(parseInt(start), end);
      console.log(data);
    }
    let status = "200";
    res.status(200).json({ status, start, limit, data });
  } catch (error) {
    console.log("error");
    res.status(500).json({ message: error.message });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = {
  createGreeting,
  getGreeting,
  getSeveralGreetings,
  deleteGreeting,
};
