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
  console.log("allo oui");
  console.log(req.body.name);

  await client.connect();
  console.log("connected");

  const db = client.db("exercise_1");

  await db.collection("users").insertOne({ name });

  res.status(201).send({ status: 201, data: name });

  client.close();
  console.log("disconnected");
};

module.exports = { addUser };
