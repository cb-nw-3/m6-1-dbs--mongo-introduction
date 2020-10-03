"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCollection = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("users");

  const data = await db.collection("greetings").find().toArray();
  console.log(data);
  client.close();
  console.log("disconnected!");
};

module.exports = { getCollection };
