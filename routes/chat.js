var express = require('express');
var random = require('random-name')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('chat', { title: 'PubCuss Chat Room',user : req.user,ip:global.ipaddress});
});

module.exports = router;
