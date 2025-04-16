"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEventModel = exports.NotificationModel = void 0;
const mongoose_1 = require("mongoose");
// Esquema de MongoDB para las notificaciones
const NotificationSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    subject: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['WELCOME', 'CART_REMINDER', 'INVOICE', 'ORDER_CONFIRMATION'],
        required: true
    },
}, {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false
});
// Índices para optimizar consultas frecuentes
NotificationSchema.index({ status: 1 });
NotificationSchema.index({ type: 1 });
NotificationSchema.index({ createdAt: 1 });
// Modelo de Mongoose para Notificaciones
exports.NotificationModel = (0, mongoose_1.model)('Notification', NotificationSchema);
// Esquema para almacenar eventos de notificación (Event Sourcing)
const NotificationEventSchema = new mongoose_1.Schema({
    eventId: { type: String, required: true, unique: true },
    timestamp: { type: Date, required: true, index: true },
    source: { type: String, required: true },
    topic: { type: String, required: true },
    payload: { type: mongoose_1.Schema.Types.Mixed, required: true },
    snapshot: { type: mongoose_1.Schema.Types.Mixed, required: true }
}, {
    versionKey: false
});
// Índices para eventos
NotificationEventSchema.index({ source: 1 });
NotificationEventSchema.index({ topic: 1 });
// Modelo de Mongoose para Eventos de Notificación
exports.NotificationEventModel = (0, mongoose_1.model)('NotificationEvent', NotificationEventSchema);
