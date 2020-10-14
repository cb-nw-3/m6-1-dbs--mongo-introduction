var fs = require("file-system");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");
const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));
const options = {
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connected!");
    const db = client.db("exercise_1");
    const r = await db.collection("greetings").insertMany(greetings);
    assert.strickEqual(greetings.length, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
  console.log("disconnected!");
};

batchImport(greetings);
