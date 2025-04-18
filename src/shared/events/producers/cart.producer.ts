import { kafka } from '../../kafka/kafkaClient';
import { Producer as KafkaProducer, Message } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';

export class Producer {
  private producer: KafkaProducer;
  private sentEventIds: Set<string>; // Evita reenvíos duplicados en la misma sesión
  private isConnected: boolean = false; // Estado de la conexión

  constructor() {
    this.producer = kafka.producer();
    this.sentEventIds = new Set();
  }

  // Conexión al productor de Kafka
  async connect() {
    try {
      await this.producer.connect();
      this.isConnected = true;
      console.log("🚀 Kafka producer conectado");
    } catch (error) {
      console.error("❌ Error al conectar con Kafka:", error);
      this.isConnected = false;
      setTimeout(() => this.connect(), 5000); // Reintenta la conexión después de 5 segundos
    }
  }

  // Desconexión del productor de Kafka
  async disconnect() {
    try {
      await this.producer.disconnect();
      this.isConnected = false;
      console.log("👋 Kafka producer desconectado");
    } catch (error) {
      console.error("❌ Error al desconectar el productor de Kafka:", error);
    }
  }

  // Verificar si el productor está conectado
  private async ensureConnection() {
    if (!this.isConnected) {
      console.log("⚠️ Kafka productor desconectado, reconectando...");
      await this.connect(); // Intentar reconectar
    }
  }

  // Método para enviar un mensaje
  async send(topic: string, message: any) {
    // Verificar la conexión antes de enviar el mensaje
    await this.ensureConnection();

    // Si no tiene eventId, generamos uno único
    if (!message.eventId) {
      message.eventId = uuidv4();
    }

    // Evitar duplicados en la misma sesión
    if (this.sentEventIds.has(message.eventId)) {
      console.warn(`⚠️ Evento duplicado ignorado (ya fue enviado): ${message.eventId}`);
      return;
    }

    try {
      // Enviar mensaje a Kafka
      await this.producer.send({
        topic,
        messages: [
          {
            key: message.eventId,
            value: JSON.stringify(message),
          },
        ],
      });

      // Guardar el ID del evento enviado
      this.sentEventIds.add(message.eventId);
      console.log(`✅ Mensaje enviado con ID único: ${message.eventId}`);
    } catch (error) {
      console.error("❌ Error al enviar el mensaje:", error);
      throw new Error("No se pudo procesar el evento");
    }
  }
}