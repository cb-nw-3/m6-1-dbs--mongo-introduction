const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const dbFunction = async (dbName) => {
  options = {};
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");

  await db.collection("users").insertOne({ name: "Ashley Hynes" });

  client.close();
  console.log("disconnected!");
};

dbFunction("test")
  .then(function (result) {
    console.log("test");
  })
  .catch(function (failure) {
    console.log(failure);
  });

module.exports = { dbFunction };
