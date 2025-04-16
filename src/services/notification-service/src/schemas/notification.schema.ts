import { z } from 'zod';

export const NotificationSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  content: z.string().min(1),
});

export type NotificationDto = z.infer<typeof NotificationSchema>;