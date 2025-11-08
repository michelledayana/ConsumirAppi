import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

// Ruta de login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });
    res.json({ message: "Inicio de sesión exitoso", user });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Ruta de registro
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

export default router;
