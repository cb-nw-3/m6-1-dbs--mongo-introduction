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

const batchImport = async (dbName) => {
  try {
    console.log(greetings);
  } catch (err) {
    console.log(err);
  }
};

batchImport();

module.exports = { batchImport };
