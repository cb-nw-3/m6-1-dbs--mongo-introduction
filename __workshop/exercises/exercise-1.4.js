const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const addUser = async(req, res) => {
    const client = await MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db("exercise_1");
    console.log("connected!");
    await db.collection("users").insertOne(req.body);
    client.close();
    console.log("disconnected!")
    res.status(201).end()
};

module.exports = {addUser}