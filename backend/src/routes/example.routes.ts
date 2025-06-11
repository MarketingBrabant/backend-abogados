import { Router, Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { runPrismaMigrate } from '../utils/migrate';

const router = Router();

router.get(
  '/migrate',
  catchAsync(async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const result = await runPrismaMigrate();
    res.status(200).json({ message: 'Migración ejecutada', result });
  })
);

export default router;
