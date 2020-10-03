const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const dbname = "exercise_1";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  let userEntered = {
    user: req.body.userName,
  };
  console.log("userEntered: ", userEntered);

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const database = client.db(dbname);

  await database.collection("users").insertOne(userEntered);

  res.status(201).send({ status: "success", userEntered });

  client.close();
  console.log("Connection Closed!");
};

module.exports = {
  addUser,
};
