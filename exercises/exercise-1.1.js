"use strict";

const {MongoClient} =  require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

//taken from exercise-1.2 Had an error otherwise...
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbFunction = async (dbName) => {
  // console.log(MONGO_URI);
  const client = await MongoClient(MONGO_URI, options);
  
  await client.connect();

  const db = client.db(dbName);
  console.log("connected!");

  await db.collection("users").insertOne({ name: "Buck Rogers" });

  client.close();
  console.log("disconnected!");
};

dbFunction("exercise_1");