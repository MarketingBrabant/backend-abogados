import { Router } from 'express';
import { getExpedientes, getDocumentos } from '../controllers/expediente.controller';
import { uploadDocumento, descargarDocumento } from '../controllers/documento.controller';
import multer from 'multer';
import { getNotificaciones } from '../controllers/notificacion.controller';
import { requireSession } from '../middlewares/session.middleware';
import { attachRole, requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.use(requireSession, attachRole);

router.get('/expedientes', getExpedientes);
router.get('/documentos/:expedienteId', getDocumentos);
router.post(
  '/documento/upload',
  requireRole([Role.ABOGADO, Role.ASESOR, Role.SUPERADMIN]),
  upload.single('documentFile'),
  uploadDocumento
);
router.post('/documento/descargar', descargarDocumento);
router.get('/notificaciones/:clienteId', getNotificaciones);

export default router;
