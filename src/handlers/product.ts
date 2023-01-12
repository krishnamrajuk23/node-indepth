import { NextFunction, Response } from "express";
import { Request } from "express-validator/src/base";
import prisma from "../db";

// Get all products
export const getProduct = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    include: {
      products: true
    }
  });

  res.json({data: user?.products});
}

//Get one product
export const getOneProduct = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsTo: req.user.id,
    }
  })

  res.json({ data: product });
 }
