/* eslint-disable import/no-mutable-exports */
import pg from 'pg';
import 'dotenv/config';

let pool;
if (process.env.NODE_ENV === 'test') {
  pool = new pg.Pool({ connectionString: process.env.TESTDB_URL });
} else {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL || process.env.LOCALDB_URL,
    ssl: false,
  });
}

export default pool;