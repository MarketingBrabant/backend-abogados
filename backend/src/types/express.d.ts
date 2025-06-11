import { User, Role } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      crmToken?: string;
      userId?: string;
      userRole?: Role;
      user?: User;
    }
  }
}
