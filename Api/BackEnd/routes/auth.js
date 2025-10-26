import express from 'express';
import { findUserByUsername, validatePassword } from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const isValid = await validatePassword(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    res.json({ message: 'Login exitoso', role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
