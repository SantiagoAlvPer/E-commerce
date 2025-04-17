import { Injectable, OnModuleInit } from "@nestjs/common";
import { KafkaEventModel } from "../../schemas/kafka-event.schema";
import { kafkaConsumer } from "../../../../config/kafka.config";

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  async onModuleInit() {
    await kafkaConsumer.connect();
    console.log("📡 Kafka Consumer connected");

    await kafkaConsumer.subscribe({
      topic: "user-events",
      fromBeginning: false,
    });

    console.log("📨 Subscribed to topic: user-events");

    await kafkaConsumer.run({
      eachMessage: async ({ topic, message }) => {
        const raw = message.value?.toString();
        if (!raw) return;

        const { type, payload } = JSON.parse(raw);

        try {
          await KafkaEventModel.create({
            type,
            payload,
            topic,
          });
          console.log(`💾 Event stored: ${type}`);
        } catch (error) {
          console.error("Error saving event:", error);
        }
      },
    });
  }
}
