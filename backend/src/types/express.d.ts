import { Role, User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      crmToken?: string;
      userId?: number;
      userRole?: Role;
      user?: User;
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
