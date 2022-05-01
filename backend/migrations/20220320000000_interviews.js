exports.up = (knex) =>
  knex.schema.createTable('interviews', (table) => {
    table.increments('id').primary();
    table.string('note', 2500); // Notes about interview
    table.boolean('email_sent').notNullable().defaultTo(false);
    // NOTE: references application table row with corresponding id.
    table.integer('application_id').unique();
    table
      .foreign('application_id')
      .references('applications.id')
      .onDelete('CASCADE');
  });

exports.down = (knex) =>
  knex.schema
    .hasTable('interviews', (table) => {
      table.dropForeign('application_id');
    })
    .then(() => knex.schema.dropTableIfExists('interviews'));
