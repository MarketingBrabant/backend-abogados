import { Router } from 'express';
import { runPrismaMigrate } from '../utils/migrate';

const router = Router();

router.get('/migrate', async (_req, res) => {
  try {
    const result = await runPrismaMigrate();
    res.status(200).json({ message: 'Migración ejecutada', result });
  } catch (error) {
    res.status(500).json({ message: 'Error ejecutando migración', error });
  }
});

export default router;
