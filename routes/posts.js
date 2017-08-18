var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', function(req, res, next){
  if (req.signedCookies['name'] && req.signedCookies["user_id"]){
    res.render('createPost')
  } else {
    res.send("You must be signed in to make a post.")
  }
});

router.post('/create', function(req, res, next){

});

router.get('/:id', function(req, res, next){
  var postID = req.params.id;
  knex.raw(`select posts.*, comments.body as "commentBody", users.username from posts
            join comments on posts.user_id = comments.post_id join users on
                users.id = comments.user_id where posts.id = ${req.params.id}`)
    .then(function(data){
      console.log(data.rows[0])
      res.render('singlePost', {data:data.rows, postData: data.rows[0], postID: postID})
    })
})

module.exports = router;
