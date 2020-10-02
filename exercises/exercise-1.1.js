'use strict';

const { MongoClient } = require('mongodb');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbFunction = async (dbName) => {
  console.log('Start');
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();
  console.log('Try to connect');

  // connect to the database (dbName is provided as an argument to the function)
  const db = client.db(dbName);
  console.log('Connected!');

  await db.collection('users').insertOne({ name: 'Buck Rogers' });

  // close the connection to the database server
  client.close();
  console.log('Disconnected!');
};

dbFunction('exercise_1');
