import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createExpedientePredefinido = async (req: Request, res: Response) => {
  const data = await prisma.expedientePredefinido.create({ data: req.body });
  res.json(data);
};

export const listExpedientePredefinido = async (_req: Request, res: Response) => {
  const data = await prisma.expedientePredefinido.findMany();
  res.json(data);
};

export const updateExpedientePredefinido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await prisma.expedientePredefinido.update({ where: { id: parseInt(id, 10) }, data: req.body });
  res.json(data);
};

export const deleteExpedientePredefinido = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.expedientePredefinido.delete({ where: { id: parseInt(id, 10) } });
  res.status(204).end();
};
