const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCollection = async (dbName) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // connect to the database (db name is provided as an argument to the function)
  const db = client.db(dbName);
  console.log("connected!");

  //once connected, find users
  const data = await db.collection("users").find().toArray();
  console.log(data);

  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

//In order to test this function, call it at the bottom of the file. Don't forget to pass it the database name as an argument.
getCollection("exercise_1");
