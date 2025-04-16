"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startKafkaConsumer = startKafkaConsumer;
const kafka_config_1 = require("../config/kafka.config");
const notification_service_1 = require("./notification.service");
async function startKafkaConsumer() {
    try {
        console.log('📡 Connecting to Kafka...');
        await kafka_config_1.kafkaConsumer.connect();
        console.log('✅ Kafka consumer connected');
        await kafka_config_1.kafkaConsumer.subscribe({ topic: 'notifications', fromBeginning: false });
        console.log('📨 Subscribed to topic: notifications');
        await kafka_config_1.kafkaConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`📥 Received message from topic "${topic}"`);
                const event = JSON.parse(message.value.toString());
                console.log('📦 Event payload:', event);
                // Tu lógica de notificación
                const { to, subject, content } = event.payload;
                await notification_service_1.NotificationService.sendEmail({
                    to,
                    subject,
                    content,
                    topic,
                    source: event.source || 'unknown',
                    payload: event.payload,
                });
            },
        });
    }
    catch (err) {
        console.error('❌ Kafka connection or subscription failed:', err);
    }
}
