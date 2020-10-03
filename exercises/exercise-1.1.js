"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

// Missing Code for exercise-1.1
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//

// run from terminal(root) as node ".\exercises\exercise-1.1.js"

console.log("The URI is:,", MONGO_URI);
const dbFunction = async (dbName) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // connect to the database (dbName is provided as an argument to the function)
  const db = client.db(dbName);
  console.log("connected!");

  await db.collection("users").insertOne({ name: "Buck Rogers" });

  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

dbFunction("exercise_1");
