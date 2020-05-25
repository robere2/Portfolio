let express = require('express');
let router = express.Router();


router.get('/watchdogger', render);
router.get('/watchdogger*', render);

function render(req, res) {
  res.render('watchdogger', { title: 'Watchdogger has gone missing!' });
}

module.exports = router;
