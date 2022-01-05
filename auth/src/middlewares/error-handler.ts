//Express can't handle async error, errors will be passed into next() function and handle by this middleware
//This error handler will send back SAME error structuer everytime

//Common Error Response Structuer
//Array of object, each errors has message as string and possible a filed email,password etc...
// {
//     erros:{
//         message: string, field?:string
//     }[]
// }

import { Response, Request, NextFunction } from "express";

import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
