var express = require('express');
var random = require('random-name')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user == undefined){
    res.render('index', { title: 'Express',randomname:random() });
  }else{
    res.redirect("/chat");
  }

});

module.exports = router;
