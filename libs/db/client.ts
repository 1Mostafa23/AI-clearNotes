import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const databaseconfig = {connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000
} ;
const pool = new Pool(databaseconfig);

export const db = drizzle(pool);
export {pool}; 
