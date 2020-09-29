const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
console.log('MONGO_URI', MONGO_URI);

const dbFunction = async (dbName) => {
    const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

    await client.connect();

    const db = client.db(dbName);
    console.log("connected!");

    await db.collection("users").insertOne({ name: "Buck Rogers" });

    client.close();
    console.log("disconnected!");

}

dbFunction("m6-1-mongo-introduction");