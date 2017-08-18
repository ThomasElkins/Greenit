
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {user_id: 1, title: 'First Admin Post', body: 'This is a test post from the administrator'},
        {user_id: 2, title: 'Test post from Thomas', body:'Test post, please ignore'}
      ]);
    });
};
