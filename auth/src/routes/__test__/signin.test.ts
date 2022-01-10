import request from "supertest";
import { app } from "../../app";

it("fails when a email that does not exist", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  //signup
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  //signin
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "asdfa" })
    .expect(400);
});

it("responds with a cookie when given a valid credentials", async () => {
  //signup
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  //signin
  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined(); //get method to access the header
});
