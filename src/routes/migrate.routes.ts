import { Router } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';

const router = Router();
const execAsync = promisify(exec);

router.get('/migrate', async (_req, res) => {
  try {
    const { stdout } = await execAsync('npx prisma migrate deploy');
    res.status(200).json({ message: 'Migración ejecutada', log: stdout });
  } catch (error) {
    res.status(500).json({ message: 'Error al ejecutar la migración', error });
  }
});

export default router;
