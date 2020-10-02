"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { getUsers } = require("./exercises/exercise-1.3");
const { addUser } = require("./exercises/exercise-1.4");
const { getCollection } = require("./exercises/exercise-1.2");
const { createGreeting } = require("./exercises/exercise-2");
const { getGreeting, getGreetings } = require("./exercises/exercise-2");

const PORT = process.env.PORT || 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/exercise-1/users", getUsers)
  .post("/exercise-1/users", addUser)

  // exercise 2

  .post("/exercise-2/greeting", createGreeting)
  .get("/:_id", getGreeting)
  .get("/ex-2/greeting", getGreetings)

  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
