import { Request, Response } from 'express';
import { hashPassword, createJWT, comparePasswords } from './../modules/auth';
import prisma from '../db';

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

  if (!user) {
    res.status(401)
    res.statusMessage = 'Invalid username and password';
    return
  }
  const isValid = comparePasswords(req.body.password, user.password);
  if (!isValid) {
    res.status(401)
    res.statusMessage = 'Invalid username and password';
  }
}