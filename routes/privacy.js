let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/privacy', function(req, res, next) {

  res.render('privacy', { title: 'Erik Roberts | Privacy Policy'});
  next();
});

module.exports = router;
