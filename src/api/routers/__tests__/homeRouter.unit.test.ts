import request from "supertest";
import configureApp from "../../../config/appConfig";
import HttpStatusCodes from "../../util/HttpStatusCodes";

const testApp = configureApp();

test("About Page", (done) => {
  request(testApp)
    .get("/api/home/about")
    .expect("Content-Type", /json/)
    .expect({ message: "About!" })
    .expect(HttpStatusCodes.OK, done);
});
