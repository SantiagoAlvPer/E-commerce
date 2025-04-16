import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'test-producer',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();

async function sendTestEvent() {
  await producer.connect();

  const testEvent = {
    source: 'UserService',
    topic: 'notifications',
    payload: {
      to: 'test@example.com',
      subject: 'Welcome to our E-COMMERCE!',
      content: 'This is a test notification',
    },
  };

  await producer.send({
    topic: 'notifications',
    messages: [{ value: JSON.stringify(testEvent) }],
  });

  console.log('✅ Test event sent to Kafka');
  await producer.disconnect();
}

sendTestEvent().catch(console.error);