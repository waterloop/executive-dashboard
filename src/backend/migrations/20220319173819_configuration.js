exports.up = (knex) =>
  knex.schema.createTable('configuration', (table) => {
    table.increments('id').primary();
    table.string('label').notNullable();
    table.string('value').notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('configuration');
