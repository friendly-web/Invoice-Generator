import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';

export default function MarketingContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <section className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Due Clear: Professional Invoicing Made Simple</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Create, customize, and send professional invoices in minutes with our free invoice generator. No signup required.</p>
          <Link href="/invoice/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg">
              Create Free Invoice Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        <section className="py-12" id="professionals">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Perfect For All Professionals</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Freelancers & Consultants</h3>
              <p className="text-gray-600 mb-4">Streamline your billing process and maintain a professional image with clients. Track payments and organize your financial records in one place.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Customizable invoice templates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Multiple payment method options</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Instant PDF generation</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Small Businesses</h3>
              <p className="text-gray-600 mb-4">Create professional invoices that reflect your brand. Keep track of all your client payments and maintain organized financial records.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Logo customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Tax calculation handling</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Email invoices directly to clients</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Service Providers</h3>
              <p className="text-gray-600 mb-4">Simplify your invoicing process with itemized billing and detailed service descriptions for complete transparency with your clients.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Itemized billing with descriptions</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Discount calculation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Multiple currency support</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50 -mx-4 px-4" id="features">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Features That Make Invoicing Simple</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="bg-blue-100 rounded-full p-3 h-min">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy Item Management</h3>
                  <p className="text-gray-600">Add, edit, or remove items with automatic calculations for subtotals, taxes, and discounts. Real-time updates as you type.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-blue-100 rounded-full p-3 h-min">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Logo Customization</h3>
                  <p className="text-gray-600">Upload your business logo to create branded invoices that reinforce your professional identity with every bill you send.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-blue-100 rounded-full p-3 h-min">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Multiple Payment Methods</h3>
                  <p className="text-gray-600">Offer your clients flexibility with various payment options: bank transfer, PayPal, UPI, payment links, or cash payments.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-blue-100 rounded-full p-3 h-min">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Instant Email Delivery</h3>
                  <p className="text-gray-600">Send professional invoices directly to your clients via email with just a few clicks, reducing payment delays.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-blue-100 rounded-full p-3 h-min">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Professional PDF Generation</h3>
                  <p className="text-gray-600">Generate high-quality PDF invoices with a professional layout that impresses clients and can be downloaded instantly.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-blue-100 rounded-full p-3 h-min">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Invoice History</h3>
                  <p className="text-gray-600">Access your complete invoice history, allowing you to track, manage, and reference past transactions easily.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12" id="why-choose">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Why Choose Our Free Invoice Generator?</h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Save Time & Money</h3>
                <p className="text-gray-600 mb-6">No more hours spent creating invoices from scratch or paying for expensive accounting software. Our free invoice generator helps you create professional invoices in minutes, letting you focus on your core business activities.</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">100% free, forever - no hidden fees</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">No learning curve or complex software</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Create invoices in under 2 minutes</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Look Professional</h3>
                <p className="text-gray-600 mb-6">Make a great impression with beautifully designed, professional invoices. Our clean templates and customization options help you maintain a consistent brand image and build client trust.</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Clean, modern invoice designs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Custom branding with your logo</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Consistent formatting for all documents</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/invoice/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg">
                Create Your First Invoice
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