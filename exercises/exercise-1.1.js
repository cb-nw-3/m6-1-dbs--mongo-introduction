require("dotenv").config();

const { MongoClient } = require("mongodb");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { MONGO_URI } = process.env;

const dbFunction = async (dbName) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db(dbName);
  console.log("connected!");

  await db.collection("users").insertOne({ name: "Buck Rogers" });

  client.close();
  console.log("disconnected");
};

dbFunction("exercise_1");
