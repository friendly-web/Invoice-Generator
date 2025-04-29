import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import { MdReceipt, MdHistory, MdSettings, MdDashboard, MdCheckCircle } from "react-icons/md";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Invoice Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <MdReceipt className="h-6 w-6 text-primary-700" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">Create New Invoice</h2>
                    <p className="text-sm text-gray-500 mb-4">Generate professional invoices for your clients in minutes.</p>
                    <Link href="/invoice/create">
                      <Button>
                        Create Invoice
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    <MdHistory className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">Invoice History</h2>
                    <p className="text-sm text-gray-500 mb-4">View, manage, and download your previously created invoices.</p>
                    <Button variant="outline">View History</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
              <p className="text-gray-600 mb-4">Welcome to our Invoice Creator tool. Here's how to get started:</p>
              
              <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
                <li>Click on <span className="font-medium text-gray-900">Create Invoice</span> to start a new invoice</li>
                <li>Fill in the details including your company logo and invoice information</li>
                <li>Add line items for products or services you provided</li>
                <li>Review your invoice and generate a PDF</li>
                <li>Download, print, or email the invoice to your client</li>
              </ol>
              
              <div className="flex justify-center">
                <Link href="/invoice/create">
                  <Button>
                    Create Your First Invoice
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Section - Added based on screenshot */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">DueClear: Free Professional Invoice Generator</h2>
              
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Why Choose Our Free Invoice Generator?</h3>
                  <div className="space-y-5">
                    <p className="text-gray-600">
                      DueClear provides a completely <span className="font-medium">free invoice generator</span> that helps freelancers, small businesses, and entrepreneurs create professional-looking invoices in minutes. No hidden fees, no subscriptions, and no limitations on the number of invoices you can create.
                    </p>
                    <p className="text-gray-600">
                      Our <span className="font-medium">online invoice maker</span> offers customizable templates that can be tailored to match your brand identity. Add your logo, choose your currency, and personalize your payment terms to create professional invoices that get you paid faster.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Features That Make Invoicing Simple</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <MdCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Instant PDF Download</p>
                        <p className="text-gray-600">Generate and download professional PDF invoices with a single click</p>
                      </div>
                    </li>
                    <li className="flex">
                      <MdCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Multiple Payment Options</p>
                        <p className="text-gray-600">Support for bank transfers, PayPal, UPI, and custom payment links</p>
                      </div>
                    </li>
                    <li className="flex">
                      <MdCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Currency Support</p>
                        <p className="text-gray-600">Create invoices in any currency with automatic formatting</p>
                      </div>
                    </li>
                    <li className="flex">
                      <MdCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Taxes & Discounts</p>
                        <p className="text-gray-600">Easy calculation of taxes, discounts, and shipping costs</p>
                      </div>
                    </li>
                    <li className="flex">
                      <MdCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">No Sign-up Required</p>
                        <p className="text-gray-600">Start creating invoices immediately without registration</p>
                      </div>
                    </li>
                    <li className="flex">
                      <MdCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">100% Free Forever</p>
                        <p className="text-gray-600">No hidden costs or premium features; everything is accessible to everyone</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Perfect For All Professionals</h3>
                <p className="text-gray-600 mb-6">
                  Whether you're a freelancer, consultant, small business owner, or service provider, our <span className="font-medium">free online invoicing software</span> is designed to meet your needs. Create unlimited professional invoices, track payments, and maintain a professional image with your clients.
                </p>
                <p className="text-gray-600">
                  Start using DueClear today and experience how easy it is to create professional invoices in seconds. No credit card required, no trial periods - just a powerful, completely free invoice generator at your fingertips.
                </p>
              </div>
              
              <div className="flex justify-center">
                <Link href="/invoice/create">
                  <Button size="lg" className="px-6 py-3 text-lg">
                    Create Your First Invoice Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <PageFooter />
    </div>
  );
}
