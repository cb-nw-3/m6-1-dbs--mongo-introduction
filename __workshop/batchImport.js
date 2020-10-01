let fs = require("file-system");
const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();

const { MONGO_URI } = process.env;
console.log("MONGO_URI: ", MONGO_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const greetings = JSON.parse(fs.readFileSync("../data/greetings.json"));

const batchImport = async () => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("exercise_1");
    const r = await database.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);
  } catch (error) {
    console.log("error: ", error);
  }
};

batchImport();
