import { Request, Response } from 'express';

// token
import * as jwt from 'jsonwebtoken';
import { apiConfig } from './api-config';


export const handleAuthorization = (req: Request, res: Response, next) => {
  const token = extractToken(req);

  // se nao existir
  if (!token) {
    res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"'); // sinaliza que espera um token do tipo JWT
    res.status(401).json({ message: 'Você precisa se autenticar.' });
  } else {
    // meat-api-password eh a senha pra decodificar
    jwt.verify(token, apiConfig.secret, (error, decoded) => {
      if (decoded) {
        next();
      } else {
        res.status(403).json({ message: 'Não autorizado.' });
      }
    })
  }
}


function extractToken(req: Request): string {
  let token = undefined;
  if (req.headers && req.headers.authorization) {
    // Authorization: Bearer ZZZ.ZZZ.ZZZ
    const parts: string[] = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }
  return token;
}