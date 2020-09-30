const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCollection = async (database) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  console.log("connected!");

  const db = client.db(database);

  const data = await db.collection("users").find().toArray();
  console.log("The users data is:", data);

  client.close();
  console.log("disconnected!");
};

getCollection("exercise_1");
