const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("exercise_1");
  console.log("connected!");

  const data = await db.collection("users").find().toArray();
  console.log(data);

  data.length
    ? res.status(200).json({ data })
    : res.status(404).json({ message: "no data found" });

  client.close();
  console.log("disconnected!");
};

exports.getUsers = getUsers;
