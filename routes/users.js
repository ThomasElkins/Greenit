var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');

//Redirects to individual user home page if they are logged in
router.get('/', function(req, res, next) {
  if (req.signedCookies["user_id"]){
    res.redirect(`/users/${req.signedCookies["user_id"]}`)
  } else{
    res.send('Please log in to continue');
  }
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
          res.cookie('user_id', user.rows[0].id, {signed: true})
          res.redirect('/')
        }
        else res.send("Log in Failed")
      })
    }).catch(function(err){
      res.send("Username not found")
    })
});
// Log a user out
router.get('/logout', function(req, res, next){
  res.clearCookie('name', {signed: true})
  res.clearCookie('user_id', {signed: true})
  res.redirect('/')
})
//Individual user home page
router.get('/:id', function(req, res, next){
  if (req.signedCookies["user_id"] === req.params.id){
    knex.raw(`select * from users where id = ${req.params.id}`)
      .then(function(user){
        res.render('singleUser', {data: user.rows[0]})
      })
    } else {
    res.send("Unauthorized Access Attempt")
  }
})


module.exports = router;
