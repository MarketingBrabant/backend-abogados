import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const loginConCRM = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    return;
  }

  try {
    const response = await axios.post(
      'https://gestion.lemornebrabant.com/api/portal/login',
      { username: email, password },
      {
        auth: {
          username: 'customer_portal',
          password: '4ffa4075-414c-401e-81ed-110c94f44333',
        },
        headers: {
          'Customer-Addr': req.ip,
          'Customer-Bearer': '',
        },
      }
    );

    const { status, result } = response.data;

    if (status === 200) {
      res.status(200).json({ session_token: result.token, user: result.user });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    next(error);
  }
};
