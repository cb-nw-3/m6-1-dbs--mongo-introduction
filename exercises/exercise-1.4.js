const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const user = req.body;
  console.log("req.body", req.body);

  await client.connect();

  const db = client.db("exercise_1");
  console.log("connected!");

  await db.collection("users").insertOne(user);
  res.status(201).send(user);

  client.close();
  console.log("disconnected!");
};

exports.addUser = addUser;
