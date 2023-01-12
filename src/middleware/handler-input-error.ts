import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const handlerInputErrors = (req: Request, res:Response, next: NextFunction): any => {
  const errors = validationResult(req);
  console.log("error", errors.isEmpty());
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({errors: errors.array()})
  } else {
    next();
  }

}

export default handlerInputErrors;