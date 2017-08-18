var bcrypt = require('bcrypt');
const saltRounds = 7;


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Admin', password: `${bcrypt.hashSync('admin', saltRounds)}`},
        {username: 'Thomas', password: `${bcrypt.hashSync('thomas', saltRounds)}`}
      ]);
    });
};
