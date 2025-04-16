"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    eventId: {
        type: String,
        required: true,
        unique: true,
    },
    timestamp: {
        type: Date,
        required: true,
        index: true,
    },
    source: {
        type: String,
        required: true,
        index: true,
    },
    topic: {
        type: String,
        required: true,
        index: true,
    },
    payload: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
    snapshot: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
});
// Exportación del modelo para usarlo en repositorios/servicios
exports.EventModel = (0, mongoose_1.model)('Event', EventSchema);
