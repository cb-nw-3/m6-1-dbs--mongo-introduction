const router = require('express').Router();
const { createGreeting, getGreeting } = require('../exercises/exercise-2');

router.post('/exercise-2/greeting', createGreeting);
router.get('/exercise-2/greeting/:_id', getGreeting);
module.exports = router;
