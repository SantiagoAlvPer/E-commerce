import { Kafka } from "kafkajs";
import * as dotenv from 'dotenv';
dotenv.config();

const kafka = new Kafka({
  clientId: "user-service",
  brokers: ['kafka:29092'],
});

export const kafkaConsumer = kafka.consumer({ groupId: "user-consumer-group" });
export const kafkaProducer = kafka.producer();