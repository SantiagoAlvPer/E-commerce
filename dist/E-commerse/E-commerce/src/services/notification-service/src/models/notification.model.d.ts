import { Document } from 'mongoose';
import { IBaseEvent } from '../../../../shared/events/baseEvent';
export interface INotification extends Document {
    userId: string;
    email: string;
    subject: string;
    content: string;
    type: 'WELCOME' | 'CART_REMOVALS' | 'INVOICE';
    createdAt: Date;
    updatedAt: Date;
}
export interface INotificationEvent extends IBaseEvent {
    snapshot: {
        notificationId: string;
        details: Omit<INotification, '_id' | 'createdAt' | 'updatedAt'>;
    };
}
export declare const NotificationModel: import("mongoose").Model<INotification, {}, {}, {}, Document<unknown, {}, INotification> & INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export declare const NotificationEventModel: import("mongoose").Model<INotificationEvent, {}, {}, {}, Document<unknown, {}, INotificationEvent> & INotificationEvent & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
