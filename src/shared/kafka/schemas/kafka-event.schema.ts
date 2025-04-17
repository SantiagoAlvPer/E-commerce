import { Schema, model, Document } from "mongoose";

export interface KafkaEvent extends Document {
  type: string;
  payload: any;
  topic: string;
  timestamp: Date;
}

const KafkaEventSchema = new Schema<KafkaEvent>(
  {
    type: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
    topic: { type: String, required: true },
    timestamp: { type: Date, default: () => new Date() },
  },
  { versionKey: false }
);

export const KafkaEventModel = model<KafkaEvent>(
  "KafkaEvent",
  KafkaEventSchema
);
