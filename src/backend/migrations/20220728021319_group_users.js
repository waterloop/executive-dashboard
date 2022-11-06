exports.up = async (knex) => {
  return knex.schema.createTable('group_users', (table) => {
    table.string('user_id');
    table.string('group_id'); // F-key

    table.foreign('group_id').references('groups.id');
  });
};

exports.down = async function (knex) {
  await knex.schema.hasTable('groups', (table) => {
    table.dropForeign('group_id');
  });
  return knex.schema.dropTableIfExists('group_users');
};
