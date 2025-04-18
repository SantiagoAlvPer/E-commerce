import { Schema, model, Document } from 'mongoose';

export interface EventDocument extends Document {
  eventId: string;
  timestamp: Date;
  source: string;
  topic: string;
  payload: Record<string, any>;
  snapshot: Record<string, any>;
}

const EventSchema = new Schema<EventDocument>({
  eventId: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    required: true,
    index: true,
  },
  source: {
    type: String,
    required: true,
    index: true,
  },
  topic: {
    type: String,
    required: true,
    index: true,
  },
  payload: {
    type: Schema.Types.Mixed,
    required: true,
  },
  snapshot: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

// Exportación del modelo para usarlo en repositorios/servicios
export const EventModel = model<EventDocument>('Event', EventSchema);