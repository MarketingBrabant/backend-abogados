// backend/src/index.ts

import dotenv from 'dotenv';
dotenv.config(); // 1) Carga las variables de entorno desde .env

import app from './app'; // 2) Importa tu aplicación Express

// 3) Usa el puerto que Render te pase en env, si no existe usa 3000
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// 4) Arranca el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});