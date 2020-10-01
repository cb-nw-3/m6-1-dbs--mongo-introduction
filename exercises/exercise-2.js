const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    try {
        const { lang, _id, hello } = req.body;

        await client.connect();

        const db = client.db('m6-1-mongo-introduction');
        console.log("connected!");

        const r = await db.collection("greeting").insertOne({ lang, _id, hello });
        assert.strictEqual(1, r.insertedCount);

        res.status(201).json({ status: 201, data: req.body });

    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
    console.log("disconnected!");
};

const getGreeting = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    const { _id } = req.params;

    await client.connect();
    const db = client.db('m6-1-mongo-introduction');
    db.collection("greetings").findOne({ _id }, (err, result) => {
        result
            ? res.status(200).json({ status: 200, _id, data: result })
            : res.status(404).json({ status: 404, _id, data: "Not Found" });
        client.close();
    });

}

module.exports = { createGreeting, getGreeting };