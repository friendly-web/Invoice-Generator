import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Invoice Table
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull(),
  paymentTerms: text("payment_terms").notNull(),
  issueDate: text("issue_date").notNull(),
  dueDate: text("due_date").notNull(),
  currency: text("currency").notNull(),
  logoUrl: text("logo_url"),
  status: text("status").default("draft").notNull(),
  totalAmount: integer("total_amount").default(0).notNull(),
  items: jsonb("items").default([]).notNull(),
  businessDetails: text("business_details"),
  clientDetails: text("client_details"),
  paymentMethod: text("payment_method").default("bank_transfer"),
  bankDetails: text("bank_details"),
  paypalDetails: text("paypal_details"),
  upiDetails: text("upi_details"),
  paymentLinkDetails: text("payment_link_details"),
  cashDetails: text("cash_details"),
  notes: text("notes"),
  terms: text("terms"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Invoice Items Schema (for JSON field)
export const invoiceItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  rate: z.number().min(0, "Rate must be a positive number"),
  discount: z.number().min(0, "Discount must be a positive number").max(100, "Discount cannot exceed 100%"),
  amount: z.number(),
});

export type InvoiceItem = z.infer<typeof invoiceItemSchema>;

// Insert Schema
export const insertInvoiceSchema = createInsertSchema(invoices).pick({
  invoiceNumber: true,
  paymentTerms: true,
  issueDate: true,
  dueDate: true,
  currency: true,
  logoUrl: true,
  status: true,
  totalAmount: true,
  items: true,
  businessDetails: true,
  clientDetails: true,
  paymentMethod: true,
  bankDetails: true,
  paypalDetails: true,
  upiDetails: true,
  paymentLinkDetails: true,
  cashDetails: true,
  notes: true,
  terms: true,
});

export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;

// Extend schema for form validation
export const invoiceFormSchema = insertInvoiceSchema.extend({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  issueDate: z.string().min(1, "Issue date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  currency: z.string().min(1, "Currency is required"),
  // Business details
  businessDetails: z.string().optional(),
  // Client details
  clientDetails: z.string().optional(),
  // Payment details
  paymentMethod: z.string().default("bank_transfer"),
  bankDetails: z.string().optional(),
  paypalDetails: z.string().optional(),
  upiDetails: z.string().optional(),
  paymentLinkDetails: z.string().optional(),
  cashDetails: z.string().optional(),
  // Notes and terms
  notes: z.string().optional(),
  terms: z.string().optional(),
  // Invoice totals
  subtotal: z.number().default(0),
  discountTotal: z.number().default(0),
  tax: z.number().default(0),
  shipping: z.number().default(0),
});

export type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;
