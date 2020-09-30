const fs = require("file-system");
const assert = require("assert");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async () => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("exercise_1");
    console.log("connected!");

    const r = await db.collection("greetings").insertMany(greetings);
    assert.strictEqual(greetings.length, r.insertedCount);

    console.log("added to the collection!");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected!");
};

batchImport();
