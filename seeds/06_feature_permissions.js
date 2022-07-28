const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('feature_permissions').del()
      .then(function () {
        // Inserts seed entries
        return knex('feature_permissions').insert([
          {id: 1, group_id: 1, feature_name: 'View Website'},
          {id: 2, group_id: 1, feature_name: 'Edit Content'},
          {id: 3, group_id: 2, feature_name: 'View Website'},
          {id: 4, group_id: 3, feature_name: 'View Website'},
        ]);
      });
};
}else{
  exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('feature_permissions').del()
      .then(function () {
        // Inserts seed entries
        return knex('feature_permissions').insert([
          {id: 1, group_id: 1, feature_name: 'View Website'},
          {id: 2, group_id: 1, feature_name: 'Edit Content'},
          {id: 3, group_id: 2, feature_name: 'View Website'},
          {id: 4, group_id: 3, feature_name: 'View Website'},
        ]);
      });
};
}