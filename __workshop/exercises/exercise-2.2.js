const { MongoClient } = require("mongodb");
const { greetings } = require("./batchImport");
const assert = require("assert");
require("dotenv").config();

console.log(greetings);
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  try {
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("exercise_2");
    console.log("connected!");

    //once connected, insert one field in database
    const query = await db.collection("greetings").insertMany(greetings);
    // test that the appropriate length of greetings are inserted
    assert.equal(greetings.length, query.insertedCount);
  } catch (err) {
    console.log(err);
  }

  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

batchImport();
