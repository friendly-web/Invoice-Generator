import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import { z } from "zod";
import { insertInvoiceSchema } from "@shared/schema";
import { ZodError } from "zod";
import fs from "fs";
import { PDFDocument } from "pdf-lib";
import { sendInvoiceEmail } from "./email";

// Setup multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage_config = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'logo-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage_config,
  limits: {
    fileSize: 1024 * 1024, // 1MB
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: File upload only supports images (jpeg, jpg, png, gif)"));
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiRouter = express.Router();

  // Upload logo
  apiRouter.post('/upload-logo', upload.single('logo'), (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const logoPath = `/uploads/${req.file.filename}`;
    
    return res.status(200).json({ 
      message: 'File uploaded successfully',
      logoUrl: logoPath
    });
  });

  // Get all invoices
  apiRouter.get('/invoices', async (req: Request, res: Response) => {
    try {
      const invoices = await storage.getInvoices();
      return res.status(200).json(invoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      return res.status(500).json({ message: 'Error fetching invoices' });
    }
  });

  // Get a single invoice
  apiRouter.get('/invoices/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid invoice ID' });
      }

      const invoice = await storage.getInvoice(id);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }

      return res.status(200).json(invoice);
    } catch (error) {
      console.error('Error fetching invoice:', error);
      return res.status(500).json({ message: 'Error fetching invoice' });
    }
  });

  // Create a new invoice
  apiRouter.post('/invoices', async (req: Request, res: Response) => {
    try {
      const validatedData = insertInvoiceSchema.parse(req.body);
      const invoice = await storage.createInvoice(validatedData);
      return res.status(201).json(invoice);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      console.error('Error creating invoice:', error);
      return res.status(500).json({ message: 'Error creating invoice' });
    }
  });

  // Update an invoice
  apiRouter.patch('/invoices/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid invoice ID' });
      }

      const validatedData = insertInvoiceSchema.partial().parse(req.body);
      const updatedInvoice = await storage.updateInvoice(id, validatedData);
      
      if (!updatedInvoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }

      return res.status(200).json(updatedInvoice);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      console.error('Error updating invoice:', error);
      return res.status(500).json({ message: 'Error updating invoice' });
    }
  });

  // Delete an invoice
  apiRouter.delete('/invoices/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid invoice ID' });
      }

      const deleted = await storage.deleteInvoice(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Invoice not found' });
      }

      return res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
      console.error('Error deleting invoice:', error);
      return res.status(500).json({ message: 'Error deleting invoice' });
    }
  });

  // Email invoice
  apiRouter.post('/invoices/:id/send-email', async (req: Request, res: Response) => {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        return res.status(500).json({ message: 'Email service not configured. Set SENDGRID_API_KEY.' });
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid invoice ID' });
      }

      // Validate request body
      const emailSchema = z.object({
        to: z.string().email('Invalid recipient email'),
        from: z.string().email('Invalid sender email'),
        subject: z.string().optional(),
        message: z.string().optional(),
      });

      const { to, from, subject, message } = emailSchema.parse(req.body);

      // Get invoice
      const invoice = await storage.getInvoice(id);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }

      // Generate PDF for the invoice
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]); // A4 size

      // Add company/business details
      page.drawText('INVOICE', {
        x: 50,
        y: 800,
        size: 24,
      });

      page.drawText(`Invoice #: ${invoice.invoiceNumber}`, {
        x: 50,
        y: 760,
        size: 12,
      });

      page.drawText(`Date: ${invoice.issueDate}`, {
        x: 50,
        y: 740,
        size: 12,
      });

      page.drawText(`Due Date: ${invoice.dueDate}`, {
        x: 50,
        y: 720,
        size: 12,
      });

      // Add business and client details
      if (invoice.businessDetails) {
        page.drawText('From:', {
          x: 50,
          y: 680,
          size: 12,
        });
        
        page.drawText(invoice.businessDetails, {
          x: 50,
          y: 660,
          size: 10,
        });
      }

      if (invoice.clientDetails) {
        page.drawText('To:', {
          x: 300,
          y: 680,
          size: 12,
        });
        
        page.drawText(invoice.clientDetails, {
          x: 300,
          y: 660,
          size: 10,
        });
      }

      // Add invoice items if available
      if (invoice.items && invoice.items.length > 0) {
        let yPosition = 600;
        
        // Header
        page.drawText('Item', { x: 50, y: yPosition, size: 10 });
        page.drawText('Qty', { x: 250, y: yPosition, size: 10 });
        page.drawText('Price', { x: 300, y: yPosition, size: 10 });
        page.drawText('Amount', { x: 400, y: yPosition, size: 10 });
        
        yPosition -= 20;
        
        // Items
        for (const item of invoice.items) {
          page.drawText(item.description, { x: 50, y: yPosition, size: 10 });
          page.drawText(item.quantity.toString(), { x: 250, y: yPosition, size: 10 });
          page.drawText(`${invoice.currency}${item.rate.toFixed(2)}`, { x: 300, y: yPosition, size: 10 });
          page.drawText(`${invoice.currency}${item.amount.toFixed(2)}`, { x: 400, y: yPosition, size: 10 });
          
          yPosition -= 20;
        }
        
        // Totals
        yPosition -= 20;
        page.drawText('Subtotal:', { x: 300, y: yPosition, size: 10 });
        page.drawText(`${invoice.currency}${invoice.subtotal?.toFixed(2) || '0.00'}`, { x: 400, y: yPosition, size: 10 });
        
        if (invoice.discountTotal && invoice.discountTotal > 0) {
          yPosition -= 20;
          page.drawText(`Discount (${invoice.discountTotal}%):`, { x: 300, y: yPosition, size: 10 });
          const discountAmount = (invoice.subtotal || 0) * (invoice.discountTotal / 100);
          page.drawText(`-${invoice.currency}${discountAmount.toFixed(2)}`, { x: 400, y: yPosition, size: 10 });
        }
        
        if (invoice.tax && invoice.tax > 0) {
          yPosition -= 20;
          page.drawText(`Tax (${invoice.tax}%):`, { x: 300, y: yPosition, size: 10 });
          // Calculate tax on amount after discount
          const afterDiscount = (invoice.subtotal || 0) - ((invoice.subtotal || 0) * ((invoice.discountTotal || 0) / 100));
          const taxAmount = afterDiscount * (invoice.tax / 100);
          page.drawText(`${invoice.currency}${taxAmount.toFixed(2)}`, { x: 400, y: yPosition, size: 10 });
        }
        
        if (invoice.shipping && invoice.shipping > 0) {
          yPosition -= 20;
          page.drawText('Shipping:', { x: 300, y: yPosition, size: 10 });
          page.drawText(`${invoice.currency}${invoice.shipping.toFixed(2)}`, { x: 400, y: yPosition, size: 10 });
        }
        
        yPosition -= 30;
        page.drawText('Total:', { x: 300, y: yPosition, size: 12 });
        page.drawText(`${invoice.currency}${invoice.totalAmount.toFixed(2)}`, { x: 400, y: yPosition, size: 12 });
      }

      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      
      // Send the email with the PDF
      await sendInvoiceEmail({
        to,
        from,
        subject: subject || `Invoice #${invoice.invoiceNumber}`,
        message: message || `Please find attached your invoice #${invoice.invoiceNumber}.`,
        pdfBuffer: Buffer.from(pdfBytes),
        invoice
      });
      
      return res.status(200).json({ message: 'Invoice email sent successfully' });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      console.error('Error sending invoice email:', error);
      return res.status(500).json({ message: 'Error sending invoice email', error: (error as Error).message });
    }
  });

  // Serve uploaded files
  app.use('/uploads', express.static(uploadDir));

  // Apply API routes
  app.use('/api', apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
