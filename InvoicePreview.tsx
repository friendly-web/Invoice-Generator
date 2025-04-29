import { useEffect, useState } from "react";
import { InvoiceFormValues } from "@shared/schema";
import { getFormattedCurrency } from "@/lib/utils";
import { Eye } from "lucide-react";
import { PAYMENT_METHODS } from "@/lib/constants";

interface InvoicePreviewProps {
  invoice: Partial<InvoiceFormValues>;
  logoPreview?: string | null;
}

export default function InvoicePreview({ invoice, logoPreview }: InvoicePreviewProps) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled
    const requiredFields: (keyof InvoiceFormValues)[] = [
      "invoiceNumber",
      "paymentTerms",
      "issueDate",
      "dueDate",
      "currency"
    ];
    
    const allFieldsFilled = requiredFields.every(
      field => invoice[field] !== undefined && invoice[field] !== ""
    );
    
    setIsComplete(allFieldsFilled);
  }, [invoice]);

  // Format the payment terms for display
  const getFormattedPaymentTerms = () => {
    if (!invoice.paymentTerms) return "";
    
    if (invoice.paymentTerms === "receipt") {
      return "Due on receipt";
    }
    
    return invoice.paymentTerms.toUpperCase();
  };

  return (
    <div className="mt-8 border border-gray-200 rounded-md p-4 bg-gray-50">
      <div className="flex items-center">
        <Eye className="h-4 w-4 text-gray-500 mr-2" />
        <h3 className="text-sm font-medium text-gray-700">Invoice Preview</h3>
      </div>
      
      <div className="mt-3 aspect-[8.5/11] max-w-xl mx-auto bg-white shadow-sm border border-gray-200 rounded p-8 relative flex flex-col">
        {!isComplete ? (
          <div className="animate-pulse text-center text-gray-400 absolute inset-0 flex items-center justify-center">
            <div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-24 w-24 mb-4 mx-auto text-gray-300"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              <p className="text-sm">Complete the form to preview your invoice</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">INVOICE</h1>
                <p className="text-gray-500 mt-1">#{invoice.invoiceNumber}</p>
              </div>
              
              {logoPreview && (
                <div className="w-32 h-16">
                  <img 
                    src={logoPreview} 
                    alt="Company logo" 
                    className="w-full h-full object-contain" 
                  />
                </div>
              )}
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Issue Date:</p>
                <p className="text-sm text-gray-600">{invoice.issueDate}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Due Date:</p>
                <p className="text-sm text-gray-600">{invoice.dueDate}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Payment Terms:</p>
                <p className="text-sm text-gray-600">{getFormattedPaymentTerms()}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Currency:</p>
                <p className="text-sm text-gray-600">
                  {invoice.currency} ({getFormattedCurrency(invoice.currency || "USD")})
                </p>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-4">
              <p className="text-sm font-medium text-gray-700">Items will be added in the next step</p>
            </div>
            
            {invoice.paymentMethod && (
              <div className="mt-8 border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-700">How does this invoice get paid?</p>
                <p className="text-sm text-gray-600 mt-1">
                  Payment Method: {PAYMENT_METHODS.find(m => m.value === invoice.paymentMethod)?.label || ''}
                </p>
                
                {invoice.paymentMethod === 'bank_transfer' && invoice.bankDetails && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Bank Details:</p>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.bankDetails}</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      
      <p className="text-xs text-gray-500 text-center mt-3">
        This is a live preview of your invoice. As you complete the form, this preview will update.
      </p>
    </div>
  );
}
