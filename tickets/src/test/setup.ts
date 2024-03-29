import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

// tell jest which file to mock
jest.mock("../nats-wrapper.ts");

let mongo: any;
beforeAll(async () => {
  //set up fake jwt token for test to access
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  // clean up mongo memory server
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
});

global.signin = () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  // Build a JWT payload. {id, email}
  const payload = {
    id,
    email: "test@test.com",
  };
  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // Build the session object {jwt: MY_JWT}
  const session = { jwt: token };
  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // Return a string thats the cookie with the session data
  return [`session=${base64}`];
};
