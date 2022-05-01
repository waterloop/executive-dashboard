require('dotenv').config();

// Update with your config settings.
let config;
if (process.env.NODE_ENV === "production") {
  const { parse } = require("pg-connection-string");
  config = parse(process.env.DATABASE_URL);
  // NOTE: Comment this out if you're testing the production environment on a local postgres database!
  config.ssl = {
    rejectUnauthorized: false,
  };
}

module.exports = {
  development: {
    client: "pg",
    connection: "postgresql://docker:docker@localhost:5435",
    useNullAsDefault: true,
  },
  
  test: {
    client: "pg",
    connection: "postgresql://docker:docker@localhost:5455",
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: config,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  /**KNEX-specific custom utility functions */

  /**Utility function to auto-update updated_at columns whenever an update statement is executed.
   *
   * See https://stackoverflow.com/questions/36728899/knex-js-auto-update-trigger
   * Required since knex.js doesn't have this functionality built in.
   * Uses SQLite or Postgres trigger statements depending on the environment.
   */
  onUpdateTrigger: (table) =>
    `CREATE TRIGGER ${table}_updated_at
       BEFORE UPDATE ON ${table}
       FOR EACH ROW
       EXECUTE PROCEDURE on_update_timestamp()
     `,
  ENV_IS_STAGING_OR_PROD:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging",
};
