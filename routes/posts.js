var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', function(req, res, next){
  res.render('createPost')
})

router.post('/create', function(req, res, next){
  
})

module.exports = router;
