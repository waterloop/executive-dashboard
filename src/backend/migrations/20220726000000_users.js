exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.string('id').primary(); // P-key
    table.string('given_name');
    table.string('family_name');
    table.string('email').unique();
    table.boolean('admin');
    table.string('picture');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users');
