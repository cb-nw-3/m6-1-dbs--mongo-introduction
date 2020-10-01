const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const dbFunction = async (dbName) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI);

  // connect to the client
  await client.connect();

  const db = client.db(dbName);
  console.log("connected!");

  // connect to the database (db name is provided as an argument to the function)

  await db.collection("users").insertOne({ name: "Buck Rogers" });

  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

dbFunction("exercise_1");
