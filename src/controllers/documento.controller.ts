import { Request, Response } from 'express';
import { crmPost, crmGet } from '../services/crm.service';
import { validateDocument } from '../services/openai.service';
import prisma from '../utils/prisma';

export const uploadDocumento = async (req: Request, res: Response) => {
  try {
    const file = req.body.filePath as string; // Ruta temporal del archivo
    const crmResponse = await crmPost('/documento/upload', req.crmToken!, {
      file,
    });
    const validation = await validateDocument(file);

    const record = await prisma.documentFile.create({
      data: {
        filename: file,
        crmDocumentId: crmResponse.id,
      },
    });

    await prisma.documentoEstado.create({
      data: {
        documentId: record.id,
        estado: validation ? 'Pre Aprobado' : 'Pre Denegado',
        observacionAI: validation,
      },
    });

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: 'Error al subir documento' });
  }
};

export const descargarDocumento = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.body;
    const documento = await prisma.documentFile.findUnique({
      where: { id: documentId },
    });
    if (!documento) return res.status(404).json({ error: 'No encontrado' });
    const data = await crmGet(`/documento/${documento.crmDocumentId}`, req.crmToken!);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al descargar' });
  }
};
