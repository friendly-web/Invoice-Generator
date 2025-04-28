import { 
  invoices, 
  type Invoice, 
  type InsertInvoice
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage implementations
export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // Invoice related methods
  getInvoice(id: number): Promise<Invoice | undefined>;
  getInvoices(): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: number, invoice: Partial<InsertInvoice>): Promise<Invoice | undefined>;
  deleteInvoice(id: number): Promise<boolean>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods (stub implementations for now)
  async getUser(id: number): Promise<any | undefined> {
    // No user table yet, will implement when needed
    return undefined;
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    // No user table yet, will implement when needed
    return undefined;
  }

  async createUser(insertUser: any): Promise<any> {
    // No user table yet, will implement when needed
    return { id: 1, ...insertUser };
  }

  // Invoice methods using the database
  async getInvoice(id: number): Promise<Invoice | undefined> {
    const result = await db.select().from(invoices).where(eq(invoices.id, id));
    return result[0];
  }

  async getInvoices(): Promise<Invoice[]> {
    return await db.select().from(invoices).orderBy(invoices.createdAt);
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const result = await db.insert(invoices).values(insertInvoice).returning();
    return result[0];
  }

  async updateInvoice(
    id: number, 
    invoiceUpdate: Partial<InsertInvoice>
  ): Promise<Invoice | undefined> {
    const result = await db
      .update(invoices)
      .set(invoiceUpdate)
      .where(eq(invoices.id, id))
      .returning();
    
    return result[0];
  }

  async deleteInvoice(id: number): Promise<boolean> {
    const result = await db
      .delete(invoices)
      .where(eq(invoices.id, id))
      .returning({ id: invoices.id });
    
    return result.length > 0;
  }
}

// Use database storage for our application
export const storage = new DatabaseStorage();
