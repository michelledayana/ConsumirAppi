import { pool } from '../db/connection.js';

export const saveSearch = async (userId, query) => {
  await pool.query('INSERT INTO searches (user_id, query) VALUES ($1, $2)', [userId, query]);
};

export const getSearches = async () => {
  const result = await pool.query('SELECT * FROM searches');
  return result.rows;
};