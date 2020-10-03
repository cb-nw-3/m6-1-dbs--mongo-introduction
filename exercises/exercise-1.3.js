const { MongoClient } = require("mongodb");
const { json } = require("body-parser");

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

  const data = await db.collection("users").find().toArray();

  console.log(data);
  if (data.lenght === 0) {
    res.status(404).json({ status: 404, message: "no data found" });
  } else {
    res.status(200).json({ status: 200, data: data });
  }

  client.close();
};

module.exports = { getUsers };
