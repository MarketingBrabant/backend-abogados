import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const runPrismaMigrate = async (): Promise<string> => {
  const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
  if (stderr) {
    throw new Error(stderr);
  }
  return stdout;
};
