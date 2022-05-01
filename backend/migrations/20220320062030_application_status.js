exports.up = (knex) =>
    knex.schema.createTable('application_status', (table) => {
        table.increments('id').primary().notNullable();
        table.string('key').notNullable();
        table.string('name').notNullable();
        table.string('description');
    });

exports.down = (knex) => knex.schema.dropTableIfExists('application_status');