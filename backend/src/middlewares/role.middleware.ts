import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { Role } from '@prisma/client';

export const attachRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: 'No autenticado' });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });

  if (!user) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  req.userRole = user.role;
  req.user = user;
  next();
};

export const requireRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = req.userRole;
    if (!role || !roles.includes(role)) {
      res.status(403).json({ error: 'Acceso denegado' });
      return;
    }
    next();
  };
};

