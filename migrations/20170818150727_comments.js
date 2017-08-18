exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments();
    table.integer('user_id');
    table.string('body');
    table.integer('post_id');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
