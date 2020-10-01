const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("exercise_1");
  console.log("connected!");

  const users = await db.collection("users").find().toArray();
  console.log("users", users);

  if (users.length < 1) res.status(404);
  else res.status(200).send(users);

  client.close();
  console.log("disconnected!");
};

exports.getUsers = getUsers;
