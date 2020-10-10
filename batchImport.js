"use strict";
const fs = require("file-system");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async () => {
  try {
    const client = await MongoClient(MONGO_URI);
    await client.connect();
    console.log(greetings);
    const db = client.db("exercise_2");
    const r = await db.collection("greetings").insertMany(greetings);
    greetings.length, r.insertedCount;
    client.close();
  } catch (err) {
    console.log(err);
  }
};
batchImport();

exports.batchImport = batchImport;
