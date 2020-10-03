require("dotenv").config();
const { MONGO_URI } = process.env;

const fs = require("file-system");
const assert = require("assert");
const { MongoClient } = require("mongodb");

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  //   console.log(greetings);
  // Connect to client(On Mongo DataBase)
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    // Access the database
    const db = client.db("exercise_1");

    // Access the Greetings collention and insert the data from "greetings.json"
    const r = await db.collection("greetings").insertMany(greetings);
    assert.strictEqual(greetings.length, r.insertedCount);
    console.log("Data added!");
  } catch (error) {
    console.log(error.stack);
  }
  // Close the database
  client.close();
  console.log("disconnected");
};

batchImport();
