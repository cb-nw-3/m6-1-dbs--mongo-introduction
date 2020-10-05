const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const { DBNAME1 } = require('./config');
const addUsers = async (data) => {
  //creates a new client
  console.log('HERE==>', data);
  const client = await MongoClient(MONGO_URI, options);

  //connect to the client
  try {
    await client.connect();

    const db = client.db(DBNAME1);

    await db.collection('users').insertOne(data);

    client.close();

    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addUsers };
