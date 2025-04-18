interface SendNotificationParams {
    to: string;
    subject: string;
    content: string;
    topic: string;
    source: string;
    payload: Record<string, any>;
}
export declare class NotificationService {
    static sendEmail(params: SendNotificationParams): Promise<void>;
}
export {};
