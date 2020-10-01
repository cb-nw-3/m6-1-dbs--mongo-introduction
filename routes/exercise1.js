const router = require('express').Router();
const { getUsers } = require('../exercises/exercise-1.3');
const { addUsers } = require('../exercises/exercise-1.4');

router.get('/exercise-1/users', (req, res) => {
  getUsers()
    .then((data) =>
      data.length > 0
        ? res.status(200).json({ result: 200, data })
        : res.status(404).json({ status: 400, error: 'No data found' })
    )
    .catch((err) => res.status(400).send(err.message));
});

router.post('/exercise-1/users', (req, res) => {
  addUsers(req.body)
    .then(() => res.status(201).json({ result: 201 }))
    .catch((err) => res.status(400).send(err.message));
});
module.exports = router;
