import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { Role } from '@prisma/client';

export const attachRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }, // usa 'id', no 'personId'
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    req.userRole = user.role;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = req.userRole;

    if (!role || !roles.includes(role)) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    next();
  };
};
