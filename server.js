"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { getUsers } = require("./__workshop/exercises/exercise-1.3");
const { addUser } = require("./__workshop/exercises/exercise-1.4");
const {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
} = require("./__workshop/exercises/exercise-2");
const PORT = process.env.PORT || 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // exercise 1

  .get("/exercise-1/users", getUsers)
  .get("/hello", (req, res) => res.send("Hi"))

  .get("/exercise-2/greetings", getGreetings)

  .post("/exercise-1/users", addUser)
  .post("/exercise-2/greeting", createGreeting)

  // handle 404s
  .get("/exercise-2/greetings/:lang", getGreeting)
  .delete("/exercise-2/greetings/:lang", deleteGreeting)
  .put("/exercise-2/greetings/:_id", updateGreeting)
  // .delete("/exercise-2/greetings/:id", deleteGreeting)
  // .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
