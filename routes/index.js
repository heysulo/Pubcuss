var express = require('express');
var random = require('random-name')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',randomname:random() });
});

module.exports = router;
