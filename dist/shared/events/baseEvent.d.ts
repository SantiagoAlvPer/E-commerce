import { Document } from 'mongoose';
export interface IBaseEvent {
    eventId: string;
    timestamp: Date;
    source: string;
    topic: string;
    payload: Record<string, any>;
    snapshot?: Record<string, any>;
}
export interface IBaseEventDocument extends IBaseEvent, Document {
}
export type TypedEvent<T> = IBaseEvent & {
    payload: T;
};
export declare function createEvent(source: string, topic: string, payload: Record<string, any>, snapshot?: Record<string, any>): IBaseEvent;
