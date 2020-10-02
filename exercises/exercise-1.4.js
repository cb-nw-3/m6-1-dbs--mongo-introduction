'use strict';

const { MongoClient } = require('mongodb');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const { name } = req.body;
  console.log('Data sent: ', name);

  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();
  console.log('Connecting...');

  // connect to the database named: exercise_1
  const db = client.db('exercise_1');

  // insert the object 'name' from Postman to the DB
  await db.collection('users').insertOne({ name });
  console.log('Data was added!');

  // find the item added with its _id
  const users = await db.collection('users').findOne({ name });
  console.log('Retrieving data: ', users);

  // set status as 201 since we just created a new object into the db
  res.status(201).json({ status: 201, data: users });

  // close the connection to the database server
  client.close();
};

module.exports = { addUser };
