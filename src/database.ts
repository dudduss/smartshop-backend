import { Pool } from 'pg';

export const pool = new Pool({
  user: 'sampathduddu',
  host: 'localhost',
  password: '',
  database: 'smartshopdb',
  port: 5432,
});
