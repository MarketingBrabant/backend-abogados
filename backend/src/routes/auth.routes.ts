import { Router } from 'express';
import { loginConCRM } from '../controllers/auth.controller';
import { catchAsync } from '../utils/catchAsync';

const router = Router();

router.post('/login', catchAsync(loginConCRM));

export default router;
