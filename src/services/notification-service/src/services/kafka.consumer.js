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
exports.startKafkaConsumer = startKafkaConsumer;
const kafka_config_1 = require("../config/kafka.config");
const notification_service_1 = require("./notification.service");
function startKafkaConsumer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('📡 Connecting to Kafka...');
            yield kafka_config_1.kafkaConsumer.connect();
            console.log('✅ Kafka consumer connected');
            yield kafka_config_1.kafkaConsumer.subscribe({ topic: 'notifications', fromBeginning: false });
            console.log('📨 Subscribed to topic: notifications');
            yield kafka_config_1.kafkaConsumer.run({
                eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                    console.log(`📥 Received message from topic "${topic}"`);
                    const event = JSON.parse(message.value.toString());
                    console.log('📦 Event payload:', event);
                    // Tu lógica de notificación
                    const { to, subject, content } = event.payload;
                    yield notification_service_1.NotificationService.sendEmail({
                        to,
                        subject,
                        content,
                        topic,
                        source: event.source || 'unknown',
                        payload: event.payload,
                    });
                }),
            });
        }
        catch (err) {
            console.error('❌ Kafka connection or subscription failed:', err);
        }
    });
}
