const { MongoClient } = require("mongodb");
//mongo library
require("dotenv").config();
const { MONGO_URI } = process.env;

const dbFunction = async(dbName) => {
    //dbName is variable serving as placeholder for whatever runs line 16
    const client = await MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(dbName);
    console.log("connected!");
    await db.collection("users").insertOne({ name: "Buck Rogers" });
    client.close();
    console.log("disconnected!")
};

dbFunction("exercise_1");