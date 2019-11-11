import { Request, Response } from 'express';
import { User, users } from './users';

// token
import * as jwt from 'jsonwebtoken';

import { apiConfig } from './api-config';


export const handleAuthentication = (req: Request, res: Response) => {
  const user: User = req.body;
  if (isValid(user)) {
    const dbUser: User = users[user.email];
    // token
    const token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' },
      apiConfig.secret);
    res.json({ name: dbUser.name, email: dbUser.email, accessToken: token });

  } else {
    // 401 : not allowed (mas deve ter resposta no header)
    // 403 : Forbidden (proibido)
    // 400 : bad request (mal formed request)
    res.status(403).json({ message: 'Dados inválidos!' });
  }
}

function isValid(user: User): boolean {
  if (!user) {
    return false;
  }
  const dbUser = users[user.email];
  return dbUser !== undefined && dbUser.matches(user);
}
