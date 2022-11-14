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
  jwtTokenExpirationInMS: process.env.JWT_EXPIRATION_IN_MS
    ? parseInt(process.env.JWT_EXPIRATION_IN_MS)
    : 900000,
  tokenFromCookie: process.env.TOKEN_FROM_COOKIE === "true" ? true : false,
  jwtCookieName: process.env.JWT_TOKEN_COOKIE_NAME
    ? process.env.JWT_TOKEN_COOKIE_NAME
    : "jwt12345",
});

export default config;
