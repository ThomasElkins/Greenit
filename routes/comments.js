var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');

router.post('/:id/new', function(req, res, next){
  if(req.signedCookies["user_id"]){
    knex.raw(`insert into comments (user_id, body, post_id) values (${req.signedCookies["user_id"]}, '${req.body.comment}', ${req.params.id})`)
      .then(res.redirect(`/posts/${req.params.id}`))
  } else {
    res.send("Please log in to post a comment")
  }
})

module.exports = router;
