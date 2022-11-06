exports.up = async (knex) =>
  knex.schema.createTable('groups', (table) => {
    table.string('id').primary(); // P-key
    table.string('group_key').unique().notNullable();
    table.datetime('last_updated');
  });

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists('groups');
};
