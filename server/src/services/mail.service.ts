import nodemailer from "nodemailer";

import { InternalServerErrorException } from "../utils/error.util.ts";
const sendVerificationTokenMail = async (token: string, email: string) => {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new InternalServerErrorException("base url not defined");
  }

  const transporter = nodemailer.createTransport({
    auth: {
      pass: process.env.MAILTRAP_PASSWORD,
      user: process.env.MAILTRAP_USERNAME,
    },
    host: process.env.MAILTRAP_HOST,
  });

  const mailOptions = {
    from: process.env.MAILTRAP_SENDER_EMAIL,
    subject: "Verify your email",
    text: `Please click on the following link to verify your email: ${baseUrl}/api/v1/users/verify/${token}`,
    to: email,
  };

  await transporter.sendMail(mailOptions);
};

export { sendVerificationTokenMail };
