const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

    //Create a new async function called getCollection.
 const getUsers = async (req, res) => {
    //dbName is our blueprint for execution
    //declare a variable called client, and assign it the MongoClient().
    const client = await MongoClient(MONGO_URI, options);
    //connect the client.
    await client.connect();
    // whatever name is in parentheses as in dbName will be my client
    const db = client.db("exercise_1");
    
  
    const data = await db.collection("users").find().toArray();

    client.close()
    if (data.length <= 0) {
res.status(404).send("page not found")
    }else {res.status(200).json(data)

    }
    console.log(data)
}

module.exports={getUsers}
