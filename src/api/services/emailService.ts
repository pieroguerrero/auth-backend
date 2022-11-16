import { IEmailProvider } from "api/Interfaces/emailInterfaces";
import GmailConfig from "../../config/emailConfig";

/**
 * @param emailProvider - Contains the Email Transporter and Email Address to use used to send the email.
 * @param to  - List of emails separated by commas. E.g. "bar@example.com, baz@example.com"
 * @param subject
 * @param text
 * @param html
 */
const sendEmail = async (
  emailProvider: IEmailProvider,
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  try {
    // send mail with defined transport object
    const info = await emailProvider.emailTransporter.sendMail({
      from: emailProvider.emailAddress, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return true;
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (error) {
    console.error("sendEmail:", error);
  }

  return false;
};

/**
 * @param to  - List of emails separated by commas. E.g. "bar@example.com, baz@example.com"
 * @param subject
 * @param text
 * @param html
 */
const sendGmailEmail = (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  return sendEmail(GmailConfig, to, subject, text, html);
};

export { sendGmailEmail };
