import * as dotenv from "dotenv";
import { generalValues } from "./util/Enums";
dotenv.config();

const config = Object.freeze({
  jwtSecretToken: process.env.SECRET_TOKEN_KEY || generalValues.NO_SECRET_KEY,
  DBConnectionString:
    process.env.MONGODB_URI || "No Connection string provided",
  SaltLength:
    typeof process.env.TOKE_SALT_LENGTH === "string"
      ? parseInt(process.env.TOKE_SALT_LENGTH)
      : 10,
  jwtTokenExpirationInMS:
    typeof process.env.JWT_EXPIRATION_IN_MS === "string"
      ? parseInt(process.env.JWT_EXPIRATION_IN_MS)
      : 900000,
});

export default config;
