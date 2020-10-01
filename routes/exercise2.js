const router = require('express').Router();
const { createGreeting } = require('../exercises/exercise-2');

router.post('/exercise-2/greeting', createGreeting);
module.exports = router;
