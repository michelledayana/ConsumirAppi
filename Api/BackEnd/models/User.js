import { pool } from '../db/connection.js';

// Buscar usuario por username
export const findUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0]; // retorna el primer usuario encontrado
};

// Validar contraseña en texto plano
export const validatePassword = async (password, dbPassword) => {
  return password === dbPassword; // comparación directa
};