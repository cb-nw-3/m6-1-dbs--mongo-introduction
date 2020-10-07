const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("exercise_1");
    await db.collection("users").insertOne(req.body);

    res.status(201).send({ data: `${req.body}` });
    client.close();
    console.log("disconnected");
  } catch (error) {
    res.status(500).send("There is a problem connecting to the db");
    console.log({ error });
  }
};

module.exports = { addUser };
