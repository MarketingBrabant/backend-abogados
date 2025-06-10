import { Router } from 'express';
import {
  createExpedientePredefinido,
  listExpedientePredefinido,
  updateExpedientePredefinido,
  deleteExpedientePredefinido,
} from '../controllers/expedientePredefinido.controller';
import { requireSession } from '../middlewares/session.middleware';
import { attachRole, requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.use(requireSession, attachRole, requireRole([Role.SUPERADMIN]));

router.post('/', createExpedientePredefinido);
router.get('/', listExpedientePredefinido);
router.put('/:id', updateExpedientePredefinido);
router.delete('/:id', deleteExpedientePredefinido);

export default router;
