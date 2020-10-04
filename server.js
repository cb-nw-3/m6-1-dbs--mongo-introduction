"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

const { getUsers } = require("./exercises/exercise-1.3");
const { addUser } = require("./exercises/exercise-1.4");
const {
  createGreeting,
  getGreeting,
  getSeveralGreetings,
} = require("./exercises/exercise-2");

const PORT = process.env.PORT || 8000;
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .get("/getUsers", getUsers)
  .post("/addUser/:user", addUser)
  .post("/exercise-2/greeting:greeting", createGreeting)
  .get("/getGreeting/:_id", getGreeting)
  .get("/getSeveralGreetings/:start/limit/:limit", getSeveralGreetings)
  .get("/getSeveralGreetings/:start", getSeveralGreetings)
  .get("/getSeveralGreetings/", getSeveralGreetings)

  // exercise 1

  // exercise 2

  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
