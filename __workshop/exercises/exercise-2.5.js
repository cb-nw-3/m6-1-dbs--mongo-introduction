const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteGreeting = async (req, res) => {
  //req param = endpoint/123
  const { _id } = req.params;

  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // connect to the database (db name is provided as an argument to the function)
  const db = client.db("exercise_2");
  console.log("connected!");

  //once connected, delete one greeting
  const data = await db
    .collection("greetings")
    .deleteOne({ _id }, (err, result) => {
      result
        ? res.status(204).json({ status: 204, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found" });
      client.close();
    });
};
//In order to test this function, call it at the bottom of the file. Don't forget to pass it the database name as an argument.
// getUsers("exercise_1");

module.exports = { deleteGreeting };
