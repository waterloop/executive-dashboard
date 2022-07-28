exports.up = async (knex) =>
  knex.schema.createTable('feature_permissions', (table) => {
    table.string('id').primary(); // P-key
    table.string('group_id'); // F-key
    table.string('feature_name');

    table.foreign('group_id').references('groups.id').onDelete('CASCADE');
  });

exports.down = async function (knex) {
  await knex.schema.hasTable('groups', (table) => {
    table.dropForeign('group_id');
  });
  return knex.schema.dropTableIfExists('feature_permissions');
};
