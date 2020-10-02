const { MongoClient } = require('mongodb');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// create a new `async` function called `getCollection`.
const getCollection = async (dbName) => {
  console.log('Start');

  // declare a variable called `client`, and assign it the `MongoClient()
  const client = await MongoClient(MONGO_URI, options);

  // connect the client
  await client.connect();
  console.log('Try to connect');

  const db = client.db(dbName);
  console.log('Connected!');

  // declare a new variable called `users`
  const users = await db.collection('users').find().toArray();
  console.log('Data back from users: ', users);

  // playing around with data :-)
  console.log(
    'Playing with data: ',
    users[0]._id,
    users[0].name,
    Object.keys(users)
  );

  let newArray = users;
  for (const [index, element] of newArray.entries()) {
    console.log(index, element);
  }

  for (let { _id: x, name: y } of users) {
    console.log('Id: ' + x + ', Name: ' + y);
  }

  client.close();
  console.log('Disconnected!');
};

getCollection('exercise_1');
