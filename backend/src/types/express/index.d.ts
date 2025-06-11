import { User } from '@prisma/client';

declare namespace Express {
  export interface Request {
    crmToken?: string;
    user?: User;
  }
}
