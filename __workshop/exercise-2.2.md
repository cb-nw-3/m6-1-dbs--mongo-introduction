# Exercise 2.2 - Add More than One (`insertMany`)

Take a look at [`greetings.json`](../data/greetings.json). It contains data that needs to be transferred to our database. You could copy/paste each one into Insomnia and add them using the function you created in `2.1` but that would be a little inefficient.

Instead, let's write a utility function that will migrate all of the data for us.

1. Create a file called `batchImport.js` in the root of the project. This file/function will be called from the terminal and run with `node`.
2. Add/Install the [`file-system`](https://www.npmjs.com/package/file-system) module.
3. Require it at the top of the `batchImport.js` file.
4. Declare a variable and assign it the contents of `greetings.json` like so:

```js
const greetings = JSON.parse(fs.readFileSync('data/greetings.json'));
```

5. Create an async function called `batchImport`.
6. For now, let's put in a console.log of the `greetings` variable.
7. Don't forget to call the function at the bottom of the file.
8. In the terminal, in VS Code, run the file with `node`. This will print the contents of `greetings.json` in the terminal.

```bash
node batchImport.js
```

8.  Add in all of the Mongo stuff! Look back at the other files and copy/paste over the code required for us to connect to the database.

    - _You won't need any of the `req` and `res` stuff. Replace thos with console.logs._
    - Instead of using `insertOne`, you will use `insertMany`. You will need to change the `assert` a little as well...
    - `insertMany` accepts an array.

9.  If you got the success message you wrote, you should be good and it should have added all of the data to the database. In `2.3`, we'll confirm this.
