"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_service_1 = require("../services/notification.service");
const event_model_1 = require("../../../../shared/events/event.model");
const router = (0, express_1.Router)();
// Health check
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'Notification Service is running' });
});
// Obtener últimos 10 eventos de notificación
router.get('/events', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_model_1.EventModel.find({ topic: 'notifications' }).sort({ timestamp: -1 }).limit(10);
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
}));
// Enviar notificación manual (POST /send)
router.post('/send', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, content } = req.body;
    if (!to || !subject || !content) {
        return res.status(400).json({ message: 'Missing fields in request body' });
    }
    try {
        yield notification_service_1.NotificationService.sendEmail({
            to,
            subject,
            content,
            topic: 'notifications',
            source: 'NotificationService',
            payload: { to, subject, content },
        });
        res.status(200).json({ message: 'Notification sent successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to send notification', error });
    }
}));
exports.default = router;
