import { Request, Response } from 'express';

export const getExample = (_req: Request, res: Response) => {
  res.json({ message: 'Ruta /example funcionando correctamente' });
};
