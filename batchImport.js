"use strict";

const fs = require("file-system");
const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options, {
  useUnifiedTopology: true,
});

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async () => {
  try {
    await client.connect();

    const db = client.db("exercise_1");

    const r = await db.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);
    console.log("success");
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

batchImport();
