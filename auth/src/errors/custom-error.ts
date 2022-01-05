//This is an abstract class extends the Error class
//The custom-error abstract class will define the structuer of common error
//And extended by specific errors, (RequestValidationErrors extends CustomErrors)

export abstract class CustomError extends Error {
  abstract statusCode: number; //abstract key word means the sub-class MUST implment this

  //optional
  constructor(message: string) {
    super(message); //use as throw new Error('asdf') for log purpose
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[]; //signature
}
