"use strict";

const {MongoClient} = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const {MONGO_URI} = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const createGreeting = async (req,res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("exercises");
    console.log("connected");
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("closed");
};

const getGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercices");
  const { _id } = req.params;
  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  })
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercices");
  db.collection("greetings").find().toArray((err, result) => {
    if(result) {
      //here 0 is the default index
      let start = Number(req.query.start) || 0;
      if(start < 0 || start > result.length - 1){
        start = 0;
      }
      //here 25 is the default number of items
      let limit = Number(req.query.limit) || 25;
      if(limit + start > (result.length - 1)){
        limit = (result.length - 1) - start;
      }
      const end = (start + limit);
      const greetings = result.slice(start, end);
      res.status(200).json({ status: 200, data: greetings })
    } else {
      res.status(404).json({ status: 404, data: "Not Found" });
    }
    client.close();
  })
};

module.exports = {createGreeting, getGreeting, getGreetings};
