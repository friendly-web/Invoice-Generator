import sgMail from '@sendgrid/mail';
import { Invoice } from '@shared/schema';

// Initialize SendGrid with API key from environment variables
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('Warning: SENDGRID_API_KEY is not set. Email sending will not work.');
}

interface EmailInvoiceOptions {
  to: string;
  from: string;
  subject?: string;
  message?: string;
  pdfBuffer: Buffer;
  invoice: Invoice;
}

/**
 * Sends an invoice as an email attachment using SendGrid
 */
export async function sendInvoiceEmail({
  to,
  from,
  subject,
  message,
  pdfBuffer,
  invoice
}: EmailInvoiceOptions): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY environment variable is not set');
  }

  try {
    // Create a base64 encoded attachment of the PDF
    const attachment = {
      content: pdfBuffer.toString('base64'),
      filename: `Invoice_${invoice.invoiceNumber}.pdf`,
      type: 'application/pdf',
      disposition: 'attachment'
    };

    // Default subject and message if not provided
    const emailSubject = subject || `Invoice #${invoice.invoiceNumber}`;
    const emailMessage = message || `Please find attached invoice #${invoice.invoiceNumber}.`;

    // Prepare the email
    const msg = {
      to,
      from,
      subject: emailSubject,
      text: emailMessage,
      html: `<div>
        <p>${emailMessage}</p>
        <p>Invoice #: ${invoice.invoiceNumber}</p>
        <p>Date: ${invoice.issueDate}</p>
        <p>Due Date: ${invoice.dueDate}</p>
        <p>Amount: ${invoice.currency}${invoice.totalAmount.toFixed(2)}</p>
      </div>`,
      attachments: [attachment]
    };

    // Send the email
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error sending invoice email:', error);
    throw error;
  }
}