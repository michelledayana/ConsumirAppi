import { pool } from '../db/connection.js';
import bcrypt from 'bcryptjs';

export const findUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

export const validatePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};