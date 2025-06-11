import { Request, Response, NextFunction } from 'express';
import { crmGet } from '../services/crm.service';

export const getExpedientes = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const data = await crmGet('/expedientes', req.crmToken!);
  res.status(200).json(data);
};

export const getDocumentos = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { expedienteId } = req.params;
  const data = await crmGet(`/documentos/${expedienteId}`, req.crmToken!);
  res.status(200).json(data);
};
