import { Request, Response, NextFunction } from "express";
import { hashPassword, createJWT, comparePasswords } from "./../modules/auth";
import prisma from "../db";

export const createNewUser = async (req: Request, res: Response) => {
  let user = null;
  user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });
    const token = createJWT(user);
    res.json({ token , message: "user successfully created"});
  } else {
    res.status(400);
    res.json({ message: "User already exists" });
  }
};

export const singIn = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(401);
    res.json({ message: "Invalid username and password" });
    return;
  }
  const isValid = await comparePasswords(req.body.password, user.password);
  console.log("isValid", isValid);
  if (!isValid) {
    res.status(401);
    res.json({ message: "Invalid username and password" });
    return;
  }
  res.status(200);
    const token = createJWT(user);
    res.json({ token , message: "user successfully login"});
};
