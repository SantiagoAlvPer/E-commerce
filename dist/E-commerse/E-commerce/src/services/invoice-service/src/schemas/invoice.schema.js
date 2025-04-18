"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceSchema = void 0;
const zod_1 = require("zod");
exports.InvoiceSchema = zod_1.z.object({
    to: zod_1.z.string().email(),
    subject: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    invoiceNumber: zod_1.z.string().min(1),
    userId: zod_1.z.string().min(1),
    total: zod_1.z.number().positive(),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string().min(1),
        quantity: zod_1.z.number().int().positive(),
        price: zod_1.z.number().positive()
    })),
    issuedAt: zod_1.z.string().datetime()
});
//# sourceMappingURL=invoice.schema.js.map