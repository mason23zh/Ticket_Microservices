//A sub-class or Error, this will handle database connection error

export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";

  constructor() {
    super();

    //Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
