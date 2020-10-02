const { MongoClient } = require('mongodb');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create a new `async` function called `getUsers`.
const getUsers = async (req, res) => {
  console.log('Start');

  // Declare a variable called `client`, and assign it the `MongoClient()
  const client = await MongoClient(MONGO_URI, options);

  // Connect the client
  await client.connect();
  console.log('Try to connect');

  const db = client.db('exercise_1');
  console.log('Connected!');

  // Declare a new variable called `users`
  const users = await db.collection('users').find().toArray();
  console.log('Data back from users: ', users);

  if (!users.length) {
    // If the array returned from the database is empty, respond with 404.
    res
      .status(404)
      .json({ status: 404, message: 'Unable to retrieve app data!' });
  } else {
    // If the array returned from the database is not empty, respond with 200.
    res.status(200).json({ status: 200, users });
  }

  client.close();
  console.log('Disconnected!');
};

module.exports = { getUsers };
