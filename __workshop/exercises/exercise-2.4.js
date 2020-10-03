const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getGreetings = async (req, res) => {
  // req query = /endpoint?start=123&limit=456

  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // connect to the database (db name is provided as an argument to the function)
  const db = client.db("exercise_2");
  console.log("connected!");

  //once connected, find greetings
  await db
    .collection("greetings")
    .find()
    .toArray((err, result) => {
      if (result.length) {
        const start = Number(req.query.start) || 0;
        const cleanStart = start > -1 && start < result.length ? start : 0;
        const end = cleanStart + (Number(req.query.limit) || 25);
        const cleanEnd = end > result.length ? result.length - 1 : end;
        const data = result.slice(cleanStart, cleanEnd);
        res.status(200).json({ status: 200, data });
      } else {
        res.status(404).json({ status: 404, data: "No data Found" });
      }
      client.close();
    });
};
//In order to test this function, call it at the bottom of the file. Don't forget to pass it the database name as an argument.
// getUsers("exercise_1");

module.exports = { getGreetings };
