require('dotenv').config();
import knexconfig from './knexfile';
import knex from 'knex';

const dbEngine = process.env.DB_ENVIRONMENT || 'development';
const config = (knexconfig as any)[dbEngine];

const db = knex(config);
const enableForeignKeys = async () => await db.raw('PRAGMA foreign_keys=ON');
if (dbEngine === 'development') enableForeignKeys();

export default db;
