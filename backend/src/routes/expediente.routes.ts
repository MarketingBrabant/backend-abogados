import { Router } from 'express';
import multer from 'multer'; // ✅ Correcto
import { getExpedientes, getDocumentos } from '../controllers/expediente.controller';
import { uploadDocumento, descargarDocumento } from '../controllers/documento.controller';
import { getNotificaciones } from '../controllers/notificacion.controller';
import { requireSession } from '../middlewares/session.middleware';
import { attachRole, requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';
import { catchAsync } from '../utils/catchAsync'; // 👈 añadimos nuestro wrapper

const router = Router();


import { Request } from 'express'; // asegúrate de tener esto importado

const upload = multer({
  storage: multer.memoryStorage(),
});


// Middleware global para todas las rutas
router.use(requireSession, attachRole);

// 📂 Rutas
router.get('/expedientes', catchAsync(getExpedientes));
router.get('/documentos/:expedienteId', catchAsync(getDocumentos));

router.post(
  '/documento/upload',
  requireRole([Role.ABOGADO, Role.ASESOR, Role.SUPERADMIN]),
  upload.single('documentFile'),
  catchAsync(uploadDocumento) // 👈 envuelto con manejo de errores
);

router.post('/documento/descargar', catchAsync(descargarDocumento));
router.get('/notificaciones/:clienteId', catchAsync(getNotificaciones));

export default router;
