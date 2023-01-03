import { hashPassword, createJWT } from './../modules/auth';
import prisma from '../db';
import { Request, Response } from 'express';

export const createNewUser = async(req: Request, res: Response) => {
  const username = req.body.username;
  const password = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      username,
      password
    }
  });
  const token = createJWT(user);
  res.json({token});
}