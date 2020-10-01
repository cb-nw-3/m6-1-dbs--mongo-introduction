const { MongoClient } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  const record = req.body;

  await client.connect();

  const db = client.db("exercise_1");
  console.log("connected to db");

  await db.collection("users").insertOne(record);

  console.log(await db.collection("users").find().toArray());

  res.status(201).json({ status: 201, message: "Document created" })

  client.close();
  console.log("disconnected from db");
}

module.exports = { addUser };