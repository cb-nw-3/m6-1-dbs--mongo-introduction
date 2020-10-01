const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const dbName = "exercise_1";

const dbFunction = async (dbName) => {
  console.log(MONGO_URI);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    console.log("connected!");
    await db.collection("users").insertOne({ name: "Buck Rogers" });

    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.log(err);
  }
};

dbFunction("exercise_1");
