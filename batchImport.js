const { MongoClient } = require("mongodb");
const fs = require("file-system");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useUnifiedTopology: true,
};

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async (data) => {
  console.log("data for import", data);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercise_1");
    console.log("connected!");

    const r = await db.collection("greetings").insertMany(greetings);
    assert.strictEqual(data.length, r.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
  console.log("disconnected!");
};

batchImport(greetings);
