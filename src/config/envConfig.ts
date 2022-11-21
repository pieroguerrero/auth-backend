import * as dotenv from "dotenv";
dotenv.config();

const envValues = Object.freeze({
  /**
   * Port number to be used by the current application
   */
  Port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  /**
   * A value to use used as seed by the JWT jsonwebtoken library in order to sign the payload.
   */
  jwtSecretToken: process.env.SECRET_TOKEN_KEY || "no-secret-key",
  /**
   * MongoDB full connection string.
   */
  DBConnectionString:
    process.env.MONGODB_URI || "No Connection string provided",
  /**
   * Number of iterations for the encryption algotithm
   */
  SaltLength: process.env.TOKE_SALT_LENGTH
    ? parseInt(process.env.TOKE_SALT_LENGTH)
    : 10,
  /**
   * JWT token expiration time, expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d".
   */
  jwtTokenExpiration: process.env.JWT_EXPIRATION_IN_SECONDS
    ? parseInt(process.env.JWT_EXPIRATION_IN_SECONDS)
    : 900,
  /**
   * When 'true', it will provide and receive the authorization token via the cookies. Otherwhise will handle it via Authorization header with a bearer token.
   */
  tokenFromCookie: process.env.TOKEN_FROM_COOKIE === "true" ? true : false,
  /**
   * Useful only when TOKEN_FROM_COOKIE is 'true'. This parameter gives a name to the cookie is going to be used to provide and receive the authorization token.
   */
  jwtCookieName: process.env.JWT_TOKEN_COOKIE_NAME
    ? process.env.JWT_TOKEN_COOKIE_NAME
    : "jwt12345",
  /**
   * Gmail Email host, commonly: 'smtp.gmail.com'
   */
  GmailHost: process.env.EMAIL_GMAIL_HOST || "",
  /**
   * Gmail email address to use used as the email sender
   */
  GmailAddress: process.env.EMAIL_GMAIL_ADDRESS || "",
  /**
   * Gmail email sender password
   */
  GmailPassword: process.env.EMAIL_GMAIL_PASS || "",
  /**
   * Secret key to perform Email Verification testing with Jest and Supertest. You can get one free at: https://mailslurp.com/
   */
  MailSlurpSecretKey: process.env.EMAIL_MAILSLURP_KEY || "",
});

export default envValues;
