const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("exercise_1");

  // New user could be sent inside req.body
  await db.collection("users").insertOne({ name: "Joseph Hiwatig" });

  client.close();

  res.status(201).send("Created");
};

module.exports = {
  addUser,
};
