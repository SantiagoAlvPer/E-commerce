import { Schema, model, Document } from 'mongoose';
import { IBaseEvent } from '../../../../shared/events/baseEvent';


// Interfaz para el documento de notificación
export interface INotification extends Document {
  userId: string;
  email: string;
  subject: string;
  content: string;
  type: 'WELCOME' | 'CART_REMOVALS' | 'INVOICE';
  createdAt: Date;
  updatedAt: Date;
}

// Interfaz para el evento de notificación extendiendo BaseEvent
export interface INotificationEvent extends IBaseEvent {
  snapshot: {
    notificationId: string;
    details: Omit<INotification, '_id' | 'createdAt' | 'updatedAt'>;
  };
}

// Esquema de MongoDB para las notificaciones
const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: String,
      required: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      index: true
    },
    subject: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['WELCOME', 'CART_REMOVALS', 'INVOICE'],
      required: true
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false
  }
);

// Índices para optimizar consultas frecuentes
NotificationSchema.index({ type: 1 });
NotificationSchema.index({ createdAt: 1 });

// Modelo de Mongoose para Notificaciones
export const NotificationModel = model<INotification>(
  'Notification',
  NotificationSchema
);

// Esquema para almacenar eventos de notificación (Event Sourcing)
const NotificationEventSchema = new Schema<INotificationEvent>(
  {
    eventId: { type: String, required: true, unique: true },
    timestamp: { type: Date, required: true, index: true },
    source: { type: String, required: true },
    topic: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
    snapshot: { type: Schema.Types.Mixed, required: true }
  },
  {
    versionKey: false
  }
);

// Índices para eventos
NotificationEventSchema.index({ source: 1 });
NotificationEventSchema.index({ topic: 1 });

// Modelo de Mongoose para Eventos de Notificación
export const NotificationEventModel = model<INotificationEvent>(
  'NotificationEvent',
  NotificationEventSchema
);