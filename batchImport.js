const fs = require("file-system");
const { MongoClient } = require("mongodb");
const assert = require("assert");
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
    const db = client.db("exercise_2");
    r = await db.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);

    console.log({ status: 201 });
  } catch (err) {
    console.log({ status: 500, message: err.message });
  }
};

batchImport();
