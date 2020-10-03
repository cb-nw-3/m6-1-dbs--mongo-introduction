"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  console.log(MONGO_URI);
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("exercise_1");

    const data = await db.collection("users").find().toArray();
    res.status(200).json(data);
  } catch (error) {
    console.log("error");
    res.status(500).json({ message: error.message });
  }
  client.close();
  console.log("disconnected!");

  // close the connection to the database server
};

module.exports = {
  getUsers,
};
