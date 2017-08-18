var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex.raw(`select posts.*, users.username from posts join users on user_id = users.id`)
  .then(function(data){
    res.render('index', { title: 'Greenit', data: data.rows });
  })
});

module.exports = router;
