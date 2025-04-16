"use strict";
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
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'test-producer',
    brokers: ['kafka:9092']
});
const producer = kafka.producer();
function sendTestEvent() {
    return __awaiter(this, void 0, void 0, function* () {
        yield producer.connect();
        const testEvent = {
            source: 'UserService',
            topic: 'notifications',
            payload: {
                to: 'test@example.com',
                subject: 'Welcome to our E-COMMERCE!',
                content: 'This is a test notification',
            },
        };
        yield producer.send({
            topic: 'notifications',
            messages: [{ value: JSON.stringify(testEvent) }],
        });
        console.log('✅ Test event sent to Kafka');
        yield producer.disconnect();
    });
}
sendTestEvent().catch(console.error);
