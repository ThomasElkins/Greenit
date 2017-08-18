var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');

//Nothing on /users page
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// Render create user form
router.get('/create', function(req, res, next){
  res.render('createUser')
});
// Creates a new user
router.post('/create', function(req, res, next){
  if (req.body.password === req.body.confirm){
    bcrypt.hash(req.body.password, 7, function(err, hash){
      knex.raw(`insert into users (username, password) values ('${req.body.username}', '${hash}')`)
        .then(function(resp) {
          res.redirect('/')
            }).catch(function(err){
                res.send("Username already exists, please choose a different name")
              })
            })
  } else {
      res.send("Passwords did not match, please try again")
        }
  });
//Log in a user
router.post('/login', function(req, res, next){
  knex.raw(`select * from users where username = '${req.body.username}'`)
    .then(function(user){
      bcrypt.compare(req.body.password, user.rows[0].password, function(err, resp){
        if (resp) {
          res.cookie('name', req.body.username, {signed: true})
          res.redirect('/')
        }
        else res.send("Log in Failed")
      })
    }).catch(function(err){
      res.send("Username not found")
    })
});



module.exports = router;
