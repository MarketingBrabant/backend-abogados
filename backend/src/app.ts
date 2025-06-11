import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';                         // índice de todas las rutas
import authRoutes from './routes/auth.routes';        // ruta de login/auth
import { ipAudit } from './middlewares/ipAudit.middleware';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// 1) Middleware para parsear JSON (sólo una vez)
app.use(express.json());

// 2) CORS y logging
app.use(cors());
app.use(morgan('dev'));

// 3) Auditoría de IP
app.use(ipAudit);

// 4) Rutas
// Monta auth primero si quieres /auth/login
app.use('/auth', authRoutes);
// Monta el resto de rutas bajo /api
app.use('/api', routes);

// 5) Middleware de errores (al final)
app.use(errorHandler);

export default app;