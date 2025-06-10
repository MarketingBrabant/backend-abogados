import { Router } from 'express';
import { getExpedientes, getDocumentos } from '../controllers/expediente.controller';
import { uploadDocumento, descargarDocumento } from '../controllers/documento.controller';
import { getNotificaciones } from '../controllers/notificacion.controller';
import { requireSession } from '../middlewares/session.middleware';
import { attachRole, requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.use(requireSession, attachRole);

router.get('/expedientes', getExpedientes);
router.get('/documentos/:expedienteId', getDocumentos);
router.post('/documento/upload', requireRole([Role.ABOGADO, Role.ASESOR, Role.SUPERADMIN]), uploadDocumento);
router.post('/documento/descargar', descargarDocumento);
router.get('/notificaciones/:clienteId', getNotificaciones);

export default router;
