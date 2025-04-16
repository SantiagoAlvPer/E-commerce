"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const event_model_1 = require("../../../../shared/events/event.model");
class NotificationService {
    static async sendEmail(params) {
        const { to, subject, content, topic, source, payload } = params;
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: `"${process.env.EMAIL_USER}" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text: content,
        });
        // Guardar evento en MongoDB
        await event_model_1.EventModel.create({
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
exports.NotificationService = NotificationService;
