"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaProducer = exports.kafkaConsumer = void 0;
const kafkajs_1 = require("kafkajs");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
const kafka = new kafkajs_1.Kafka({
    clientId: 'notification-service',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});
exports.kafkaConsumer = kafka.consumer({ groupId: 'notification-consumer-group' });
exports.kafkaProducer = kafka.producer();
//# sourceMappingURL=kafka.config.js.map