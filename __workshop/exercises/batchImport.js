const { MongoClient } = require("mongodb");
const assert = require("assert");
const fileSystem = require("file-system");

const greetings = JSON.parse(
  fileSystem.readFileSync("../../data/greetings.json")
);
// const batchImport = async () => {
//   console.log(greetings);
//   return greetings;
// };

// batchImport();
module.exports = { greetings };
