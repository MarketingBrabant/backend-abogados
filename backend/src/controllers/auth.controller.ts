import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const loginConCRM = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // 1) Imprimimos en consola lo que llega en el body
  console.log('––––––––––––––––––––––––––––––––––');
  console.log('BODY RECIBIDO en /auth/login:', JSON.stringify(req.body));
  console.log('––––––––––––––––––––––––––––––––––');

  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Faltan email o password');
    res.status(400).json({ error: 'Email y contraseña requeridos' });
    return;
  }

  try {
    // 2) Llamada al CRM con Basic Auth + User-Agent + Customer headers
    const crmResponse = await axios.post(
      'https://gestion.lemornebrabant.com/api/portal/login',
      { username: email, password },
      {
        auth: {
          username: 'customer_portal',
          password: '4ffa4075-414c-401e-81ed-110c94f44333',
        },
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Lemorne-API ACCESS',
          'Customer-Addr': req.ip,
          'Customer-Bearer': '',
        },
      }
    );

    const { status, result } = crmResponse.data;
    if (status === 200) {
      console.log('CRM login exitoso, token:', result.token);
      res.status(200).json({
        session_token: result.token,
        user: result.user,
      });
    } else {
      console.log('CRM devolvió error:', result);
      res.status(401).json({ error: result });
    }
  } catch (err: any) {
    console.error('Error conectando con CRM:', err.message);
    next(err);
  }
};



