import * as dotenv from "dotenv";
import { generalValues } from "./util/Enums";
dotenv.config();

const config = Object.freeze({
  Port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  jwtSecretToken: process.env.SECRET_TOKEN_KEY || generalValues.NO_SECRET_KEY,
  DBConnectionString:
    process.env.MONGODB_URI || "No Connection string provided",
  SaltLength: process.env.TOKE_SALT_LENGTH
    ? parseInt(process.env.TOKE_SALT_LENGTH)
    : 10,
  /**
   * Expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
   */
  jwtTokenExpiration: process.env.JWT_EXPIRATION_IN_SECONDS
    ? parseInt(process.env.JWT_EXPIRATION_IN_SECONDS)
    : 900,
  tokenFromCookie: process.env.TOKEN_FROM_COOKIE === "true" ? true : false,
  jwtCookieName: process.env.JWT_TOKEN_COOKIE_NAME
    ? process.env.JWT_TOKEN_COOKIE_NAME
    : "jwt12345",
});

export default config;
