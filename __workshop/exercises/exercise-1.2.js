const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

    //Create a new async function called getCollection.
const getCollection = async (dbName) => {
    //dbName is our blueprint for execution
    //declare a variable called client, and assign it the MongoClient().
    const client = await MongoClient(MONGO_URI, options);
    //connect the client.
    await client.connect();
    // whatever name is in parentheses as in dbName will be my client
    const db = client.db(dbName);
    
    // new variable called users and pass it the following code:   DOING WHAT???
    const data = await db.collection("users").find().toArray();
    client.close()
    console.log(data)
}

getCollection("exercise_1");


