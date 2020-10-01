const fs = require("file-system");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));
const assert = require("assert");

const batchImport = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("exercise_2");

    const r = await db.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);

    console.log("success");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
};

batchImport();
