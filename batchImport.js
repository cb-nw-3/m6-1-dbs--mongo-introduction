const fs = require("file-system");
const assert = require("assert");
const { MongoClient } = require("mongodb");
const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async (req, res) => {
  //Create and connect to client
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("Connected!");

  try {
    //Access the database
    const db = client.db("exercise_1");

    //Access the Greetings collections and insert the data
    const r = await db.collection("greetings").insertMany(greetings);
    assert.strictEqual(greetings.length, r.insertedCount);
    console.log("Data added successfully!");
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
  console.log("disconnected!");
};

batchImport();
