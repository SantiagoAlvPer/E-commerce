"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumerService = void 0;
const common_1 = require("@nestjs/common");
const kafka_event_schema_1 = require("../../schemas/kafka-event.schema");
const kafka_config_1 = require("../../../../src/config/kafka.config");
let KafkaConsumerService = class KafkaConsumerService {
    async onModuleInit() {
        await kafka_config_1.kafkaConsumer.connect();
        console.log("📡 Kafka Consumer connected");
        await kafka_config_1.kafkaConsumer.subscribe({
            topic: "user-events",
            fromBeginning: false,
        });
        console.log("📨 Subscribed to topic: user-events");
        await kafka_config_1.kafkaConsumer.run({
            eachMessage: async ({ topic, message }) => {
                const raw = message.value?.toString();
                if (!raw)
                    return;
                const { type, payload } = JSON.parse(raw);
                await kafka_event_schema_1.KafkaEventModel.create({
                    type,
                    payload,
                    topic,
                });
                console.log(`💾 Event stored: ${type}`);
            },
        });
    }
};
exports.KafkaConsumerService = KafkaConsumerService;
exports.KafkaConsumerService = KafkaConsumerService = __decorate([
    (0, common_1.Injectable)()
], KafkaConsumerService);
//# sourceMappingURL=kafka-consumer.service.js.map