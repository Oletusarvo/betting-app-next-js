// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();

console.log(process.env.DB_PRODUCTION_MIGRATE_URL);

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production_migrate: {
    client: 'pg',
    connection: process.env.DB_PRODUCTION_MIGRATE_URL,
    ssl: {
      sslmode: 'require',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};
