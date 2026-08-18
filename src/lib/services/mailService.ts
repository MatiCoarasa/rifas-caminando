import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string,
  attachments?: nodemailer.SendMailOptions['attachments'],
) {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text,
    html,
    attachments,
  });
}
