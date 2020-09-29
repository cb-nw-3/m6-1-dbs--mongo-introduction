const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const dbFunction = async (exercise_1) => {
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);
  
    // connect to the client
    await client.connect();
  
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(exercise_1);
    console.log("connected!");
  
    // close the connection to the database server
    client.close();
    console.log("disconnected!");