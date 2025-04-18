import { Request, Response, Router } from 'express';
import { NotificationService } from '../services/notification.service';
import { EventModel } from '../../../../shared/events/event.model';

const router = Router();

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Notification Service is running' });
});

// Obtener últimos 10 eventos de notificación
router.get('/events', async (req: Request, res: Response) => {
  try {
    const events = await EventModel.find({ topic: 'notifications' }).sort({ timestamp: -1 }).limit(10);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

// Enviar notificación manual (POST /send)
router.post('/send', async (req: Request, res: Response): Promise<any> => {
  const { to, subject, content } = req.body;

  if (!to || !subject || !content) {
    return res.status(400).json({ message: 'Missing fields in request body' });
  }

  try {
    await NotificationService.sendEmail({
      to,
      subject,
      content,
      topic: 'notifications',
      source: 'NotificationService',
      payload: { to, subject, content },
    });

    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send notification', error });
  }
});

export default router;