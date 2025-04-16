import { kafkaConsumer } from '../config/kafka.config';
import { NotificationService } from './notification.service';

export async function startKafkaConsumer() {
    try {
      console.log('📡 Connecting to Kafka...');
      await kafkaConsumer.connect();
      console.log('✅ Kafka consumer connected');
  
      await kafkaConsumer.subscribe({ topic: 'notifications', fromBeginning: false });
      console.log('📨 Subscribed to topic: notifications');
  
      await kafkaConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log(`📥 Received message from topic "${topic}"`);
          const event = JSON.parse(message.value!.toString());
  
          console.log('📦 Event payload:', event);
  
          // Tu lógica de notificación
          const { to, subject, content } = event.payload ?? event;
          await NotificationService.sendEmail({
            to,
            subject,
            content,
            topic,
            source: event.source || 'unknown',
            payload: event.payload,
          });
        },
      });
  
    } catch (err) {
      console.error('❌ Kafka connection or subscription failed:', err);
    }
}  