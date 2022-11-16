import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";

interface IEmailProvider {
  emailTransporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  emailAddress: string;
}

export { IEmailProvider };
