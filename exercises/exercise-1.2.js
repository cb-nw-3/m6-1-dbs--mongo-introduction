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
  const db = client.db(dbName);

  const data = await db.collection("users").find().toArray();
  console.log("This returns users from our collections", data);

  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

getCollection("exercise_1");
