const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const createGreeting = async (req, res) => {
    const client = await MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db("exercise_1");
    await db.collection("greetings").insertOne(req.body);
    res.status(200).send("ok")
    client.close();
}
module.exports = {createGreeting}
