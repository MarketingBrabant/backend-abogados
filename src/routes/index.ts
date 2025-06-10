import { Router } from 'express';
import migrateRoutes from './migrate.routes'; // 👈 Importamos

const router = Router();

router.use('/', migrateRoutes); // 👈 Montamos la ruta directamente

export default router;


