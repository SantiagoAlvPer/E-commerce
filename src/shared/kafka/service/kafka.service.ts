// src/shared/kafka/kafka-producer.service.ts
import { Injectable, OnModuleInit } from "@nestjs/common";
import { kafkaProducer } from "../../../config/kafka.config";

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  async onModuleInit() {
    await kafkaProducer.connect();
    console.log("🚀 Kafka Producer connected");
  }

  async emit(type: string, payload: any, topic = "user-events") {
    await kafkaProducer.send({
      topic,
      messages: [
        {
          value: JSON.stringify({ type, payload }),
        },
      ],
    });

    console.log(`📤 Event emitted: ${type}`);
  }
}
