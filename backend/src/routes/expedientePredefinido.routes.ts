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
import { catchAsync } from '../utils/catchAsync';

const router = Router();

router.use(requireSession, attachRole, requireRole([Role.SUPERADMIN]));

router.post('/', catchAsync(createExpedientePredefinido));
router.get('/', catchAsync(listExpedientePredefinido));
router.put('/:id', catchAsync(updateExpedientePredefinido));
router.delete('/:id', catchAsync(deleteExpedientePredefinido));

export default router;
