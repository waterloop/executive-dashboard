exports.up = async (knex) => knex.schema.createTable("groups", table => {
    table.string('id').primary(); // P-key
    table.string('group_key').notNullable();
    table.datetime('last_updated');
    table.unique('group_key');
});

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('groups');
};