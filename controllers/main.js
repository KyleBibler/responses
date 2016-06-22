var express = require('express'),
	router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: 'Responses' });
});

module.exports = router;