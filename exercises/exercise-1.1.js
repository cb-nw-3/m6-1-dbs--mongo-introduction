const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbFunction = async (dbName) => {
    console.log(MONGO_URI);
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);
    console.log(client);
    // connect to the client
    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");

    // close the connection to the database server
    client.close();
    console.log("disconnected!");
};

dbFunction('exercise_1');