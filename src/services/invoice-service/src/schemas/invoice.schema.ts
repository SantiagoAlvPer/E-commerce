import { z } from 'zod';

export const InvoiceSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  content: z.string().min(1),
  invoiceNumber: z.string().min(1),
  userId: z.string().min(1),
  total: z.number().positive(),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().positive(),
      price: z.number().positive()
    })
  ),
  issuedAt: z.string().datetime()
});

export type InvoiceDto = z.infer<typeof InvoiceSchema>;