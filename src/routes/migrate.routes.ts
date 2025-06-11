import { Router, Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';

const router = Router();
const execAsync = promisify(exec);

router.get('/migrate', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { stdout } = await execAsync('npx prisma migrate deploy');
    res.status(200).json({ message: 'Migración ejecutada', log: stdout });
  } catch (error) {
    next(error);
  }
});

export default router;
