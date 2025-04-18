export declare class EmailService {
    static sendMail(to: string, subject: string, content: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
