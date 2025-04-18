"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = void 0;
const zod_1 = require("zod");
exports.NotificationSchema = zod_1.z.object({
    to: zod_1.z.string().email(),
    subject: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
});
//# sourceMappingURL=notification.schema.js.map