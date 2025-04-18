"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.kafka = new kafkajs_1.Kafka({
    clientId: 'CartService',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});
//# sourceMappingURL=kafkaClient.js.map