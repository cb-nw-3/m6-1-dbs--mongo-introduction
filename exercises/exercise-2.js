const { MongoClient } = require("mongodb");
const assert = require("assert");
const { MONGO_URI } = process.env;
require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  // temporary content... for testing purposes...
  //   console.log(req.body);
  //   res.status(200).json("ok");

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
  // res.status(200).json("bacon");

  // Variale created to insert in "get" METHOD in "server.js"

  const _id = req.params._id;
  console.log("The language ID is:", _id);

  // Connect to client database
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  // Access the database
  const db = client.db("exercise_1");

  // Returns the language we asked for in the collection.
  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

const getSomeGreetings = async (req, res) => {
  // this is to check for Query Params in the URL
  //   console.log(req.query);
  // this will create a variable in the BE server to make some logic before returning an JSON object.
  const { start, limit } = req.query;
  //   console.log("the start is:", start);
  //   console.log("the limit is:", limit);

  // Connect to client database
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  // Access the database
  const db = client.db("exercise_1");

  db.collection("greetings")
    .find()
    .toArray((err, result) => {
      //   console.log("result is:", result.length);
      if (result.length) {
        // Returns the whole array of language
        // Check if the start query is a valid number
        const start = Number(req.query.start) || 0;
        // console.log("The start is", start);
        // This will remove a negative value or a start higher than our array length.
        // In both case, this will make reset the start to 0.
        const cleanStart = start > -1 && start < result.length ? start : 0;
        // console.log(cleanStart);

        // Check if the end limit is a valid number.
        const end = cleanStart + (Number(req.query.limit) || 25);
        // console.log("The end is:", end);
        // If the end of the query is larger then the length of the data in our database, we return the array lenght.
        const cleanEnd = end > result.length ? result.length - 1 : end;
        // console.log("The new end is", cleanEnd);

        // Return the JSON object with the desired information.
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

module.exports = { createGreeting, getGreeting, getSomeGreetings };
