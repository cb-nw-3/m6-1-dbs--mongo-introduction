const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  let { name } = req.body;

  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("exercise_1");
  await db.collection("users").insertOne({ name: name });

  res.status(201).json({ message: "success", name });

  client.close();
};

module.exports = { addUser };
