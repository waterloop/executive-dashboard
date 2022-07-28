
exports.up = knex => knex.schema.createTable('users', table => {
    table.string('id'); // P-key
    table.string('given_name');
    table.string('family_name');
    table.string('email');
    table.boolean('admin');
    table.string('picture');
    table.unique('email');
  });
  
  exports.down = knex =>
    knex.schema.dropTableIfExists('users');