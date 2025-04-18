"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    eventId: { type: String, required: true, unique: true },
    timestamp: { type: Date, required: true },
    source: { type: String, required: true },
    topic: { type: String, required: true },
    payload: { type: Object, required: true },
    snapshot: { type: Object, required: true },
});
exports.EventModel = (0, mongoose_1.model)("Event", eventSchema);
//# sourceMappingURL=cartEvent.model.js.map