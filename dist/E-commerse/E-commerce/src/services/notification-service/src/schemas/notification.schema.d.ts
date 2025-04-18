import { z } from 'zod';
export declare const NotificationSchema: z.ZodObject<{
    to: z.ZodString;
    subject: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    to: string;
    subject: string;
    content: string;
}, {
    to: string;
    subject: string;
    content: string;
}>;
export type NotificationDto = z.infer<typeof NotificationSchema>;
