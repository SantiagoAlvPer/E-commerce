"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaEventModel = void 0;
const mongoose_1 = require("mongoose");
const KafkaEventSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    payload: { type: mongoose_1.Schema.Types.Mixed, required: true },
    topic: { type: String, required: true },
    timestamp: { type: Date, default: () => new Date() },
}, { versionKey: false });
exports.KafkaEventModel = (0, mongoose_1.model)("KafkaEvent", KafkaEventSchema);
//# sourceMappingURL=kafka-event.schema.js.map