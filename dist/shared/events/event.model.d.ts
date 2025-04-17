import { Document } from 'mongoose';
export interface EventDocument extends Document {
    eventId: string;
    timestamp: Date;
    source: string;
    topic: string;
    payload: Record<string, any>;
    snapshot: Record<string, any>;
}
export declare const EventModel: import("mongoose").Model<EventDocument, {}, {}, {}, Document<unknown, {}, EventDocument> & EventDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
