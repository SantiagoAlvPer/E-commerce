import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

export const kafkaConsumer = kafka.consumer({ groupId: 'notification-consumer-group' });

// Si también querés usar producer:
export const kafkaProducer = kafka.producer();