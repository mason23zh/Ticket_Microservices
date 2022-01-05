//A sub-class or Error, this will handle request validation error

//Common Error Response Structuer
//Array of object, each errors has message as string and possible a filed email,password etc...
// {
//     erros:{
//         message: string, field?:string
//     }[]
// }

import { ValidationError } from "express-validator"; //type
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  //private: take the current property and assgined to the class
  // private errors: ValidationError[]
  constructor(public errors: ValidationError[]) {
    super("Invalid email or password");

    //only because we are extending a build in class
    //Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors = () => {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  };
}
