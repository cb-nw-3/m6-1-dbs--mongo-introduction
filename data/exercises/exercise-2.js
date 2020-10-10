const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const createGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db("exercise_2");
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json("ok");
    client.close();
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getGreeting = async (req, res) => {
  res.status(200).json("bacon");
  const { _id } = req.params;
  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("exercise_2");
    db.collection("greetings")
      .find()
      .toArray((err, result) => {
        if (result.length) {
          // const data = result.slice();
          res.status(200).json({ status: 200, data: result.slice(0, 6) });
        } else {
          res.status(400).json({ status: 400 });
        }
        client.close();
      });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, mesage: err.message });
  }
};

const deleteGreeting = async (req, res) => {
  try{
  const { _id } = req.params;
  const client = await MongoClient(MONGO_URI);
await client.connect();
const db = client.db("exercise_2");
const d = db.collection("greetings").deleteOne({_id});
assert.equal(1, d.deleteCount);
    res.status(204).json("done");
    client.close();
    res.status(204).json({ status: 204, _id });
  }catch(err){
    res.status(500).json({status:500,data: req.body, mesage: err.message})
  }
};

module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  
};
