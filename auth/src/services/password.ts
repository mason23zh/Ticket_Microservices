// static keyword allowed access to method without instance of Password class
// instead new Password(), we can called Password.toHash() directly
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

//scrypt is callback based, need promisify to turn scrypt to promise
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");

    //hash password with the salt
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");

    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
