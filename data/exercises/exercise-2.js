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
  try{
    const lang = req.params;
    const client = await MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db("exercise_2");
  // res.status(200).json("bacon");
  
  db.collection("greetings").findOne(lang,{},(err, result) => {
    result
      ? res.status(200).json({ status: 200, lang, data: result })
      : res.status(400).json({ status: 400, lang, data: 'Not Found' });
    
  });
  client.close();
}catch(err){
  res.status(500).json({ status: 500, data: req.body, message: err.message });
}
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
  const {_id} = req.params;
  const client = await MongoClient(MONGO_URI);
await client.connect();
const db = client.db("exercise_2");
const r = await db.collection("greetings") .deleteOne({_id: _id.toUpperCase() });
assert.equal(1, r.deleteCount);
    // res.status(204).json("done");
    res.status(204).json({ status: 201, _id });
  }catch(err){
    res.status(500).json({status:500,data: req.body, mesage: err.message})
  }
  client.close();
};

module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  
};
