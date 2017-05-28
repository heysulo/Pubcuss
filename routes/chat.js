var express = require('express');
var random = require('random-name')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.user);
  if (req.user != undefined){
    res.render('chat', { title: 'PubCuss Chat Room',user : req.user,ip:global.ipaddress});
  }else{
    res.redirect("/");
  }
});

module.exports = router;
