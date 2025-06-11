import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { ipAudit } from './middlewares/ipAudit.middleware';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(ipAudit);
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

export default app;

import authRoutes from './routes/auth.routes';
app.use('/auth', authRoutes);
