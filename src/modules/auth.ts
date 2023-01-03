import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const comparePasswords = (password:string, hashPassword: string) => {
 return bcrypt.compare(password, hashPassword);
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 7);
}

export const createJWT = (user: any) => {
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string);
  return token;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
    console.log('bearer', bearer)

  if (!bearer) {
    res.status(401);
    res.json({ message: 'not authorized' });
    return
  }
  const [, token] = (bearer as string)?.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: 'not a valid token' });
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (e) {
    res.status(401);
    res.json({ message: 'not a valid token', error: e });
    return
  }
}