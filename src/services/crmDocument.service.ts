const CRM_UPLOAD_URL = 'https://gestion.lemornebrabant.com/api/portal/document_upload';

interface CrmUploadResponse {
  crm_document_id: string;
}

export const uploadToCrm = async (
  token: string,
  documentId: string | number,
  expedientId: string | number,
  file: { buffer: Buffer; originalname: string; mimetype: string }
): Promise<CrmUploadResponse> => {
  const formData = new FormData();
  formData.append('document_id', String(documentId));
  formData.append('expedient_id', String(expedientId));
  formData.append(
    'documentFile',
    new Blob([file.buffer], { type: file.mimetype }),
    file.originalname
  );

  const response = await fetch(CRM_UPLOAD_URL, {
    method: 'POST',
    headers: {
      'Customer-Bearer': token,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('CRM upload failed');
  }

  return (await response.json()) as CrmUploadResponse;
};
