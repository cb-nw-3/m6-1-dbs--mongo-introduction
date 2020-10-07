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

  const data = await db.collection("users").find().toArray();
  console.log(data);

  if (data.length === 0) {
    res.status(404).send({ message: "404. No data found." });
  } else {
    res.status(200).send({ data: data });
  }

  client.close();
};

module.exports = { getUsers };
