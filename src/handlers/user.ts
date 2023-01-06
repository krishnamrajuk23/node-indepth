import { hashPassword, createJWT } from './../modules/auth';
import prisma from '../db';
import { Request, Response } from 'express';

export const createNewUser = async(req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password)
    }
  });
  const token = createJWT(user);
  res.json({token});
}

export const singIn = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  })
}