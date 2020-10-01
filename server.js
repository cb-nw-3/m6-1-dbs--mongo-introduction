'use strict';
// const path = require("path");
const express = require('express');
const morgan = require('morgan');
const app = new express();

// const bodyParser = require("body-parser");
// const { addUser } = require("./exercises/exercise-1.4");

const PORT = process.env.PORT || 8000;

app
  // middleware functions
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      // A comma-separated list of HTTP methods that are allowed
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      // A comma-separated list of the custom headers that are allowed to be sent
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  // exercise 1
  .use(require('./routes/exercise1'))
  // exercise 2
  .use(require('./routes/exercise2'))
  // handle 404s
  .use((req, res) => res.status(404).type('txt').send('🤷‍♂️'));

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${PORT}.`);
  }
});
