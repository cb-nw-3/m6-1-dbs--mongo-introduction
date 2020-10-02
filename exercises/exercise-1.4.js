const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  const { name } = req.body;

  await client.connect();

  const db = client.db("exercise_1");

  await db.collection("users").insertOne({ name });

  res.status(201).json({ status: 201, data: name });

  client.close();
};

module.exports = { addUser };
