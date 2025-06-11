import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { Role } from '@prisma/client';

export const attachRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: 'Usuario no identificado' });
      return;
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(401).json({ error: 'Usuario no encontrado' });
      return;
    }
    req.userRole = user.role;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.userRole;
    if (!role || !roles.includes(role)) {
      res.status(403).json({ error: 'Permiso denegado' });
      return;
    }
    next();
  };
};
