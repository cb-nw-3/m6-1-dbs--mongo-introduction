const router = require('express').Router();
const {
  createGreeting,
  getGreeting,
  getManyGreetings,
  deleteGreeting,
  updateGreeting,
} = require('../exercises/exercise-2');

router.post('/exercise-2/greeting', createGreeting);
router.get('/exercise-2/greeting/:_id', getGreeting);
router.get('/exercise-2/greetingMany', getManyGreetings);
router.delete('/exercise-2/greeting/:_id', deleteGreeting);
router.put('/exercise-2/updateGreeting/:_id', updateGreeting);
module.exports = router;
