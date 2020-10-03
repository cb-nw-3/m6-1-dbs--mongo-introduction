var fs = require("file-system");
const assert = require("assert");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("Connected!");

  try {
    const db = client.db("exercise_1");

    const r = await db.collection("greetings").insertMany(greetings);
    assert.strickEqual(greetings.length, r.insertedCount);
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
  console.log("disconnected!");
};

batchImport();
