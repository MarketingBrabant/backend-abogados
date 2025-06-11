import { User, Role } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      crmToken?: string;
      userId?: number;
      user?: User;
      userRole?: Role;
    }
  }
}
