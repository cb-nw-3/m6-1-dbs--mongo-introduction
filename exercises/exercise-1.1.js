const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const dbFunction = async (dbName) => {
  //creates a new client
  const client = await MongoClient(MONGO_URI, options);

  //connect to the client
  await client.connect();

  const db = client.db(dbName);
  console.log("connected!");

  //   await db.collection("users").insertOne({ name: "Buck Rogers" });

  client.close();
  console.log("disconnected!");
};

// dbFunction("exercise_1");
