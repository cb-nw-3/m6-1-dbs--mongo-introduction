const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected");

  const users = await db.collection("users").find().toArray();

  console.log(users);

  client.close();
  console.log("disconnected!");

  if (users.length === 0) {
    return res.status(404).send("no");
  }

  return res.status(200).send({ status: 200, data: users });
};

module.exports = { getUsers };
