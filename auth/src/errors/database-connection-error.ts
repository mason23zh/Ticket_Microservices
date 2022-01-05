//A sub-class or Error, this will handle database connection error

//Common Error Response Structuer
//Array of object, each errors has message as string and possible a filed email,password etc...
// {
//     erros:{
//         message: string, field?:string
//     }[]
// }

import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database";

  constructor() {
    super("Error connecting to DB");

    //Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors = () => {
    return [{ message: this.reason }];
  };
}
