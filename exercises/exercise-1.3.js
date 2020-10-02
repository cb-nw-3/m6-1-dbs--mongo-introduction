const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();
  const db = client.db("exercise_1");

  const data = await db.collection("users").find().toArray();

  // Terneri operator to return a response.
  data.length
    ? res.status(200).json({ status: 200, data })
    : res.status(404).json({ status: 404, message: "No data found!" });

  // close the connection to the database server
  client.close();
};

module.exports = { getUsers };
