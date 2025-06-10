import { Role } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      crmToken?: string;
      userId?: number;
      userRole?: Role;
    }
  }
}

export {};
