import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, FileText, DollarSign, Clock, Send, CreditCard, CheckCircle, HelpCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';

export default function InvoicingGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-100 to-indigo-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Invoicing Guide</h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Everything you need to know about creating professional invoices and getting paid faster
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Contents</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#basics" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Invoice Basics</h3>
                    <p className="text-sm text-gray-600">Essential elements of a professional invoice</p>
                  </div>
                </a>
                <a href="#pricing" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Pricing Strategy</h3>
                    <p className="text-sm text-gray-600">Setting rates and handling discounts</p>
                  </div>
                </a>
                <a href="#timing" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Payment Terms</h3>
                    <p className="text-sm text-gray-600">Setting due dates and payment expectations</p>
                  </div>
                </a>
                <a href="#sending" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <Send className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Sending Invoices</h3>
                    <p className="text-sm text-gray-600">Best practices for delivery and follow-up</p>
                  </div>
                </a>
                <a href="#payment-methods" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Payment Methods</h3>
                    <p className="text-sm text-gray-600">Options to offer your clients</p>
                  </div>
                </a>
                <a href="#legal" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Legal Requirements</h3>
                    <p className="text-sm text-gray-600">Compliance with tax and business laws</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Invoice Basics */}
        <section id="basics" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-12 text-center">
              <div className="bg-blue-100 rounded-full p-3 inline-block mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Invoice Basics</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Essential Elements Every Invoice Needs</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Your Business Information</h4>
                    <p className="text-gray-700">Include your business name, address, contact details, and if applicable, your business registration or tax ID number.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Client Information</h4>
                    <p className="text-gray-700">Clearly state who you're billing: client name, address, and if needed for tax purposes, their business ID or tax number.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Invoice Number</h4>
                    <p className="text-gray-700">Each invoice should have a unique identifier for your records and your client's accounting system.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Issue & Due Dates</h4>
                    <p className="text-gray-700">The date the invoice is issued and when payment is expected. Be clear about payment terms (e.g., "Due in 30 days").</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Detailed Line Items</h4>
                    <p className="text-gray-700">Break down what you're charging for with descriptions, quantities, rates, and amounts for each item or service.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Total Amount Due</h4>
                    <p className="text-gray-700">Sum of all line items, clearly showing subtotal, any taxes, discounts, and the final amount due in your currency.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Payment Instructions</h4>
                    <p className="text-gray-700">How to pay you: bank transfer details, PayPal address, or other payment methods you accept.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Tips for Professional Invoices</h3>
              
              <ul className="space-y-4 list-disc list-inside text-gray-700 ml-4">
                <li><span className="font-semibold text-gray-900">Add your logo</span> - Brand recognition increases the professional appearance and makes your invoice memorable.</li>
                <li><span className="font-semibold text-gray-900">Use clear language</span> - Avoid industry jargon unless your client is familiar with it.</li>
                <li><span className="font-semibold text-gray-900">Be specific with descriptions</span> - Clearly describe what you're charging for to avoid confusion or questions.</li>
                <li><span className="font-semibold text-gray-900">Include your terms</span> - Specify payment terms, late payment fees, and any other relevant policies.</li>
                <li><span className="font-semibold text-gray-900">Add a personal note</span> - A brief message thanking the client for their business adds a personal touch.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Strategy */}
        <section id="pricing" className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-12 text-center">
              <div className="bg-blue-100 rounded-full p-3 inline-block mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Pricing Strategy</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Setting Your Rates</h3>
              
              <p className="text-gray-700 mb-6">
                Determining what to charge is one of the most challenging aspects of freelancing or running a business. 
                Consider these factors when setting your rates:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Cost-Based Pricing</h4>
                  <p className="text-gray-700 text-sm">
                    Calculate all your costs (time, materials, overhead) and add your desired profit margin.
                    This ensures you're not undercharging and losing money.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Market-Based Pricing</h4>
                  <p className="text-gray-700 text-sm">
                    Research what competitors charge for similar services.
                    Position yourself based on your experience, quality, and unique value proposition.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Value-Based Pricing</h4>
                  <p className="text-gray-700 text-sm">
                    Price based on the value and results you deliver, not just hours worked.
                    This can allow higher rates for specialized expertise or high-impact work.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Project vs. Hourly Rates</h4>
                  <p className="text-gray-700 text-sm">
                    Decide whether fixed project rates or hourly billing makes more sense for each client and type of work.
                    Be clear about what's included to avoid scope creep.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Handling Discounts Strategically</h3>
              
              <p className="text-gray-700 mb-6">
                Discounts can be powerful tools for building client relationships, but they need to be used strategically
                to avoid devaluing your services.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Volume Discounts</h4>
                    <p className="text-gray-700">Offer reduced rates for larger projects or bulk orders. This rewards clients for larger commitments while still ensuring profitability.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Loyalty Discounts</h4>
                    <p className="text-gray-700">Reward long-term clients with special rates or occasional discounts to show appreciation and encourage continued business.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Early Payment Discounts</h4>
                    <p className="text-gray-700">Incentivize prompt payment by offering a small discount for payments made before the due date (e.g., "2% discount if paid within 10 days").</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Avoiding Discount Pitfalls</h4>
                    <p className="text-gray-700">Always show both the original and discounted prices on your invoice. Don't make discounts a regular habit or clients may come to expect them.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Terms */}
        <section id="timing" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-12 text-center">
              <div className="bg-blue-100 rounded-full p-3 inline-block mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Payment Terms</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Common Payment Terms</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Due on Receipt</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Payment expected immediately upon receiving the invoice</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Small projects, new clients, urgent payments</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Net 7</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Payment due within 7 days</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Small to medium projects with regular clients</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Net 15</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Payment due within 15 days</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Medium projects with established clients</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Net 30</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Payment due within 30 days</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Larger projects, corporate clients</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Net 60/90</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Payment due within 60 or 90 days</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Major projects, large corporate clients</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">50/50</td>
                      <td className="px-6 py-4 text-sm text-gray-700">50% deposit upfront, 50% upon completion</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Project-based work, new client relationships</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Setting Effective Payment Terms</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Be Crystal Clear</h4>
                  <p className="text-gray-700">
                    State your payment terms explicitly on every invoice: "Payment due within 15 days of receipt" is clearer than "Net 15."
                    Include the specific due date for even more clarity.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Consider Your Cash Flow</h4>
                  <p className="text-gray-700">
                    Choose terms that support your business operations. If you have regular expenses, shorter payment terms may be necessary.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Late Payment Policies</h4>
                  <p className="text-gray-700">
                    Clearly state any late payment fees or interest charges for overdue invoices.
                    For example: "Late payments will incur a 2% monthly interest charge on the outstanding balance."
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Include in Contracts</h4>
                  <p className="text-gray-700">
                    Discuss and include payment terms in your initial contracts or agreements, not just on invoices.
                    This prevents surprises and ensures clients are aware of expectations from the start.
                  </p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <HelpCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Pro Tip</h3>
                      <div className="text-sm text-yellow-700">
                        Different industries have different standard payment practices. Research what's common in your field, 
                        but don't be afraid to set terms that work for your specific business needs.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sending Invoices */}
        <section id="sending" className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-12 text-center">
              <div className="bg-blue-100 rounded-full p-3 inline-block mb-4">
                <Send className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Sending Invoices</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Delivery Best Practices</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900">Timing Is Everything</h4>
                  <p className="text-gray-700">
                    Send invoices promptly after completing work or at pre-agreed billing intervals. Delays in sending invoices 
                    often lead to delays in payment and can signal unprofessionalism.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Professional Format</h4>
                  <p className="text-gray-700">
                    Always send invoices as a PDF attachment, which looks professional and can't be easily altered. 
                    Include a clear, concise email with a polite message referencing the project or work completed.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Subject Line Clarity</h4>
                  <p className="text-gray-700">
                    Use a clear email subject line that includes "Invoice," your company name, and the invoice number.
                    Example: "Invoice #1234 from Due Clear - Website Development Project"
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Delivery Methods</h4>
                  <ul className="space-y-2 list-disc list-inside text-gray-700 ml-4">
                    <li><span className="font-semibold">Email</span> - The most common method; direct, trackable, and creates a record of delivery.</li>
                    <li><span className="font-semibold">Client Portals</span> - For larger clients with accounting systems, use their vendor portals if available.</li>
                    <li><span className="font-semibold">Invoicing Software</span> - Many platforms offer direct delivery with tracking and payment features.</li>
                    <li><span className="font-semibold">Physical Mail</span> - Consider for traditional clients or when required for legal purposes.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Follow-Up Strategy</h3>
              
              <p className="text-gray-700 mb-6">
                Even with the best invoicing practices, sometimes you'll need to follow up on unpaid invoices.
                Having a systematic approach helps maintain professional relationships while ensuring you get paid.
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Payment Confirmation</h4>
                  <p className="text-gray-700">Always acknowledge and thank clients promptly when payment is received.</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Friendly Reminder</h4>
                  <p className="text-gray-700">Send a gentle reminder a few days before the due date: "Just a friendly reminder that invoice #1234 is due on [date]."</p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-gray-900">First Follow-Up</h4>
                  <p className="text-gray-700">Send a polite email 1-3 days after the due date has passed, assuming the payment might have been overlooked.</p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Second Follow-Up</h4>
                  <p className="text-gray-700">If no response, follow up again 7-10 days after the due date with a more direct message and resend the invoice.</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Phone Call</h4>
                  <p className="text-gray-700">After 14+ days, a phone call can be more effective than email. Be professional and ask if there are any issues with the invoice.</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Final Notice</h4>
                  <p className="text-gray-700">Send a formal final notice specifying consequences of non-payment (late fees, paused services, legal action, etc.).</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <HelpCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Communication Tip</h3>
                      <div className="text-sm text-blue-700">
                        Keep all payment follow-ups professional and courteous. Assume administrative issues or oversight rather than
                        deliberate non-payment. Document all communications for your records.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section id="payment-methods" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-12 text-center">
              <div className="bg-blue-100 rounded-full p-3 inline-block mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Payment Methods</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Common Payment Options</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Bank Transfers</h4>
                  <p className="text-gray-700 mb-3 text-sm">
                    Direct deposits to your business account. Secure and professional, with minimal fees for domestic transfers.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Include on invoice:</span> Account name, account number, routing/SWIFT/IBAN codes, and bank name.
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Credit/Debit Cards</h4>
                  <p className="text-gray-700 mb-3 text-sm">
                    Convenient for clients but comes with processing fees (typically 2-3%). Quick payment with immediate confirmation.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Include on invoice:</span> Link to online payment page or instructions for phone payments.
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">PayPal</h4>
                  <p className="text-gray-700 mb-3 text-sm">
                    Widely used for both domestic and international payments. Easy to set up but watch for fees (varies by country and transaction type).
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Include on invoice:</span> Your PayPal email address or a payment link.
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Cash</h4>
                  <p className="text-gray-700 mb-3 text-sm">
                    No processing fees but less secure and only practical for in-person services. Always provide a receipt.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Include on invoice:</span> Clear instructions for cash payments if applicable.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Payment Method Best Practices</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Offer Multiple Options</h4>
                    <p className="text-gray-700">Provide 2-3 payment methods to accommodate different client preferences and capabilities.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Consider Transaction Costs</h4>
                    <p className="text-gray-700">Be aware of fees associated with each payment method. For larger invoices, you may want to encourage bank transfers to avoid percentage-based fees.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">International Considerations</h4>
                    <p className="text-gray-700">For international clients, be aware of currency conversion issues and potential additional fees. Specify which currency you accept.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Security Considerations</h4>
                    <p className="text-gray-700">Never send sensitive payment information like complete credit card details via email. Use secure, encrypted methods for handling payment data.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Requirements */}
        <section id="legal" className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-12 text-center">
              <div className="bg-blue-100 rounded-full p-3 inline-block mb-4">
                <AlertTriangle className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Legal Requirements</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Compliance Considerations</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                    <div className="text-sm text-yellow-700">
                      This information is general guidance only and not legal advice. Tax and business regulations vary by country, 
                      state, and locality. Always consult with a qualified accountant or tax professional regarding your specific situation.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900">Tax ID Numbers</h4>
                  <p className="text-gray-700">
                    Depending on your location and business type, you may need to include your tax identification number on invoices 
                    (e.g., VAT number in Europe, GST number in Australia, EIN in the US).
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">VAT/Sales Tax</h4>
                  <p className="text-gray-700">
                    If you charge VAT or sales tax, you must typically show:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 ml-4 mt-2">
                    <li>Your VAT/tax registration number</li>
                    <li>The tax rate applied</li>
                    <li>Amount of tax charged for each item</li>
                    <li>Total tax amount</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Invoice Numbering</h4>
                  <p className="text-gray-700">
                    Many jurisdictions require sequential, unique invoice numbers. Establish a consistent numbering system
                    that works for your business and accounting needs.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Record Keeping</h4>
                  <p className="text-gray-700">
                    Most tax authorities require you to keep copies of all invoices for a specified period (often 5-7 years).
                    Establish a reliable system for storing and organizing your invoice records.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Digital Invoices</h4>
                  <p className="text-gray-700">
                    Many countries now accept digital invoices, but they may need to meet specific requirements for authentication 
                    and integrity. Check local regulations regarding electronic invoicing.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Industry-Specific Requirements</h4>
                  <p className="text-gray-700">
                    Some industries have additional invoicing requirements. For example, medical services, legal services,
                    or government contractors may have special information that must be included.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Create Professional Invoices?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Use Due Clear's free invoice generator to create beautiful, compliant invoices in minutes.
            </p>
            <Link href="/invoice/create">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-medium">
                Create Your Invoice Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <PageFooter />
    </div>
  );
}