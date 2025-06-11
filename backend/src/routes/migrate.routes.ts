import { Router, Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { exec } from 'child_process';
import { promisify } from 'util';

const router = Router();
const execAsync = promisify(exec);

router.get(
  '/migrate',
  catchAsync(async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const { stdout } = await execAsync('npx prisma migrate deploy');
    res.status(200).json({ message: 'Migración ejecutada', log: stdout });
  })
);

export default router;
