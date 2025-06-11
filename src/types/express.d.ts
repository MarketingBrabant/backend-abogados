import { Role } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      crmToken?: string;
      userId?: number;
      userRole?: Role;
      file?: {
        buffer: Buffer;
        originalname: string;
        mimetype: string;
        size: number;
      };
    }
  }
}

export {};
