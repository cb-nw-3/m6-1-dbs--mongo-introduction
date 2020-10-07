const fs = require("file-system");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const assert = require("assert");

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("exercise_2");
    const r = await db.collection("greetings").insertMany(greetings);
    assert.strictEqual(greetings.length, r.insertedCount);

    console.log("ok");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
};

batchImport();
