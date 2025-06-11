import { Request, Response, NextFunction } from 'express';

export const ipAudit = (req: Request, _res: Response, next: NextFunction) => {
  const ip = req.ip;
  console.log(`IP ${ip} accessing ${req.originalUrl}`);
  next();
};
