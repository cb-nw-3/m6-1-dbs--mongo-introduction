const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db("exercise_1")

    const data = await db.collection("users").find().toArray();
    // If there is Data in the array, it will send a res 200 with the data, if the array is empty / missing data, a res 404 is sent with the message No data found.
    data.length ? res.status(200).json({ status: 200, data}) : res.status(404).json({ status: 404, message: "No data found!"});
    client.close()
}

module.exports = { getUsers };

