"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
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
