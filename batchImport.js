const fs = require('file-system');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const greetings = JSON.parse(fs.readFileSync('data/greetings.json'));
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useUnifiedTopology: true,
};

const batchImport = async () => {
    console.log(greetings);
    console.log(MONGO_URI);
    try {
        const client = await MongoClient(MONGO_URI, options);
        await client.connect();

        const db = client.db('m6-1-mongo-introduction');

        const r = await db.collection("greetings").insertMany(greetings);
        assert.equal(greetings.length, r.insertedCount);

        console.log("success");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }

}

batchImport();