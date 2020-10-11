const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  // get the information about the user from req.body
  //  after you have the information create an object named user with that information
  // connect to mongo client
  //connect to specific mongo database
  // inside this mongo database find the users collection and call inserOne
  // pass your user object as an argument to insert 1

  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");
  // const data = await db.collection("users").find().toArray();
  const user = await db.collection("users").insertOne(req.body);
  console.log(user);

  user.insertedCount
    ? res.status(201).json({ status: 201, user })
    : res.status(404).json({ status: 404, message: "No data found!" });

  // close the connection to the database server
  client.close();
};

exports.addUser = addUser;
