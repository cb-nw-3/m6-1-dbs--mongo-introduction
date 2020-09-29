const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addUser = async (req, res) => {
    const { userName } = req.body;
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db('m6-1-mongo-introduction');
    console.log("connected!");

    const data = await db.collection("users").insertOne({ userName });
    console.log(data);

    res.status(201).json({ status: 201, data: req.body });

    client.close();
    console.log("disconnected!");
};

module.exports = { addUser };