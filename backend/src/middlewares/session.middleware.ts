import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';

export const requireSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<void> => {
  try {
    const token = req.headers['x-session-token'];
    if (!token || typeof token !== 'string') {
      res.status(401).json({ error: 'Token de sesión requerido' });
      return;
    }

    const session = await prisma.userSession.findUnique({
      where: { sessionToken: token },
    });

    if (!session) {
      res.status(401).json({ error: 'Sesión inválida' });
      return;
    }

    req.crmToken = session.crmToken;
    req.userId = session.userId;
    next();
  } catch (error) {
    next(error);
  }
};
