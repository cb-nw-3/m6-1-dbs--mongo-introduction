"use strict"
const {MongoClient} = require("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options ={
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req,res) => {

  const {name} = req.body;

  const client = await MongoClient(MONGO_URI, options);
  
  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");

  await db.collection("users").insertOne({name});

  res.status(201).json({status: 201, data: req.body});

  client.close();
  console.log("disconnected!");
}

module.exports = {addUser};