const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbFunction = async (dbName) => {
  // creates a new client
  try {
    const client = await MongoClient(MONGO_URI);

    // // connect to the client

    await client.connect();
    console.log("connected!");

    // // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName, options);

    const res = await db.collection("users").insertOne({ name: "Buck Rogers" });
    console.log(res);

    // // close the connection to the database server
    client.close();
    console.log("disconnected!");

    await client.connect();
  } catch (err) {
    console.error(err);
  }
};

dbFunction("exercise_1");
