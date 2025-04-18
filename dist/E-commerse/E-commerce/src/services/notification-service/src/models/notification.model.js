"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEventModel = exports.NotificationModel = void 0;
const mongoose_1 = require("mongoose");
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
        enum: ['WELCOME', 'CART_REMOVALS', 'INVOICE'],
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});
NotificationSchema.index({ type: 1 });
NotificationSchema.index({ createdAt: 1 });
exports.NotificationModel = (0, mongoose_1.model)('Notification', NotificationSchema);
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
NotificationEventSchema.index({ source: 1 });
NotificationEventSchema.index({ topic: 1 });
exports.NotificationEventModel = (0, mongoose_1.model)('NotificationEvent', NotificationEventSchema);
//# sourceMappingURL=notification.model.js.map