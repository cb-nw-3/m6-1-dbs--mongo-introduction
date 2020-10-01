const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
console.log("MONGO_URI in exercise 3: ", MONGO_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const dbname = "exercise_1";
const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db(dbname);
  console.log("connected!");

  const data = await db.collection("users").find().toArray();

  data.length > 0
    ? res.status(200).send({ status: "success", data })
    : res.status(404).send({ status: "no data" });
  client.close();
};

module.exports = {
  getUsers,
};
