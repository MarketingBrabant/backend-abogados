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
      return res.status(401).json({ error: 'Usuario no identificado' });
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
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
      return res.status(403).json({ error: 'Permiso denegado' });
    }
    next();
  };
};
