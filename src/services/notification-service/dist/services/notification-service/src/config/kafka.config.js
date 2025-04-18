"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaProducer = exports.kafkaConsumer = void 0;
const kafkajs_1 = require("kafkajs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const kafka = new kafkajs_1.Kafka({
    clientId: 'notification-service',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});
exports.kafkaConsumer = kafka.consumer({ groupId: 'notification-consumer-group' });
// Si también querés usar producer:
exports.kafkaProducer = kafka.producer();
