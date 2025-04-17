import { Schema, model, Document } from 'mongoose';
import { IBaseEvent } from '../../../../shared/events/baseEvent';

export interface IInvoiceEvent extends IBaseEvent {
    payload: Record<string, any>; 
}

const InvoiceEventSchema = new Schema<IInvoiceEvent>(
    {
        eventId: {
            type: String,
            required: true,
            unique: true
        },
        timestamp: {
            type: Date,
            required: true,
            index: true
        },
        source: {
            type: String,
            required: true
        },
        topic: {
            type: String,
            required: true
        },
        payload: {
            type: Schema.Types.Mixed,
            required: true
        },
        snapshot: {
            type: Schema.Types.Mixed,
            required: true 
        }
    },
    {
        versionKey: false
    }
);

// Índices para búsquedas rápidas
InvoiceEventSchema.index({ source: 1 });
InvoiceEventSchema.index({ topic: 1 });
InvoiceEventSchema.index({ timestamp: 1 });

// Modelo exportable para usar en controllers o services
export const InvoiceEventModel = model<IInvoiceEvent>(
    'InvoiceEvent',
    InvoiceEventSchema
);
