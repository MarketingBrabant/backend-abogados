import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';

export const getNotificaciones = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { clienteId } = req.params;
  const notificaciones = await prisma.notificacionCliente.findMany({
    where: { clienteId: parseInt(clienteId, 10) },
    orderBy: { createdAt: 'desc' },
  });
  res.status(200).json(notificaciones);
};
