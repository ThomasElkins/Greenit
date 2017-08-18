
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {user_id: 2, body: 'This is an automated test comment from Thomas', post_id: 1},
        {user_id: 1, body: 'This is an automated test comment from Admin', post_id: 2}
      ]);
    });
};
