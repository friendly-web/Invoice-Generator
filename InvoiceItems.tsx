import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import StepIndicator from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InvoiceFormValues, InvoiceItem, invoiceItemSchema } from "@shared/schema";
import { nanoid } from "nanoid";
import { getFormattedCurrency } from "@/lib/utils";

export default function InvoiceItems() {
  const [invoiceData, setInvoiceData] = useState<InvoiceFormValues | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [discountValue, setDiscountValue] = useState(0);
  const [taxValue, setTaxValue] = useState(0);
  const [shippingValue, setShippingValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  // Initialize with data from previous step
  useEffect(() => {
    const storedData = sessionStorage.getItem("invoiceFormData");
    if (!storedData) {
      toast({
        title: "No invoice data found",
        description: "Please start by creating an invoice from the details page.",
        variant: "destructive"
      });
      setLocation("/invoice/details");
      return;
    }

    try {
      const parsedData = JSON.parse(storedData) as InvoiceFormValues;
      setInvoiceData(parsedData);
      
      // Initialize invoice additional fields
      if (parsedData.discountTotal) setDiscountValue(parsedData.discountTotal);
      if (parsedData.tax) setTaxValue(parsedData.tax);
      if (parsedData.shipping) setShippingValue(parsedData.shipping);
      
      // Check if there are already items stored
      const storedItems = sessionStorage.getItem("invoiceItems");
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      } else {
        // Add an empty item by default
        addNewItem();
      }
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

  // Add a new empty item
  const addNewItem = () => {
    const newItem: InvoiceItem = {
      id: nanoid(),
      description: "",
      quantity: 1,
      rate: 0,
      discount: 0,
      amount: 0
    };
    
    setItems(prevItems => [...prevItems, newItem]);
  };

  // Remove an item
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Update item field
  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Recalculate amount whenever quantity, rate or discount changes
          if (field === 'quantity' || field === 'rate' || field === 'discount') {
            const baseAmount = Number(updatedItem.quantity) * Number(updatedItem.rate);
            const discountAmount = baseAmount * (Number(updatedItem.discount) / 100);
            updatedItem.amount = baseAmount - discountAmount;
          }
          
          return updatedItem;
        }
        return item;
      })
    );
  };

  // Handle navigation to next step
  const handleNext = () => {
    try {
      // Validate items
      items.forEach(item => {
        invoiceItemSchema.parse(item);
      });
      
      // Save items to session storage
      sessionStorage.setItem("invoiceItems", JSON.stringify(items));
      
      // Calculate subtotal
      const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
      
      // Calculate discount amount
      const discountAmount = subtotal * (discountValue / 100);
      
      // Calculate final total
      const totalWithDiscount = subtotal - discountAmount;
      const totalWithTax = totalWithDiscount + (totalWithDiscount * (taxValue / 100));
      const finalTotal = totalWithTax + shippingValue;
      
      // Update invoice data with items and totals
      const updatedInvoiceData = {
        ...invoiceData!,
        items,
        subtotal,
        discountTotal: discountValue,
        tax: taxValue,
        shipping: shippingValue,
        totalAmount: finalTotal
      };
      
      // Save updated invoice data
      sessionStorage.setItem("invoiceFormData", JSON.stringify(updatedInvoiceData));
      
      // Navigate to review page
      setLocation("/invoice/review");
    } catch (error) {
      console.error("Validation error:", error);
      toast({
        title: "Validation Error",
        description: "Please check that all item details are filled in correctly.",
        variant: "destructive"
      });
    }
  };

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  
  // Calculate discount amount
  const discountAmount = subtotal * (discountValue / 100);
  
  // Calculate final total
  const totalWithDiscount = subtotal - discountAmount;
  const totalWithTax = totalWithDiscount + (totalWithDiscount * (taxValue / 100));
  const finalTotal = totalWithTax + shippingValue;

  if (!invoiceData) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Invoice Items</h2>
            <p className="text-gray-600">Add products or services to your invoice</p>
          </div>
          
          {/* Step Indicator */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
                1
              </div>
              <div className="text-sm text-gray-600">Details</div>
            </div>
            <div className="flex-1 h-px bg-gray-200 mx-4"></div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-medium">
                2
              </div>
              <div className="text-sm font-medium text-gray-900">Items</div>
            </div>
            <div className="flex-1 h-px bg-gray-200 mx-4"></div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
                3
              </div>
              <div className="text-sm text-gray-600">Review</div>
            </div>
          </div>

          {/* Items Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-base font-medium text-gray-900 mb-6">Items</h3>
            
            {/* Items */}
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={item.id} className="space-y-4">
                  <div>
                    <Label htmlFor={`description-${item.id}`} className="text-sm font-medium text-gray-700 block mb-1">Description</Label>
                    <Input
                      id={`description-${item.id}`}
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor={`quantity-${item.id}`} className="text-sm font-medium text-gray-700 block mb-1">Qty</Label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        placeholder="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`rate-${item.id}`} className="text-sm font-medium text-gray-700 block mb-1">Rate</Label>
                      <div className="flex">
                        <div className="inline-flex items-center justify-center rounded-l-md border border-r-0 border-input h-10 px-3 text-sm">
                          {getFormattedCurrency(invoiceData.currency)}
                        </div>
                        <Input
                          id={`rate-${item.id}`}
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`discount-${item.id}`} className="text-sm font-medium text-gray-700 block mb-1">Discount</Label>
                      <div className="flex">
                        <Input
                          id={`discount-${item.id}`}
                          type="number"
                          min="0"
                          max="100"
                          placeholder="0"
                          value={item.discount}
                          onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value) || 0)}
                          className="rounded-r-none"
                        />
                        <div className="inline-flex items-center justify-center rounded-r-md border border-l-0 border-input h-10 px-3 text-sm">
                          %
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`amount-${item.id}`} className="text-sm font-medium text-gray-700 block mb-1">Amount</Label>
                      <div className="flex items-center">
                        <Input
                          id={`amount-${item.id}`}
                          readOnly
                          value={`${getFormattedCurrency(invoiceData.currency)}${item.amount.toFixed(2)}`}
                          className="bg-gray-50 text-right"
                        />
                        {items.length > 1 && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeItem(item.id)}
                            className="ml-2"
                          >
                            <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add Item Button */}
            <Button 
              type="button" 
              variant="outline" 
              onClick={addNewItem}
              className="mt-6"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
            
            {/* Invoice Totals */}
            <div className="mt-8 border-t border-gray-200 pt-4">
              <div className="flex justify-end">
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="font-normal text-gray-700">Subtotal:</dt>
                    <dd className="font-medium text-gray-900 text-right">{getFormattedCurrency(invoiceData.currency)}{subtotal.toFixed(2)}</dd>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <dt className="font-normal text-gray-700">Discount:</dt>
                    <dd className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                        className="w-16 h-8 text-right text-sm"
                      />
                      <span className="text-gray-700">%</span>
                    </dd>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <dt className="font-normal text-gray-700">Tax:</dt>
                    <dd className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min="0"
                        value={taxValue}
                        onChange={(e) => setTaxValue(parseFloat(e.target.value) || 0)}
                        className="w-16 h-8 text-right text-sm"
                      />
                      <span className="text-gray-700">%</span>
                    </dd>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <dt className="font-normal text-gray-700">Shipping:</dt>
                    <dd className="flex items-center space-x-2">
                      <span className="text-gray-700">{getFormattedCurrency(invoiceData.currency)}</span>
                      <Input
                        type="number"
                        min="0"
                        value={shippingValue}
                        onChange={(e) => setShippingValue(parseFloat(e.target.value) || 0)}
                        className="w-16 h-8 text-right text-sm"
                      />
                    </dd>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <dt className="font-medium text-gray-900">Total:</dt>
                    <dd className="font-bold text-blue-600 text-right">{getFormattedCurrency(invoiceData.currency)}{finalTotal.toFixed(2)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mb-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setLocation("/invoice/details")}
              className="h-10 px-4 py-2 border border-gray-300 rounded-md"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Details
            </Button>
            
            <Button 
              type="button" 
              onClick={handleNext}
              disabled={items.length === 0 || items.some(item => !item.description || item.quantity <= 0)}
              className="h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Continue to Review
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
      
      <PageFooter />
    </div>
  );
}
