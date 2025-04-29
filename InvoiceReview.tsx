import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import StepIndicator from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Send, FileText, Mail } from "lucide-react";
import { InvoiceFormValues, InvoiceItem } from "@shared/schema";
import { readFileAsDataURL, getFormattedCurrency } from "@/lib/utils";
import { generateInvoicePDF } from "@/lib/invoice";
import InvoicePDF from "@/components/InvoicePDF";
import { apiRequest } from "@/lib/queryClient";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CompleteInvoiceData = InvoiceFormValues & {
  id?: number;
  items: InvoiceItem[];
  totalAmount: number;
  subtotal?: number;
  discountTotal?: number;
  tax?: number;
  shipping?: number;
};

export default function InvoiceReview() {
  const [invoiceData, setInvoiceData] = useState<CompleteInvoiceData | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfReady, setIsPdfReady] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    to: '',
    from: '',
    subject: '',
    message: ''
  });
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  // Load invoice data from session storage
  useEffect(() => {
    const storedData = sessionStorage.getItem("invoiceFormData");
    const storedItems = sessionStorage.getItem("invoiceItems");
    
    if (!storedData || !storedItems) {
      toast({
        title: "Missing invoice data",
        description: "Please start by creating an invoice from the beginning.",
        variant: "destructive"
      });
      setLocation("/invoice/details");
      return;
    }

    try {
      const parsedData = JSON.parse(storedData) as InvoiceFormValues;
      const parsedItems = JSON.parse(storedItems) as InvoiceItem[];
      
      // Calculate totals
      const subtotal = parsedItems.reduce((sum, item) => sum + item.amount, 0);
      const discountTotal = parsedData.discountTotal || 0;
      const discountAmount = subtotal * (discountTotal / 100);
      const afterDiscount = subtotal - discountAmount;
      const tax = parsedData.tax || 0;
      const taxAmount = afterDiscount * (tax / 100);
      const shipping = parsedData.shipping || 0;
      const totalAmount = afterDiscount + taxAmount + shipping;
      
      setInvoiceData({
        ...parsedData,
        items: parsedItems,
        subtotal,
        discountTotal,
        tax,
        shipping,
        totalAmount
      });
      
      // If we have a logo URL, fetch the image
      if (parsedData.logoUrl) {
        fetch(parsedData.logoUrl)
          .then(response => response.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
              setLogoDataUrl(reader.result as string);
            };
            reader.readAsDataURL(blob);
          })
          .catch(error => {
            console.error("Error loading logo:", error);
          });
      }
      
      setIsPdfReady(true);
    } catch (error) {
      console.error("Error parsing stored invoice data:", error);
      toast({
        title: "Error loading invoice data",
        description: "There was a problem loading your invoice. Please try again.",
        variant: "destructive"
      });
      setLocation("/invoice/details");
    }
  }, []);

  // Save the invoice
  const saveInvoice = async () => {
    if (!invoiceData) return;
    
    try {
      setIsLoading(true);
      
      // Make the API request to save the invoice
      const response = await apiRequest("POST", "/api/invoices", invoiceData);
      
      toast({
        title: "Invoice saved",
        description: "Your invoice has been saved successfully.",
      });
      
      // Clear session storage
      sessionStorage.removeItem("invoiceFormData");
      sessionStorage.removeItem("invoiceItems");
      
      // Navigate to home
      setTimeout(() => {
        setLocation("/");
      }, 1000);
      
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast({
        title: "Error saving invoice",
        description: "There was a problem saving your invoice. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate and download PDF
  const downloadPdf = async () => {
    if (!invoiceData) return;
    
    try {
      setIsLoading(true);
      
      // Use the PDF generation function from invoice.ts
      const pdfBlob = new Blob(
        [await generateInvoicePDF(invoiceData, logoDataUrl || undefined)], 
        { type: 'application/pdf' }
      );
      
      // Create a download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice_${invoiceData.invoiceNumber}.pdf`;
      link.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      
      toast({
        title: "PDF Generated",
        description: "Your invoice PDF has been downloaded."
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error generating PDF",
        description: "There was a problem creating your PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Send invoice via email
  const openEmailDialog = () => {
    if (!invoiceData) return;
    
    // Extract client email from clientDetails if available
    let clientEmail = '';
    if (invoiceData.clientDetails) {
      const emailMatch = invoiceData.clientDetails.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      if (emailMatch) {
        clientEmail = emailMatch[0];
      }
    }
    
    // Extract business email from businessDetails if available
    let businessEmail = '';
    if (invoiceData.businessDetails) {
      const emailMatch = invoiceData.businessDetails.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      if (emailMatch) {
        businessEmail = emailMatch[0];
      }
    }
    
    setEmailData({
      to: clientEmail,
      from: businessEmail,
      subject: `Invoice #${invoiceData.invoiceNumber}`,
      message: `Please find attached your invoice #${invoiceData.invoiceNumber} for ${getFormattedCurrency(invoiceData.currency)}${invoiceData.totalAmount?.toFixed(2) || '0.00'}.`
    });
    
    setIsEmailDialogOpen(true);
  };
  
  // Send the email
  const sendEmail = async () => {
    if (!invoiceData) return;
    
    try {
      setIsSendingEmail(true);
      
      // Check if required fields are filled
      if (!emailData.to || !emailData.from) {
        toast({
          title: "Missing email information",
          description: "Please provide both recipient and sender email addresses.",
          variant: "destructive"
        });
        return;
      }
      
      // Save the invoice first if it doesn't have an ID
      let invoiceId = invoiceData.id;
      if (!invoiceId) {
        const response = await apiRequest("POST", "/api/invoices", invoiceData);
        const responseData = await response.json();
        invoiceId = responseData.id;
        
        toast({
          title: "Invoice saved",
          description: "Your invoice has been saved before sending.",
        });
      }
      
      // Send the email
      await apiRequest("POST", `/api/invoices/${invoiceId}/send-email`, emailData);
      
      // Show success message
      toast({
        title: "Email sent",
        description: `Invoice has been sent to ${emailData.to}`,
      });
      
      // Close the dialog
      setIsEmailDialogOpen(false);
      
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error sending email",
        description: "There was a problem sending the email. Please check your email settings.",
        variant: "destructive"
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (!invoiceData) {
    return <div className="p-8 text-center">Loading invoice data...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Invoice</h2>
            <p className="text-gray-600">Review and generate your invoice PDF</p>
          </div>
          
          {/* Step Indicator */}
          <StepIndicator currentStep={3} />
          
          {/* PDF Preview */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Invoice Preview</h3>
                <p className="text-sm text-gray-500">This is how your invoice will look when downloaded as a PDF</p>
              </div>
              
              {isPdfReady ? (
                <div className="mt-4 border border-gray-200 rounded">
                  <InvoicePDF 
                    invoice={invoiceData} 
                    logoDataUrl={logoDataUrl} 
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setLocation("/invoice/items")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Items
            </Button>
            
            <div className="flex space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={saveInvoice}
                disabled={isLoading}
              >
                <FileText className="h-4 w-4 mr-2" />
                Save Invoice
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                onClick={downloadPdf}
                disabled={!isPdfReady || isLoading}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                onClick={openEmailDialog}
                disabled={!isPdfReady || isLoading}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Invoice
              </Button>
              
              <Button 
                type="button"
                onClick={saveInvoice}
                disabled={isLoading}
              >
                <Send className="h-4 w-4 mr-2" />
                {isLoading ? "Processing..." : "Complete Invoice"}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <PageFooter />
      
      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Invoice via Email</DialogTitle>
            <DialogDescription>
              Send this invoice as a PDF attachment to your client.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recipientEmail">Recipient Email</Label>
              <Input 
                id="recipientEmail" 
                placeholder="client@example.com" 
                value={emailData.to}
                onChange={(e) => setEmailData({...emailData, to: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="senderEmail">Sender Email</Label>
              <Input 
                id="senderEmail" 
                placeholder="your@business.com" 
                value={emailData.from}
                onChange={(e) => setEmailData({...emailData, from: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emailSubject">Subject</Label>
              <Input 
                id="emailSubject" 
                value={emailData.subject}
                onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emailMessage">Message</Label>
              <Textarea 
                id="emailMessage" 
                rows={4}
                value={emailData.message}
                onChange={(e) => setEmailData({...emailData, message: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEmailDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              onClick={sendEmail}
              disabled={isSendingEmail || !emailData.to || !emailData.from}
            >
              {isSendingEmail ? "Sending..." : "Send Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
