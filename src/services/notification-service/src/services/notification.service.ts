import nodemailer from 'nodemailer';
import { EventModel } from '../../../../shared/events/event.model';

interface SendNotificationParams {
  to: string;
  subject: string;
  content: string;
  topic: string;
  source: string;
  payload: Record<string, any>;
}

export class NotificationService {
  static async sendEmail(params: SendNotificationParams) {
    const { to, subject, content, topic, source, payload } = params;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Notification Service" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: content,
    });

    // Guardar evento en MongoDB
    await EventModel.create({
      eventId: `notif-${Date.now()}`,
      timestamp: new Date(),
      source,
      topic,
      payload,
      snapshot: {
        to,
        subject,
        content,
      },
    });
  }
}