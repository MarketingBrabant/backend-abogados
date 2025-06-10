import { Request, Response } from 'express';
import { crmGet } from '../services/crm.service';

export const getExpedientes = async (req: Request, res: Response) => {
  try {
    const data = await crmGet('/expedientes', req.crmToken!);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener expedientes' });
  }
};

export const getDocumentos = async (req: Request, res: Response) => {
  const { expedienteId } = req.params;
  try {
    const data = await crmGet(`/documentos/${expedienteId}`, req.crmToken!);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener documentos' });
  }
};
