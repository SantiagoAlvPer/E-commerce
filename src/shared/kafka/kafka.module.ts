import { Module } from "@nestjs/common";
import { KafkaProducerService } from "./service/kafka.service";
import { KafkaConsumerService } from "./consumer/service/kafka-consumer.service";

@Module({
  providers: [KafkaProducerService, KafkaConsumerService],
  exports: [KafkaProducerService],
})
export class KafkaModule {}
