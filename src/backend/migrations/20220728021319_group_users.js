exports.up = async (knex) => {
    // commented out as it was already implemented for deployment 
    // await knex.schema.alterTable('users', (user_table) => {
    //     user_table.unique('id'); // Update the user table so that we can reference it with a foreign key
    // })

    return knex.schema.createTable("group_users", table => {
        table.string('user_id'); 
        table.string('group_id'); // F-key

        table.foreign('group_id').references('groups.id');
    })
};

exports.down = async function(knex) {
    await knex.schema.hasTable('groups', table => { table.dropForeign('group_id') });
    return knex.schema.dropTableIfExists('group_users');
};