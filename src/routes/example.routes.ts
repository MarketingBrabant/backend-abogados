import { Router, Request, Response, NextFunction } from 'express';
import { runPrismaMigrate } from '../utils/migrate';

const router = Router();

router.get('/migrate', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await runPrismaMigrate();
    res.status(200).json({ message: 'Migración ejecutada', result });
  } catch (error) {
    next(error);
  }
});

export default router;
