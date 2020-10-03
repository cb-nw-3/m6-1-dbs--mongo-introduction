const { MongoClient } = require("mongodb");

require("dotenv").config;
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  console.log("connected!");

  const db = client.db("exercise_1");
  await db.collection("users").insertOne({ name: "Morty Smith" });

  const data = await db.collection("users").find().toArray();
  console.log("The data is:", data);

  data.length
    ? res.status(201).json({ status: 201, data })
    : res.status(404).json({ status: 404, message: "No data found!" });

  client.close();
  console.log("disconnected!");
};

module.exports = { addUser };
