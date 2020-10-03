const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCollection = async (dbName) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db(dbName);

  let databasesList = await client.db().admin().listDatabases();

  //   let collctions = await client.db(dbName).admin().listCollections();

  //   await listDatabases(client);

  const data1 = await db.collection("users");

  const cursor = data1.find();

  while (await cursor.hasNext()) {
    console.log(cursor.next());
  }

  client.close();
  console.log("disconnected");

  //   let users = await data1.find().toArray();
  //   console.log({ users });

  //   client.close();
  //   console.log("disconnected");
};

getCollection("exercise-1");
