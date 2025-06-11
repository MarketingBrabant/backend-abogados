// backend/src/index.ts

import dotenv from 'dotenv';
dotenv.config();

import app from './app';

// parseamos PORT con fallback seguro a 3000
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
