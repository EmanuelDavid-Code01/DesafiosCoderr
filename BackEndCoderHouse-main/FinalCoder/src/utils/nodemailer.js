import { createTransport } from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  },
});

const sendMailTo = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.NODEMAILER_FROM || "Electro-Life",
    to,
    subject,
    text,
  };
  return await transporter.sendMail(mailOptions);
};

export default sendMailTo;