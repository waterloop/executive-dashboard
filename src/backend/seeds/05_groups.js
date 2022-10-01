const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');
const { parseTimeFromRequest } = require('../utils/db-dates.js');

// An issue with deploying is that we require this seeding for the functionality on the actual deployment.
// A new table that is deployed needs to be migrated the first time its deployed, then, in order to avoid this, we would put the !ENV_IS_STAGING_OR_PROD checker again?

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('groups')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('groups').insert([
          {
            id: 1,
            group_key: '023ckvvd39fxiix',
            last_updated: parseTimeFromRequest(Date.now()),
          },
          {
            id: 2,
            group_key: '03mzq4wv38e7d6w',
            last_updated: parseTimeFromRequest(Date.now()),
          },
          {
            id: 3,
            group_key: '0147n2zr1nb4vgp',
            last_updated: parseTimeFromRequest(Date.now()),
          },
        ]);
      });
  };
} else {
  exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('groups')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('groups').insert([
          {
            id: 1,
            group_key: '023ckvvd39fxiix',
            last_updated: parseTimeFromRequest(Date.now()),
          },
          {
            id: 2,
            group_key: '03mzq4wv38e7d6w',
            last_updated: parseTimeFromRequest(Date.now()),
          },
          {
            id: 3,
            group_key: '0147n2zr1nb4vgp',
            last_updated: parseTimeFromRequest(Date.now()),
          },
        ]);
      });
  };
}
