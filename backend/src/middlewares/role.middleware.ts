import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';

// Tipo extendido explícito
type TypedRequest = Request & {
  userId?: number;
  userRole?: string;
  user?: any;
};

export const attachRole = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
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

export const requireRole = (roles: string[]) => {
  return (req: TypedRequest, res: Response, next: NextFunction) => {
    const role = req.userRole;

    if (!role || !roles.includes(role)) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    next();
  };
};
