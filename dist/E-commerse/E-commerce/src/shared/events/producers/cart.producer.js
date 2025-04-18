"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producer = void 0;
const kafkaClient_1 = require("../../kafka/kafkaClient");
const uuid_1 = require("uuid");
class Producer {
    producer;
    sentEventIds;
    isConnected = false;
    constructor() {
        this.producer = kafkaClient_1.kafka.producer();
        this.sentEventIds = new Set();
    }
    async connect() {
        try {
            await this.producer.connect();
            this.isConnected = true;
            console.log("🚀 Kafka producer conectado");
        }
        catch (error) {
            console.error("❌ Error al conectar con Kafka:", error);
            this.isConnected = false;
            setTimeout(() => this.connect(), 5000);
        }
    }
    async disconnect() {
        try {
            await this.producer.disconnect();
            this.isConnected = false;
            console.log("👋 Kafka producer desconectado");
        }
        catch (error) {
            console.error("❌ Error al desconectar el productor de Kafka:", error);
        }
    }
    async ensureConnection() {
        if (!this.isConnected) {
            console.log("⚠️ Kafka productor desconectado, reconectando...");
            await this.connect();
        }
    }
    async send(topic, message) {
        await this.ensureConnection();
        if (!message.eventId) {
            message.eventId = (0, uuid_1.v4)();
        }
        if (this.sentEventIds.has(message.eventId)) {
            console.warn(`⚠️ Evento duplicado ignorado (ya fue enviado): ${message.eventId}`);
            return;
        }
        try {
            await this.producer.send({
                topic,
                messages: [
                    {
                        key: message.eventId,
                        value: JSON.stringify(message),
                    },
                ],
            });
            this.sentEventIds.add(message.eventId);
            console.log(`✅ Mensaje enviado con ID único: ${message.eventId}`);
        }
        catch (error) {
            console.error("❌ Error al enviar el mensaje:", error);
            throw new Error("No se pudo procesar el evento");
        }
    }
}
exports.Producer = Producer;
//# sourceMappingURL=cart.producer.js.map