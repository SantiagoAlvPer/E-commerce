import nodemailer from 'nodemailer';

export class EmailService {
  static async sendMail(to: string, subject: string, content: string) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Missing EMAIL_USER or EMAIL_PASS in environment variables');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    return transporter.sendMail({
      from: `"Notification Service" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: content,
    });
  }
}