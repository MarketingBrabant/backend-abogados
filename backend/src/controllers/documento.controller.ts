import { Request, Response, NextFunction } from 'express';
import { crmGet } from '../services/crm.service';
import { uploadToCrm } from '../services/crmDocument.service';
import prisma from '../utils/prisma';

export const uploadDocumento = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { document_id, expedient_id } = req.body as {
      document_id?: string;
      expedient_id?: string;
    };

    if (!req.file || !document_id || !expedient_id) {
      res
        .status(400)
        .json({ error: 'document_id, expedient_id y archivo requeridos' });
      return;
    }

    // Validación opcional de tipo MIME y tamaño
    if (req.file.size > 10 * 1024 * 1024) {
      res.status(400).json({ error: 'El archivo excede el tamaño máximo de 10MB' });
      return;
    }

    const allowedMime = ['application/pdf', 'image/png', 'image/jpeg'];
    if (!allowedMime.includes(req.file.mimetype)) {
      res.status(400).json({ error: 'Tipo de archivo no permitido' });
      return;
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

    res.status(200).json({ message: 'Documento subido', id: record.id });
  } catch (error) {
    next(error); // 🔁 esto permite que el sistema de errores lo maneje
  }
};

export const descargarDocumento = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { documentId } = req.body;
    const documento = await prisma.documentFile.findUnique({
      where: { id: documentId },
    });

    if (!documento) {
      res.status(404).json({ error: 'Documento no encontrado' });
      return;
    }

    const data = await crmGet(`/documento/${documento.crmDocumentId}`, req.crmToken!);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
