const { MongoClient } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;