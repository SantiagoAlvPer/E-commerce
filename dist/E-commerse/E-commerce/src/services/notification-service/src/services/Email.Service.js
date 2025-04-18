"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = require("nodemailer");
class EmailService {
    static async sendMail(to, subject, content) {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Missing EMAIL_USER or EMAIL_PASS in environment variables');
        }
        const transporter = nodemailer_1.default.createTransport({
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
exports.EmailService = EmailService;
//# sourceMappingURL=Email.Service.js.map