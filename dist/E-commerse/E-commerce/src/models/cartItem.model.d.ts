import { Schema } from "mongoose";
export declare const CartItemModel: import("mongoose").Model<{
    title: string;
    price: number;
    quantity: number;
    addedAt: NativeDate;
    productId?: string | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    title: string;
    price: number;
    quantity: number;
    addedAt: NativeDate;
    productId?: string | null | undefined;
}> & {
    title: string;
    price: number;
    quantity: number;
    addedAt: NativeDate;
    productId?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    title: string;
    price: number;
    quantity: number;
    addedAt: NativeDate;
    productId?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    title: string;
    price: number;
    quantity: number;
    addedAt: NativeDate;
    productId?: string | null | undefined;
}>> & import("mongoose").FlatRecord<{
    title: string;
    price: number;
    quantity: number;
    addedAt: NativeDate;
    productId?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
