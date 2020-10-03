"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();

let fs = require("file-system");
const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function bacthImport() {
  console.log(greetings);

  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("exercise_1");

    let inserted = await db.collection("languages").insertMany(greetings);
    console.info(inserted);
  } catch (error) {
    console.log("error");
    console.info({ message: error.message });
  }
  client.close();
  console.log("disconnected!");
}
bacthImport();
