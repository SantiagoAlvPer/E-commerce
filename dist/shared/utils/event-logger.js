"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLogger = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const crypto_1 = require("crypto");
const EventSchema = new mongoose_1.Schema({
    eventId: { type: String, required: true, unique: true },
    timestamp: { type: String, required: true },
    source: { type: String, required: true },
    topic: { type: String, required: true },
    payload: { type: mongoose_1.Schema.Types.Mixed, required: true },
    snapshot: { type: mongoose_1.Schema.Types.Mixed, required: true },
});
const EventModel = (0, mongoose_1.model)('Event', EventSchema);
class EventLogger {
    uri;
    isConnected = false;
    constructor() {
        this.uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce-events';
    }
    async connect() {
        if (this.isConnected)
            return;
        try {
            await mongoose_1.default.connect(this.uri, {
                dbName: process.env.MONGO_DB_NAME || 'ecommerce-events',
            });
            this.isConnected = true;
            console.log('✅ Conectado a MongoDB con Mongoose');
        }
        catch (err) {
            console.error('❌ Error conectando con Mongoose:', err);
        }
    }
    async saveEvent(event) {
        await this.connect();
        const newEvent = new EventModel({
            eventId: (0, crypto_1.randomUUID)(),
            timestamp: new Date().toISOString(),
            source: event.source,
            topic: event.topic,
            payload: event.payload,
            snapshot: event.snapshot,
        });
        await newEvent.save();
        console.log(`📦 Evento guardado en MongoDB: ${newEvent.eventId}`);
    }
}
exports.EventLogger = EventLogger;
//# sourceMappingURL=event-logger.js.map