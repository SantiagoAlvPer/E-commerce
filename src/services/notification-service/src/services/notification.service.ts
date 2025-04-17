import { EventModel } from '../../../../shared/events/event.model';
import { EmailService } from './Email.Service';

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

    // Enviar email usando el nuevo servicio
    await EmailService.sendMail(to, subject, content);

    // Guardar evento en MongoDB
    const savedEvent = await EventModel.create({
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
    console.log('📦 Evento guardado en MongoDB:', savedEvent);    
  }
}