import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getNotificaciones = async (req: Request, res: Response) => {
  const { clienteId } = req.params;
  const notificaciones = await prisma.notificacionCliente.findMany({
    where: { clienteId: parseInt(clienteId, 10) },
    orderBy: { createdAt: 'desc' },
  });
  res.json(notificaciones);
};
