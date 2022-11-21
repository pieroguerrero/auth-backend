import { IEmailProvider } from "api/interfaces/emailInterfaces";
import nodemailer from "nodemailer";
import envValues from "./envConfig";

const GmailConfig: IEmailProvider = {
  emailTransporter: nodemailer.createTransport({
    host: envValues.GmailHost,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: envValues.GmailAddress,
      pass: envValues.GmailPassword,
    },
  }),
  emailAddress: envValues.GmailAddress,
};

export default GmailConfig;
