import { Router } from 'express';
import multer from 'multer';
import { getExpedientes, getDocumentos } from '../controllers/expediente.controller';
import { uploadDocumento, descargarDocumento } from '../controllers/documento.controller';
import { getNotificaciones } from '../controllers/notificacion.controller';
import { requireSession } from '../middlewares/session.middleware';
import { attachRole, requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';
import { catchAsync } from '../utils/catchAsync';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(requireSession, attachRole);

router.get('/expedientes', catchAsync(getExpedientes));
router.get('/documentos/:expedienteId', catchAsync(getDocumentos));

router.post(
  '/documento/upload',
  requireRole([Role.ABOGADO, Role.ASESOR, Role.SUPERADMIN]),
  upload.single('documentFile'),
  catchAsync(uploadDocumento)
);

router.post('/documento/descargar', catchAsync(descargarDocumento));
router.get('/notificaciones/:clienteId', catchAsync(getNotificaciones));

export default router;

