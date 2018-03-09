module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'top_10_around_the_world',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'pg',
    debug: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    ssl: true
  }

};