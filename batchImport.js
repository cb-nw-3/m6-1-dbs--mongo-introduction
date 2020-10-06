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
    const r = db.collection("greetings").insertMany(greetings);
    assert(0 < r.insertedCount);
    // res.status(201).json({ message: "success", data: greetings });
  } catch (error) {
    console.log(error.stack);
    // res.status(500).json({ message: "error", error: error });
  }
};

batchImport();
