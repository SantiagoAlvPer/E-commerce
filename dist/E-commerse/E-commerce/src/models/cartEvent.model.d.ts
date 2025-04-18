import { Schema } from "mongoose";
export declare const EventModel: import("mongoose").Model<{
    payload: any;
    topic: string;
    timestamp: NativeDate;
    eventId: string;
    source: string;
    snapshot: any;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    payload: any;
    topic: string;
    timestamp: NativeDate;
    eventId: string;
    source: string;
    snapshot: any;
}> & {
    payload: any;
    topic: string;
    timestamp: NativeDate;
    eventId: string;
    source: string;
    snapshot: any;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    payload: any;
    topic: string;
    timestamp: NativeDate;
    eventId: string;
    source: string;
    snapshot: any;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    payload: any;
    topic: string;
    timestamp: NativeDate;
    eventId: string;
    source: string;
    snapshot: any;
}>> & import("mongoose").FlatRecord<{
    payload: any;
    topic: string;
    timestamp: NativeDate;
    eventId: string;
    source: string;
    snapshot: any;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
