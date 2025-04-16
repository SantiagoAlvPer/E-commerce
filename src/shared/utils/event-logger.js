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
    constructor() {
        this.isConnected = false;
        this.uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce-events';
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected)
                return;
            try {
                yield mongoose_1.default.connect(this.uri, {
                    dbName: process.env.MONGO_DB_NAME || 'ecommerce-events',
                });
                this.isConnected = true;
                console.log('✅ Conectado a MongoDB con Mongoose');
            }
            catch (err) {
                console.error('❌ Error conectando con Mongoose:', err);
            }
        });
    }
    saveEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const newEvent = new EventModel({
                eventId: (0, crypto_1.randomUUID)(),
                timestamp: new Date().toISOString(),
                source: event.source,
                topic: event.topic,
                payload: event.payload,
                snapshot: event.snapshot,
            });
            yield newEvent.save();
            console.log(`📦 Evento guardado en MongoDB: ${newEvent.eventId}`);
        });
    }
}
exports.EventLogger = EventLogger;
