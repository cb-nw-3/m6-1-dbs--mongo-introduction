fs = require("file-system");
("use strict");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async () => {
  console.log(greetings);
  try {
    //   const { name } = req.body;
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercise_1");

    const r = await db.collection("greetings").insertMany(greetings);
    assert.strictEqual(greetings.length, r.insertedCount);

    console.log(req.body);
    res.status(201).json({ status: 201, data: req.body });

    // close the connection to the database server
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

batchImport();
