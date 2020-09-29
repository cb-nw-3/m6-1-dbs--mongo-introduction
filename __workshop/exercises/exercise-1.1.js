const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const dbFunction = async (dbname) => {
  const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

  await client.connect();

  const db = client.db(dbname);
  console.log("Connected! ");

  await db.collection("users").insertOne({ name: "Buck Rogers" });

  client.close();
  console.log("disconnected! ");
};

dbFunction("exercise_1");
