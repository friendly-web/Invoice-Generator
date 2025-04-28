import { InvoiceItem, InvoiceFormValues } from "@shared/schema";
import { apiRequest } from "./queryClient";
import { readFileAsDataURL } from "./utils";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function uploadLogo(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("logo", file);

  const response = await fetch("/api/upload-logo", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload logo");
  }

  const result = await response.json();
  return result.logoUrl;
}

export async function createInvoice(invoice: InvoiceFormValues) {
  return apiRequest("POST", "/api/invoices", invoice);
}

export async function updateInvoice(id: number, invoice: Partial<InvoiceFormValues>) {
  return apiRequest("PATCH", `/api/invoices/${id}`, invoice);
}

export async function fetchInvoice(id: number) {
  const response = await fetch(`/api/invoices/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch invoice");
  }
  return response.json();
}

export async function generateInvoicePDF(
  invoice: InvoiceFormValues & { items?: InvoiceItem[] }, 
  logoDataUrl?: string
): Promise<Uint8Array> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
  
  // Load default font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Set some initial values
  const margin = 50;
  const titleFontSize = 24;
  const subTitleFontSize = 16;
  const normalFontSize = 12;
  const smallFontSize = 10;
  
  // Page dimensions
  const { width, height } = page.getSize();
  
  // Draw the invoice header
  page.drawText("INVOICE", {
    x: margin,
    y: height - margin - titleFontSize,
    font: boldFont,
    size: titleFontSize,
    color: rgb(0.1, 0.1, 0.1)
  });
  
  // Draw invoice number
  page.drawText(`#${invoice.invoiceNumber}`, {
    x: margin,
    y: height - margin - titleFontSize - 20,
    font: font,
    size: subTitleFontSize,
    color: rgb(0.4, 0.4, 0.4)
  });
  
  // Add logo if available
  if (logoDataUrl) {
    try {
      const logoImage = await pdfDoc.embedPng(logoDataUrl);
      const logoDims = logoImage.scale(0.5); // Scale logo to fit properly
      
      page.drawImage(logoImage, {
        x: width - margin - logoDims.width,
        y: height - margin - logoDims.height,
        width: logoDims.width,
        height: logoDims.height,
      });
    } catch (err) {
      console.error("Error embedding logo:", err);
    }
  }
  
  // Draw invoice dates
  page.drawText("Issue Date:", {
    x: margin,
    y: height - margin - titleFontSize - 60,
    font: boldFont,
    size: normalFontSize,
  });
  
  page.drawText(invoice.issueDate, {
    x: margin + 100,
    y: height - margin - titleFontSize - 60,
    font: font,
    size: normalFontSize,
  });
  
  page.drawText("Due Date:", {
    x: margin,
    y: height - margin - titleFontSize - 80,
    font: boldFont,
    size: normalFontSize,
  });
  
  page.drawText(invoice.dueDate, {
    x: margin + 100,
    y: height - margin - titleFontSize - 80,
    font: font,
    size: normalFontSize,
  });
  
  // Draw payment terms
  page.drawText("Payment Terms:", {
    x: margin,
    y: height - margin - titleFontSize - 100,
    font: boldFont,
    size: normalFontSize,
  });
  
  const paymentTermsText = invoice.paymentTerms === "receipt" 
    ? "Due on receipt" 
    : invoice.paymentTerms.toUpperCase();
    
  page.drawText(paymentTermsText, {
    x: margin + 130,
    y: height - margin - titleFontSize - 100,
    font: font,
    size: normalFontSize,
  });
  
  // Draw invoice items if available
  if (invoice.items && invoice.items.length > 0) {
    // Draw table header
    const tableTop = height - margin - titleFontSize - 140;
    const colWidths = [250, 70, 70, 100];
    const colPositions = [
      margin,
      margin + colWidths[0],
      margin + colWidths[0] + colWidths[1],
      margin + colWidths[0] + colWidths[1] + colWidths[2]
    ];
    
    // Table header
    page.drawText("Description", {
      x: colPositions[0],
      y: tableTop,
      font: boldFont,
      size: normalFontSize,
    });
    
    page.drawText("Quantity", {
      x: colPositions[1],
      y: tableTop,
      font: boldFont,
      size: normalFontSize,
    });
    
    page.drawText("Price", {
      x: colPositions[2],
      y: tableTop,
      font: boldFont,
      size: normalFontSize,
    });
    
    page.drawText("Total", {
      x: colPositions[3],
      y: tableTop,
      font: boldFont,
      size: normalFontSize,
    });
    
    // Horizontal line
    page.drawLine({
      start: { x: margin, y: tableTop - 10 },
      end: { x: width - margin, y: tableTop - 10 },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });
    
    // Items
    let yPosition = tableTop - 30;
    let total = 0;
    
    invoice.items.forEach((item, index) => {
      page.drawText(item.description, {
        x: colPositions[0],
        y: yPosition,
        font: font,
        size: smallFontSize,
        maxWidth: colWidths[0] - 10,
      });
      
      page.drawText(item.quantity.toString(), {
        x: colPositions[1],
        y: yPosition,
        font: font,
        size: smallFontSize,
      });
      
      page.drawText(item.price.toFixed(2), {
        x: colPositions[2],
        y: yPosition,
        font: font,
        size: smallFontSize,
      });
      
      page.drawText(item.total.toFixed(2), {
        x: colPositions[3],
        y: yPosition,
        font: font,
        size: smallFontSize,
      });
      
      total += item.total;
      yPosition -= 20;
    });
    
    // Total
    page.drawLine({
      start: { x: margin, y: yPosition - 10 },
      end: { x: width - margin, y: yPosition - 10 },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });
    
    page.drawText("Total:", {
      x: colPositions[2],
      y: yPosition - 30,
      font: boldFont,
      size: normalFontSize,
    });
    
    page.drawText(total.toFixed(2), {
      x: colPositions[3],
      y: yPosition - 30,
      font: boldFont,
      size: normalFontSize,
    });
  }
  
  return pdfDoc.save();
}
