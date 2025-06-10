import { Router } from 'express';
import migrateRoutes from './migrate.routes';
import expedienteRoutes from './expediente.routes';
import expedientePredefinidoRoutes from './expedientePredefinido.routes';

const router = Router();

router.use('/', migrateRoutes);
router.use('/crm', expedienteRoutes);
router.use('/predefinidos', expedientePredefinidoRoutes);

export default router;
