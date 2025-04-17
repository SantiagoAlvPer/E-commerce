"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const event_model_1 = require("../../../../shared/events/event.model");
const Email_Service_1 = require("./Email.Service");
class NotificationService {
    static async sendEmail(params) {
        const { to, subject, content, topic, source, payload } = params;
        // Enviar email usando el nuevo servicio
        await Email_Service_1.EmailService.sendMail(to, subject, content);
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
