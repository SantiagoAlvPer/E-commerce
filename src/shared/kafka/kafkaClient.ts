import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

export const kafka = new Kafka({
    clientId: 'CartService',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  });