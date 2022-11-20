import { configurePassportMiddlewares } from "../../../config/passportConfig";
import { IncomingMessage, Server, ServerResponse } from "http";
import request from "supertest";
import { configureApp } from "../../../config/tests/appConfigTest";
import { initializeMongoTestingServer } from "../../../config/tests/databaseConfigTest";
import { getAuthRouter } from "../authRouter";
import HttpStatusCodes from "../../util/HttpStatusCodes";

describe("Auth process -> Happy path", () => {
  const user = {
    username: "testinguser",
    password: "TestingApp2022@",
    email: "testinguser@testapp.com",
  };

  const testApp = configureApp();
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;

  //We run beforeAll() in order to have the Jest to wait for all the promises inside of the callback before the tests are executed.
  beforeAll(async () => {
    await initializeMongoTestingServer();
    configurePassportMiddlewares();

    testApp.use("/", getAuthRouter());

    server = testApp.listen(3010);
  });

  test("Signup user", (done) => {
    request(testApp)
      .post("/signup")
      .send({
        email: user.email,
        username: user.username,
        password: user.password,
      })
      .expect("Content-Type", /json/)
      .expect(HttpStatusCodes.OK)
      .expect({ username: user.username }, done);
  });

  test("Signin user not verified", (done) => {
    request(testApp)
      .post("/signin")
      .send({ username: user.username, password: user.password })
      .expect("Content-Type", /json/)
      .expect(HttpStatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.message).toBe("User not verified.");
        // expect(res.body.email).toBe(user.email);
        // expect(res.body.token).toBeTruthy();
        // expect(res.body.id).toBe("string");

        return done();
      });
  });

  afterAll(() => {
    server.closeAllConnections();
  });
});
