const fs = require("file-system");

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async () => {
  console.log(greetings);
};

batchImport();
