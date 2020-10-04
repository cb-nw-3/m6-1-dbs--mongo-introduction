const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("exercise_1");

    const users = await db.collection("users").find().toArray();

    if (users.length !== 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json("no data retrieved");
    }
    await client.close();
  } catch (error) {
    res.status(500).send("cannot connect to database");
    console.log({ error });
  }
};

module.exports = { getUsers };
