# Exercise 1.2 - Get Users (`.find`)

Let's create a function that will get the users from the database.

1. Create a new file called `exercise-1.2.js`
2. Start the file with the following code. _It is the same code you wrote in `exercise-1.1`._

```js
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
```

3. Create a new `async` function called `getCollection`.
4. In this function, declare a variable called `client`, and assign it the `MongoClient()`. Like we did in the previous exercise.
5. `connect` the client.
6. Declare a new variable called `users` and pass it the following code:

```js
const data = await db.collection("users").find().toArray();
```

Take a few minutes to unpack this line. What is it doing? Add in a `console.log` of users to see what you get.

Run the file in the terminal `node exercises/exercise-1.2.js` to confirm that everything is working.
