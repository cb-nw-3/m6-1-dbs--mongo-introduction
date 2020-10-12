'use-strict';

const fs = require('file-system');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const assert = require("assert");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async () => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    console.log("connected");

    await client.connect();
    const db = client.db("exercices");

    const r = await db.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);
    console.log("insert greetings");
  } catch(err) {
    console.log(err);
  }
  client.close();
  console.log("disconnected");
}

batchImport();

