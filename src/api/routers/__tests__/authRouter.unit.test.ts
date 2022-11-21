import { Application } from "express";
import { InboxDto, MailSlurp } from "mailslurp-client";
import request from "supertest";
import configureApp from "../../../config/appConfig";
import envValues from "../../../config/envConfig";
import { initializeMongoTestingServer } from "../../../config/test/virtualDatabaseConfigTest";
import HttpStatusCodes from "../../util/HttpStatusCodes";

describe("Auth process: Happy path", () => {
  //Setting up test use data
  const user = {
    username: "testinguser",
    password: "TestingApp2022@",
    email: "testinguser@testapp.com",
  };

  let testApp: Application;
  let inbox: InboxDto;
  let mailSlurpApi: MailSlurp;
  let secreToken: string;

  //We run beforeAll() in order to have the Jest to wait for all the promises inside of the callback before the tests are executed.
  beforeAll(async () => {
    //Setting up the email testing services
    mailSlurpApi = new MailSlurp({
      apiKey: envValues.MailSlurpSecretKey,
    });
    inbox = await mailSlurpApi.createInbox();
    //Assigning the new dynamic email to the Testing user
    user.email = inbox.emailAddress;

    //Initializing the virtual MongoDB database and the Server application
    await initializeMongoTestingServer();
    testApp = configureApp();
  });

  it("Signup user", (done) => {
    request(testApp)
      .post("/api/auth//signup")
      .send({
        email: user.email,
        username: user.username,
        password: user.password,
      })
      .expect("Content-Type", /json/)
      .expect(HttpStatusCodes.OK)
      .expect({ username: user.username }, done);
  });

  it("Signin: Not verified", (done) => {
    request(testApp)
      .post("/api/auth//signin")
      .send({ username: user.username, password: user.password })
      .expect("Content-Type", /json/)
      .expect(HttpStatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.message).toBe("User not verified.");

        return done();
      });
  });

  it("Verify email", async () => {
    const getHrefFromLatestEmail = async () => {
      //Check this may the email hasnt arrived yet
      // await mailslurp.waitController.waitForLatestEmail({
      //   inboxId: inbox1.id,
      //   timeout: 60000,
      //   unreadOnly: true,
      // });

      const emails = await mailSlurpApi.getEmails(inbox.id, { minCount: 1 });
      const latestEmail = await mailSlurpApi.getEmail(emails[0].id);

      const body = latestEmail.body;

      const match =
        typeof body === "string" ? body.match(/href="([^"]*)/) : null;
      const href = match ? match[1] : "no href";

      return href;
    };

    const confirmationURL = new URL(await getHrefFromLatestEmail());

    const response = await request(testApp).get(confirmationURL.pathname);

    expect(response.statusCode).toBe(HttpStatusCodes.OK);
    expect(response.body.message).toBe("Email confirmed successfully.");
  });

  it("Signin: successful", (done) => {
    request(testApp)
      .post("/api/auth//signin")
      .send({ username: user.username, password: user.password })
      .expect("Content-Type", /json/)
      .expect(HttpStatusCodes.OK)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.id).toBeTruthy();
        expect(res.body.username).toBe(user.username);
        expect(res.body.email).toBe(user.email);
        expect(res.body.token).toBeTruthy();

        secreToken = res.body.token;
        return done();
      });
  });

  it("Protected Route Access", (done) => {
    request(testApp)
      .get("/api/user/profile")
      .set(
        envValues.tokenFromCookie ? "Cookie" : "Authorization",
        envValues.tokenFromCookie
          ? envValues.jwtCookieName + "=" + secreToken
          : "bearer " + secreToken
      )
      .expect(HttpStatusCodes.OK)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.id).toBeTruthy();
        expect(res.body.username).toBeTruthy();
        expect(res.body.email).toBeTruthy();
        expect(res.body.iat).toBeTruthy();
        expect(res.body.exp).toBeTruthy();

        return done();
      });
  });
});
