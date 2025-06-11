import { Request, Response, NextFunction } from 'express';

export const getExample = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.json({ message: 'Ruta /example funcionando correctamente' });
};
