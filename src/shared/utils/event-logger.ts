import mongoose, { Schema, Document, model } from 'mongoose';
import { randomUUID } from 'crypto';

interface IEvent extends Document {
  eventId: string;
  timestamp: string;
  source: string;
  topic: string;
  payload: any;
  snapshot: any;
}

const EventSchema = new Schema<IEvent>({
  eventId: { type: String, required: true, unique: true },
  timestamp: { type: String, required: true },
  source: { type: String, required: true },
  topic: { type: String, required: true },
  payload: { type: Schema.Types.Mixed, required: true },
  snapshot: { type: Schema.Types.Mixed, required: true },
});

const EventModel = model<IEvent>('Event', EventSchema);

export class EventLogger {
  private uri: string;
  private isConnected = false;

  constructor() {
    this.uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce-events';
  }

  async connect() {
    if (this.isConnected) return;

    try {
      await mongoose.connect(this.uri, {
        dbName: process.env.MONGO_DB_NAME || 'ecommerce-events',
      });
      this.isConnected = true;
      console.log('✅ Conectado a MongoDB con Mongoose');
    } catch (err) {
      console.error('❌ Error conectando con Mongoose:', err);
    }
  }

  async saveEvent(event: {
    source: string;
    topic: string;
    payload: any;
    snapshot: any;
  }) {
    await this.connect();

    const newEvent = new EventModel({
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      source: event.source,
      topic: event.topic,
      payload: event.payload,
      snapshot: event.snapshot,
    });

    await newEvent.save();
    console.log(`📦 Evento guardado en MongoDB: ${newEvent.eventId}`);
  }
}