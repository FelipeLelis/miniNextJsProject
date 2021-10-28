import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
// import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'
import entities from '../models'

// Using my Postgres Docker container
const postgresOptions: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'nkey',
  synchronize: true,
  logging: false,
  entities,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
}

// Uncomment to run locally with sqlite
// const sqliteOptions: SqliteConnectionOptions = {
//   type: 'sqlite',
//   database: './todos.sqlite',
//   synchronize: true,
//   logging: false,
//   entities,
// }

const typeOrmOptions = postgresOptions
  // process.env.DATABASE_DRIVER === 'postgres' ? postgresOptions : false

export default typeOrmOptions
