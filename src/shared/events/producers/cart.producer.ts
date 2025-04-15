import  {kafka}  from '../../kafka/kafkaClient';

export class Producer {
    private producer = kafka.producer();

    private async connectOnce() {
      // Evita reconexión innecesaria
      if (!(this as any)._connected) {
        await this.producer.connect();
        (this as any)._connected = true;
      }
    }
  
    async send(topic: string, message: any) {
      await this.connectOnce();
  
      await this.producer.send({
        topic,
        messages: [
          {
            key: message.eventId,
            value: JSON.stringify(message),
          },
        ],
      });
  
      console.log(`Evento enviado a [${topic}]: ${message.eventId}`);
    }
  
    async disconnect() {
      await this.producer.disconnect();
      (this as any)._connected = false;
    }
}