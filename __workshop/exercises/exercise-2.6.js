const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updateGreeting = async (req, res) => {
  //req param = endpoint/123
  const { _id } = req.params;

  const { hello } = req.body;

  if (!hello) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: 'Only "hello" may be updated.',
    });
    return;
  }
  try {
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
      .updateOne({ _id }, { $set: { hello } });
    res.status(200).json({ status: 200, _id });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};
//In order to test this function, call it at the bottom of the file. Don't forget to pass it the database name as an argument.
// getUsers("exercise_1");

module.exports = { updateGreeting };
