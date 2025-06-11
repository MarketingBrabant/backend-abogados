import { User } from '@prisma/client';

declare namespace Express {
  export interface Request {
    crmToken?: string;
    user?: User;
    userId?: number;
    userRole?: string;
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
  }
}
