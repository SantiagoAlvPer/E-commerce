"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProducerService = void 0;
const common_1 = require("@nestjs/common");
const kafka_config_1 = require("../../../src/config/kafka.config");
let KafkaProducerService = class KafkaProducerService {
    async onModuleInit() {
        await kafka_config_1.kafkaProducer.connect();
        console.log("🚀 Kafka Producer connected");
    }
    async emit(type, payload, topic = "user-events") {
        await kafka_config_1.kafkaProducer.send({
            topic,
            messages: [
                {
                    value: JSON.stringify({ type, payload }),
                },
            ],
        });
        console.log(`📤 Event emitted: ${type}`);
    }
};
exports.KafkaProducerService = KafkaProducerService;
exports.KafkaProducerService = KafkaProducerService = __decorate([
    (0, common_1.Injectable)()
], KafkaProducerService);
//# sourceMappingURL=kafka.service.js.map