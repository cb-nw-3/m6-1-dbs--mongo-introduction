const router = require('express').Router();
const {
  createGreeting,
  getGreeting,
  getManyGreetings,
} = require('../exercises/exercise-2');

router.post('/exercise-2/greeting', createGreeting);
router.get('/exercise-2/greeting/:_id', getGreeting);
router.get('/exercise-2/greetingMany', getManyGreetings);
module.exports = router;
