import { Document } from "mongoose";
export interface KafkaEvent extends Document {
    type: string;
    payload: any;
    topic: string;
    timestamp: Date;
}
export declare const KafkaEventModel: import("mongoose").Model<KafkaEvent, {}, {}, {}, Document<unknown, {}, KafkaEvent> & KafkaEvent & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
