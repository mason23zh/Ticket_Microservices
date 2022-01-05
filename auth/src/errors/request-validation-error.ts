//A sub-class or Error, this will handle request validation error
import { ValidationError } from "express-validator"; //type

export class RequestValidationError extends Error {
  //private: take the current property and assgined to the class
  // private errors: ValidationError[]
  constructor(public errors: ValidationError[]) {
    super();

    //only because we are extending a build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
