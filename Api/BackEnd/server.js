import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connection.js";
import authRoutes from "./routes/auth.js"; // 👈 Importa tus rutas de autenticación

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Registrar rutas
app.use("/api/auth", authRoutes); // 👈 Esto habilita /api/auth/login y /api/auth/register

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando con MongoDB Atlas ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
