import { z } from 'zod';
export declare const InvoiceSchema: z.ZodObject<{
    to: z.ZodString;
    subject: z.ZodString;
    content: z.ZodString;
    invoiceNumber: z.ZodString;
    userId: z.ZodString;
    total: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        quantity: z.ZodNumber;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: string;
        price: number;
        quantity: number;
    }, {
        productId: string;
        price: number;
        quantity: number;
    }>, "many">;
    issuedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    to: string;
    subject: string;
    content: string;
    invoiceNumber: string;
    total: number;
    items: {
        productId: string;
        price: number;
        quantity: number;
    }[];
    issuedAt: string;
}, {
    userId: string;
    to: string;
    subject: string;
    content: string;
    invoiceNumber: string;
    total: number;
    items: {
        productId: string;
        price: number;
        quantity: number;
    }[];
    issuedAt: string;
}>;
export type InvoiceDto = z.infer<typeof InvoiceSchema>;
