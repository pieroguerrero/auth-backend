import { IAuthPayload } from "../interfaces/shared";
import jwt from "jsonwebtoken";
import envValues from "../../config/envConfig";

/**
 *
 * @param userid To be included in the token
 * @param fullOriginAddress Remote address. E.g. https://www.google.com
 * @returns
 */
const getUserVerificationURL = (userid: string, fullOriginAddress: string) => {
  const token = jwt.sign({ userid }, envValues.jwtSecretToken, {
    expiresIn: "1d",
  });

  return fullOriginAddress + "/api/auth/emailconfirmation/" + token;
};

/**
 * Returns the token to be used for routing authorization purposes
 * @param payload Payload to be encripted
 * @returns A JWT token
 */
const generateAuthorizationToken = (payload: IAuthPayload): string => {
  return jwt.sign(payload, envValues.jwtSecretToken, {
    expiresIn: envValues.jwtTokenExpiration,
  });
};

export { getUserVerificationURL, generateAuthorizationToken };
