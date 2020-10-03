"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  console.log(MONGO_URI);

  console.log({ req });
  const { user } = req.params;

  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("exercise_1");

    let inserted = await db.collection("users").insertOne({ name: user });
    res.status(201).json(inserted);
  } catch (error) {
    console.log("error");
    res.status(500).json({ message: error.message });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = {
  addUser,
};
