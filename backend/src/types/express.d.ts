import { User, Role } from '@prisma/client';

declare namespace Express {
  export interface Request {
    crmToken?: string;
    userId?: number;
    userRole?: Role;
    user?: User;
  }
}
