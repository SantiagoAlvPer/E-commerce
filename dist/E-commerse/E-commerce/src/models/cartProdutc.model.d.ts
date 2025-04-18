import mongoose from "mongoose";
export declare const ProductModel: mongoose.Model<{
    id: string;
    description?: string | null | undefined;
    title?: string | null | undefined;
    price?: number | null | undefined;
    category?: string | null | undefined;
    image?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    id: string;
    description?: string | null | undefined;
    title?: string | null | undefined;
    price?: number | null | undefined;
    category?: string | null | undefined;
    image?: string | null | undefined;
}> & {
    id: string;
    description?: string | null | undefined;
    title?: string | null | undefined;
    price?: number | null | undefined;
    category?: string | null | undefined;
    image?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    id: string;
    description?: string | null | undefined;
    title?: string | null | undefined;
    price?: number | null | undefined;
    category?: string | null | undefined;
    image?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    id: string;
    description?: string | null | undefined;
    title?: string | null | undefined;
    price?: number | null | undefined;
    category?: string | null | undefined;
    image?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    id: string;
    description?: string | null | undefined;
    title?: string | null | undefined;
    price?: number | null | undefined;
    category?: string | null | undefined;
    image?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
