// backend/src/controllers/example.controller.ts

import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

// Si necesitas tipar `crmToken` en req, asegúrate de haber declarado
// en src/types/express.d.ts lo siguiente:
// declare namespace Express {
//   interface Request {
//     crmToken?: string;
//   }
// }

export const getExpedientes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Asegúrate de pasar un token válido en req.crmToken
    const token = req.crmToken!;
    const response = await axios.get(
      'https://gestion.lemornebrabant.com/api/portal/expediente',
      {
        headers: {
          'Customer-Bearer': token,
          'User-Agent': 'Lemorne-API ACCESS',
        },
      }
    );

    if (response.data.status === 200) {
      res.status(200).json(response.data.result);
    } else {
      res
        .status(response.data.status)
        .json({ error: response.data.result });
    }
  } catch (error) {
    next(error);
  }
};

