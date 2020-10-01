"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const { name } = req.body;
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // connect to the database (dbName is provided as an argument to the function)
  const db = client.db("exercise_1");
  console.log("connected!");

  await db.collection("users").insertOne({ name });

  res.status(201).json({ status: 201, data: req.body });
  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

module.exports = { addUser };


// front end 
