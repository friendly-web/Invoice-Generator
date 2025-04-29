import { useInvoiceForm } from "@/hooks/use-invoice-form";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PAYMENT_TERMS, CURRENCIES, PAYMENT_METHODS } from "@/lib/constants";
import { ArrowRight, CreditCard, DollarSign, Link as LinkIcon, Plus, Trash2 } from "lucide-react";
import { InvoiceItem } from "@shared/schema";
import { nanoid } from "nanoid";
import { getFormattedCurrency } from "@/lib/utils";

export default function InvoiceForm() {
  const { form, logoPreview, isSubmitting, handleLogoChange, onSubmit } = useInvoiceForm();
  const [_, setLocation] = useLocation();
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: nanoid(), description: "", quantity: 1, rate: 0, discount: 0, amount: 0 }
  ]);
  const [discountValue, setDiscountValue] = useState(0);
  const [taxValue, setTaxValue] = useState(0);
  const [shippingValue, setShippingValue] = useState(0);
  
  // No default value for invoice number
  
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

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  
  // Calculate discount amount
  const discountAmount = subtotal * (discountValue / 100);
  
  // Calculate final total
  const totalWithDiscount = subtotal - discountAmount;
  const totalWithTax = totalWithDiscount + (totalWithDiscount * (taxValue / 100));
  const finalTotal = totalWithTax + shippingValue;

  const handleSubmit = async () => {
    try {
      await form.handleSubmit(onSubmit)();
      const formData = form.getValues();
      
      // Add items and totals to form data
      const completeInvoiceData = {
        ...formData,
        items,
        subtotal,
        discountTotal: discountValue,
        tax: taxValue,
        shipping: shippingValue,
        totalAmount: finalTotal
      };
      
      // Store the form data in sessionStorage for the next steps
      sessionStorage.setItem("invoiceFormData", JSON.stringify(completeInvoiceData));
      sessionStorage.setItem("invoiceItems", JSON.stringify(items));
      
      // Navigate to review page
      setLocation("/invoice/review");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="bg-white rounded-lg p-6">
          <h1 className="text-xl font-medium text-gray-800 mb-5">Create New Invoice</h1>
          
          <div className="border rounded-md p-6 bg-gray-50">
            <h2 className="text-sm font-medium text-gray-700 mb-4">Invoice Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
              {/* Logo Upload */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 w-24 h-24 border-2 border-gray-300 border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {logoPreview ? (
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="w-20 h-20 object-contain"
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                  <input 
                    type="file"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleLogoChange(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    id="logo-upload"
                    accept="image/png, image/jpeg, image/svg+xml"
                  />
                </div>
                <label htmlFor="logo-upload" className="text-xs font-medium text-gray-700 cursor-pointer">
                  Upload logo
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPG, PNG, SVG
                </p>
                <p className="text-xs text-gray-500">
                  Recommended size: 300px × 300px
                </p>
                <Button 
                  type="button"
                  size="sm"
                  variant="outline" 
                  className="mt-2 h-8 bg-yellow-400 hover:bg-yellow-500 text-sm"
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  Upload
                </Button>
                <p className="text-xs text-gray-400 mt-1">Max upload size: 1 MB</p>
              </div>

              <div className="space-y-5">
                {/* Invoice Number */}
                {/* Invoice Number - Now editable */}
                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700">Invoice Number</FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            className="h-10 focus:ring-1 focus:ring-gray-300"
                            {...field}
                            placeholder="Enter invoice number"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Issue Date */}
                <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700">Issue Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="date"
                            className="h-10 focus:ring-1 focus:ring-gray-300"
                            {...field}
                          />
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Currency */}
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700">Currency</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 focus:ring-1 focus:ring-gray-300">
                            <SelectValue placeholder="USD ($)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CURRENCIES.map((currency) => (
                            <SelectItem key={currency.value} value={currency.value}>
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-5">
                {/* Payment Terms */}
                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700">Payment Terms</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 focus:ring-1 focus:ring-gray-300">
                            <SelectValue placeholder="NET30" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PAYMENT_TERMS.map((term) => (
                            <SelectItem key={term.value} value={term.value}>
                              {term.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Due Date */}
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700">Due Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="date"
                            className="h-10 focus:ring-1 focus:ring-gray-300"
                            {...field}
                            readOnly
                          />
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Business and Client Details */}
          <div className="border rounded-md p-6 bg-gray-50 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Invoice From - Business Details */}
              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2">Invoice From</h2>
                <p className="text-xs text-gray-500 mb-2">Your Business Details</p>
                <FormField
                  control={form.control}
                  name="businessDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          placeholder="Business Name,
Address,
Phone,
Email,
TAX ID, etc."
                          className="w-full h-32 p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bill To - Client Details */}
              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2">Bill To</h2>
                <p className="text-xs text-gray-500 mb-2">Client Details</p>
                <FormField
                  control={form.control}
                  name="clientDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          placeholder="Client/Business Name,
Address,
Phone,
Email,
TAX ID, etc."
                          className="w-full h-32 p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          
          {/* Items Section */}
          <div className="border rounded-md p-6 bg-gray-50 mt-6">
            <h2 className="text-sm font-medium text-gray-700 mb-4">Items</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-12 gap-4 mb-2 text-xs font-medium text-gray-700 hidden md:grid">
                <div className="col-span-5">Item Description</div>
                <div className="col-span-1 text-center">Qty</div>
                <div className="col-span-2 text-center">Rate</div>
                <div className="col-span-2 text-center">Discount</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>
              
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-200 pb-4">
                  <div className="col-span-1 md:col-span-5">
                    <Label htmlFor={`description-${item.id}`} className="md:sr-only block mb-1 text-sm">Item Description</Label>
                    <Input
                      id={`description-${item.id}`}
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="col-span-1 md:col-span-1">
                    <Label htmlFor={`quantity-${item.id}`} className="md:sr-only block mb-1 text-sm">Qty</Label>
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      placeholder="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full text-center"
                    />
                  </div>
                  
                  <div className="col-span-1 md:col-span-2">
                    <Label htmlFor={`rate-${item.id}`} className="md:sr-only block mb-1 text-sm">Rate</Label>
                    <div className="flex">
                      <div className="inline-flex items-center justify-center rounded-l-md border border-r-0 border-input h-10 px-3 text-sm">
                        {getFormattedCurrency(form.getValues().currency || "usd")}
                      </div>
                      <Input
                        id={`rate-${item.id}`}
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="rounded-l-none w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2">
                    <Label htmlFor={`discount-${item.id}`} className="md:sr-only block mb-1 text-sm">Discount</Label>
                    <div className="flex">
                      <Input
                        id={`discount-${item.id}`}
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0"
                        value={item.discount}
                        onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value) || 0)}
                        className="rounded-r-none w-full"
                      />
                      <div className="inline-flex items-center justify-center rounded-r-md border border-l-0 border-input h-10 px-3 text-sm">
                        %
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2 md:col-span-2 flex items-center">
                    <div className="w-full">
                      <Label htmlFor={`amount-${item.id}`} className="md:sr-only block mb-1 text-sm">Amount</Label>
                      <div className="flex items-center">
                        <Input
                          id={`amount-${item.id}`}
                          readOnly
                          value={`${getFormattedCurrency(form.getValues().currency || "usd")}${item.amount.toFixed(2)}`}
                          className="bg-gray-50 text-right w-full"
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
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={addNewItem}
                className="text-sm h-9"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
              
              <div className="flex justify-end pt-4">
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="font-medium text-right">{getFormattedCurrency(form.getValues().currency || "usd")}{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Discount:</span>
                    <div className="flex w-24">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                        className="h-8 text-right rounded-r-none"
                      />
                      <div className="inline-flex items-center justify-center rounded-r-md border border-l-0 border-input h-8 px-2 text-xs">
                        %
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tax:</span>
                    <div className="flex w-24">
                      <Input
                        type="number"
                        min="0"
                        value={taxValue}
                        onChange={(e) => setTaxValue(parseFloat(e.target.value) || 0)}
                        className="h-8 text-right rounded-r-none"
                      />
                      <div className="inline-flex items-center justify-center rounded-r-md border border-l-0 border-input h-8 px-2 text-xs">
                        %
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Shipping:</span>
                    <div className="flex w-24">
                      <div className="inline-flex items-center justify-center rounded-l-md border border-r-0 border-input h-8 px-2 text-xs">
                        {getFormattedCurrency(form.getValues().currency || "usd")}
                      </div>
                      <Input
                        type="number"
                        min="0"
                        value={shippingValue}
                        onChange={(e) => setShippingValue(parseFloat(e.target.value) || 0)}
                        className="h-8 text-right rounded-l-none w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg text-right text-blue-600">{getFormattedCurrency(form.getValues().currency || "usd")}{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Details */}
          <div className="border rounded-md p-6 bg-gray-50 mt-6">
            <h2 className="text-sm font-medium text-gray-700 mb-4">How does this invoice get paid?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {PAYMENT_METHODS.map((method) => (
                            <FormItem key={method.value} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={method.value} />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center">
                                {method.icon === 'bank' && (
                                  <CreditCard className="w-4 h-4 mr-2" />
                                )}
                                {method.icon === 'paypal' && (
                                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 11l5-1l-1 4l3-1" />
                                    <path d="M19.338 8A7.008 7.008 0 0 0 17.5 2H9.5A5.5 5.5 0 0 0 4 7.5V18c0 .304.022.607.066.905A4.996 4.996 0 0 0 9 22h7a7 7 0 0 0 4.975-2.066A6.5 6.5 0 0 0 21 10.5c0-.886-.178-1.73-.501-2.5H20Z" />
                                  </svg>
                                )}
                                {method.icon === 'money' && (
                                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M14.4 8.4c-.4-.8-1.4-1.4-2.4-1.4-2.2 0-4 1.8-4 4s1.8 4 4 4c1 0 2-.6 2.4-1.4" />
                                    <path d="M12 7v10" />
                                  </svg>
                                )}
                                {method.icon === 'link' && (
                                  <LinkIcon className="w-4 h-4 mr-2" />
                                )}
                                {method.icon === 'cash' && (
                                  <DollarSign className="w-4 h-4 mr-2" />
                                )}
                                {method.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                {/* Conditionally show payment details based on selected payment method */}
                {form.watch("paymentMethod") === "bank_transfer" && (
                  <>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Enter bank details</h3>
                    <FormField
                      control={form.control}
                      name="bankDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <textarea
                              placeholder="Bank Name,
Account Holder Name,
Account Number,
Account Type,
IFSC/SWIFT Code,
IBAN, etc."
                              className="w-full h-32 p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {form.watch("paymentMethod") === "paypal" && (
                  <>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Enter PayPal ID</h3>
                    <FormField
                      control={form.control}
                      name="paypalDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your PayPal ID"
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {form.watch("paymentMethod") === "upi" && (
                  <>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Enter UPI ID</h3>
                    <FormField
                      control={form.control}
                      name="upiDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your UPI ID"
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {form.watch("paymentMethod") === "payment_link" && (
                  <>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Enter Payment Link</h3>
                    <FormField
                      control={form.control}
                      name="paymentLinkDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your payment link"
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {form.watch("paymentMethod") === "cash" && (
                  <>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Cash Payment Instructions</h3>
                    <FormField
                      control={form.control}
                      name="cashDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <textarea
                              placeholder="Do you have any instructions? Please mention"
                              className="w-full h-32 p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              
              {/* Notes and Terms section */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Notes</h3>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <textarea
                            placeholder="Notes to be displayed on the invoice"
                            className="w-full h-32 p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Terms</h3>
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <textarea
                            placeholder="Terms and conditions for this invoice"
                            className="w-full h-32 p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end mt-6">
            <Button 
              type="button" 
              onClick={handleSubmit}
              disabled={isSubmitting || items.length === 0 || items.some(item => !item.description || item.quantity <= 0)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Invoice
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
