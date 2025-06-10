import { Request, Response } from 'express';
import { crmGet } from '../services/crm.service';
import { uploadToCrm } from '../services/crmDocument.service';
import prisma from '../utils/prisma';

export const uploadDocumento = async (req: Request, res: Response) => {
  try {
    const { document_id, expedient_id } = req.body as {
      document_id?: string;
      expedient_id?: string;
    };

    if (!req.file || !document_id || !expedient_id) {
      return res
        .status(400)
        .json({ error: 'document_id, expedient_id y archivo requeridos' });
    }

    const upload = await uploadToCrm(
      req.crmToken!,
      document_id,
      expedient_id,
      req.file
    );

    const record = await prisma.documentFile.create({
      data: {
        documentTemplateId: Number(document_id),
        expedientId: Number(expedient_id),
        crmDocumentId: upload.crm_document_id,
        fileName: req.file.originalname,
      },
    });

    res.json({ message: 'Documento subido', id: record.id });
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
