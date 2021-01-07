import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'smartshop123',
  database: 'smartshop',
  port: 5432,
});
