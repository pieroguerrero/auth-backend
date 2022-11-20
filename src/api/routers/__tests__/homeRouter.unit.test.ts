import request from "supertest";
import { configureApp } from "../../../config/tests/appConfigTest";
import { getHomeRouter } from "../homeRoutes";
import HttpStatusCodes from "../../util/HttpStatusCodes";

const testApp = configureApp();

beforeEach(() => {
  testApp.use("/", getHomeRouter());
});

test("About Page", (done) => {
  request(testApp)
    .get("/about")
    .expect("Content-Type", /json/)
    .expect({ message: "About!" })
    .expect(HttpStatusCodes.OK, done);
});
